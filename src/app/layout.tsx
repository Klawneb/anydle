import "~/styles/globals.css";

import {GeistSans} from "geist/font/sans";
import {type Metadata} from "next";

export const metadata: Metadata = {
    title: "Anydle",
    description: "Because you only listen to the coolest underground indie shit, right?",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable} dark text-foreground bg-content1`}>
        <body>{children}</body>
        </html>
    );
}
