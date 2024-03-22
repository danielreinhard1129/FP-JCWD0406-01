'use client';
import { useAppSelector } from '@/libs/hooks';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function isAuthAdmin(Component: any) {
  return function IsAuth(props: any) {
    const admin = useAppSelector((state) => state.admin);
    const auth = admin.email;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
      if (!auth && !loading) {
        redirect('/admin/login');
      }
    }, [auth, loading]);

    return <Component {...props} />;
  };
}
