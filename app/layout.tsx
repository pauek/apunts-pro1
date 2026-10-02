import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "./github-dark.css"

const interSans = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Apunts de PRO1",
    description: "Col·lecció d'apunts del temari de l'assignatura PRO1, del GEI a la FIB (UPC).",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${interSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="flex flex-col mx-auto max-w-[44em] min-h-screen">
                {children}
                <div className="flex-1" />
                <footer className="h-24 text-xs flex flex-col justify-end items-center pb-4 text-foreground/40">
                    <span>&copy; Pau Fernández, {new Date().getFullYear()}</span>
                </footer>
            </body>
        </html>
    );
}
