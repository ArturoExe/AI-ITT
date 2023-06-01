import React from "react";

export default function useImage(letter) {
  const letterImage = `letra${letter}.png`;
  const imgSrc = `/public/assets/${letterImage}`;
  return <img src={imgSrc} alt={letter} />;
}
