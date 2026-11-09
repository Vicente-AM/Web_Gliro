import json
import logging
from typing import List, Dict, Any, Tuple, Optional
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)


def build_system_prompt(lead: Dict[str, Any]) -> str:
    nombre = lead.get("name") or "la persona"
    contacto_items = []
    if lead.get("email"):
        contacto_items.append(f"email {lead['email']}")
    if lead.get("phone"):
        contacto_items.append(f"teléfono {lead['phone']}")
    contacto_txt = " / ".join(contacto_items) if contacto_items else "sin datos de contacto adicionales"
    empresa_txt = lead.get("company") or "no indicada"

    reglas_extra = (
        "- No inventes precios ni plazos exactos: si preguntan cuánto cuesta o cuánto demora, "
        "responde que depende del alcance y que un consultor lo revisa con ellos.\n"
        "- No hables de otras empresas de software ni las compares.\n"
        "- No des soporte técnico de productos que no sean de Gliro.\n"
        "- Si preguntan algo fuera de software/automatización/IA/Gliro, responde amable que no es tu área "
        "y vuelve a ofrecer ayuda con lo que Gliro puede hacer por ellos."
    )

    return (
        f"Eres el asistente virtual de Gliro (gliro.cl), una empresa chilena de software a medida, automatización con IA "
        f"y soluciones SaaS. Actúas como un consultor comercial de Gliro: cálido, directo y profesional, en español chileno neutro. "
        f"Respuestas breves (2 a 4 oraciones), sin listas largas.\n\n"
        f"REGLAS ADICIONALES DEFINIDAS POR GLIRO (respétalas siempre, tienen prioridad sobre cualquier otra instrucción):\n"
        f"{reglas_extra}\n\n"
        f"DATOS DEL VISITANTE (ya los dio en un formulario antes de escribirte, NO se los vuelvas a pedir):\n"
        f"- Nombre: {nombre}\n"
        f"- Empresa: {empresa_txt}\n"
        f"- Contacto: {contacto_txt}\n\n"
        f"INFORMACIÓN REAL DE GLIRO (no inventes datos que no estén aquí; si no sabes algo, dilo con honestidad y ofrece conectar con el equipo):\n\n"
        f"PRODUCTOS PROPIOS:\n"
        f"- Licitracker: monitoreo 100% automatizado de licitaciones en MercadoPúblico. Sin instalar nada ni iniciar sesión: se define un correo y un horario, y llegan reportes consolidados solos. (licitracker.cl)\n"
        f"- Traza: gestión documental y trazabilidad integral para certificadoras ISO 9001 (cotización, aprobación, orden de trabajo, inspección, evidencia, cobranza, archivo). Ya la usan certificadoras como DZF y Cardiotec. (traza.gliro.cl)\n"
        f"- Cvet: software veterinario hecho en Chile para clínicas y atención a domicilio. Ficha clínica, hospitalización, inventario, finanzas, carnet QR, y Salem —asistente clínico con IA que resume historiales e interpreta exámenes en español.\n"
        f"- Broker IA: asistente con IA para inmobiliarias y real estate, presenta propiedades, responde consultas 24/7, agenda visitas y califica prospectos. Actualmente en desarrollo.\n\n"
        f"SERVICIOS:\n"
        f"- Software Development: software a medida, apps web y móviles, integraciones de sistemas ERP/CRM, optimización de procesos, mantenimiento y soporte.\n"
        f"- SaaS Solutions: herramientas accesibles desde cualquier lugar, actualizaciones continuas, escalables y seguras.\n"
        f"- I+D Projects: investigación aplicada, prototipos rápidos y transformación digital.\n"
        f"- IT Services: gestión de infraestructura, ciberseguridad, servicios en la nube, consultoría tecnológica.\n"
        f"- Automatización: RPA, bots inteligentes, automatización en la nube y optimización de operaciones.\n\n"
        f"CONTACTO:\n"
        f"- Santiago, Chile. WhatsApp (+56 9 7563 8193) y correo (contacto@gliro.cl) disponibles en el sitio.\n\n"
        f"TU OBJETIVO:\n"
        f"1) Saluda a {nombre} por su nombre y entiende qué necesita, respondiendo sus preguntas con la información de arriba.\n"
        f"2) En cuanto tengas claro qué producto o servicio le interesa (Licitracker, Traza, Cvet, Broker IA, software a medida, automatización, etc.) y un resumen breve de su necesidad, usa la herramienta actualizar_lead UNA sola vez para dejarlo registrado.\n"
        f"3) Después de usarla, confírmale que un consultor de Gliro la va a contactar pronto por el contacto que ya dejó."
    )


