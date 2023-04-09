import { useState, useEffect } from "react";

const useImages = (query: string, count: number) => {
  const ACCESS_KEY = "qbbbwL6QszDWe716nOSkIkx64C_AieIjKTDk5Or2wwI";
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${query}&count=${count}`,
          {
            headers: {
              Authorization: `Client-ID ${ACCESS_KEY}`,
            },
          }
        );
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadImages();
  }, [query, count]);

  return images;
};

export default useImages;
