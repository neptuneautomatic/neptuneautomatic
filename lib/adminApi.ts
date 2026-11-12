// Client-side helper for API requests in Admin Dashboard

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('neptune_admin_token');
}

export function setAdminToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem('neptune_admin_token', token);
  } else {
    localStorage.removeItem('neptune_admin_token');
  }
}

export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  const headers = new Headers(options.headers || {});

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Ensure trailing slash for API routes (matches Next.js trailingSlash config)
  let normalizedUrl = url;
  const [base, query] = url.split('?');
  if (base.startsWith('/api') && !base.endsWith('/') && !base.includes('.')) {
    normalizedUrl = `${base}/${query ? `?${query}` : ''}`;
  }

  return fetch(normalizedUrl, {
    ...options,
    headers,
    credentials: 'include',
  });
}
