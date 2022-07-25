import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/about')) {
    return NextResponse.rewrite(new URL('/?modal=about', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/how-it-works')) {
    return NextResponse.rewrite(new URL('/?modal=how-it-works', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/video/')) {
    const parts = request.nextUrl.pathname.split('/');

    const slug = parts[parts.indexOf('video') + 1];

    return NextResponse.rewrite(new URL(`/?video=${slug}`, request.url));
  }
}
