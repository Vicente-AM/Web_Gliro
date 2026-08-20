import type { ContactFormData, ContactApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/v1';

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
      throw new Error(errorData.detail || 'Hubo un error al procesar tu solicitud.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo establecer conexión con el servidor de Gliro. Por favor contáctanos directamente vía WhatsApp al +56 9 7563 8193.');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al enviar el formulario.');
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
