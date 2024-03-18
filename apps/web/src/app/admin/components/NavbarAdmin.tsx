'use client';

import { axiosInstance } from '@/libs/axios';
import {
  loginActionAdmin,
  logoutActionAdmin,
} from '@/libs/features/adminSlice';
import { useAppDispatch, useAppSelector } from '@/libs/hooks';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { FaBars } from 'react-icons/fa';
import { INavbarAdminProps } from '@/types/props.type';
import { IAdmin, IAdminState } from '@/types/admin.type';

const NavbarAdmin = ({ isOpen, onClose }: INavbarAdminProps) => {
  const router = useRouter();
  const admin: IAdminState = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token_auth_admin');
      dispatch(logoutActionAdmin());
      router.push('/admin/login');
      toast.success('Logout success');
    } catch (error) {
      console.log(error);
    }
  };

  const keepLogin = async () => {
    const token: string = localStorage.getItem('token_auth_admin') as string;
    try {
      if (!token) return;

      const data = await axiosInstance.get('/admins/keeplogin', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response: IAdmin = data?.data.data;
      response.id;
      dispatch(loginActionAdmin(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token: string = localStorage.getItem('token_auth_admin') as string;
    if (token) {
      keepLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  return (
    <Navbar fluid rounded>
      <Navbar.Brand className={`${isOpen ? 'hidden min-w-md:block' : ''}`}>
        <span className="self-center whitespace-nowrap text-3xl font-bold dark:text-white">
          Admin
        </span>
      </Navbar.Brand>
      <div
        className={`flex md:order-2 gap-2 lg:gap-5 ${
          isOpen
            ? 'absolute right-2 top-3 md:absolute md:right-7 md:top-3 lg:right-14'
            : ''
        }`}
      >
        <Dropdown
          arrowIcon={false}
          inline
          label={
            !admin.image ? (
              <Avatar rounded />
            ) : (
              // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
              <img
                src={!admin.image ? '' : admin.image}
                className="h-10 w-10 rounded-full object-cover"
              />
            )
          }
        >
          <Dropdown.Header>
            <span className="block truncate text-sm font-medium">
              {admin?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          {!admin.email ? (
            <Link href="/admin/login">
              <Dropdown.Item>Log in</Dropdown.Item>
            </Link>
          ) : (
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          )}
        </Dropdown>
        <button onClick={onClose} className="flex items-center">
          <FaBars className="w-5 h-5" />
        </button>
      </div>
    </Navbar>
  );
};

export default NavbarAdmin;
