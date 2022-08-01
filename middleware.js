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

  if (request.nextUrl.pathname.startsWith('/curriculum/')) {
    const parts = request.nextUrl.pathname.split('/');
    const slug = parts[parts.indexOf('curriculum') + 1];
    return NextResponse.rewrite(new URL(`/?curriculum=${slug}`, request.url));
  }
  if (request.nextUrl.pathname.startsWith('/tag/')) {
    const parts = request.nextUrl.pathname.split('/');
    const slug = parts[parts.indexOf('tag') + 1];
    return NextResponse.rewrite(new URL(`/?tag=${slug}`, request.url));
  }
}
