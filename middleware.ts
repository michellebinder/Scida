import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const CSRF_COOKIE = 'next-auth.csrf-token'
export const CSRF_HEADER = 'X-CSRF-TOKEN';

export default async function middleware(request: NextRequest, response: NextResponse) {
    if (request.method !== 'POST') {
        return NextResponse.next();
    }
    const csrfHeader = request.headers.get(CSRF_HEADER)
    if (!csrfHeader) {
        throw new CsrfMissingHeaderError();
    }
    const csrfToken = request.cookies.get(CSRF_COOKIE).value.split("|")[0];
    if (csrfToken !== csrfHeader) {
        throw new CsrfInvalidTokenError();
    }
    return NextResponse.next();
}

export class CsrfMissingHeaderError extends Error {
    constructor() {
        super(`CSRF token validation failed: Missing header "${CSRF_HEADER}"`);
        this.name = "CsrfMissingHeaderError";
    }
}

export class CsrfInvalidTokenError extends Error {
    constructor() {
        super(`CSRF token validation failed: invalid token`);
        this.name = "CsrfInvalidTokenError";
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api/auth
         */
        '/((?!api/auth).*)',
    ],
}