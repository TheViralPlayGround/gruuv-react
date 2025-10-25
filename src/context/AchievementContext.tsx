'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from './AuthContext';
import { Achievement, CreateAchievement, UpdateAchievement } from '@/types/achievement';

interface AchievementContextType {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  addAchievement: (achievement: CreateAchievement) => Promise<void>;
  updateAchievement: (achievement: UpdateAchievement) => Promise<void>;
  deleteAchievement: (id: string) => Promise<void>;
  updateEffort: (id: string, effort: number) => Promise<void>;
  getTodayEffort: (achievement: Achievement) => number;
}

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementProvider');
  }
  return context;
};

interface AchievementProviderProps {
  children: React.ReactNode;
}

// Helper function to get today's effort from effortHistory
const getTodayEffort = (achievement: Achievement): number => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  return achievement.effortHistory[today] || 0;
};

export const AchievementProvider: React.FC<AchievementProviderProps> = ({ children }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setAchievements([]);
      setLoading(false);
      return;
    }

    console.log('🔍 Debug: User ID:', user.uid);
    console.log('🔍 Debug: User email:', user.email);

    // Your achievements are stored as a subcollection: users/{userId}/achievements
    const achievementsRef = collection(db, 'users', user.uid, 'achievements');
    const q = query(achievementsRef);

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        console.log('🔍 Debug: Subcollection query snapshot size:', snapshot.size);
        console.log('🔍 Debug: Subcollection query snapshot empty:', snapshot.empty);
        
        const achievementsData: Achievement[] = [];
        snapshot.forEach((doc) => {
          console.log('🔍 Debug: Found achievement document:', doc.id, doc.data());
          achievementsData.push({
            id: doc.id,
            ...doc.data(),
          } as Achievement);
        });
        
        console.log('🔍 Debug: Total achievements found:', achievementsData.length);
        setAchievements(achievementsData);
        setLoading(false);
      },
      (err) => {
        console.error('🔍 Debug: Subcollection query error:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  const addAchievement = async (achievementData: CreateAchievement) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const docRef = await addDoc(collection(db, 'users', user.uid, 'achievements'), {
        ...achievementData,
        completed: false,
        date: Date.now(),
        effortHistory: {},
      });
      console.log('Achievement added with ID: ', docRef.id);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateAchievement = async (achievement: UpdateAchievement) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setError(null);
      const { id, ...updateData } = achievement;
      await updateDoc(doc(db, 'users', user.uid, 'achievements', id), updateData);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deleteAchievement = async (id: string) => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      setError(null);
      await deleteDoc(doc(db, 'users', user.uid, 'achievements', id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateEffort = async (id: string, effort: number) => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Get current achievement to update effort history
      const achievement = achievements.find(a => a.id === id);
      if (!achievement) throw new Error('Achievement not found');

      const updatedEffortHistory = {
        ...achievement.effortHistory,
        [today]: effort,
      };

      await updateDoc(doc(db, 'users', user.uid, 'achievements', id), {
        effort,
        effortHistory: updatedEffortHistory,
      });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const value: AchievementContextType = {
    achievements,
    loading,
    error,
    addAchievement,
    updateAchievement,
    deleteAchievement,
    updateEffort,
    getTodayEffort,
  };

  return (
    <AchievementContext.Provider value={value}>
      {children}
    </AchievementContext.Provider>
  );
};
