"use client";
import { useState, useEffect } from "react";

function ImageViewer() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/generate")
      .then((response) => response.json())
      .then((data) => {
        if (data.pngFile) {
          // the pngFile contains the png image as a base64 string
          setImageSrc(data.pngFile);
        }
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  if (!imageSrc) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {imageSrc && (
        <img src={imageSrc} alt="SVG Image" className="rounded-xl" />
      )}
    </>
  );
}

export default ImageViewer;
