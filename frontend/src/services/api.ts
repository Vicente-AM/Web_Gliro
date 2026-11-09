import type {
  ContactFormData,
  ContactApiResponse,
  ChatRegisterData,
  ChatRegisterResponse,
  ChatMessage,
  ChatMessageResponse,
} from '../types';

// In production or when hosted under a domain like gliro.cl, use relative path '/api/v1'
// so all requests route through Nginx/Reverse Proxy without localhost or CORS issues.
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL && !import.meta.env.VITE_API_BASE_URL.includes('localhost')) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return '/api/v1';
  }
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/v1';
};

const API_BASE_URL = getApiBaseUrl();


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

export async function registerChatLead(data: ChatRegisterData): Promise<ChatRegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || 'No pudimos guardar tus datos. Intenta nuevamente.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor de Gliro.');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error al registrar datos del chat.');
  }
}

export async function sendChatMessage(leadId: number, messages: ChatMessage[]): Promise<ChatMessageResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead_id: leadId,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || 'Hubo un problema al procesar tu mensaje.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('No se pudo conectar con el servidor. Revisa tu conexión o escríbenos por WhatsApp.');
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Error inesperado al enviar el mensaje.');
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
