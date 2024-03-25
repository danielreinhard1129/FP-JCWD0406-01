'use client';
import { useAppSelector } from '@/libs/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function isAuthUser(Component: any) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.user);
    const auth = user.email;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
      if (!auth && !loading) {
        redirect('/login');
      }
    }, [auth, loading]);

    return <Component {...props} />;
  };
}
