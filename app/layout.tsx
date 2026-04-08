import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "./globals.css";
import CookieConsent from "./components/CookieConsent";

const poppins = Poppins({
    variable: "--font-poppins-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: {
        default: "ZeroCode | Servizi luce, gas, acqua e telecomunicazioni per agenzie immobiliari",
        template: "%s | ZeroCode",
    },
    description:
        "ZeroCode supporta le agenzie immobiliari nella gestione di volture, subentri e allacci di luce, gas, acqua e telecomunicazioni.",
    keywords: [
        "agenzie immobiliari",
        "volture",
        "subentri",
        "allacci",
        "luce gas acqua",
        "telecomunicazioni",
    ],
    applicationName: "ZeroCode",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: "website",
        locale: "it_IT",
        title: "ZeroCode | Servizi per agenzie immobiliari",
        description:
            "Gestione smart di volture, subentri e allacci per offrire più valore ai clienti della tua agenzia.",
        siteName: "ZeroCode",
    },
    twitter: {
        card: "summary_large_image",
        title: "ZeroCode | Servizi per agenzie immobiliari",
        description:
            "Riduci burocrazia e tempi operativi con un servizio strutturato di gestione utenze.",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it">
        <body
            className={`${poppins.variable} antialiased`}
        >
        {children}
        <CookieConsent />
        </body>
        </html>
    );
}
