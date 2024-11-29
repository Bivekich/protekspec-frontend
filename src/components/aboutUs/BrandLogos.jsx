import React from "react";

function BrandLogos({ brands }) {
  return (
    <div className="flex flex-wrap items-center mt-2.5 w-full max-md:max-w-full">
      {brands.map((brand, index) => (
        <img
          key={index}
          src={brand.src}
          alt={brand.alt}
          className="object-contain h-[60px]"
          style={{ aspectRatio: brand.aspect }}
        />
      ))}
    </div>
  );
}

export default BrandLogos;
