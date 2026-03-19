import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatFraction(value: number): string {
  if (value === 0) return '0';
  
  const wholePart = Math.floor(value);
  const decimalPart = value - wholePart;
  
  // Common fractions mapping
  const fractions: [number, string][] = [
    [0.125, '⅛'],
    [0.25, '¼'],
    [0.333, '⅓'],
    [0.375, '⅜'],
    [0.5, '½'],
    [0.625, '⅝'],
    [0.666, '⅔'],
    [0.75, '¾'],
    [0.875, '⅞']
  ];
  
  // Find closest fraction
  let closestFraction = '';
  let closestDiff = 1;
  
  for (const [decimal, fraction] of fractions) {
    const diff = Math.abs(decimalPart - decimal);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestFraction = fraction;
    }
  }
  
  // Only use fraction if it's close enough
  if (closestDiff < 0.06 && closestFraction) {
    if (wholePart === 0) {
      return closestFraction;
    }
    return `${wholePart} ${closestFraction}`;
  }
  
  // Otherwise format as decimal or integer
  if (Number.isInteger(value)) {
    return value.toString();
  }
  
  if (wholePart === 0) {
    return value.toFixed(2).replace(/\.?0+$/, '');
  }
  
  return `${wholePart} ${(value - wholePart).toFixed(2).replace(/\.?0+$/, '')}`;
}

export function scaleIngredient(
  amount: number,
  baseServings: number,
  targetServings: number
): number {
  return (amount / baseServings) * targetServings;
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeInput(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getTimerStatus(remaining: number, total: number): 'green' | 'yellow' | 'red' {
  const percentage = (remaining / total) * 100;
  
  if (percentage > 50) return 'green';
  if (percentage > 20) return 'yellow';
  return 'red';
}

export function playAlertSound(): void {
  // Create a simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
    
    // Play a second beep
    setTimeout(() => {
      const osc2 = audioContext.createOscillator();
      const gain2 = audioContext.createGain();
      
      osc2.connect(gain2);
      gain2.connect(audioContext.destination);
      
      osc2.frequency.value = 1000;
      osc2.type = 'sine';
      
      gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 0.5);
    }, 200);
  } catch {
    // Fallback: just don't play sound if Web Audio API is not available
    console.log('Audio not available');
  }
}
