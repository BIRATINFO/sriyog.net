import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from '@vercel/analytics/next';
import { ClerkProvider } from "@clerk/nextjs";


const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SRIYOG | Digital Archive of Information",
  description: "Digital Archive of Information",
  metadataBase: new URL('https://www.sriyog.net'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <Script
            src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
            strategy="afterInteractive"
          />
          <Script id="onesignal-init" strategy="afterInteractive">
            {`
            window.OneSignalDeferred = window.OneSignalDeferred || [];
            OneSignalDeferred.push(async function(OneSignal) {
              await OneSignal.init({
                appId: "2e27e2ea-e039-4502-9f16-0439a9b250bb",
                notifyButton: {
                  enable: true
                }
              });
            });
          `}
          </Script> */}

        </head>
        <body
          className={` ${roboto.variable} ${inter.variable} antialiased`}
        >
          <>
            {children}
            <Analytics />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </>
        </body>
      </html>
    </ClerkProvider>
  );
}
