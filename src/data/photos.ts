import type { Photo } from "../types/experience.types";

export const photos: Photo[] = [
  {
    id: 1,
    src: "images/gallery/WhatsApp Image 2026-08-05 at 7.19.52 PM.jpeg",
    alt: "Plato de ramen que compartimos durante una salida",
    caption: "Una cita, ramen y tiempo contigo 🍜",
    rotation: -2.4,
    mediaType: "image",
  },
  {
    id: 2,
    src: "images/gallery/WhatsApp Image 2026-08-05 at 7.20.46 PM.jpeg",
    alt: "Una salida al cine usando gafas 3D",
    caption: "Nuestra película en 3D y esas risas que tanto amo",
    rotation: 1.8,
    mediaType: "image",
    sideways: true,
  },
  {
    id: 3,
    src: "images/gallery/WhatsApp Image 2026-08-05 at 7.21.24 PM.jpeg",
    alt: "Daniela sonriendo mientras juega futbolín",
    caption: "Hasta competir contigo se vuelve un recuerdo bonito",
    rotation: -1.2,
    mediaType: "image",
  },
  {
    id: 4,
    src: "images/gallery/WhatsApp Video 2026-08-05 at 7.20.26 PM.mp4",
    alt: "Video espontáneo de los dos dentro del carro",
    caption: "Amo a nuestros yo tiktokers",
    rotation: 2.7,
    mediaType: "video",
  },
  {
    id: 5,
    src: "images/gallery/WhatsApp Video 2026-08-05 at 7.22.26 PM.mp4",
    alt: "Video de uno de nuestros momentos juntos por la noche",
    caption: "Un pedacito de esas noches que vivimos juntos",
    rotation: -1.7,
    mediaType: "video",
  },
  {
    id: 6,
    src: "images/gallery/WhatsApp Video 2026-08-05 at 7.22.49 PM.mp4",
    alt: "Video de Daniela durante uno de sus días cotidianos",
    caption: "La mejor cocinera de MC",
    rotation: 1.3,
    mediaType: "video",
  },
];
