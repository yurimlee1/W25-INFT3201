import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Customers');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, role, email, phoneNumber } = body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Employees (FirstName, LastName, Role, Email, PhoneNumber) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, role, email, phoneNumber || null]
    );
    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding employee:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}