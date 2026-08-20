import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr
from app.core.config import settings


def send_contact_notification_email(lead_data: dict) -> bool:
    """
    Sends a formatted notification email via corporate or Gmail SMTP when a new lead submits the form.
    """
    to_email = settings.NOTIFICATION_EMAIL_TO
    
    # Clean phone for WhatsApp link
    raw_phone = lead_data.get("phone", "")
    clean_phone = "".join(filter(str.isdigit, raw_phone))
    whatsapp_link = f"https://wa.me/{clean_phone}" if clean_phone else ""

    client_name = lead_data.get("name", "Cliente")
    client_email = lead_data.get("email", "")
    client_goal = lead_data.get("goal", "No especificado")
    client_budget = lead_data.get("budget", "No especificado")
    client_website = lead_data.get("website") or "No informado"

    # If SMTP is not configured, log gracefully to terminal
    if not settings.SMTP_HOST or not settings.SMTP_USER:
        print("\n" + "=" * 60)
        print("[SIMULACIÓN DE CORREO SMTP - CREDENCIALES PENDIENTES EN .ENV]")
        print(f"Para: {to_email}")
        print(f"Asunto: Nuevo Prospecto Web Gliro: {client_name}")
        print(f"Cliente: {client_name} ({client_email})")
        print(f"Teléfono: {raw_phone}")
        print(f"Servicio / Objetivo: {client_goal}")
        print(f"Presupuesto: {client_budget}")
        print(f"Sitio Web: {client_website}")
        print("Para enviar correos reales, configura SMTP_HOST, SMTP_USER y SMTP_PASSWORD en backend/.env")
        print("=" * 60 + "\n")
        return False

    # Build HTML Email Body
    html_content = f"""
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }}
        .header {{ background-color: #0f172a; padding: 32px 24px; text-align: center; border-bottom: 3px solid #1ff080; }}
        .header h1 {{ color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }}
        .header p {{ color: #94a3b8; margin: 6px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; }}
        .content {{ padding: 32px 28px; }}
        .badge {{ display: inline-block; background-color: #ecfdf5; color: #047857; font-size: 12px; font-weight: 700; padding: 4px 12px; rounded-full; border: 1px solid #a7f3d0; border-radius: 9999px; margin-bottom: 20px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 12px; }}
        th, td {{ padding: 12px 14px; text-align: left; font-size: 14px; }}
        tr:nth-child(even) {{ background-color: #f8fafc; }}
        th {{ width: 35%; color: #64748b; font-weight: 600; border-bottom: 1px solid #e2e8f0; }}
        td {{ color: #0f172a; font-weight: 500; border-bottom: 1px solid #e2e8f0; }}
        .actions {{ margin-top: 30px; text-align: center; display: flex; gap: 12px; justify-content: center; }}
        .btn {{ display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 9999px; margin: 6px 4px; }}
        .btn-email {{ background-color: #0f172a; color: #ffffff !important; }}
        .btn-whatsapp {{ background-color: #25D366; color: #ffffff !important; }}
        .footer {{ background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GLIRO</h1>
          <p>Notificación de Nuevo Prospecto</p>
        </div>
        <div class="content">
          <div class="badge">Nuevo Mensaje de Contacto</div>
          <p style="font-size: 15px; margin-top: 0;">Un nuevo cliente ha completado el formulario en <a href="https://gliro.cl" style="color: #0f172a; font-weight: 700;">gliro.cl</a>:</p>
          
          <table>
            <tr>
              <th>Nombre:</th>
              <td><strong>{client_name}</strong></td>
            </tr>
            <tr>
              <th>Correo:</th>
              <td><a href="mailto:{client_email}" style="color: #2563eb; text-decoration: none;">{client_email}</a></td>
            </tr>
            <tr>
              <th>Teléfono:</th>
              <td><strong>{raw_phone}</strong></td>
            </tr>
            <tr>
              <th>Servicio Requerido:</th>
              <td><strong>{client_goal}</strong></td>
            </tr>
            <tr>
              <th>Presupuesto:</th>
              <td>{client_budget}</td>
            </tr>
            <tr>
              <th>Sitio Web Actual:</th>
              <td>{client_website}</td>
            </tr>
          </table>

          <div class="actions">
            <a href="mailto:{client_email}?subject=Respuesta%20de%20Gliro%20a%20tu%20consulta" class="btn btn-email">Responder por Correo</a>
            {"<a href='" + whatsapp_link + "' class='btn btn-whatsapp'>Abrir WhatsApp</a>" if whatsapp_link else ""}
          </div>
        </div>
        <div class="footer">
          Gliro SpA · Notificación automática del sistema web · <a href="https://gliro.cl" style="color: #64748b;">gliro.cl</a>
        </div>
      </div>
    </body>
    </html>
    """

    # Plain text version for non-HTML clients
    plain_text = f"""
    NUEVO PROSPECTO WEB GLIRO
    =========================
    Nombre: {client_name}
    Correo: {client_email}
    Teléfono: {raw_phone}
    Servicio: {client_goal}
    Presupuesto: {client_budget}
    Sitio Web: {client_website}
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Nuevo Prospecto Web Gliro: {client_name}"
    msg["From"] = formataddr((settings.SMTP_FROM_NAME, settings.SMTP_FROM_EMAIL or settings.SMTP_USER))
    msg["To"] = to_email
    msg["Reply-To"] = client_email

    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_content, "html", "utf-8"))

    try:
        if settings.SMTP_SSL:
            server = smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15)
        else:
            server = smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT, timeout=15)
            if settings.SMTP_TLS:
                server.starttls()

        if settings.SMTP_USER and settings.SMTP_PASSWORD:
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)

        server.sendmail(settings.SMTP_FROM_EMAIL or settings.SMTP_USER, [to_email], msg.as_string())
        server.quit()
        print(f"[SMTP SUCCESS] Correo de notificacion enviado exitosamente a {to_email}")
        return True
    except Exception as exc:
        print(f"[SMTP ERROR] No se pudo enviar el correo a {to_email}: {exc}")
        return False
