import axios from "axios";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const response =await axios.get('https://django-hello-world-lake-psi.vercel.app/api/');
    console.log(response.data);
    return NextResponse.json({
        message: 'Hello from Next.js API',
    })

  } catch (error) {
    console.error(error);
  }
}
