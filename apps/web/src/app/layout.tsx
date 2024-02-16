import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import NavbarComp from '@/components/NavbarComp';
import FooterComp from '@/components/FooterComp';
import MobileNavBar from '@/components/MobileNavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Grocery Web App',
  description: 'Create Online Grocery Web App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NavbarComp />
          {children}
          <FooterComp />
          <MobileNavBar />
        </StoreProvider>
      </body>
    </html>
  );
}
