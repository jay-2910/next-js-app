import type { Metadata } from "next";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Rubik } from 'next/font/google'
import "@/app/custom.css";
 
const rubik = Rubik({ 
    display: 'swap',
    variable: '--font-rubik',
    subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Dhammabhoomi",
  description: "Shrestha Jivan Ke Liye Ek Andolan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.0/css/all.min.css" />
      </head>
      <body className={rubik.className}>{children}</body>
    </html>
  );
}
