import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const publicPaths = ['/', '/signin', '/signup', '/api/signin', '/api/signup', '/api/articles', '/articles', '/api/blogs', '/blogs'];
const authPaths = ['/signin', '/signup']; // Paths that should redirect to home if user is authenticated

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';

    console.log(`Request path: ${path}, Token present: ${!!token}`);


    // Always allow API routes
    if (path.startsWith('/api/')) {
        if (!token) {
            return NextResponse.next();
        }

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            
            // Clone the request headers and add the user information
            const requestHeaders = new Headers(request.headers);
            requestHeaders.set('x-user', JSON.stringify(payload));

            // Return the modified request
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        } catch {
            return NextResponse.next();
        }
    }

    // For signin/signup pages
    if (authPaths.includes(path)) {
        if (!token) {
            // No token, allow access to auth pages
            return NextResponse.next();
        }

        try {
            // Verify token
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            await jwtVerify(token, secret);
            // If token is valid, redirect to home
            return NextResponse.redirect(new URL('/', request.url));
        } catch {
            // If token is invalid, clear it and allow access to auth pages
            const response = NextResponse.next();
            response.cookies.delete('token');
            return response;
        }
    }

    // For public paths
    if (publicPaths.includes(path)) {
        return NextResponse.next();
    }

    // For protected routes
    if (!token) {
        // Redirect to signin with a query parameter
        return NextResponse.redirect(new URL('/signin?redirected=true', request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        
        // Clone the request headers and add the user information
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-user', JSON.stringify(payload));

        // Return the modified request
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    } catch {
        // Token is invalid, redirect to signin with a query parameter
        const response = NextResponse.redirect(new URL('/signin?redirected=true', request.url));
        response.cookies.delete('token');
        return response;
    }
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)',
    ],
};