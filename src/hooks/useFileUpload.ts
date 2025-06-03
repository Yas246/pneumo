import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { storage } from "../firebase/config";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    path: string
  ): Promise<string | null> => {
    if (!file) return null;

    try {
      setUploading(true);
      setError(null);

      // Créer une référence unique pour le fichier
      const fileRef = ref(storage, `${path}/${Date.now()}_${file.name}`);

      // Démarrer l'upload
      const uploadTask = uploadBytesResumable(fileRef, file);

      // Retourner une promesse qui se résout avec l'URL du fichier
      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Mettre à jour la progression
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            // Gérer les erreurs
            setError(error.message);
            setUploading(false);
            reject(error);
          },
          async () => {
            // Upload terminé avec succès
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            setProgress(0);
            resolve(downloadURL);
          }
        );
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setUploading(false);
      return null;
    }
  };

  return {
    uploadFile,
    uploading,
    progress,
    error,
  };
};
