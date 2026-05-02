"use client";

import Image from "next/image";
import {useState} from "react";
import Link from "next/link";

const TIPO_OPERAZIONE_OPTIONS = ["Cambio", "Voltura/Subentro", "Allaccio"];
const TIPO_LINEA_OPTIONS = ["Rete fissa", "Mobile"];

export default function ConsultationForm() {
    const [formData, setFormData] = useState({
        intermediario: "",
        nome: "",
        cognome: "",
        telefono: "",
        email: "",
        servizi_utility: false,
        tipo_operazione: "",
        servizi_telco: false,
        tipo_linea: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone: string) => /^\d{10}$/.test(phone.replace(/\s/g, ""));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
        const newValue = type === "checkbox" ? checked! : value;

        setFormData((prev) => {
            const updated = {...prev, [name]: newValue};
            // Reset condizionali
            if (name === "servizi_utility" && !checked) updated.tipo_operazione = "";
            if (name === "servizi_telco" && !checked) updated.tipo_linea = "";
            return updated;
        });

        setErrors((prev) => ({...prev, [name]: ""}));
    };

    const validate = () => {
        const e: Record<string, string> = {};

        if (!formData.intermediario.trim()) e.intermediario = "Campo obbligatorio";
        if (!formData.nome.trim()) e.nome = "Campo obbligatorio";
        if (!formData.cognome.trim()) e.cognome = "Campo obbligatorio";

        if (!formData.telefono.trim()) {
            e.telefono = "Campo obbligatorio";
        } else if (!validatePhone(formData.telefono)) {
            e.telefono = "Inserire esattamente 10 cifre";
        }

        if (!formData.email.trim()) {
            e.email = "Campo obbligatorio";
        } else if (!validateEmail(formData.email)) {
            e.email = "Email non valida";
        }

        if (formData.servizi_utility && !formData.tipo_operazione) {
            e.tipo_operazione = "Selezionare il tipo di operazione";
        }

        if (formData.servizi_telco && !formData.tipo_linea) {
            e.tipo_linea = "Selezionare il tipo di linea";
        }

        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);

        const newErrors = validate();
        setErrors(newErrors);
        if (Object.values(newErrors).some(Boolean)) return;

        try {
            setIsSubmitting(true);

            const response = await fetch("/api/contatti", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    intermediario: formData.intermediario.trim(),
                    nome: formData.nome.trim(),
                    cognome: formData.cognome.trim(),
                    telefono: formData.telefono.replace(/\s/g, ""),
                    email: formData.email.trim(),
                    servizi_utility: formData.servizi_utility,
                    tipo_operazione: formData.tipo_operazione,
                    servizi_telco: formData.servizi_telco,
                    tipo_linea: formData.tipo_linea,
                    data: new Date().toISOString(),
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                setSubmitMessage({type: "error", text: result?.message || "Errore durante il salvataggio"});
                return;
            }

            setSubmitMessage({type: "success", text: result?.message || "Richiesta inviata con successo!"});
            setFormData({
                intermediario: "", nome: "", cognome: "", telefono: "", email: "",
                servizi_utility: false, tipo_operazione: "", servizi_telco: false, tipo_linea: "",
            });
            setErrors({});
        } catch (error) {
            setSubmitMessage({type: "error", text: error instanceof Error ? error.message : "Errore durante il salvataggio"});
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClass = (field: string) =>
        `w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-900 ${errors[field] ? "border-red-500" : "border-gray-200"}`;

    const selectClass = (field: string) =>
        `w-full appearance-none px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-900 bg-white ${errors[field] ? "border-red-500" : "border-gray-200"}`;

    return (
        <div className="w-full md:w-2/5">
            <div
                className="bg-white w-full h-full rounded-4xl px-4 md:px-10 py-10 flex flex-col justify-between gap-8"
                style={{boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)"}}>

                {/* Header */}
                <div className="flex flex-col items-center gap-4">
                    <h2 id="form-title" className="text-2xl font-medium text-gray-800 mb-1">
                        Compila la richiesta
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed text-center">
                        Ti ricontatteremo dal numero 350 061 7321 entro 24 ore. Niente comunicazioni inutili, niente spam.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate aria-labelledby="form-title">

                    {/* Intermediario */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="intermediario" className="text-sm font-medium ml-4 text-gray-900">Intermediario*</label>
                        <input id="intermediario" type="text" name="intermediario" value={formData.intermediario}
                               onChange={handleChange} placeholder="Nome agenzia o intermediario"
                               className={inputClass("intermediario")} aria-required="true"
                               aria-invalid={Boolean(errors.intermediario)}
                               aria-describedby={errors.intermediario ? "intermediario-error" : undefined}/>
                        {errors.intermediario && <span id="intermediario-error" className="ml-4 text-xs text-red-500" role="alert">{errors.intermediario}</span>}
                    </div>

                    {/* Nome + Cognome */}
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="nome" className="text-sm font-medium ml-4 text-gray-900">Nome*</label>
                            <input id="nome" type="text" name="nome" value={formData.nome}
                                   onChange={handleChange} placeholder="Mario" autoComplete="given-name"
                                   className={inputClass("nome")} aria-required="true"
                                   aria-invalid={Boolean(errors.nome)}
                                   aria-describedby={errors.nome ? "nome-error" : undefined}/>
                            {errors.nome && <span id="nome-error" className="ml-4 text-xs text-red-500" role="alert">{errors.nome}</span>}
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label htmlFor="cognome" className="text-sm font-medium ml-4 text-gray-900">Cognome*</label>
                            <input id="cognome" type="text" name="cognome" value={formData.cognome}
                                   onChange={handleChange} placeholder="Rossi" autoComplete="family-name"
                                   className={inputClass("cognome")} aria-required="true"
                                   aria-invalid={Boolean(errors.cognome)}
                                   aria-describedby={errors.cognome ? "cognome-error" : undefined}/>
                            {errors.cognome && <span id="cognome-error" className="ml-4 text-xs text-red-500" role="alert">{errors.cognome}</span>}
                        </div>
                    </div>

                    {/* Telefono */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="telefono" className="text-sm font-medium ml-4 text-gray-900">Numero di telefono*</label>
                        <input id="telefono" type="tel" name="telefono" value={formData.telefono}
                               onChange={handleChange} placeholder="3001234567"
                               inputMode="numeric" maxLength={10} autoComplete="tel"
                               className={inputClass("telefono")} aria-required="true"
                               aria-invalid={Boolean(errors.telefono)}
                               aria-describedby={errors.telefono ? "telefono-error" : undefined}/>
                        {errors.telefono && <span id="telefono-error" className="ml-4 text-xs text-red-500" role="alert">{errors.telefono}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm font-medium ml-4 text-gray-900">Email*</label>
                        <input id="email" type="email" name="email" value={formData.email}
                               onChange={handleChange} placeholder="mario.rossi@esempio.it"
                               autoComplete="email"
                               className={inputClass("email")} aria-required="true"
                               aria-invalid={Boolean(errors.email)}
                               aria-describedby={errors.email ? "email-error" : undefined}/>
                        {errors.email && <span id="email-error" className="ml-4 text-xs text-red-500" role="alert">{errors.email}</span>}
                    </div>

                    {/* Servizi Utility */}
                    <div className="flex flex-col gap-4">
                        <label htmlFor="servizi_utility" className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="servizi_utility" name="servizi_utility" checked={formData.servizi_utility}
                                   onChange={handleChange}
                                   className="w-4 h-4 rounded accent-blue-600"/>
                            <span className="text-sm font-medium text-gray-900">Servizi utility (luce, gas, acqua)</span>
                        </label>

                        {formData.servizi_utility && (
                            <div className="flex flex-col gap-1 ml-7 mb-4">
                                <label htmlFor="tipo_operazione" className="text-xs ml-4 text-gray-500">Tipo di operazione*</label>
                                <select id="tipo_operazione" name="tipo_operazione" value={formData.tipo_operazione}
                                        onChange={handleChange} className={selectClass("tipo_operazione")}
                                        aria-required="true" aria-invalid={Boolean(errors.tipo_operazione)}
                                        aria-describedby={errors.tipo_operazione ? "tipo_operazione-error" : undefined}>
                                    <option value="">Seleziona...</option>
                                    {TIPO_OPERAZIONE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                                {errors.tipo_operazione && <span id="tipo_operazione-error" className="ml-4 text-xs text-red-500" role="alert">{errors.tipo_operazione}</span>}
                            </div>
                        )}
                    </div>

                    {/* Servizi Telco */}
                    <div className="flex flex-col gap-4">
                        <label htmlFor="servizi_telco" className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" id="servizi_telco" name="servizi_telco" checked={formData.servizi_telco}
                                   onChange={handleChange}
                                   className="w-4 h-4 rounded accent-blue-600"/>
                            <span className="text-sm font-medium text-gray-900">Servizi telco</span>
                        </label>

                        {formData.servizi_telco && (
                            <div className="flex flex-col gap-1 ml-7 mb-4">
                                <label htmlFor="tipo_linea" className="text-xs ml-4 text-gray-500">Tipo di linea*</label>
                                <select id="tipo_linea" name="tipo_linea" value={formData.tipo_linea}
                                        onChange={handleChange} className={selectClass("tipo_linea")}
                                        aria-required="true" aria-invalid={Boolean(errors.tipo_linea)}
                                        aria-describedby={errors.tipo_linea ? "tipo_linea-error" : undefined}>
                                    <option value="">Seleziona...</option>
                                    {TIPO_LINEA_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                                </select>
                                {errors.tipo_linea && <span id="tipo_linea-error" className="ml-4 text-xs text-red-500" role="alert">{errors.tipo_linea}</span>}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-full w-full transition-colors flex items-center justify-center gap-2 mt-2"
                    >
                        {isSubmitting ? "Invio in corso..." : "Invia la richiesta"}
                        <Image src={"/arrow-forward.svg"} alt="" aria-hidden="true" width={20} height={20}/>
                    </button>

                    {submitMessage && (
                        <p role="status" aria-live="polite"
                           className={`text-xs text-center ${submitMessage.type === "success" ? "text-green-600" : "text-red-500"}`}>
                            {submitMessage.text}
                        </p>
                    )}
                </form>

                {/* Footer */}
                <div className="flex flex-col gap-2 text-center">
                    <p className="text-xs text-blue-600">Oltre 500 partner utilizzano per i propri clienti ZeroCode</p>
                    <p className="text-xs text-gray-600">
                        Compilando il form acconsenti al{" "}
                        <Link className="underline" href={"/privacy"}>trattamento dei tuoi dati personali</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
