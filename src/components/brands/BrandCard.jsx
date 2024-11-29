import PropTypes from "prop-types";

export function BrandCard({ brand }) {
  const getImageUrl = (brand) => {
    try {
      const logo = brand.attributes?.logo;
      if (!logo) return null;

      const imageUrl = logo.url;
      if (imageUrl?.startsWith("http")) {
        return imageUrl;
      }
      return `${import.meta.env.VITE_API_URL}${imageUrl}`;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return null;
    }
  };

  const imageUrl = getImageUrl(brand);

  return (
    <div className="flex overflow-hidden flex-col min-w-[240px]">
      {imageUrl ? (
        <img
          loading="lazy"
          src={imageUrl}
          alt={brand.attributes.name || "Brand logo"}
          className="w-full h-full object-contain transition-all duration-200 filter grayscale hover:grayscale-0"
        />
      ) : (
        <div className="text-gray-400">No image available</div>
      )}
    </div>
  );
}

BrandCard.propTypes = {
  brand: PropTypes.shape({
    attributes: PropTypes.shape({
      logo: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default BrandCard;
