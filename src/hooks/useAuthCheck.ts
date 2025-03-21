import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuthCheck = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check for token in cookies
      const token = Cookies.get('token');
      // Or if you're using localStorage
      const localToken = localStorage.getItem('token');

      if (!token && !localToken) {
        router.push('/login');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  return { isAuthenticated, loading };
};
