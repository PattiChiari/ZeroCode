import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Informativa Privacy",
    description:
        "Informativa sul trattamento dei dati personali per il servizio ZeroCode dedicato alle agenzie immobiliari.",
    alternates: {
        canonical: "/privacy",
    },
};

export default function Privacy() {
    return (
        <main className="h-fit w-screen md:p-4" aria-labelledby="privacy-title">
            <section className="w-full h-full flex justify-center">
                <article className="w-full h-full max-w-4xl flex flex-col gap-10">

                    <div className="bg-white rounded-2xl px-4 py-20 space-y-8 text-gray-700 leading-relaxed">

                        <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-5" aria-label="Torna alla home page">
                            <span className="text-sm font-medium">Torna alla home</span>
                        </Link>

                        <h1 id="privacy-title" className="text-4xl font-medium text-gray-800">Informativa Privacy</h1>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Titolare del Trattamento</h2>
                            <p>
                                Titolare del trattamento dei dati personali è <strong>SADE S.r.l.s.</strong> (brand
                                ZeroCode)<br/>
                                P.IVA: 03231060645<br/>
                                Sede operativa: Via della Romita, 113, 59100 Prato (PO)<br/>
                                Email: <a className="underline" href="mailto:zerocode@insade.it">zerocode@insade.it</a><br/>
                                Telefono: <a className="underline" href="tel:+393500617321">+39 350 061 7321</a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Dati Personali Trattati</h2>
                            <p className="mb-3">Nel modulo di contatto raccogliamo i seguenti dati personali:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Nominativo:</strong> nome e cognome del referente</li>
                                <li><strong>Numero di telefono:</strong> numero di contatto telefonico</li>
                                <li><strong>Data di compilazione:</strong> data e ora dell&apos;invio della richiesta
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Base Giuridica e Finalità del
                                Trattamento</h2>
                            <p className="mb-3">I vostri dati vengono trattati per le seguenti finalità:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Processare la richiesta di consulenza</li>
                                <li>Contattarvi in risposta alla vostra richiesta</li>
                                <li>Fornire informazioni sui nostri servizi</li>
                                <li>Gestire la comunicazione commerciale (con vostro consenso)</li>
                                <li>Adempiere agli obblighi legali e normativi</li>
                            </ul>
                            <p className="mt-4">
                                La base giuridica del trattamento è l&apos;<strong>interesse legittimo</strong> e
                                il <strong>consenso esplicito</strong> fornito al momento della compilazione del modulo
                                di contatto.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Periodo di Conservazione</h2>
                            <p>
                                I vostri dati personali saranno conservati per il tempo necessario a gestire la vostra
                                richiesta
                                e per adempiere agli obblighi legali applicabili, generalmente non oltre 24 mesi dalla
                                data di raccolta,
                                salvo diversi obblighi normativi.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Destinatari dei Dati</h2>
                            <p className="mb-3">I vostri dati saranno accessibili a:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Personale interno di SADE S.r.l.s. autorizzato al trattamento</li>
                                <li>Google LLC (tramite Google Sheets per l&apos;archiviazione dei dati)</li>
                                <li>Autorità competenti, se richiesto per legge</li>
                            </ul>
                            <p className="mt-4 text-sm">
                                <strong>Nota:</strong> I dati sono archiviati su Google Sheets con i più alti standard
                                di sicurezza e protezione.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Trasferimento
                                Internazionale</h2>
                            <p>
                                I dati possono essere trasferiti a Google LLC, società con sede negli Stati Uniti.
                                I trasferimenti avvengono secondo le clausole contrattuali standard (Standard
                                Contractual Clauses)
                                approvate dalla Commissione Europea.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Vostri Diritti</h2>
                            <p className="mb-3">Avete il diritto di:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li><strong>Diritto di accesso:</strong> ottenere informazioni sui dati che trattiamo
                                </li>
                                <li><strong>Diritto di rettifica:</strong> correggere dati inesatti</li>
                                <li><strong>Diritto di cancellazione:</strong> richiedere l&apos;eliminazione dei dati
                                </li>
                                <li><strong>Diritto alla limitazione:</strong> limitare il trattamento dei dati</li>
                                <li><strong>Diritto di opposizione:</strong> opporvi al trattamento</li>
                                <li><strong>Diritto alla portabilità:</strong> ricevere i dati in formato strutturato
                                </li>
                                <li><strong>Diritto di non essere sottoposto a decisioni automatizzate</strong></li>
                            </ul>
                            <p className="mt-4">
                                Per esercitare questi diritti, potete contattarci
                                a <a className="underline" href="mailto:zerocode@insade.it">zerocode@insade.it</a>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Reclamo presso
                                l&apos;Autorità</h2>
                            <p>
                                Se ritenete che il vostro diritto alla protezione dei dati sia stato violato, potete
                                presentare un reclamo
                                presso l&apos;Autorità Garante per la protezione dei dati personali (GPDP):<br/>
                                <strong>Garante per la protezione dei dati personali</strong><br/>
                                Piazza di Monte Citorio, 121 - 00186 Roma<br/>
                                www.garanteprivacy.it
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Obbligo di Fornire i Dati</h2>
                            <p>
                                La fornitura dei dati è <strong>facoltativa</strong>, ma necessaria per processare la
                                vostra richiesta di consulenza.
                                Senza i dati richiesti, non saremo in grado di contattarvi.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookie e Tracking</h2>
                            <p className="mb-4">
                                Il nostro sito <strong>NON utilizza cookie</strong> di alcun tipo, né cookie essenziali,
                                né cookie di tracciamento o analitici. Non eseguiamo profilazione né raccogliamo dati di
                                navigazione dei visitatori.
                            </p>

                            <p className="text-sm text-gray-600 mb-4">
                                <strong>Nessun Cookie Impostato:</strong> Il sito è progettato per funzionare
                                completamente senza l&apos;utilizzo di cookie. Tutte le funzionalità, incluso il modulo
                                di contatto, operano senza salvare dati nel browser dell&apos;utente.
                            </p>

                            <p className="text-sm text-gray-600">
                                <strong>Tracciamento:</strong> Non utilizziamo servizi di analytics, pixel di
                                tracciamento
                                o sistemi di profilazione (come Google Analytics, Facebook Pixel, ecc.). L&apos;unico
                                dato
                                raccolto è quello inserito volontariamente nel modulo di contatto, che viene salvato
                                esclusivamente su Google Sheets per rispondere alla vostra richiesta.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contatti e Richieste</h2>
                            <p>
                                Per qualsiasi domanda riguardante questa informativa o per contattare il nostro
                                Responsabile della Protezione
                                dei Dati (DPO), scrivete a:<br/>
                                <strong>Email:</strong> <a className="underline" href="mailto:zerocode@insade.it">zerocode@insade.it</a><br/>
                                <strong>Telefono:</strong> <a className="underline" href="tel:+393500617321">+39 350 061 7321</a>
                            </p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                                <strong>Ultimo aggiornamento:</strong> 18 Marzo 2026<br/>
                                Questa informativa può essere aggiornata in qualsiasi momento senza preavviso.
                            </p>
                        </div>
                    </div>
                </article>
            </section>

            <footer className="w-full h-full rounded-4xl flex justify-center" aria-label="Informazioni aziendali">
                <div className="w-full h-full max-w-7xl flex flex-wrap gap-2 text-xs p-4 items-center">
                    <span className="font-medium">
                        ZeroCode è un brand di SADE S.r.l.s.
                    </span>
                    <span className="opacity-80">
                        P.IVA: 03231060645
                    </span>
                    <address className="not-italic opacity-80">
                        Sede operativa: Via della Romita, 113, 59100 Prato (PO)
                    </address>
                    <a className="opacity-80 underline" href="tel:+393500617321">
                        Cel: +39 350 061 7321
                    </a>
                    <a className="opacity-80 underline" href="mailto:zerocode@insade.it">
                        Email: zerocode@insade.it
                    </a>
                </div>
            </footer>
        </main>
    );
}
