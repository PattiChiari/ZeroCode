"use client";

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

export default function ConsultationForm() {
    const [formData, setFormData] = useState({
        ragione_sociale: "",
        numero_telefono: "",
    });
    const [errors, setErrors] = useState({
        ragione_sociale: "",
        numero_telefono: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const validatePhone = (phone: string) => {
        return /^[\d\s+()\-]+$/.test(phone) && phone.replace(/\D/g, "").length >= 10;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (!(name in formData)) return;

        const key = name as keyof typeof formData;
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));

        let error = "";
        if (key === "ragione_sociale" && value.trim() === "") {
            error = "La ragione sociale è obbligatoria";
        } else if (key === "numero_telefono" && value.trim() !== "" && !validatePhone(value)) {
            error = "Numero di telefono non valido";
        }

        setErrors((prev) => ({
            ...prev,
            [key]: error,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {ragione_sociale: "", numero_telefono: ""};

        if (!formData.ragione_sociale.trim()) {
            newErrors.ragione_sociale = "La ragione sociale è obbligatoria";
        }

        if (!formData.numero_telefono.trim()) {
            newErrors.numero_telefono = "Il numero di telefono è obbligatorio";
        } else if (!validatePhone(formData.numero_telefono)) {
            newErrors.numero_telefono = "Numero di telefono non valido (minimo 10 cifre)";
        }

        setErrors(newErrors);
        setSubmitMessage(null);

        if (newErrors.ragione_sociale || newErrors.numero_telefono) {
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/contatti", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ragione_sociale: formData.ragione_sociale,
                    numero_telefono: formData.numero_telefono,
                    data: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                const message = result?.message || "Errore durante il salvataggio";
                setSubmitMessage({type: "error", text: message});
                return;
            }

            setSubmitMessage({
                type: "success",
                text: result?.message || "Contatto salvato con successo!",
            });
            setFormData({ragione_sociale: "", numero_telefono: ""});
            setErrors({ragione_sociale: "", numero_telefono: ""});
        } catch (error) {
            const message = error instanceof Error ? error.message : "Errore durante il salvataggio";
            setSubmitMessage({type: "error", text: message});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full md:w-2/5">
            <div
                className="bg-white w-full h-full rounded-4xl px-10 py-20 flex flex-col justify-between gap-10"
                style={{boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'}}>

                {/* Header */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 bg-blue-50 w-fit px-3 py-1 rounded-full">
                        <Image src={'./trending-up.svg'} alt={'Trending Up'} width={20} height={20}/>
                        <span className="text-sm text-blue-600">Aumenta il valore della tua agenzia</span>
                    </div>

                    <div className="w-full">
                        <h2 className="text-2xl font-medium text-gray-800 text-center mb-2">Richiedi una
                            consulenza</h2>

                        <p className="text-gray-600 text-sm leading-relaxed text-center">
                            Ti ricontatteremo entro 24 ore. Niente comunicazioni inutili, niente spam.
                            Dedicato
                            esclusivamente ad agenzie immobiliari.
                        </p>
                    </div>

                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium ml-4 text-gray-900">
                            Ragione sociale*
                        </label>
                        <input
                            type="text"
                            name="ragione_sociale"
                            value={formData.ragione_sociale}
                            onChange={handleChange}
                            placeholder="Agenzia Rossi S.r.l."
                            className={`px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 ${
                                errors.ragione_sociale ? "border-red-500" : "border-gray-200"
                            }`}
                        />
                        {errors.ragione_sociale && <span className="ml-4 text-xs text-red-500">{errors.ragione_sociale}</span>}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium ml-4 text-gray-900">
                            Numero di telefono*
                        </label>
                        <input
                            type="tel"
                            name="numero_telefono"
                            value={formData.numero_telefono}
                            onChange={handleChange}
                            placeholder="+39 123 456 7890"
                            className={`px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 ${
                                errors.numero_telefono ? "border-red-500" : "border-gray-200"
                            }`}
                        />
                        {errors.numero_telefono && <span className="ml-4 text-xs text-red-500">{errors.numero_telefono}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-full w-full transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        {isSubmitting ? "Invio in corso..." : "Richiedi la consulenza gratuita"}
                        <Image src={'./arrow-forward.svg'} alt={'Arrow Forward'} width={20} height={20}/>
                    </button>

                    {submitMessage && (
                        <p className={`text-xs text-center ${submitMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                            {submitMessage.text}
                        </p>
                    )}
                </form>

                {/* Footer */}
                <div className="flex flex-col gap-2 text-center">
                    <p className="text-xs text-blue-600">
                        Oltre 500 agenzie hanno già scelto ZeroCode
                    </p>
                    <p className="text-xs text-gray-600">
                        Compilando il form acconsenti al <Link className="underline" href={'/privacy'}>trattamento dei tuoi dati personali</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
