const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8787";

type WaitlistPayload = {
  name?: string;
  email: string;
  institution?: string;
  role?: string;
  country?: string;
  source?: string;
  challenge?: string;
};

type ContactPayload = {
  name: string;
  email: string;
  institution?: string;
  subject?: string;
  message?: string;
};

async function postJson<TPayload>(path: string, payload: TPayload) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error || `Request failed: ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function submitWaitlist(payload: WaitlistPayload) {
  return postJson("/api/waitlist", payload);
}

export function submitContact(payload: ContactPayload) {
  return postJson("/api/contact", payload);
}

export { API_BASE_URL };
