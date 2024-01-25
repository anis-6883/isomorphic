import withAuth from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { routes } from './config/routes';

export default withAuth(
  function middleware(req) {
    const userRole = req.nextauth.token?.role;

    if (userRole === 'user' && req.nextUrl.pathname.includes('super-admin')) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }) =>
        token?.role === 'user' || token?.role === 'admin', // If there is a token, the user is authenticated
    },
    pages: {
      signIn: routes.signIn,
      error: routes.signIn,
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|icons|favicon.ico|cricket|league|match|team|player|favorites|watch|highlights|news|signup|signin|test|super-admin/login|$).*)',
  ],
};
