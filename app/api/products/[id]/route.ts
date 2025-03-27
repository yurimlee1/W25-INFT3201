import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const awaitedParams = await Promise.resolve(context.params);
    const { id } = awaitedParams;
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
  context: { params: { id: string } }
) {
  try {
    const awaitedParams = await Promise.resolve(context.params);
    const { id } = awaitedParams;
    const client = await pool.connect();

    const repairCheck = await client.query(
      'SELECT COUNT(*) FROM Repairs WHERE productid = $1',
      [id]
    );
    const repairCount = parseInt(repairCheck.rows[0].count, 10);

    if (repairCount > 0) {
      client.release();
      return NextResponse.json(
        { error: 'Cannot delete product with associated repair requests' },
        { status: 400 }
      );
    }

    await client.query('DELETE FROM Products WHERE productid = $1', [id]);
    client.release();
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}