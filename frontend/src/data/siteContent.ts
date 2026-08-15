import type { ServiceItem, ProjectItem, TestimonialItem, FaqItem, MethodologyStep } from '../types';

export const siteBrand = {
  name: "Gliro",
  tagline: "Innovación y automatización a tu medida",
  description: "Desarrollamos software personalizado, automatizamos procesos con IA y creamos soluciones SaaS que ahorran tiempo y dinero a empresas en Chile.",
  phone: "+56 9 7563 8193",
  email: "contacto@gliro.cl",
  whatsappUrl: "https://wa.me/56975638193?text=Hola%2C%20quiero%20conversar%20sobre%20un%20proyecto%20con%20Gliro",
  location: "Santiago, Chile. Servicios tecnológicos para todo el país.",
  schedule: "Lunes a Viernes 9:00 - 18:00 hrs",
};

export const heroStats = [
  { value: "3", label: "Productos propios en producción" },
  { value: "+400", label: "Palabras clave/día monitoreadas en Licitracker" },
  { value: "ISO 9001", label: "Trazabilidad completa con Traza" },
];

export const whyChooseUs = [
  {
    icon: "Zap",
    title: "Automatización con IA",
    description: "Menos tareas repetitivas y mayor productividad para tu equipo mediante agentes y flujos inteligentes.",
  },
  {
    icon: "Puzzle",
    title: "Software Personalizado",
    description: "Soluciones diseñadas específicamente para tu modelo de negocio, no plantillas genéricas.",
  },
  {
    icon: "TrendingUp",
    title: "Experiencia Comprobada",
    description: "Proyectos reales operando en certificación, salud, bienes raíces y compras públicas.",
  },
  {
    icon: "Handshake",
    title: "Soporte Cercano",
    description: "Estamos contigo en cada etapa: desde el diseño y arquitectura hasta la operación diaria.",
  },
];

export const productsData = [
  {
    id: "licitracker",
    tag: "Compras públicas · MercadoPúblico",
    title: "Licitracker",
    description: "Monitoreo 100% automatizado de licitaciones en MercadoPúblico. Sin instalar nada ni iniciar sesión: defines tus criterios y horario, y recibes tus alertas y reportes consolidados por email.",
    status: "En operación",
    statusType: "active",
    url: "https://licitracker.cl",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "traza",
    tag: "Certificadoras · ISO 9001",
    title: "Traza",
    description: "Gestión documental y trazabilidad integral: cotización → aprobación → orden de trabajo → inspección → evidencia fotográfica → cobranza → archivo, todo auditado con fecha y responsable.",
    status: "En operación · Usado por DZF y Cardiotec",
    statusType: "active",
    url: "https://traza.gliro.cl",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "broker-ia",
    tag: "Inmobiliarias & Real Estate",
    title: "Broker IA",
    description: "Asistente inteligente con IA que presenta propiedades, responde consultas 24/7 de prospectos, agenda visitas de terreno y califica compradores antes del contacto humano.",
    status: "En desarrollo · Solicita demo",
    statusType: "beta",
    url: "#contacto",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
];

export const solutionsData: ServiceItem[] = [
  {
    id: "software-dev",
    tag: "Desarrollo a Medida",
    title: "Software Development",
    description: "Diseñamos y desarrollamos aplicaciones web y móviles personalizadas, integraciones de sistemas ERP/CRM y digitalización de flujos operativos.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "saas-solutions",
    tag: "Plataformas en la Nube",
    title: "SaaS Solutions",
    description: "Herramientas SaaS escalables y seguras que proporcionan acceso desde cualquier lugar, con actualizaciones continuas y alta disponibilidad.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "automatizacion-ia",
    tag: "Eficiencia Operativa",
    title: "Automatización & IA",
    description: "Implementación de RPA, bots inteligentes y orquestación de procesos en la nube para reducir costos y eliminar tareas administrativas manuales.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "idi-projects",
    tag: "Innovación Aplicada",
    title: "Proyectos de I+D",
    description: "Investigación aplicada, desarrollo ágil de prototipos y validación técnica de nuevas tecnologías para resolver desafíos de alta complejidad.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "it-services",
    tag: "Infraestructura & Cloud",
    title: "Servicios de TI",
    description: "Gestión de servidores, arquitectura cloud, ciberseguridad avanzada y consultoría tecnológica para garantizar la continuidad operacional.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80",
  },
];

export const portfolioData: ProjectItem[] = [
  {
    id: 1,
    title: "Licitracker - Inteligencia en MercadoPúblico",
    category: "SaaS Propio · Automatización",
    categoryKey: "ecommerce",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    results: "+400 términos monitoreados en tiempo real cada día",
    url: "https://licitracker.cl",
  },
  {
    id: 2,
    title: "Traza - Gestión Documental ISO 9001",
    category: "SaaS Propio · Certificación",
    categoryKey: "corporate",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80",
    results: "Trazabilidad 100% auditable para DZF y Cardiotec",
    url: "https://traza.gliro.cl",
  },
  {
    id: 3,
    title: "Cardiotec - ERP a Medida & Gestión Médica",
    category: "Software a Medida · Salud",
    categoryKey: "web",
    image: "https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=1400&q=80",
    results: "Gestión documental Traza + ERP integral de operaciones",
    url: "https://gliro.cl/contacto/",
  },
  {
    id: 4,
    title: "DZF Certificadora - Auditorías y Calidad",
    category: "Transformación Digital · ISO",
    categoryKey: "corporate",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    results: "Inspecciones en terreno con evidencia fotográfica en la nube",
    url: "https://gliro.cl/contacto/",
  },
  {
    id: 5,
    title: "Broker IA - Asistente Inmobiliario 24/7",
    category: "Inteligencia Artificial · Real Estate",
    categoryKey: "ads",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80",
    results: "Calificación automática y agendamiento 24/7",
    url: "https://gliro.cl/contacto/",
  },
  {
    id: 6,
    title: "Inversiones Sunset & Medplan",
    category: "Automatización de Procesos",
    categoryKey: "corporate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    results: "Flujos de integración tecnológica y optimización de datos",
    url: "https://gliro.cl/contacto/",
  },
];

export const clientLogos = [
  "DZF Certificadora",
  "Cardiotec",
  "Inversiones Sunset",
  "Medplan",
  "Técnica División Médica",
  "Alma",
  "Sociat",
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 1,
    name: "Equipo DZF",
    company: "DZF Certificaciones",
    role: "Dirección de Calidad",
    text: "Ordenamos todo nuestro proceso de auditoría ISO 9001 con Traza: cada cotización, inspección y evidencia queda trazada de principio a fin, lista para cualquier auditoría.",
    rating: 5,
    avatar: "DZF",
  },
  {
    id: 2,
    name: "Dirección Cardiotec",
    company: "Cardiotec",
    role: "Operaciones & Tecnología",
    text: "Confiamos en Gliro en dos frentes clave: usamos Traza para nuestra gestión documental y un ERP a medida desarrollado por su equipo para administrar toda nuestra operación.",
    rating: 5,
    avatar: "CT",
  },
  {
    id: 3,
    name: "Usuarios Licitracker",
    company: "Proveedores MercadoPúblico",
    role: "Licitaciones & Ventas B2G",
    text: "El monitoreo automatizado de Licitracker nos permite postular a tiempo a cada licitación relevante sin perder horas buscando manualmente en el portal.",
    rating: 5,
    avatar: "LT",
  },
  {
    id: 4,
    name: "Área Médica",
    company: "Técnica División Médica",
    role: "Gerencia",
    text: "La capacidad de Gliro para entender procesos técnicos complejos y transformarlos en software simple y robusto es excelente.",
    rating: 5,
    avatar: "TDM",
  },
  {
    id: 5,
    name: "Gerencia de Operaciones",
    company: "Medplan",
    role: "Operaciones",
    text: "Soporte rápido, código de alta calidad y un equipo que realmente se compromete con los tiempos de entrega.",
    rating: 5,
    avatar: "MP",
  },
];

