import type { Metadata } from "next";
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { AchievementProvider } from '@/context/AchievementContext';
import "./globals.css";

export const metadata: Metadata = {
  title: "Gruuv - Track Your Progress",
  description: "A modern app to track your daily achievements and progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <AchievementProvider>
              {children}
            </AchievementProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
