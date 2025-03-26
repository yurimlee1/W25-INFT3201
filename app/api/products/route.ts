import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const client = await pool.connect();// pool is db
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
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const condition = formData.get('condition') as string;
    const marketValue = Number(formData.get('marketvalue'));
    const price = Number(formData.get('price'));
    const stockQuantity = Number(formData.get('stockQuantity'));
    const locationId = Number(formData.get('locationId'));
    const description = formData.get('description') as string;

    let imageUrl = '';
    const imageFile = formData.get('imageUrl');

    if (imageFile && typeof imageFile !== 'string') {
      const fileName = `${Date.now()}-${imageFile.name}`;
      const imageDir = path.join(process.cwd(), 'public', 'image');

      if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
      }

      const filePath = path.join(imageDir, fileName);
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      imageUrl = `/image/${fileName}`;
    }

    const client = await pool.connect();
    const result = await client.query(
      `INSERT INTO Products 
      ("name", "category", "condition", "marketvalue", "price", "stockquantity", "locationid", "description", "imageUrl") 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [name, category, condition, marketValue, price, stockQuantity, locationId, description, imageUrl]
    );
    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
