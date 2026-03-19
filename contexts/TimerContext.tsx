'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from 'react';
import { Timer, TimerContextType } from '@/types';
import { generateId, playAlertSound } from '@/lib/utils';

const TIMERS_STORAGE_KEY = 'cooking-companion-timers';

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load timers from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(TIMERS_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Adjust for paused timers - calculate remaining time based on when they were paused
        const adjustedTimers = parsed.map((t: Timer) => {
          if (t.isRunning) {
            // This shouldn't happen but reset if it does
            return { ...t, isRunning: false };
          }
          return t;
        });
        setTimers(adjustedTimers);
      } catch {
        setTimers([]);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever timers change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
    }
  }, [timers, isLoaded]);

  // Timer tick effect
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimers(prev => prev.map(timer => {
        if (timer.isRunning && timer.remainingSeconds > 0) {
          const newRemaining = timer.remainingSeconds - 1;
          if (newRemaining === 0) {
            // Timer finished - play alert
            playAlertSound();
            // Show notification
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Timer Complete!', {
                body: `${timer.label} timer is done! 🔔`,
                icon: '/timer-icon.png'
              });
            }
          }
          return { ...timer, remainingSeconds: Math.max(0, newRemaining) };
        }
        return timer;
      }));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }, []);

  const addTimer = useCallback((label: string, seconds: number) => {
    requestNotificationPermission();
    const newTimer: Timer = {
      id: generateId(),
      label,
      totalSeconds: seconds,
      remainingSeconds: seconds,
      isRunning: false,
      createdAt: Date.now()
    };
    setTimers(prev => [...prev, newTimer]);
  }, [requestNotificationPermission]);

  const removeTimer = useCallback((id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  }, []);

  const startTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, isRunning: true } : t
    ));
  }, []);

  const pauseTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, isRunning: false } : t
    ));
  }, []);

  const resetTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, remainingSeconds: t.totalSeconds, isRunning: false } : t
    ));
  }, []);

  const addOneMinute = useCallback((id: string) => {
    setTimers(prev => prev.map(t => 
      t.id === id ? { ...t, remainingSeconds: t.remainingSeconds + 60 } : t
    ));
  }, []);

  // Sort timers: running timers first, then by remaining time
  const sortedTimers = [...timers].sort((a, b) => {
    if (a.isRunning && !b.isRunning) return -1;
    if (!a.isRunning && b.isRunning) return 1;
    return a.remainingSeconds - b.remainingSeconds;
  });

  return (
    <TimerContext.Provider value={{
      timers: sortedTimers,
      addTimer,
      removeTimer,
      startTimer,
      pauseTimer,
      resetTimer,
      addOneMinute
    }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimers() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimers must be used within a TimerProvider');
  }
  return context;
}
