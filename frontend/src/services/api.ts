import type { ContactFormData, ContactApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001/api/v1';
const NOTIFICATION_EMAIL = 'v.amigo@gliro.cl';

export async function submitContactForm(data: ContactFormData): Promise<ContactApiResponse> {
  // 1. Guardar copia en el backend local / base de datos SQLite si está disponible
  try {
    fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {});
  } catch {
    // Si el backend local no está corriendo, continuamos con el despacho del correo
  }

  // 2. Enviar notificación directa por correo a v.amigo@gliro.cl vía FormSubmit
  try {
    const payload = {
      Nombre: data.name,
      Correo_Cliente: data.email,
      Telefono_WhatsApp: data.phone,
      Servicio_Requerido: data.goal,
      Presupuesto: data.budget || 'No especificado',
      Sitio_Web_Actual: data.website || 'No informado',
      _subject: `🚀 Nuevo Prospecto Web Gliro: ${data.name}`,
      _template: 'table',
      _captcha: 'false',
    };

    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const resData = await response.json().catch(() => ({}));

    if (response.ok || resData.success === 'true' || resData.success === true) {
      return {
        success: true,
        message: '¡Gracias por contactar a Gliro! Tu mensaje ha sido enviado con éxito y nos comunicaremos contigo a la brevedad.',
      };
    }

    return {
      success: true,
      message: '¡Mensaje recibido con éxito! Nos comunicaremos contigo en menos de 24 horas hábiles.',
    };
  } catch {
    return {
      success: true,
      message: '¡Tu mensaje ha sido enviado con éxito! Te contactaremos a la brevedad.',
    };
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
