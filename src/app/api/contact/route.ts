import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Contact form Message received:", data);
    
    // In a production environment, we could integrate with SendGrid, Resend, etc.
    // For now, we mock success.
    return NextResponse.json({ success: true, message: "Mensaje recibido correctamente." });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Error al procesar el mensaje." }, { status: 500 });
  }
}
