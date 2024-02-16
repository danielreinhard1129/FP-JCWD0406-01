import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import StoreProvider from './StoreProvider';
import { Toaster } from 'sonner';
import { GlobalProvider } from './GlobalProvider';
import { Header } from '@/components/Header';

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
        <GlobalProvider>
          <StoreProvider>
            <Header />
            {children}
            <Toaster
              duration={1000}
              expand={false}
              richColors
              position="top-right"
            />
          </StoreProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
