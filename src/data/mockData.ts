import { Category, Product } from '../types';

export const COMPANY_INFO = {
  legalName: 'Manufacturas Todo Terreno',
  rif: 'J-40739900-4',
  brandName: 'tienda8miles',
  distributorFor: 'LOBY',
  experienceYears: 'Más de 20 años en el rubro',
  tagline: 'Somos atletas como tú. Siempre en movimiento, evolución e innovación.',
  phone: '0424-1324497',
  whatsappUrl: 'https://wa.me/584241324497',
  email: 'tienda8miles@gmail.com',
  logoUrl: 'https://i.postimg.cc/76rZyjB3/logo-8miles.png',
  instagram: 'https://instagram.com/tienda8miles',
  instagramHandle: '@tienda8miles',
  threads: 'https://threads.net/@tienda8miles',
  threadsHandle: '@tienda8miles',
  facebook: 'https://facebook.com/tienda8miles',
  facebookHandle: 'tienda8miles',
  address: 'Caracas, Venezuela — Envíos a todo el país',
};

export const CATEGORIES: Category[] = [
  {
    id: 'deportes',
    name: 'Deportes',
    slug: 'deportes',
    iconName: 'Activity',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    itemCount: 84,
    description: 'Equipamiento e indumentaria técnica para tus disciplinas outdoor y rendimiento deportivo.',
    subcategories: [
      { id: 'running', name: 'Running', slug: 'running', iconName: 'Activity', description: 'Ropa liviana, viseras y camisetas de running' },
      { id: 'senderismo', name: 'Senderismo', slug: 'senderismo', iconName: 'Footprints', description: 'Ropa respirable, pantalones convertibles y bastones' },
      { id: 'natacion', name: 'Natación', slug: 'natacion', iconName: 'Waves', description: 'Trajes de baño técnicos, licras UV y lentes' },
      { id: 'escalada', name: 'Escalada', slug: 'escalada', iconName: 'Mountain', description: 'Arneses, ropa elástica ultra resistente y magnesio' },
      { id: 'camping', name: 'Camping', slug: 'camping', iconName: 'Tent', description: 'Carpas 4 estaciones, aislantes y sacos de dormir' },
      { id: 'ciclismo', name: 'Ciclismo', slug: 'ciclismo', iconName: 'Bike', description: 'Jerseys térmicos, chaquetas cortaviento y enterizos' },
      { id: 'trailrunning', name: 'Trailrunning', slug: 'trailrunning', iconName: 'Flame', description: 'Chalecos de hidratación y accesorios de carrera de montaña' },
    ]
  },
  {
    id: 'hombre',
    name: 'Hombre',
    slug: 'hombre',
    iconName: 'User',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    itemCount: 42,
    description: 'Colección masculina LOBY de alto rendimiento e indumentaria técnica.',
    subcategories: [
      { id: 'ropa-termica', name: 'Ropa Térmica', slug: 'ropa-termica', description: 'Primeras capas, chaquetas impermeables y poleras térmicas' },
      { id: 'ropa-senderismo', name: 'Ropa Senderismo', slug: 'ropa-senderismo', description: 'Pantalones de travesía y camisas de protección solar' },
      { id: 'ropa-deportiva', name: 'Ropa Deportiva', slug: 'ropa-deportiva', description: 'Franelas transpirables, sudaderas y shorts de entrenamiento' },
    ]
  },
  {
    id: 'mujer',
    name: 'Mujer',
    slug: 'mujer',
    iconName: 'UserCheck',
    image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    itemCount: 38,
    description: 'Ajuste ergonómico, tecnología textil y confort para atletas femeninas.',
    subcategories: [
      { id: 'mujer-ropa-termica', name: 'Ropa Térmica', slug: 'mujer-ropa-termica', description: 'Leggings térmicos, poleras microfleece y cortavientos' },
      { id: 'mujer-ropa-senderismo', name: 'Ropa Senderismo', slug: 'mujer-ropa-senderismo', description: 'Pantalones elásticos de secado rápido y chaquetas' },
      { id: 'mujer-ropa-deportiva', name: 'Ropa Deportiva', slug: 'mujer-ropa-deportiva', description: 'Tops deportivos, franelas ligeras y shorts ergonómicos' },
    ]
  },
  {
    id: 'ninos',
    name: 'Niños',
    slug: 'ninos',
    iconName: 'Smile',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
    itemCount: 29,
    description: 'Protección térmica, durabilidad y movilidad para los más pequeños.',
    subcategories: [
      { id: 'ninos-ropa-termica', name: 'Ropa Térmica', slug: 'ninos-ropa-termica', description: 'Conjuntos térmicos y chaquetas impermeables infantiles' },
      { id: 'ninos-ropa-senderismo', name: 'Ropa Senderismo', slug: 'ninos-ropa-senderismo', description: 'Ropa resistente a roces para excursiones y camping' },
      { id: 'ninos-ropa-deportiva', name: 'Ropa Deportiva', slug: 'ninos-ropa-deportiva', description: 'Monos deportivos, franelas ligeras y licras' },
      { id: 'ninos-ropa-escolar', name: 'Ropa Escolar', slug: 'ninos-ropa-escolar', description: 'Monos escolares térmicos, chaquetas y uniformes' },
      { id: 'ninos-disfraces', name: 'Disfraces', slug: 'ninos-disfraces', description: 'Disfraces temáticos de aventura y exploración' },
    ]
  },
  {
    id: 'corporativo',
    name: 'Corporativo',
    slug: 'corporativo',
    iconName: 'Briefcase',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    itemCount: 15,
    description: 'Uniformes institucionales, bordado de marca y confección al mayor por Manufacturas Todo Terreno.',
    subcategories: [
      { id: 'uniformes-corporativos', name: 'Uniformes Técnicos', slug: 'uniformes-corporativos', description: 'Chaquetas y polos corporativos bordados con tecnología LOBY' },
      { id: 'dotacion-empresarial', name: 'Dotación Empresarial', slug: 'dotacion-empresarial', description: 'Uniformes de campo, chalecos e indumentaria institucional' },
    ]
  }
];

