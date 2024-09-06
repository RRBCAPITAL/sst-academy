import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Configura los encabezados CORS
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Maneja solicitudes OPTIONS para CORS
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 });
  }

  return response;
}

// Configura el middleware para aplicar en las rutas de API
export const config = {
  matcher: '/api/:path*',
};
