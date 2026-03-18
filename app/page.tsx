"use client";

import Image from "next/image";
import Link from "next/link";
import ConsultationForm from "./components/ConsultationForm";

export default function Home() {
    return (
        <section className="h-fit w-screen p-4">
            <div className="w-full h-full rounded-4xl flex justify-center"
                 style={{background: 'linear-gradient(143deg,rgba(223, 232, 255, 1) 0%, rgba(247, 242, 251, 1) 50%, rgba(226, 217, 234, 1) 100%)'}}>

                <div className="w-full h-full max-w-7xl px-4 flex flex-col py-25 gap-25">
                    <Image src={'./zerocode.svg'} alt={'Logo'} width={150} height={150}/>

                    <div className="flex flex-col md:flex-row gap-25">
                        <div className="w-full md:w-3/5 flex flex-col gap-10">
                            <h1 className="text-4xl font-medium tracking-tighter text-gray-800">
                                Anticipa ogni imprevisto e tutela ogni tuo cliente, rafforzando il prestigio della tua
                                agenzia immobiliare
                            </h1>

                            <p className="text-lg text-gray-600">
                                Gestiamo tutte le operazioni quali volture, subentri e allacci di luce, gas, acqua e
                                telecomunicazioni senza fare file agli sportelli. Offri ai tuoi clienti un servizio
                                smart e
                                strutturato che rafforza la relazione e genera nuove opportunità.
                            </p>

                            <div className="flex flex-col gap-2">
                            <span className="text-xs text-gray-600 ml-4">
                                Perché scegliere ZeroCode?
                            </span>

                                <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                    <Image src={'./checkmark-circle.svg'} alt={'Checkmark'} width={20} height={20}/>
                                    <span className="text-sm text-gray-600">
                                    Meno tempo perso in pratiche e burocrazia
                                </span>
                                </div>

                                <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                    <Image src={'./checkmark-circle.svg'} alt={'Checkmark'} width={20} height={20}/>
                                    <span className="text-sm text-gray-600">
                                    Da remoto e con un interlocutore
                                </span>
                                </div>

                                <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                    <Image src={'./checkmark-circle.svg'} alt={'Checkmark'} width={20} height={20}/>
                                    <span className="text-sm text-gray-600">
                                    Più valore percepito dal cliente
                                </span>
                                </div>

                                <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                    <Image src={'./checkmark-circle.svg'} alt={'Checkmark'} width={20} height={20}/>
                                    <span className="text-sm text-gray-600">
                                    Più passaparola e nuove opportunità
                                </span>
                                </div>

                                <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit">
                                    <Image src={'./checkmark-circle.svg'} alt={'Checkmark'} width={20} height={20}/>
                                    <span className="text-sm text-gray-600">
                                    Più fatturato per la tua agenzia
                                </span>
                                </div>
                            </div>
                        </div>

                        <ConsultationForm/>
                    </div>
                </div>
            </div>

            {/*Footer*/}
            <div className="w-full h-full rounded-4xl flex justify-center">
                <div className="w-full h-full max-w-7xl flex flex-wrap gap-2 text-xs p-4">
                <span className="font-medium">
                    ZeroCode è un brand di SADE S.r.l.s.
                </span>

                    <span className="opacity-80">
                    P.IVA: 03231060645
                </span>

                    <span className="opacity-80">
                    Sede legale: Corso V. Emanuele, 262, 83031 Ariano Irpino (AV)
                </span>

                    <span className="opacity-80">
                    Cel: +39 370 308 1414
                </span>

                    <span className="opacity-80">
                    Email: pattichiari@insade.it
                </span>
                </div>
            </div>
        </section>
    );
}
