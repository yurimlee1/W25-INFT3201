import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params;
    const client = await pool.connect();
    const result = await client.query(
      'SELECT * FROM Products WHERE productid = $1',
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await params; 
    const client = await pool.connect();
    const deleteResult = await client.query(
      'DELETE FROM Products WHERE productid = $1',
      [id]
    );
    client.release();

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}