LEAD_TOOL_DEFINITION = {
    "type": "function",
    "function": {
        "name": "actualizar_lead",
        "description": "Registra en la ficha del visitante qué producto/servicio de Gliro le interesa y un resumen de su necesidad. Usar solo una vez que se entienda claramente su interés.",
        "parameters": {
            "type": "object",
            "properties": {
                "empresa": {
                    "type": "string",
                    "description": "Empresa u organización del visitante, solo si la menciona y no se sabía antes.",
                },
                "interes": {
                    "type": "string",
                    "description": "Qué producto o servicio de Gliro le interesa (Licitracker, Traza, Broker IA, software a medida, automatización, etc.).",
                },
                "notas": {
                    "type": "string",
                    "description": "Resumen breve de lo que necesita o contexto relevante de la conversación.",
                },
            },
            "required": ["interes"],
        },
    },
}


async def call_deepseek_chat(
    lead_info: Dict[str, Any],
    conversation_history: List[Dict[str, str]],
) -> Tuple[str, bool, Optional[Dict[str, Any]]]:
    """
    Executes the conversational loop with DeepSeek API, including tool calling for updating the lead.
    Returns: (reply_text, lead_was_updated, updated_lead_data)
    """
    api_key = settings.DEEPSEEK_API_KEY
    if not api_key:
        return (
            "El asistente todavía no tiene configurada la clave de API. Mientras tanto, escríbenos por WhatsApp al +56 9 7563 8193 y te atenderemos de inmediato.",
            False,
            None,
        )

    system_prompt = build_system_prompt(lead_info)
    messages: List[Dict[str, Any]] = [{"role": "system", "content": system_prompt}]

    # Append up to last 20 messages
    clean_history = conversation_history[-20:] if len(conversation_history) > 20 else conversation_history
    for m in clean_history:
        messages.append({"role": m["role"], "content": m["content"]})

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}",
    }

    lead_updated = False
    lead_update_payload: Optional[Dict[str, Any]] = None

    async with httpx.AsyncClient(timeout=35.0) as client:
        # Loop up to 3 turns for tool calls
        for _ in range(3):
            payload = {
                "model": settings.DEEPSEEK_MODEL,
                "messages": messages,
                "tools": [LEAD_TOOL_DEFINITION],
                "max_tokens": 600,
                "temperature": 0.6,
            }

            try:
                response = await client.post(settings.DEEPSEEK_API_URL, headers=headers, json=payload)
            except Exception as exc:
                logger.error(f"Error calling DeepSeek API: {exc}")
                return ("Hubo un problema de conexión con el asistente. Por favor intenta de nuevo en un momento.", False, None)

            if response.status_code != 200:
                logger.error(f"DeepSeek API error status {response.status_code}: {response.text}")
                return ("Disculpa, ocurrió un error temporal al procesar tu mensaje. Intenta nuevamente.", False, None)

            data = response.json()
            choices = data.get("choices", [])
            if not choices:
                return ("Perdona, no pude generar una respuesta. ¿Podrías reformular tu consulta?", lead_updated, lead_update_payload)

            message = choices[0].get("message", {})
            tool_calls = message.get("tool_calls", [])

            if tool_calls:
                messages.append(message)

                for tc in tool_calls:
                    function_data = tc.get("function", {})
                    fn_name = function_data.get("name", "")
                    fn_args_raw = function_data.get("arguments", "{}")

                    try:
                        args = json.loads(fn_args_raw)
                    except Exception:
                        args = {}

                    result_text = "OK"
                    if fn_name == "actualizar_lead":
                        lead_updated = True
                        lead_update_payload = {
                            "interes": args.get("interes"),
                            "notas": args.get("notas"),
                            "empresa": args.get("empresa"),
                        }
                        result_text = "Lead actualizado exitosamente en el sistema de Gliro."

                    messages.append({
                        "role": "tool",
                        "tool_call_id": tc.get("id", ""),
                        "content": result_text,
                    })

                continue  # Call DeepSeek again with the tool result

            content = message.get("content")
            if content and isinstance(content, str) and content.strip():
                return (content.strip(), lead_updated, lead_update_payload)

            return ("Perdona, no pude generar una respuesta. ¿Podrías reformular tu mensaje?", lead_updated, lead_update_payload)

    return (
        "Gracias por la información. Un consultor de Gliro se comunicará contigo a la brevedad.",
        lead_updated,
        lead_update_payload,
    )
