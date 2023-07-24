import './globals.css';
import { Figtree } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import Analytics from '@/components/Analytics';
import { Toaster } from 'react-hot-toast';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'SlideSpeak | AI powered presentation insights',
  description:
    'Upload your PowerPoint file and get a AI powered insights about your presentation.',
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <body className={font.className}>
      <Toaster />
      <Suspense>
        <Analytics />
      </Suspense>
      {children}
    </body>
  </html>
);

export default RootLayout;
