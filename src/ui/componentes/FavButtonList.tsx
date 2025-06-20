import { useState } from "react";

type Props = {
  favoriteList: boolean;
  setFavoriteList: React.Dispatch<React.SetStateAction<Boolean>>;
};
export const FavButtonList = ({ favoriteList, setFavoriteList }) => {
  const [isHovered, setIsHovered] = useState<Boolean>(false);

  const handleCLick = () => {
    setFavoriteList(!favoriteList);
  };

  return (
    <div>
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCLick}
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
            fill={favoriteList ? "black" : "none"}
            strokeOpacity={favoriteList || isHovered ? 1 : 0.6}
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
