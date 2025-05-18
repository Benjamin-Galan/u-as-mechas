export const promociones = [
  {
    id: 1,
    title: "Manicure",
    description: "Cuidado y esmaltado de uñas.",
    price: 35,
  },
  {
    id: 2,
    title: "Pedicure ",
    description: "Atención y esmaltado de pies.",
    price: 35,
  },
  {
    id: 3,
    title: "Gel en uñas",
    description: "Aplicación de gel para uñas duraderas.",
    price: 35,
  },
  {
    id: 4,
    title: "Tinde de cabello",
    description: "Coloración profesional para tu cabello.",
    price: 35,
  },
]

export const Servicios = [
  {
    id: 1,
    title: "Manicure",
    description: "Cuidado y esmaltado de uñas.",
    price: 35,
    image: "/servicio1.png",
  },
  {
    id: 2,
    title: "Pedicure",
    description: "Atención y esmaltado de pies.",
    price: 35,
    image: "/servicio2.png",
  },
  {
    id: 3,
    title: "Gel en uñas",
    description: "Aplicación de gel para uñas duraderas.",
    price: 35,
    image: "/servicio3.png",
  },
  {
    id: 4,
    title: "Tinte de cabello",
    description: "Coloración profesional para tu cabello.",
    price: 35,
    image: "/servicio4.png",
  },
  {
    id: 5,
    title: "Alisado de cabello",
    description: "Cabello liso, brillante y sin frizz.",
    price: 35,
    image: "/servicio5.webp",
  },
  {
    id: 6,
    title: "Maquillaje profesional",
    description: "Maquillaje para eventos especiales.",
    price: 35,
    image: "/servicio6.jpg",
  },
]

export const Paquetes = [
  {
    id: 1,
    title: "Paquete Básico",
    description: "Ideal para un cuidado regular",
    price: 80,
    services: [
      {
        id: 1,
        title: "Corte de cabello",
      },
      {
        id: 2,
        title: "Lavado y secado",
      },
      {
        id: 3,
        title: "Manicure básico",
      },
      {
        id: 4,
        title: "15% de descuento en productos",
      },
    ],
  },
  {
    id: 2,
    title: "Paquete Básico",
    description: "Ideal para un cuidado regular",
    price: 80,
    services: [
      {
        id: 1,
        title: "Corte de cabello",
      },
      {
        id: 2,
        title: "Lavado y secado",
      },
      {
        id: 3,
        title: "Manicure básico",
      },
      {
        id: 4,
        title: "15% de descuento en productos",
      },
    ],
  },
  {
    id: 3,
    title: "Paquete Básico",
    description: "Ideal para un cuidado regular",
    price: 80,
    services: [
      {
        id: 1,
        title: "Corte de cabello",
      },
      {
        id: 2,
        title: "Lavado y secado",
      },
      {
        id: 3,
        title: "Manicure básico",
      },
      {
        id: 4,
        title: "15% de descuento en productos",
      },
    ],
  },
]

export const seasonPromo = [
  {
    id: 1,
    title: "Descuentos Exclusivos",
    description: "Luce radiante con nuestra promocion especial este mes de las madres",
    details: [
      {
        id: 1,
        title: "Manicure Deluxe",
        price: 25,
        discount: 35,
      },
      {
        id: 2,
        title: "Pedicure Spa",
        price: 30,
        discount: 45,
      },
      {
        id: 3,
        title: "Esmalte Semipermanente",
        price: 20,
        discount: 30,
      },
    ],
  },
]

export const aboutUs = {
  title: "Sobre Nosotros",
  description:
    "En Uñas y Mechas, nos dedicamos a realzar tu belleza natural con servicios personalizados y productos de la más alta calidad. Nuestro equipo de profesionales está comprometido con brindarte la mejor experiencia.",
  history:
    "Fundado en 2010, nuestro salón ha crecido para convertirse en un referente de belleza y bienestar en la ciudad, manteniendo siempre nuestro compromiso con la excelencia y la satisfacción del cliente.",
  detalles: [
    {
      id: 1,
      title: "Equipo profesional",
      icon: "<UsersRound />",
    },
    {
      id: 2,
      title: "Productos premium",
      icon: "<SprayCan />",
    },
    {
      id: 3,
      title: "+10 años de experiencia",
      icon: "<Star />",
    },
  ],
  calificacion: {
    value: 4.9,
    total: 5,
  },
}

export const contactUs = {
  address: "Frente a Multicentro las Americas, Managua",
  phone: "+505 1234 5678",
  whatsapp: "+505 1234 5678",
  schedule: {
    normal: "Lunes a Sábado: 9:00 AM - 8:00 PM",
    sunday: "Domingo: 10:00 AM - 6:00 PM",
  },
}
