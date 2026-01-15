/**
 * Enregistrement des polices personnalisées pour la génération PDF
 * Utilise @react-pdf/renderer Font.register
 *
 * Les fichiers TTF sont encodés en base64 pour éviter les problèmes de chargement
 */

import { Font } from "@react-pdf/renderer";
import {
  montserratRegularBase64,
  montserratBoldBase64,
} from "./fonts/montserrat";

// Enregistrement de Montserrat Regular et Bold avec base64
Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: `data:font/ttf;base64,${montserratRegularBase64}`,
      fontWeight: 400,
    },
    {
      src: `data:font/ttf;base64,${montserratBoldBase64}`,
      fontWeight: 700,
    },
  ],
});
