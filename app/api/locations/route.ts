// pages/api/locations.js
import pool from '@/lib/db'; 
import { NextRequest, NextResponse } from 'next/server';


export  async function POST(req: NextRequest) {
    const { name, address } = await req.json();
    try {
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO locations (name, address) VALUES ($1, $2) RETURNING *',
        [name, address]
      );
      client.release();
      console.log('Location added:', result.rows[0]);
      return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
      console.error('Error adding location:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM Locations');
        client.release();
        return NextResponse.json(result.rows, { status: 200 });
      } catch (error) {
        console.error('Error fetching locations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
      }
  }