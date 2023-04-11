import { useState, useEffect, useMemo } from "react";

const useImages = (query: string, count: number) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch(`https://gateway.pinata.cloud/ipfs`, {
          headers: {
            Authorization: `Client-ID ${process.env.ACCESS_KEY}`,
          },
        });
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadImages();
  }, []);

  return useMemo(() => images, [images]);
};

export default useImages;
