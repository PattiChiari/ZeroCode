import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import ConsultationForm from "./components/ConsultationForm";

export const metadata: Metadata = {
    title: "Servizi utenze per agenzie immobiliari",
    description:
        "ZeroCode aiuta le agenzie immobiliari a gestire volture, subentri e allacci di luce, gas, acqua e telecomunicazioni.",
    alternates: {
        canonical: "/",
    },
};

const benefits = [
    "Meno tempo perso in pratiche e burocrazia",
    "Da remoto e con un interlocutore",
    "Più valore percepito dal cliente",
    "Garanzie sulle pratiche gestite",
    "Supporto costante pre e post attivazione",
];

export default function Home() {
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "ZeroCode",
        email: "zerocode@insade.it",
        telephone: "+39 350 061 7321",
        vatID: "03231060645",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Via della Romita, 113",
            addressLocality: "Prato",
            postalCode: "59100",
            addressRegion: "PO",
            addressCountry: "IT",
        },
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+39 350 061 7321",
            email: "zerocode@insade.it",
            contactType: "customer service",
            areaServed: "IT",
            availableLanguage: "Italian",
        },
    };

    return (
        <>
            <main className="h-fit w-screen md:p-4">
                <section
                    className="w-full h-full rounded-4xl flex justify-center"
                    style={{background: "linear-gradient(143deg,rgba(223, 232, 255, 1) 0%, rgba(247, 242, 251, 1) 50%, rgba(226, 217, 234, 1) 100%)"}}
                    aria-labelledby="hero-title"
                >
                    <div className="w-full h-full max-w-7xl px-4 flex flex-col items-center py-25 gap-25">
                        <Image src="/zerocode.svg" alt="ZeroCode" width={250} height={250} priority/>

                        <div className="flex flex-col md:flex-row gap-25">
                            <header className="w-full md:w-3/5 flex flex-col gap-10 p-2">
                                <h1 id="hero-title" className="text-2xl md:text-4xl font-medium tracking-tighter text-gray-800">
                                    Risparmia tempo e previeni ogni imprevisto
                                </h1>

                                <p className="text-base md:text-lg text-gray-600">
                                    Gestiamo tutte le operazioni quali volture, subentri e allacci di luce, gas, acqua e
                                    telecomunicazioni senza fare file agli sportelli.
                                </p>

                                <section aria-labelledby="benefits-title" className="flex flex-col gap-2">
                                    <h2 id="benefits-title" className="text-xs text-gray-600 ml-4">
                                        Perché affidarsi a ZeroCode?
                                    </h2>

                                    <ul className="flex flex-col gap-2" role="list">
                                        {benefits.map((benefit) => (
                                            <li key={benefit} className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                                <Image src="/checkmark-circle.svg" alt="" aria-hidden="true" width={20} height={20}/>
                                                <span className="text-sm text-gray-600">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </header>

                            <ConsultationForm/>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="w-full h-full rounded-4xl flex justify-center" aria-label="Informazioni aziendali">
                <div className="w-full h-full max-w-7xl flex flex-wrap gap-2 text-xs p-4 items-center">
                    <span className="font-medium">ZeroCode è un brand di SADE S.r.l.s.</span>
                    <span className="opacity-80">P.IVA: 03231060645</span>
                    <address className="not-italic opacity-80">Sede operativa: Via della Romita, 113, 59100 Prato (PO)</address>
                    <a className="opacity-80 underline" href="tel:+393500617321">Cel: +39 350 061 7321</a>
                    <a className="opacity-80 underline" href="mailto:zerocode@insade.it">Email: zerocode@insade.it</a>
                    <Link href="/privacy" className="opacity-80 underline">Informativa Privacy</Link>
                </div>
            </footer>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(organizationJsonLd)}}
            />
        </>
    );
}
