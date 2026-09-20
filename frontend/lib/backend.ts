import "server-only";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000";

export interface ProtectedItem {
  id: number;
  name: string;
}

export interface ProtectedData {
  message: string;
  items: ProtectedItem[];
}

export async function fetchProtectedData(
  token: string,
): Promise<ProtectedData> {
  const res = await fetch(`${BACKEND_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch protected data: ${res.status}`);
  }

  return res.json();
}
