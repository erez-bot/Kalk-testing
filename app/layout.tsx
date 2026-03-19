import type { Metadata } from "next";
import { Quicksand, Nunito } from "next/font/google";
import "./globals.css";
import { RecipeProvider } from "@/contexts/RecipeContext";
import { TimerProvider } from "@/contexts/TimerContext";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "CookMate - Your Kitchen Companion",
  description: "Recipe scaler and multi-timer kitchen assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${nunito.variable} font-sans`}
      >
        <RecipeProvider>
          <TimerProvider>
            {children}
          </TimerProvider>
        </RecipeProvider>
      </body>
    </html>
  );
}
