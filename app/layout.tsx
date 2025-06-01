import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'DoorDash Food Delivery & Takeout',
  description: 'Get food delivery, grocery delivery, and more from your favorite restaurants with DoorDash.',
  icons: {
    icon: [
      {
        url: 'https://consumer-web-marketing-assets.s3.us-east-2.amazonaws.com/images/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: 'https://consumer-web-marketing-assets.s3.us-east-2.amazonaws.com/images/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: 'https://consumer-web-marketing-assets.s3.us-east-2.amazonaws.com/images/favicons/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-poppins">
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}