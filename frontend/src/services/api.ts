import type { ContactFormData, ContactApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export async function submitContactForm(data: ContactFormData): Promise<ContactApiResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Hubo un error al procesar tu solicitud');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error de conexión con el servidor');
  }
}

export async function fetchDynamicContent() {
  try {
    const response = await fetch(`${API_BASE_URL}/content`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}