export const methodologySteps: MethodologyStep[] = [
  {
    step: "01",
    title: "Diagnóstico & Arquitectura",
    description: "Analizamos en profundidad los cuellos de botella y procesos de tu negocio para diseñar una solución técnica eficiente y escalable.",
  },
  {
    step: "02",
    title: "Desarrollo Ágil & Automatización",
    description: "Construimos tu software o producto con iteraciones rápidas, integrando automatizaciones con IA y validaciones continuas con tu equipo.",
  },
  {
    step: "03",
    title: "Puesta en Marcha & Soporte Continuo",
    description: "Desplegamos en infraestructura cloud segura y te acompañamos en la adopción operativa diaria, garantizando máxima estabilidad y rendimiento.",
  },
];

export const faqData: FaqItem[] = [
  {
    question: "¿Qué tipo de soluciones desarrolla Gliro?",
    answer: "Desarrollamos software a medida (web, móvil, ERPs internos), soluciones SaaS escalables, integraciones con Inteligencia Artificial y herramientas de automatización de procesos (RPA y workflows en la nube).",
  },
  {
    question: "¿Cuáles son los productos propios de Gliro?",
    answer: "Contamos con 'Licitracker' (monitoreo automatizado de compras públicas en MercadoPúblico), 'Traza' (gestión documental y trazabilidad para certificadoras ISO 9001) y 'Broker IA' (asistente inteligente 24/7 para inmobiliarias).",
  },
  {
    question: "¿Cómo es el proceso de trabajo con el equipo de Gliro?",
    answer: "Iniciamos con una reunión de levantamiento técnico para entender tu necesidad, elaboramos una propuesta con arquitectura y plazos claros, y trabajamos con entregas incrementales para que veas avances desde las primeras semanas.",
  },
  {
    question: "¿Cómo puedo solicitar una cotización o demostración?",
    answer: "Puedes escribirnos directamente por WhatsApp al +56 9 7563 8193 o completar el formulario de contacto indicando tu requerimiento. Te responderemos en menos de 24 horas hábiles.",
  },
  {
    question: "¿El código y la propiedad del software desarrollado son míos?",
    answer: "Sí, en todos los desarrollos a medida la propiedad intelectual, el código fuente y las bases de datos pertenecen 100% a tu empresa.",
  },
  {
    question: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
    answer: "Sí, todos nuestros proyectos cuentan con garantía de soporte técnico, mantenimiento correctivo, monitoreo de infraestructura cloud y evolución de funcionalidades.",
  },
];
