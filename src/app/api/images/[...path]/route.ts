import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

// Configuration Firebase (doit correspondre à celle dans src/firebase/config.ts)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const pathSegments = (await params).path;
    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: "Path manquant" }, { status: 400 });
    }

    // Reconstruire le chemin complet depuis les segments
    const fullPath = pathSegments.join("/");

    // Créer une référence vers le fichier dans Firebase Storage
    const fileRef = ref(storage, fullPath);

    // Obtenir l'URL de téléchargement
    const downloadURL = await getDownloadURL(fileRef);

    // Rediriger vers l'URL Firebase (ou proxy la requête)
    // Pour les PDFs, il est préférable de proxy la requête pour éviter les problèmes CORS
    const response = await fetch(downloadURL);

    if (!response.ok) {
      return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }

    // Obtenir le contenu de l'image
    const imageBuffer = await response.arrayBuffer();

    // Déterminer le type de contenu basé sur l'extension du fichier
    const contentType = getContentType(fullPath);

    // Retourner l'image avec les headers appropriés
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000", // Cache pendant 1 an
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'image:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'image" },
      { status: 500 }
    );
  }
}

// Fonction pour déterminer le type de contenu basé sur l'extension
function getContentType(filename: string): string {
  const ext = filename.toLowerCase().split(".").pop();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    case "avi":
      return "video/x-msvideo";
    default:
      return "application/octet-stream";
  }
}
