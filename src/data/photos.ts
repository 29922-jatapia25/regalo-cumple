import type { Photo } from "../types/experience.types";

// Fotografías de ejemplo. Sustituye estos archivos por imágenes personales en WebP.
export const photos: Photo[] = [
  {
    id: 1,
    src: "images/gallery/caminata.webp",
    alt: "Fotografía de ejemplo de una pareja caminando",
    caption: "Ese paseo que quise guardar para siempre",
    rotation: -2.4,
  },
  {
    id: 2,
    src: "images/gallery/picnic.webp",
    alt: "Fotografía de ejemplo de dos manos juntas",
    caption: "La calma de saberte cerquita",
    rotation: 1.8,
  },
  {
    id: 3,
    src: "images/cover/noche-serenata.webp",
    alt: "Fotografía de ejemplo de una serenata nocturna",
    caption: "Una noche pensada solo para ti",
    rotation: -1.2,
  },
  {
    id: 4,
    src: "images/gallery/picnic.webp",
    alt: "Fotografía de ejemplo de una celebración íntima",
    caption: "Los detalles sencillos que se vuelven inmensos",
    rotation: 2.7,
  },
];
