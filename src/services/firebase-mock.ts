// Mock Firebase for development/testing without Firebase setup
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Mock: no user logged in initially
    callback(null);
    return () => {}; // unsubscribe function
  },
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Mock: simulate successful login
    const mockUser = {
      uid: 'mock-user-id',
      email: email,
      displayName: 'Test User',
      photoURL: null,
    };
    auth.currentUser = mockUser;
    return { user: mockUser };
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    // Mock: simulate successful signup
    const mockUser = {
      uid: 'mock-user-id',
      email: email,
      displayName: 'Test User',
      photoURL: null,
    };
    auth.currentUser = mockUser;
    return { user: mockUser };
  },
  signOut: async () => {
    auth.currentUser = null;
  },
};

export const db = {
  collection: (name: string) => ({
    addDoc: async (data: any) => ({ id: 'mock-doc-id' }),
    doc: (id: string) => ({
      updateDoc: async (data: any) => {},
      deleteDoc: async () => {},
    }),
    query: (...args: any[]) => ({
      onSnapshot: (callback: (snapshot: any) => void, errorCallback?: (error: any) => void) => {
        // Mock: return empty data
        callback({
          forEach: (fn: (doc: any) => void) => {
            // No documents in mock
          }
        });
        return () => {}; // unsubscribe function
      }
    }),
  }),
};

export const analytics = null;
