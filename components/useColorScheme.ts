import { useColorScheme as useRNColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/state/store';

export function useColorScheme() {
  const system = useRNColorScheme();
  const preferred = useSelector((s: RootState) => s.preferences.theme);
  if (preferred === 'system') return system;
  return preferred;
}
