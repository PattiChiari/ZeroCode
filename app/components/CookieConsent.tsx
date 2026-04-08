'use client';

import {useEffect, useState} from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Controlla se l'utente ha già dato il consenso
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            setHasConsent(true);
        } else {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setHasConsent(true);
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookieConsent', 'rejected');
        setShowBanner(false);
    };

    if (!mounted) return null;

    return (
        <>
            {/* Google Analytics - caricato solo se consenso accettato */}
            {hasConsent && (
                <>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-L27T39TLLB"
                        strategy="afterInteractive"
                    />
                    <Script
                        id="google-analytics"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                              window.dataLayer = window.dataLayer || [];
                              function gtag(){dataLayer.push(arguments);}
                              gtag('js', new Date());
                              gtag('config', 'G-L27T39TLLB');
                            `,
                        }}
                    />
                </>
            )}

            {/* Banner Cookie Consent */}
            {showBanner && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] text-white p-4 shadow-lg z-50"
                    role="dialog"
                    aria-labelledby="cookie-title"
                    aria-describedby="cookie-description"
                >
                    <div
                        className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                            <h2 id="cookie-title" className="font-semibold mb-2">
                                Impostazioni Cookie
                            </h2>
                            <p id="cookie-description" className="text-sm text-gray-300">
                                Utilizziamo cookie per migliorare la tua esperienza di navigazione. Puoi accettare o
                                gestire le tue preferenze in qualsiasi momento.{' '}
                                <Link href="/privacy" className="underline hover:text-gray-100">
                                    Per saperne di più, consulta la nostra
                                    privacy policy.
                                </Link>
                            </p>
                        </div>
                        <div className="flex gap-3 shrink-0">
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-500 hover:bg-gray-800 transition-colors"
                                aria-label="Rifiuta i cookie analitici"
                            >
                                Rifiuta
                            </button>
                            <button
                                onClick={handleAccept}
                                className="px-4 py-2 text-sm font-medium bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                aria-label="Accetta i cookie analitici"
                            >
                                Accetta
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

