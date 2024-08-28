import { NextResponse } from 'next/server'
import { sql } from "@vercel/postgres";
 
export async function GET(request: Request) {
    try {
        const { rows } = await sql`SELECT * FROM curso`;
        return NextResponse.json({ curso: rows })

    } catch (error) {
        return NextResponse.json({ error })
    }
}


