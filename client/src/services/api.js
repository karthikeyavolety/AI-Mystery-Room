const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || 'The request could not be completed.');
  return body.data;
}
