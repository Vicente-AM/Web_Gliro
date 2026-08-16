from fastapi import APIRouter

router = APIRouter()


@router.get("/content", tags=["Content"])
def get_site_content():
    """Returns dynamic landing page content for Gliro based on official company information."""
    return {
        "brand": {
            "name": "Gliro",
            "tagline": "Innovación y automatización a tu medida",
            "description": "Desarrollamos software personalizado, automatizamos procesos con IA y creamos soluciones SaaS que ahorran tiempo y dinero a empresas en Chile.",
            "email": "contacto@gliro.cl",
            "phone": "+56 9 7563 8193",
            "whatsappUrl": "https://wa.me/56975638193?text=Hola%2C%20quiero%20conversar%20sobre%20un%20proyecto%20con%20Gliro",
            "location": "Santiago, Chile",
            "schedule": "Lunes a Viernes 9:00 - 18:00 hrs",
        },
        "hero": {
            "eyebrow": "Software · Automatización · IA",
            "title": "Innovación y automatización a tu medida",
            "description": "Desarrollamos software personalizado, automatizamos procesos con IA y creamos soluciones SaaS que ahorran tiempo y dinero a empresas en Chile.",
            "primaryCta": {"text": "Conversemos por WhatsApp", "href": "https://wa.me/56975638193?text=Hola%2C%20quiero%20conversar%20sobre%20un%20proyecto%20con%20Gliro"},
            "secondaryCta": {"text": "Ver nuestros productos", "href": "#productos"},
            "stats": [
                {"value": "3", "label": "Productos propios"},
                {"value": "+400", "label": "Palabras/día en Licitracker"},
                {"value": "ISO 9001", "label": "Con Traza"},
            ],
        },
        "products": [
            {
                "id": "licitracker",
                "tag": "Compras públicas",
                "title": "Licitracker",
                "description": "Monitoreo 100% automatizado de licitaciones en MercadoPúblico. Sin instalar nada ni iniciar sesión: defines un correo y un horario, y recibes tus reportes solos.",
                "status": "En operación",
                "url": "https://licitracker.cl",
            },
            {
                "id": "traza",
                "tag": "Certificadoras · ISO 9001",
                "title": "Traza",
                "description": "Gestión documental y trazabilidad para certificadoras: cotización → aprobación → orden de trabajo → inspección → evidencia → cobranza → archivo, todo con fecha y responsable.",
                "status": "En operación · Usado por DZF y Cardiotec",
                "url": "https://traza.gliro.cl",
            },
            {
                "id": "broker-ia",
                "tag": "Inmobiliarias",
                "title": "Broker IA",
                "description": "Asistente con IA que presenta propiedades, responde consultas 24/7, agenda visitas y califica prospectos antes del contacto humano.",
                "status": "En desarrollo",
                "url": "https://gliro.cl/contacto/",
            },
        ],
        "solutions": [
            {
                "id": "software-dev",
                "tag": "01",
                "title": "Software Development",
                "description": "Desarrollo de software a medida, aplicaciones web y móviles, integraciones de sistemas y optimización de procesos empresariales.",
            },
            {
                "id": "saas-solutions",
                "tag": "02",
                "title": "SaaS Solutions",
                "description": "Herramientas en la nube accesibles desde cualquier lugar, escalables, con actualizaciones continuas y seguridad avanzada.",
            },
            {
                "id": "idi-projects",
                "tag": "03",
                "title": "I+D Projects",
                "description": "Investigación aplicada, desarrollo ágil de prototipos y validación técnica para impulsar la innovación corporativa.",
            },
            {
                "id": "it-services",
                "tag": "04",
                "title": "IT Services",
                "description": "Gestión de infraestructura, servidores, redes, ciberseguridad y consultoría tecnológica estratégica.",
            },
            {
                "id": "automatizacion",
                "tag": "05",
                "title": "Automatización",
                "description": "Soluciones de RPA, bots inteligentes y optimización de flujos operativos para reducir costos y aumentar productividad.",
            },
        ],
        "portfolio": [
            {
                "id": 1,
                "title": "Licitracker - Inteligencia en MercadoPúblico",
                "category": "SaaS Propio · Automatización",
                "results": "+400 términos monitoreados en tiempo real cada día",
            },
            {
                "id": 2,
                "title": "Traza - Gestión Documental ISO 9001",
                "category": "SaaS Propio · Certificación",
                "results": "Trazabilidad 100% auditable para DZF y Cardiotec",
            },
            {
                "id": 3,
                "title": "Cardiotec - ERP a Medida & Gestión Médica",
                "category": "Software a Medida · Salud",
                "results": "Gestión documental Traza + ERP integral de operaciones",
            },
        ],
        "testimonials": [
            {
                "id": 1,
                "name": "Alejandro Hernández",
                "company": "CARDIOTEC.CL",
                "text": "Habíamos probado otros sistemas que prometían hacer lo mismo pero sin éxito. Desde que contamos con Licitracker, ya no tengo que preocuparme de buscar Licitaciones y Compras Ágiles, realmente se pasaron... ¡recomendadísimo!",
                "rating": 5,
            },
            {
                "id": 2,
                "name": "Carlos Arancibia",
                "company": "ALIVETFARMA.CL",
                "text": "Gliro ha estado acompañándome en la transformación digital de mi negocio desde hace años. Su capacidad técnica en el ámbito digital y tecnológico es realmente única.",
                "rating": 5,
            },
            {
                "id": 3,
                "name": "Ronel Gallegos",
                "company": "DROGUERIASUNSET.COM",
                "text": "Gracias a Licitracker, ahora no pierdo tiempo buscando oportunidades de negocio, éstas me llegan directamente al correo y dedicamos nuestro tiempo a preparar las ofertas. ¡Unos verdaderos capos!",
                "rating": 5,
            },
            {
                "id": 4,
                "name": "Equipo DZF",
                "company": "DZF Certificaciones",
                "text": "Ordenamos todo nuestro proceso de auditoría ISO 9001 con Traza: cada cotización, inspección y evidencia queda trazada de principio a fin.",
                "rating": 5,
            },
        ],
        "clients": [
            {
                "name": "DZF",
                "description": "Certificadora que ordenó su proceso de auditoría ISO 9001 con Traza: cada cotización, inspección y evidencia queda trazada de principio a fin, lista para cualquier auditoría.",
            },
            {
                "name": "Cardiotec",
                "description": "Confía en Gliro en dos frentes: usa Traza para su gestión documental y un ERP a medida desarrollado por nuestro equipo para administrar su operación.",
            },
            {
                "name": "Inversiones Sunset",
                "description": "Automatización de flujos operativos y optimización de procesos de datos.",
            },
            {
                "name": "Medplan",
                "description": "Integración tecnológica y soporte de infraestructura para el sector salud.",
            },
            {
                "name": "Técnica División Médica",
                "description": "Soluciones de software y trazabilidad aplicada a insumos y servicios médicos.",
            },
        ],
    }
