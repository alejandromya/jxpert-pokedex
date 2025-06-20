import { useEffect, useState } from "react";
import { ICON_POKEMON_TYPE } from "../../types/types";

export const FavButton = () => {
  const [isFavorite, setIsFavorite] = useState<Boolean>(false);

  useEffect(() => {}, []);

  return (
    <div>
      <button onClick={() => setIsFavorite(!isFavorite)} className="card__fav">
        {isFavorite ? (
          <img src={ICON_POKEMON_TYPE.starFav} alt={`imagen no encontrada`} />
        ) : (
          <img src={ICON_POKEMON_TYPE.star} alt={`imagen no encontrada`} />
        )}
      </button>
    </div>
  );
};
