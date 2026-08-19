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
  { value: "16", label: "Nuestros servicios ya en producción" },
  { value: "+40", label: "Clientes ya confian en nuestros servicios" },
  { value: "2020", label: "Año de inicio de operaciones" },
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
    status: "En operación",
    statusType: "active",
    url: "https://traza.gliro.cl",
    image: "/media/Logo_Traza.png",
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
    tag: "Desarrollamos por ti",
    title: "Software Development",
    description: "Diseñamos y desarrollamos desde aplicaciones web y mobile (Landing pages, E-commerce, Portales, etc.), integraciones de sistemas ERP/CRM y digitalización de tus flujos operativos.",
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
    category: "SaaS · Automatización",
    categoryKey: "ecommerce",
    image: "https://patrimonio.bienes.cl/wp-content/uploads/2022/01/IMG_4376-scaled.jpg",
    results: "+400 términos monitoreados en tiempo real cada día",
    url: "https://licitracker.cl",
  },
  {
    id: 2,
    title: "Traza - Gestión Documental ISO 9001",
    category: "SaaS · Certificación",
    categoryKey: "corporate",
    image: "https://kaizencertificacion.com/wp-content/uploads/2021/12/mantener-el-certificado-ISO-9001.jpg",
    results: "Trazabilidad 100% auditable",
    url: "https://traza.gliro.cl",
  },
  {
    id: 3,
    title: "ERP integration & Gestión operativa",
    category: "Software Development · Salud",
    categoryKey: "web",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    results: "Gestión documental Traza + ERP integral de operaciones",
    url: "https://gliro.cl/contacto/",
  },
  {
    id: 4,
    title: "Automatizaciones RPA & DPA",
    category: "RPA · Transformación Digital",
    categoryKey: "corporate",
    image: "",
    results: "Automatizaciones personalizadas para procesos repetitivos y toma de decisiones basada en datos",
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
  /*{
    id: 6,
    title: "Inversiones Sunset & Medplan",
    category: "Automatización de Procesos",
    categoryKey: "corporate",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    results: "Flujos de integración tecnológica y optimización de datos",
    url: "https://gliro.cl/contacto/",
  },*/
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
    name: "Alejandro Hernández",
    company: "CARDIOTEC.CL",
    role: "Operaciones & Tecnología",
    text: "Habíamos probado otros sistemas que prometían hacer lo mismo pero sin éxito. Desde que contamos con Licitracker, ya no tengo que preocuparme de buscar Licitaciones y Compras Ágiles, realmente se pasaron... No hemos tenido ningún problema en todo el año que hemos trabajado juntos, ¡recomendadísimo!",
    rating: 5,
    avatar: "AH",
  },
  {
    id: 2,
    name: "Carlos Arancibia",
    company: "ALIVETFARMA.CL",
    role: "Director General",
    text: "Gliro ha estado acompañándome en la transformación digital de mi negocio desde hace años. Su capacidad técnica en el ámbito digital y tecnológico es realmente única, muy pulcros y tienen soluciones muy innovadoras. Ellos están 24/7 brindándome un excelente servicio y atención.",
    rating: 5,
    avatar: "CA",
  },
  {
    id: 3,
    name: "Ronel Gallegos",
    company: "DROGUERIASUNSET.COM",
    role: "Gerencia Comercial",
    text: "Gracias a Licitracker, ahora no pierdo tiempo buscando oportunidades de negocio, éstas me llegan directamente al correo y dedicamos nuestro tiempo a preparar las ofertas. Los vendedores reciben la información incluso estando en terreno. ¡Unos verdaderos capos!",
    rating: 5,
    avatar: "RG",
  },
  {
    id: 4,
    name: "Equipo DZF",
    company: "DZF Certificaciones",
    role: "Dirección de Calidad",
    text: "Ordenamos todo nuestro proceso de auditoría ISO 9001 usando Traza: cada cotización, inspección y evidencia queda lista para cualquier auditoría.",
    rating: 5,
    avatar: "DZF",
  },
  {
    id: 5,
    name: "Área Médica",
    company: "Medplan",
    role: "Gerencia",
    text: "La capacidad de Gliro para entender nuestros procesos operativos y transformarlos en software simple, robusto y confiable nos ha permitido optimizar nuestro flujo de trabajo del día a día",
    rating: 5,
    avatar: "TDM",
  },
  {
    id: 6,
    name: "Gerencia de Operaciones",
    company: "Medplan",
    role: "Operaciones",
    text: "Automatizamos el flujo de información y la gestión de alertas de compras públicas, ahorrando muchas horas al mes y la necesidad de estar atentos continuamente.",
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
    question: "¿Cuáles son los Saas que dispone Gliro?",
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
  /*{
    question: "¿El código y la propiedad del software desarrollado son míos?",
    answer: "Sí, en todos los desarrollos a medida la propiedad intelectual, el código fuente y las bases de datos pertenecen 100% a tu empresa.",
  },*/
  {
    question: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
    answer: "Sí, todos nuestros proyectos cuentan con garantía de soporte técnico, mantenimiento correctivo, monitoreo de infraestructura cloud y evolución de funcionalidades.",
  },
];
