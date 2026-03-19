'use client';

import { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface AddTimerModalProps {
  onClose: () => void;
  onAdd: (label: string, seconds: number) => void;
}

export default function AddTimerModal({ onClose, onAdd }: AddTimerModalProps) {
  const [label, setLabel] = useState('');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);

  const presetTimes = [
    { label: '5 min', seconds: 5 * 60 },
    { label: '10 min', seconds: 10 * 60 },
    { label: '15 min', seconds: 15 * 60 },
    { label: '30 min', seconds: 30 * 60 },
    { label: '60 min', seconds: 60 * 60 },
  ];

  const handlePresetClick = (presetSeconds: number) => {
    const h = Math.floor(presetSeconds / 3600);
    const m = Math.floor((presetSeconds % 3600) / 60);
    const s = presetSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      onAdd(label || 'Timer', totalSeconds);
      onClose();
    }
  };

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">Add New Timer</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Label Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timer Label (optional)
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Pasta, Boiled Eggs..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
            />
          </div>
          
          {/* Preset Buttons */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quick Presets
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presetTimes.map((preset) => (
                <button
                  key={preset.seconds}
                  type="button"
                  onClick={() => handlePresetClick(preset.seconds)}
                  className={`py-2.5 px-1 rounded-xl text-sm font-medium transition-all ${
                    totalSeconds === preset.seconds
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Custom Time Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Time
            </label>
            <div className="flex items-center gap-3">
              {/* Hours */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center font-mono text-lg"
                />
              </div>
              <span className="text-2xl text-gray-400 font-bold">:</span>
              {/* Minutes */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center font-mono text-lg"
                />
              </div>
              <span className="text-2xl text-gray-400 font-bold">:</span>
              {/* Seconds */}
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={seconds}
                  onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-center font-mono text-lg"
                />
              </div>
            </div>
          </div>
          
          {/* Total Time Display */}
          {totalSeconds > 0 && (
            <div className="mb-6 p-4 bg-orange-50 rounded-xl text-center">
              <span className="text-gray-600">Total: </span>
              <span className="text-xl font-bold text-orange-600">
                {Math.floor(totalSeconds / 3600) > 0 && `${Math.floor(totalSeconds / 3600)}h `}
                {Math.floor((totalSeconds % 3600) / 60) > 0 && `${Math.floor((totalSeconds % 3600) / 60)}m `}
                {totalSeconds % 60}s
              </span>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={totalSeconds === 0}
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-amber-600 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            Create Timer
          </button>
        </form>
      </div>
    </div>
  );
}
