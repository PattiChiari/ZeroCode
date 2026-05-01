import {google} from 'googleapis';
import {NextRequest, NextResponse} from 'next/server';

const SPREADSHEET_ID = '1xMnTXrMrjs3gXz_6Vm8voddWGEjmRbrps5qbzKaWGxQ';

const getAuth = () => {
    const credentialsJson = process.env.GOOGLE_CREDENTIALS;
    if (!credentialsJson) throw new Error('Variabile d\'ambiente GOOGLE_CREDENTIALS non configurata');
    return new google.auth.GoogleAuth({
        credentials: JSON.parse(credentialsJson),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
};

const validatePhone = (phone: string): boolean => /^\d{10}$/.test(phone.replace(/\s/g, ''));
const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const formatDate = (isoDate: string): string => {
    try {
        return new Date(isoDate).toLocaleDateString('it-IT', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit',
        });
    } catch {
        return isoDate;
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {intermediario, nome, cognome, telefono, email, servizi_utility, tipo_operazione, servizi_telco, tipo_linea, data} = body;

        if (!intermediario?.trim()) return NextResponse.json({message: 'Intermediario mancante'}, {status: 400});
        if (!nome?.trim()) return NextResponse.json({message: 'Nome mancante'}, {status: 400});
        if (!cognome?.trim()) return NextResponse.json({message: 'Cognome mancante'}, {status: 400});

        if (!telefono?.trim()) return NextResponse.json({message: 'Numero di telefono mancante'}, {status: 400});
        if (!validatePhone(telefono)) return NextResponse.json({message: 'Numero di telefono non valido (10 cifre)'}, {status: 400});

        if (!email?.trim()) return NextResponse.json({message: 'Email mancante'}, {status: 400});
        if (!validateEmail(email)) return NextResponse.json({message: 'Email non valida'}, {status: 400});

        if (servizi_utility && !tipo_operazione?.trim()) {
            return NextResponse.json({message: 'Tipo operazione obbligatorio per servizi utility'}, {status: 400});
        }

        if (servizi_telco && !tipo_linea?.trim()) {
            return NextResponse.json({message: 'Tipo linea obbligatorio per servizi telco'}, {status: 400});
        }

        if (!data) return NextResponse.json({message: 'Data mancante'}, {status: 400});

        const auth = getAuth();
        const sheets = google.sheets({version: 'v4', auth});

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A:J',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[
                    intermediario.trim(),
                    nome.trim(),
                    cognome.trim(),
                    telefono.replace(/\s/g, ''),
                    email.trim(),
                    servizi_utility ? 'Sì' : 'No',
                    tipo_operazione?.trim() || '',
                    servizi_telco ? 'Sì' : 'No',
                    tipo_linea?.trim() || '',
                    formatDate(data),
                ]],
            },
        });

        return NextResponse.json({message: 'Richiesta inviata con successo!'}, {status: 200});
    } catch (error) {
        console.error('Errore salvataggio:', error);
        return NextResponse.json({message: 'Errore durante il salvataggio del contatto'}, {status: 500});
    }
}
