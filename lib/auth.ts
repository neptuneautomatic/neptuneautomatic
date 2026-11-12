import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'neptune-automatic-jwt-secret-key-2026';
const TOKEN_COOKIE_NAME = 'neptune_admin_token';

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  roleSlug: string;
  roleName: string;
}

// Sign a JWT token
export function signToken(payload: TokenPayload, expiresIn = '7d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiresIn as any });
}

// Verify a JWT token
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

// Extract token from Request (Cookie or Authorization header)
export function getTokenFromRequest(request: NextRequest): string | null {
  // Check cookie first
  const cookie = request.cookies.get(TOKEN_COOKIE_NAME);
  if (cookie?.value) {
    return cookie.value;
  }

  // Check Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}

// Authenticate request and return user
export async function authenticateRequest(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: {
      role: {
        include: {
          permissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  if (!user || user.status !== 'active') return null;

  return user;
}

// Helper to check user permission
export function userHasPermission(user: any, requiredPermissionSlug: string): boolean {
  if (!user || !user.role) return false;
  if (user.role.slug === 'super_admin') return true;

  return user.role.permissions.some(
    (rp: any) => rp.permission && rp.permission.slug === requiredPermissionSlug
  );
}

// Set auth cookie on response
export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

// Clear auth cookie on response
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set({
    name: TOKEN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}
