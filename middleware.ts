import { NextResponse, NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Manejo de CORS
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

  // Maneja solicitudes OPTIONS para CORS
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200 });
  }

  // Obtener y analizar las cookies
  const cookies = parse(request.headers.get('cookie') || '');
  const token = cookies.token;
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  
  // Verifica autenticación
  if (!token) {
    if (path.startsWith('/campus-virtual')) {
      url.pathname = '/campus-virtual-login'; // Redirige al login si no está autenticado
      return NextResponse.redirect(url);
    }else if(path.startsWith('/dashboard/admin')){
      url.pathname = '/campus-virtual-login'; // Redirige al login si no está autenticado
      return NextResponse.redirect(url);
    }
  } else {
    // Verifica autorización
    if (path.startsWith('/dashboard/admin') && (!user || user.rol !== 'administrador')) {
      // Redirige si el rol no es administrador
      url.pathname = '/campus-virtual';
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// Configura el middleware para aplicar en las rutas de API y dashboard
export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/campus-virtual/:path*'],
};
