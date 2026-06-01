import "./globals.css";

import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { AIChat } from "@/components/widget/widget-toggle";
import { GoogleOAuthProvider } from "@/providers/google-oauth-provider";
import { GoogleOneTap } from "@/components/auth/google-one-tap";
import { LayoutWrapper } from "./layout-wrapper";
import { GoogleButtonsRefProvider } from "@/providers/google-buttons-ref-provider";

export const metadata: Metadata = {
  title: "Neylon AI",
  description:
    "Neylon-AI is a full-service AI agency specializing in the development of custom AI solutions, intelligent agents, and automation systems for both enterprises and individual consumers.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body cz-shortcut-listen="false">
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <GoogleButtonsRefProvider>
            <NuqsAdapter>
              <LayoutWrapper>
                <Suspense fallback={null}>
                  <GoogleOneTap />
                  <Navbar />
                  {children}
                  <AIChat />
                </Suspense>
              </LayoutWrapper>
            </NuqsAdapter>
          </GoogleButtonsRefProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
