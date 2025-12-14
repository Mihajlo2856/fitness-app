import { useState, useEffect } from 'react';
// import { programService, ActiveProgramData } from '../services/program.service';
import { programService, ActiveProgramData } from '@/services/programService';

export function useActiveProgram() {
  const [data, setData] = useState<ActiveProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await programService.getActiveProgramData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch program');
      console.error('Error in useActiveProgram:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    program: data?.program,
    currentWorkout: data?.currentWorkout,
    exercises: data?.exercises || [],
    loading,
    error,
    refetch: fetchData,
  };
}