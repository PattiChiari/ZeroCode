import {google} from 'googleapis';
import {NextRequest, NextResponse} from 'next/server';
import path from 'path';

const SPREADSHEET_ID = '1xMnTXrMrjs3gXz_6Vm8voddWGEjmRbrps5qbzKaWGxQ';

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const validatePhone = (phone: string): boolean => {
    return /^[\d\s+()\-]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

const formatDate = (isoDate: string): string => {
    try {
        const date = new Date(isoDate);
        return date.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return isoDate;
    }
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {ragione_sociale, numero_telefono, data} = body;

        // Validazione server-side
        if (!ragione_sociale || typeof ragione_sociale !== 'string' || ragione_sociale.trim() === '') {
            return NextResponse.json({message: 'Ragione sociale mancante o invalida'}, {status: 400});
        }

        if (!numero_telefono || typeof numero_telefono !== 'string' || numero_telefono.trim() === '') {
            return NextResponse.json({message: 'Numero di telefono mancante'}, {status: 400});
        }

        if (!validatePhone(numero_telefono)) {
            return NextResponse.json({message: 'Numero di telefono non valido'}, {status: 400});
        }

        if (!data || typeof data !== 'string') {
            return NextResponse.json({message: 'Data mancante'}, {status: 400});
        }

        const formattedDate = formatDate(data);

        const sheets = google.sheets({version: 'v4', auth});

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'A:C',
            valueInputOption: 'RAW',
            requestBody: {
                values: [[ragione_sociale.trim(), numero_telefono.trim(), formattedDate]],
            },
        });

        return NextResponse.json({message: 'Contatto salvato con successo!'}, {status: 200});
    } catch (error) {
        console.error('Errore salvataggio:', error);
        return NextResponse.json({message: 'Errore durante il salvataggio del contatto'}, {status: 500});
    }
}

