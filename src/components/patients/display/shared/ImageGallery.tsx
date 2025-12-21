"use client";

import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  videos?: string[];
  title?: string;
  className?: string;
  imageAlt?: string;
  showLightbox?: boolean;
}

export function ImageGallery({
  images,
  videos = [],
  title,
  className = "",
  imageAlt = "Image médicale",
  showLightbox = true,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const allMedia = [...images, ...videos];

  if (allMedia.length === 0) return null;

  const isVideo = (url: string) => {
    return videos.includes(url);
  };

  return (
    <div className={className}>
      {title && (
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          {title}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allMedia.map((url, index) => (
          <div
            key={index}
            className="relative w-full max-w-lg mx-auto cursor-pointer"
            onClick={() => showLightbox && setSelectedImage(url)}
          >
            {isVideo(url) ? (
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                poster={url}
              >
                <source src={url} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <img
                src={url}
                alt={`${imageAlt} ${index + 1}`}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            )}
          </div>
        ))}
      </div>

      {/* Lightbox pour l'affichage plein écran */}
      {showLightbox && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            {isVideo(selectedImage) ? (
              <video
                controls
                autoPlay
                className="max-w-full max-h-full rounded-lg"
              >
                <source src={selectedImage} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            ) : (
              <img
                src={selectedImage}
                alt="Image plein écran"
                className="max-w-full max-h-full rounded-lg"
              />
            )}

            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
