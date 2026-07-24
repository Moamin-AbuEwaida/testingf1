import { useState, useEffect } from 'react';

const BASE_URL = 'https://api.openf1.org/v1';

export function useOpenF1<T>(endpoint: string, params?: Record<string, any>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const url = new URL(`${BASE_URL}${endpoint}`);
        if (params) {
          Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
              url.searchParams.append(key, String(params[key]));
            }
          });
        }
        
        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}