export const BRANDS = ['LOBY', 'LOBY Technical Pro', 'LOBY Ultra-Light', 'LOBY Expedition'];

export const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Única'];

export const AVAILABLE_COLORS = [
  { name: 'Naranja Terracota', hex: '#EA580C' },
  { name: 'Negro Carbón', hex: '#1E293B' },
  { name: 'Gris Grafito', hex: '#64748B' },
  { name: 'Verde Bosque', hex: '#166534' },
  { name: 'Azul Aventura', hex: '#0284C7' },
  { name: 'Rojo Expedición', hex: '#DC2626' },
  { name: 'Amarillo Cúmulo', hex: '#D97706' },
  { name: 'Blanco Nieve', hex: '#F8FAFC' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'loby-chaqueta-summit-pro',
    name: 'Chaqueta Impermeable LOBY Summit Pro 3L',
    subtitle: 'Membrana impermeable de 20,000 mm con sellado térmico total',
    category: 'ropa-termica',
    brand: 'LOBY Technical Pro',
    price: 139.99,
    originalPrice: 189.99,
    discountPercent: 26,
    rating: 4.9,
    reviewsCount: 84,
    isNew: true,
    isFeatured: true,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Verde Bosque', hex: '#166534' }
    ],
    description: 'La chaqueta insignia de LOBY diseñada para travesías extremas en los Andes. Fabricada con tecnología de 3 capas hidro-repelente que soporta lluvias copiosas y fuertes vientos helados manteniéndote totalmente seco y ventilado gracias a sus cierres axilares.',
    features: [
      'Membrana LobyHydro 3L de 20,000mm impermeable / 15,000g respirable',
      'Costuras 100% termoselladas a prueba de agua',
      'Capucha ajustable compatible con casco de escalada',
      'Cierres YKK Aquaguard impermeables de alta resistencia',
      'Ventilación lateral con cremallera bi-direccional',
      'Peso ultraligero de tan solo 380 gramos'
    ],
    techSpecs: {
      weight: '380g',
      material: 'Nylon Ripstop 40D de alta densidad con TPU membrane',
      waterproof: '20,000 mm columna de agua',
      breathability: '15,000 g/m²/24h',
      recommendedUse: 'Alta montaña, trekking extremo, senderismo bajo lluvia',
      warranty: '2 años por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Impermeable', 'Alta Montaña', 'Capa Externa', 'Lo Último']
  },
  {
    id: 'loby-chaleco-trail-running-12l',
    name: 'Chaleco de Hidratación LOBY Trail-Runner 12L',
    subtitle: 'Incluye 2 Soft Flasks de 500ml de silicona libre de BPA',
    category: 'trail-running',
    brand: 'LOBY Ultra-Light',
    price: 64.99,
    originalPrice: 84.99,
    discountPercent: 23,
    rating: 4.8,
    reviewsCount: 112,
    isNew: false,
    isFeatured: true,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS-S', 'M-L', 'XL'],
    colors: [
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Azul Aventura', hex: '#0284C7' }
    ],
    description: 'Ergonomía absoluta para corredores de montaña. El chaleco LOBY Trail-Runner se ajusta como una segunda piel evitando rebotes molestos durante la carrera. Cuenta con 9 bolsillos de acceso rápido en el pecho y espalda.',
    features: [
      'Tejido mesh elástico hiper-respirable con tecnología anti-roce',
      'Sistema de ajuste pectoral micrométrico con cordón elástico',
      'Bolsillo térmico trasero para bolsa de hidratación de hasta 2L',
      'Silbato de emergencia integrado de norma internacional',
      'Portabastones de acceso rápido en diagonal',
      'Detalles reflectivos 360° para seguridad nocturna'
    ],
    techSpecs: {
      weight: '195g (sin botellas)',
      material: 'Malla 3D Airmesh + Elastano Ripstop',
      recommendedUse: 'Ultra trail, maratón de montaña, entrenamiento',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Trail Running', 'Ultraligero', 'Hidratación']
  },
  {
    id: 'loby-mochila-expedition-55',
    name: 'Mochila de Expedición LOBY Aconcagua 55+10L',
    subtitle: 'Estructura anatómica de aluminio con espaldar regulable Ergo-Fit',
    category: 'morrales-mochilas',
    brand: 'LOBY Expedition',
    price: 159.99,
    originalPrice: 210.00,
    discountPercent: 24,
    rating: 4.9,
    reviewsCount: 63,
    isNew: false,
    isFeatured: true,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única (Regulable S-XL)'],
    colors: [
      { name: 'Verde Bosque', hex: '#166534' },
      { name: 'Gris Grafito', hex: '#64748B' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Mochila técnica de carga pesada diseñada por LOBY para travesías de varios días. Distribución de peso balanceada hacia la cadera mediante su cinturón acolchado ergonómico de alta densidad.',
    features: [
      'Capacidad expandible de 55 Litros a 65 Litros',
      'Cubierta impermeable Raincover de alta visibilidad incluida',
      'Acceso frontal en forma de U con cierre reforzado al compartimento principal',
      'Porta piolets dobles y enganches daisychain para equipo exterior',
      'Compartimento inferior independiente para saco de dormir',
      'Bolsillos laterales elásticos para botellas de gran tamaño'
    ],
    techSpecs: {
      weight: '1,820g',
      material: 'Cordura Nylon 600D resistente a la abrasión',
      recommendedUse: 'Trekking de varios días, expediciones, camping',
      warranty: '3 años por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Expedición', 'Gran Capacidad', 'Ergonomía']
  },
  {
    id: 'loby-polar-termico-microfleece',
    name: 'Polera Térmica LOBY Microfleece Alpine Grid',
    subtitle: 'Segunda capa aislante ultraligera con cuello alto y media cremallera',
    category: 'ropa-termica',
    brand: 'LOBY',
    price: 38.50,
    originalPrice: 49.99,
    discountPercent: 23,
    rating: 4.7,
    reviewsCount: 145,
    isNew: true,
    isFeatured: false,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Azul Aventura', hex: '#0284C7' },
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Rojo Expedición', hex: '#DC2626' },
      { name: 'Gris Grafito', hex: '#64748B' }
    ],
    description: 'La segunda capa indispensable para cualquier aventura outdoor. Estructura interna en cuadrícula "grid fleece" que atrapa el calor corporal mientras expulsa el sudor de forma eficiente durante la actividad.',
    features: [
      'Tejido cuadrícula aislante Grid Fleece 180g/m²',
      'Cierre frontal 1/2 con protector de barbilla suave',
      'Costuras planas flatlock para evitar rozaduras con mochilas',
      'Puños elásticos con orificio para pulgar integrados',
      'Secado ultra rápido y compresión mínima en la mochila'
    ],
    techSpecs: {
      weight: '230g',
      material: 'Poliéster reciclado 92% + Spandex 8%',
      recommendedUse: 'Segunda capa térmica, senderismo, camping, uso diario',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Térmico', 'Segunda Capa', 'Transpirable']
  },
  {
    id: 'loby-carpa-ultralight-2p',
    name: 'Carpa Ultraligera LOBY Andes 2P 4 Estaciones',
    subtitle: 'Estructura geodésica autoportante con varillas de duraluminio 7001',
    category: 'camping-expedicion',
    brand: 'LOBY Ultra-Light',
    price: 189.99,
    originalPrice: 240.00,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 47,
    isNew: true,
    isFeatured: true,
    isTopDiscount: false,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['2 Personas'],
    colors: [
      { name: 'Amarillo Cúmulo', hex: '#D97706' },
      { name: 'Verde Bosque', hex: '#166534' }
    ],
    description: 'Diseñada específicamente para resistir las condiciones climáticas de páramo y alta montaña. Dos accesos con abside espacioso para guardar calzado y mochilas fuera del habitáculo.',
    features: [
      'Tejido Siliconado Nylon Ripstop 20D con 4,000mm impermeabilidad',
      'Piso con cubreta de 5,000mm sellado al calor',
      'Estructura de duraluminio de grado aeronáutico ultra resistente al viento',
      'Ventilación cruzada anti-condensación superior',
      'Bolsillos internos porta-lámparas y objetos de valor'
    ],
    techSpecs: {
      weight: '1,950g completas',
      material: '20D Sil-Nylon Ripstop + Duraluminio 7001-T6',
      waterproof: 'Techo 4,000mm / Piso 5,000mm',
      recommendedUse: 'Camping de alta montaña, senderismo, ciclourismo',
      warranty: '2 años por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Carpa', 'Alta Montaña', '4 Estaciones']
  },
  {
    id: 'loby-botas-trekking-waterproof',
    name: 'Botas de Montaña LOBY Trekking Waterproof VibraGrip',
    subtitle: 'Cuero Nobuk con membrana impermeabilizante y suela de agarre multidireccional',
    category: 'calzado-tecnico',
    brand: 'LOBY Technical Pro',
    price: 124.99,
    originalPrice: 155.00,
    discountPercent: 19,
    rating: 4.8,
    reviewsCount: 96,
    isNew: false,
    isFeatured: true,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Gris Grafito', hex: '#64748B' }
    ],
    description: 'Soporte de tobillo superior y amortiguación EVA de doble densidad. La bota LOBY Trekking brinda máxima seguridad en terrenos rocosos, barrosos y quebradas gracias a su suela de taco profundo.',
    features: [
      'Membrana LobyDry cortafuegos y 100% impermeable',
      'Refuerzo de goma perimetral en puntera anti-impacto',
      'Suela antideslizante con compuesto de caucho de alta fricción',
      'Plantilla ortopédica anatómica lavable y respirable',
      'Ganchos de ajuste rápido de metal inoxidables'
    ],
    techSpecs: {
      weight: '520g por calzado (Talla 42)',
      material: 'Cuero Nobuk sintético + Cordura + Caucho Vulco',
      recommendedUse: 'Trekking en terreno rocoso, senderismo largo, cruce de ríos',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Botas', 'Calzado Impermeable', 'Trekking']
  },
  {
    id: 'loby-pantalon-convertible-cargo',
    name: 'Pantalón Convertible LOBY Explore Ripstop QuickDry',
    subtitle: 'Se convierte fácilmente en bermuda mediante cierre oculto en rodilla',
    category: 'montanismo-trekking',
    brand: 'LOBY',
    price: 48.99,
    originalPrice: 65.00,
    discountPercent: 24,
    rating: 4.8,
    reviewsCount: 130,
    isNew: false,
    isFeatured: false,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Gris Grafito', hex: '#64748B' },
      { name: 'Verde Bosque', hex: '#166534' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Versatilidad total para senderistas. Fabricado en tejido Ripstop antidesgarro con protección solar UPF 50+. Su secado ultra rápido te mantiene cómodo aun cruzando riachuelos o bajo alta humedad.',
    features: [
      'Sistema 2 en 1: Pantalón largo + Shorts de montaña',
      'Protección solar certificada UPF 50+',
      '6 bolsillos estratégicos (2 con cierre de seguridad)',
      'Cinturón de ajuste elástico con hebilla rápida de acople',
      'Tratamiento repelente al agua superficial DWR'
    ],
    techSpecs: {
      weight: '310g',
      material: 'Nylon Ripstop 94% + Elastano 6%',
      recommendedUse: 'Trekking, clima cálido y frío cambiante, turismo de aventura',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Convertible', 'Secado Rápido', 'Protección UPF']
  },
  {
    id: 'loby-saco-dormir-down-5c',
    name: 'Saco de Dormir LOBY Summit Down -5°C',
    subtitle: 'Pluma de ganso sintética Therma-Loby de alto poder de llenado (650 FP)',
    category: 'camping-expedicion',
    brand: 'LOBY Ultra-Light',
    price: 115.00,
    originalPrice: 145.00,
    discountPercent: 20,
    rating: 4.9,
    reviewsCount: 52,
    isNew: true,
    isFeatured: true,
    isTopDiscount: false,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Estándar (195cm)', 'Largo (210cm)'],
    colors: [
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Azul Aventura', hex: '#0284C7' }
    ],
    description: 'Mantén el calor en las noches heladas de montaña. Diseño de momia anatómico con collarín térmico acolchado en el cuello y cierre anti-enganche con solapa aislante de viento.',
    features: [
      'Rango térmico: Confort 2°C / Límite -5°C / Extremo -15°C',
      'Relleno de fibra térmica ultra-compresible Therma-Loby 650 Fill Power',
      'Bolsa de compresión estanque impermeable reducida incluida',
      'Bolsillo interno térmico para celular o linterna',
      'Acoplable (opción de cierre izquierdo y derecho para unir dos sacos)'
    ],
    techSpecs: {
      weight: '980g',
      material: 'Nylon Ripstop 20D DWR + Relleno sintético térmico',
      recommendedUse: 'Páramo, alta montaña, camping nocturno frío',
      warranty: '2 años por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Saco de Dormir', 'Baja Temperatura', 'Ultraligero']
  },
  {
    id: 'loby-jersey-ciclismo-pro',
    name: 'Jersey Ciclismo LOBY Endurance Pro Aerofit',
    subtitle: 'Tejido técnico microperforado con protección UV y 3 bolsillos traseros',
    category: 'ciclismo-outdoor',
    brand: 'LOBY',
    price: 36.00,
    originalPrice: 48.00,
    discountPercent: 25,
    rating: 4.7,
    reviewsCount: 78,
    isNew: false,
    isFeatured: false,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Rojo Expedición', hex: '#DC2626' },
      { name: 'Amarillo Cúmulo', hex: '#D97706' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Ajuste aerodinámico sin oprimir. El jersey LOBY Endurance está fabricado con paneles laterales de malla ultra transpirable que disipan el calor velozmente durante ascensos en bicicleta de ruta o MTB.',
    features: [
      'Tejido transpirable de secado rápido con tecnología Cool-Dry',
      'Cierre YKK completo con autobloqueo cam-lock',
      'Banda de silicona antideslizante en la cintura para fijación constante',
      'Bolsillo de seguridad adicional con cierre invisible para llaves',
      'Elementos reflectivos de alta visibilidad para ruta'
    ],
    techSpecs: {
      weight: '140g',
      material: 'Poliéster 88% + Elastano 12%',
      recommendedUse: 'Ciclismo de montaña, ciclismo de ruta, cicloturismo',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Ciclismo', 'Respirable', 'Aerodinámico']
  },
  {
    id: 'loby-bastones-trekking-carbon',
    name: 'Bastones Telescópicos LOBY Carbon-Lock (Par)',
    subtitle: 'Fabricados en fibra de carbono 100% con empuñadura ergonómica de corcho natural',
    category: 'accesorios-aventura',
    brand: 'LOBY Technical Pro',
    price: 58.00,
    originalPrice: 75.00,
    discountPercent: 22,
    rating: 4.9,
    reviewsCount: 104,
    isNew: true,
    isFeatured: true,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Regulable (65cm - 135cm)'],
    colors: [
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Naranja Terracota', hex: '#EA580C' }
    ],
    description: 'Reduce hasta un 25% el impacto en rodillas y tobillos durante los descensos. Sistema de bloqueo rápido Quick-Lock de aluminio que no se desliza bajo cargas pesadas.',
    features: [
      'Estructura de 3 tramos de fibra de carbono 3K ultra ligera',
      'Empuñadura de corcho natural absorbente de sudor + prolongación de EVA',
      'Punta de tungsteno carburado ultra resistente',
      'Incluye rosetas de nieve, rosetas de barro y protectores de goma para asfalto',
      'Correas de muñeca acolchadas y regulables'
    ],
    techSpecs: {
      weight: '210g por bastón',
      material: 'Fibra de Carbono 3K + Aluminio 7075 + Corcho',
      recommendedUse: 'Trekking largo, ascensos exigentes, senderismo con mochila',
      warranty: '2 años por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Bastones', 'Carbono', 'Ergonomía']
  },
  {
    id: 'loby-linterna-headlamp-800lm',
    name: 'Linterna Frontal LOBY LED Cree 800 Lumens Recargable',
    subtitle: 'Batería de litio USB-C con sensor de movimiento sin contacto e impermeable IPX6',
    category: 'accesorios-aventura',
    brand: 'LOBY',
    price: 32.50,
    originalPrice: 42.00,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 89,
    isNew: false,
    isFeatured: false,
    isTopDiscount: true,
    images: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['Única (Banda Elástica Ajustable)'],
    colors: [
      { name: 'Naranja Terracota', hex: '#EA580C' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Caminatas nocturnas y campamentos bien iluminados. Cuenta con sensor infrarrojo para encender o apagar pasando la mano frente a la linterna sin tocarla con guantes o barro.',
    features: [
      '5 Modos de luz: Alta, Media, Baja, Luz Roja nocturna y Estroboscópica SOS',
      'Alcance de haz de luz concentrado de hasta 120 metros',
      'Autonomía de hasta 18 horas en modo económico',
      'Ángulo de inclinación ajustable en 60 grados',
      'Grado de resistencia al agua IPX6 para lluvias fuertes'
    ],
    techSpecs: {
      weight: '75g',
      material: 'Policarbonato reforzado + Banda elástica lavable',
      recommendedUse: 'Camping nocturno, trail running nocturno, pesca, emergencias',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Linterna', 'Iluminación', 'USB Recargable']
  },
  {
    id: 'loby-primera-capa-termica-conjunto',
    name: 'Conjunto Primera Capa LOBY Thermofit Dry (Camiseta + Pantalón)',
    subtitle: 'Tejido compresivo seamless con fibra térmica de plata anti-bacteriana',
    category: 'ropa-termica',
    brand: 'LOBY Technical Pro',
    price: 55.00,
    originalPrice: 72.00,
    discountPercent: 23,
    rating: 4.9,
    reviewsCount: 118,
    isNew: true,
    isFeatured: true,
    isTopDiscount: false,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Gris Grafito', hex: '#64748B' }
    ],
    description: 'El pilar base del sistema de capas para conservar la temperatura corporal. Se adhiere al cuerpo evacuando el sudor de la piel para mantener la sensación de calidez y sequedad.',
    features: [
      'Confección sin costuras (seamless) que elimina puntos de presión',
      'Tratamiento de iones de plata anti-olor para uso prolongado en travesía',
      'Zonas de ventilación diferenciada en axilas y espalda',
      'Mantiene la piel seca acelerando la evaporación',
      'Elasticidad en 4 direcciones para libertad total de movimiento'
    ],
    techSpecs: {
      weight: '290g el conjunto completo',
      material: 'Poliamida 65% + Poliéster 30% + Elastano 5%',
      recommendedUse: 'Primera capa aislante, esquí, travesías heladas, pernocta',
      warranty: '1 año por Manufacturas Todo Terreno'
    },
    inStock: true,
    tags: ['Primera Capa', 'Térmico', 'Anti-Olor']
  },
  {
    id: 'loby-licra-natacion-uv50',
    name: 'Licra de Natación LOBY Hydro-Protect UV50+',
    subtitle: 'Protección solar total contra radiación solar y cloro para natación y deportes acuáticos',
    category: 'natacion',
    brand: 'LOBY Technical Pro',
    price: 29.99,
    originalPrice: 38.00,
    discountPercent: 21,
    rating: 4.9,
    reviewsCount: 42,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Azul Aventura', hex: '#0284C7' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Secado ultra rápido y ajuste de compresión suave. Diseñada para largas sesiones de natación en piscina o mar abierto, protegiendo la piel contra quemaduras solares y rozaduras.',
    features: [
      'Protección certificada contra rayos UVA/UVB +50',
      'Tejido con tratamiento hidro-repelente de secado veloz',
      'Costuras planas invisibles anti-fricción',
      'Resistente al desgaste por agua salada y cloro'
    ],
    techSpecs: {
      weight: '160g',
      material: 'Nylon 82% + Spandex 18%',
      recommendedUse: 'Natación, surf, kayac, deportes acuáticos'
    },
    inStock: true,
    tags: ['Natación', 'Protección UV', 'Acuático']
  },
  {
    id: 'loby-arnes-escalada-alpine',
    name: 'Arnés de Escalada LOBY Vertigo Alpine Fit',
    subtitle: 'Estructura anatómica acolchada con 4 porta-materiales rígidos de acceso rápido',
    category: 'escalada',
    brand: 'LOBY Technical Pro',
    price: 68.00,
    originalPrice: 85.00,
    discountPercent: 20,
    rating: 5.0,
    reviewsCount: 38,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S-M', 'L-XL'],
    colors: [
      { name: 'Rojo Expedición', hex: '#DC2626' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Arnés técnico ligero con distribución de carga optimizada para escalada en roca y vía ferrata. Hebillas autobloqueantes de duraluminio para máximo confort en suspensión.',
    features: [
      'Homologación de seguridad UIAA / CE',
      '4 porta-materiales sobreelevados con capacidad para 12 mosquetones',
      'Anillo de aseguramiento reforzado de alta resistencia a la abrasión'
    ],
    techSpecs: {
      weight: '340g',
      recommendedUse: 'Escalada en roca, vía ferrata, alpinismo'
    },
    inStock: true,
    tags: ['Escalada', 'Seguridad', 'Alpinismo']
  },
  {
    id: 'loby-ninos-mono-escolar-termico',
    name: 'Mono Escolar Térmico LOBY Kids Flex',
    subtitle: 'Textil de alta resistencia con felpa interna para colegio y actividades deportivas',
    category: 'ninos-ropa-escolar',
    brand: 'LOBY',
    price: 24.99,
    originalPrice: 32.00,
    discountPercent: 22,
    rating: 4.8,
    reviewsCount: 76,
    isNew: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['4', '6', '8', '10', '12', '14', '16'],
    colors: [
      { name: 'Azul Aventura', hex: '#0284C7' },
      { name: 'Gris Grafito', hex: '#64748B' },
      { name: 'Negro Carbón', hex: '#1E293B' }
    ],
    description: 'Diseñado por Manufacturas Todo Terreno para soportar el ritmo escolar diario de los niños. Rodillas reforzadas anti-desgaste y cintura ajustable para mayor comodidad.',
    features: [
      'Felpa térmica interna abrigo extra en días fríos',
      'Refuerzo en rodillas contra abrasión y caídas',
      'Bolsillos laterales con cremallera'
    ],
    techSpecs: {
      material: 'Algodón 65% + Poliéster 35%',
      recommendedUse: 'Ropa escolar, educación física, diario'
    },
    inStock: true,
    tags: ['Ropa Escolar', 'Niños', 'Resistente']
  },
  {
    id: 'loby-ninos-disfraz-explorador',
    name: 'Disfraz & Kit de Aventura Niños LOBY Little Explorer',
    subtitle: 'Incluye chaleco con múltiples bolsillos, sombrero de safari y cantimplora ligera',
    category: 'ninos-disfraces',
    brand: 'LOBY',
    price: 34.00,
    originalPrice: 42.00,
    discountPercent: 19,
    rating: 4.9,
    reviewsCount: 54,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['4-6 Años', '8-10 Años', '12 Años'],
    colors: [
      { name: 'Verde Bosque', hex: '#166534' },
      { name: 'Naranja Terracota', hex: '#EA580C' }
    ],
    description: 'Inspira el espíritu aventurero en los niños. Traje y disfraz temático de explorador de montaña confeccionado en algodón resistente para juegos, disfraces escolares y paseos outdoor.',
    features: [
      'Chaleco con 6 bolsillos de solapa',
      'Sombrero ajustable con cordón para viento',
      'Tejido fresco y lavable'
    ],
    techSpecs: {
      recommendedUse: 'Disfraces, juegos, expediciones familiares'
    },
    inStock: true,
    tags: ['Disfraces', 'Niños', 'Aventura']
  },
  {
    id: 'loby-corporativo-chaqueta-softshell',
    name: 'Chaqueta Softshell Corporativa LOBY Custom Enterprise',
    subtitle: 'Confección institucional al mayor con bordado o estampado del logo de tu empresa',
    category: 'uniformes-corporativos',
    brand: 'LOBY Technical Pro',
    price: 45.00,
    originalPrice: 55.00,
    discountPercent: 18,
    rating: 5.0,
    reviewsCount: 31,
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Pedidomayor'],
    colors: [
      { name: 'Negro Carbón', hex: '#1E293B' },
      { name: 'Gris Grafito', hex: '#64748B' },
      { name: 'Azul Aventura', hex: '#0284C7' }
    ],
    description: 'Dotación corporativa de primera calidad fabricada en Caracas por Manufacturas Todo Terreno. Chaqueta cortaviento e impermeable diseñada para personalizar con la identidad gráfica de tu empresa.',
    features: [
      'Personalización mediante bordado de alta resolución',
      'Descuentos por volumen para empresas y equipos corporativos',
      'Membrana microporosa térmica de larga vida útil'
    ],
    techSpecs: {
      recommendedUse: 'Dotación empresarial, uniformes ejecutivos, personal de campo'
    },
    inStock: true,
    tags: ['Corporativo', 'Uniformes', 'Al Mayor']
  }
];

export const SERVICE_HIGHLIGHTS = [
  {
    id: 'cambios-devoluciones',
    title: 'Cambios y Devoluciones',
    description: 'Garantía directa de fábrica. 30 días para cambios de talla o modelo sin complicaciones.',
    iconName: 'RefreshCw'
  },
  {
    id: 'envios-nacionales',
    title: 'Envíos a Todo el País',
    description: 'Despachos rápidos y asegurados por Zoom, MRW, Tealca y entregas personales en Caracas.',
    iconName: 'Truck'
  },
  {
    id: 'atencion-whatsapp',
    title: 'Atención Directa por WhatsApp',
    description: 'Asesoría técnica personalizada con nuestros especialistas al 0424-1324497.',
    iconName: 'MessageCircle'
  }
];

export const SPECIAL_COLLECTIONS = [
  {
    id: 'loby-technical',
    title: 'LOBY Technical Pro',
    description: 'Membranas impermeables 3L, telas térmicas avanzadas y equipamiento para climas extremos.',
    badge: 'Alta Exigencia',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loby-ultralight',
    title: 'LOBY Ultra-Light',
    description: 'Materiales minimalistas de alta tenacidad desarrollados para reducir cada gramo en ruta.',
    badge: 'Máxima Ligereza',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'loby-expedition',
    title: 'LOBY Expedition',
    description: 'Mochilas de gran volumen, carpas geodésicas y sacos de dormir para ascensos a cumbre.',
    badge: 'Travesías Largas',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'
  }
];
