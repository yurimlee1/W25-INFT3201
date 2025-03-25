import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM Products');
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("this is the data", body);
    const { name, category, condition, marketValue, price, stockQuantity, locationId } = body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO Products (Name, Category, Condition, MarketValue, Price, StockQuantity, LocationID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, category, condition, marketValue, price, stockQuantity, locationId]
    );
    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}