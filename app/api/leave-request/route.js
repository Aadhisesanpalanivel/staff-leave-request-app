import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function connectToDB() {
  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name');
    const department = formData.get('department');
    const days = formData.get('days');
    const file = formData.get('file');

    let fileData = null;
    if (file && file.size > 0) {
      fileData = {
        originalFilename: file.name,
        mimetype: file.type,
        size: file.size,
      };
    }

    const client = await connectToDB();
    const db = client.db('teacher_leave_app');
    const collection = db.collection('leave_requests');
    
    await collection.insertOne({
      name: name,
      department: department,
      days: parseInt(days),
      file: fileData,
      status: 'pending',
      createdAt: new Date(),
    });
    
    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/leave-request:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const staffName = searchParams.get('name');
    
    const client = await connectToDB();
    const db = client.db('teacher_leave_app');
    const collection = db.collection('leave_requests');
    
    let query = {};
    if (staffName) {
      query = { name: staffName };
    }
    
    const requests = await collection.find(query).sort({ createdAt: -1 }).toArray();
    await client.close();
    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error in GET /api/leave-request:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, action } = await req.json();
    if (!id || !['accept', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
    const client = await connectToDB();
    const db = client.db('teacher_leave_app');
    const collection = db.collection('leave_requests');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: action === 'accept' ? 'accepted' : 'rejected', updatedAt: new Date() } }
    );
    await client.close();
    return NextResponse.json({ success: result.modifiedCount === 1 });
  } catch (error) {
    console.error('Error in PUT /api/leave-request:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 