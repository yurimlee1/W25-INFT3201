import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ repairid: string }> } 
) {
  try {
    const { repairid } = await Promise.resolve(context.params); 
    const body = await request.json();
    const { repairstatus, assignedEmployeeId } = body;
    const client = await pool.connect();

    const result = await client.query(
      `UPDATE Repairs 
       SET repairstatus = $1, employeeid = $2 
       WHERE repairid = $3 
       RETURNING *`,
      [repairstatus, assignedEmployeeId || null, repairid]
    );

    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Repair not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Error updating repair:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ repairid: string }> } 
) {
  try {
    const awaitedParams = await Promise.resolve(context.params);
    const { repairid } = awaitedParams; 
    const client = await pool.connect();

    const deleteResult = await client.query(
      'DELETE FROM Repairs WHERE repairid = $1',
      [repairid] 
    );

    client.release();

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: 'Repair not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Repair deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting repair:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
