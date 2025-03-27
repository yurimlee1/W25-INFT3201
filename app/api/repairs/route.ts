import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT repairid, customerid, productid, issuedescription, repairstatus, employeeid
      FROM Repairs
    `);
    client.release();
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching repairs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}



export async function POST(request: NextRequest) {
    try {
      const body = await request.json();
      const { firstName, lastName, email, phoneNumber, productId, issueDescription } = body;

      const client = await pool.connect();
  
      const customerResult = await client.query(
        'SELECT customerid FROM Customers WHERE email = $1',
        [email]
      );
  
      let customerId;
      if (customerResult.rows.length > 0) {
        customerId = customerResult.rows[0].customerid;
      } else {
        const newCustomer = await client.query(
          'INSERT INTO Customers (firstname, lastname, email, phonenumber) VALUES ($1, $2, $3, $4) RETURNING customerid',
          [firstName, lastName, email, phoneNumber || null]
        );
        customerId = newCustomer.rows[0].customerid;
      }
  
      const repairResult = await client.query(
        'INSERT INTO Repairs (customerid, productid, issuedescription, repairstatus) VALUES ($1, $2, $3, $4) RETURNING *',
        [customerId, productId, issueDescription, 'Pending']
      );
  
      client.release();
      return NextResponse.json(repairResult.rows[0], { status: 201 });
    } catch (error) {
      console.error('Error adding repair request:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

