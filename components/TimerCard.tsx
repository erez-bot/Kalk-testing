'use client';

import { Play, Pause, RotateCcw, Plus, X, Bell } from 'lucide-react';
import { Timer } from '@/types';
import { formatTime, getTimerStatus } from '@/lib/utils';
import TimerRing from './TimerRing';

interface TimerCardProps {
  timer: Timer;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddMinute: () => void;
  onRemove: () => void;
}

export default function TimerCard({
  timer,
  onStart,
  onPause,
  onReset,
  onAddMinute,
  onRemove
}: TimerCardProps) {
  const status = getTimerStatus(timer.remainingSeconds, timer.totalSeconds);
  const isComplete = timer.remainingSeconds === 0;

  const getStatusStyles = () => {
    switch (status) {
      case 'green':
        return 'bg-emerald-50 border-emerald-200';
      case 'yellow':
        return 'bg-amber-50 border-amber-200';
      case 'red':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${getStatusStyles()}`}>
      {/* Remove button */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/50 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Label */}
      <div className="flex items-center gap-2 mb-4">
        {isComplete && (
          <Bell className="w-5 h-5 text-red-500 animate-bounce" />
        )}
        <h3 className="font-bold text-lg text-gray-800 truncate pr-8">
          {timer.label}
        </h3>
      </div>

      {/* Timer Display */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <TimerRing 
            remaining={timer.remainingSeconds} 
            total={timer.totalSeconds}
            size={140}
            strokeWidth={10}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-mono font-bold ${
              status === 'green' ? 'text-emerald-600' :
              status === 'yellow' ? 'text-amber-600' :
              'text-red-600'
            }`}>
              {formatTime(timer.remainingSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2">
        {!timer.isRunning && timer.remainingSeconds > 0 && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
          >
            <Play className="w-5 h-5" />
            Start
          </button>
        )}
        
        {timer.isRunning && (
          <button
            onClick={onPause}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 transition-colors shadow-md hover:shadow-lg"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}
        
        {!timer.isRunning && timer.remainingSeconds < timer.totalSeconds && timer.remainingSeconds > 0 && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-medium hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
        )}

        <button
          onClick={onReset}
          className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        <button
          onClick={onAddMinute}
          className="p-2.5 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Add 1 minute"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
