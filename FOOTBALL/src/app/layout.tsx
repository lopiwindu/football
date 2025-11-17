import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ResponseLogger } from "@/components/response-logger";
import { cookies } from "next/headers";
import { ReadyNotifier } from "@/components/ready-notifier";
import FarcasterWrapper from "@/components/FarcasterWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestId = cookies().get("x-request-id")?.value;

  return (
        <html lang="en">
          <head>
            {requestId && <meta name="x-request-id" content={requestId} />}
          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {/* Do not remove this component, we use it to notify the parent that the mini-app is ready */}
            <ReadyNotifier />
            
      <FarcasterWrapper>
        {children}
      </FarcasterWrapper>
      
            <ResponseLogger />
          </body>
        </html>
      );
}

export const metadata: Metadata = {
        title: "Football Market Predictor",
        description: "Create dynamic football prediction markets using Masang Protocol. Select teams, match dates, and core questions. Features include a dashboard and profile settings for personalized insights.",
        other: { "fc:frame": JSON.stringify({"version":"next","imageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/thumbnail_ad4355fd-66f0-4aab-b281-40799fa484e3-BYDNjmc6bsGdECAr2sFtLITFFlBR56","button":{"title":"Open with Ohara","action":{"type":"launch_frame","name":"Football Market Predictor","url":"https://food-lamp-851.app.ohara.ai","splashImageUrl":"https://usdozf7pplhxfvrl.public.blob.vercel-storage.com/farcaster/splash_images/splash_image1.svg","splashBackgroundColor":"#ffffff"}}}
        ) }
    };
