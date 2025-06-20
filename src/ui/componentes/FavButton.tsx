import { useEffect, useState } from "react";

export const FavButton = () => {
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  useEffect(() => {}, []);

  return (
    <div className="card__fav__container">
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsFavorite(!isFavorite)}
        className="card__fav"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.00561 13.9372L4.06109 16.5L5.00561 11.0719L1 7.22816L6.52774 6.4384L9 1.5L11.4723 6.4384L17 7.22816L12.9944 11.0719L13.9389 16.5L9.00561 13.9372Z"
            fill={isFavorite ? "white" : "none"}
            strokeOpacity={isFavorite || isHovered ? 1 : 0.6}
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
