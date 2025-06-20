import { useEffect, useState } from "react";

export const SortByButton = ({
  sortedBy,
  renderName,
  statName,
  setSortedBy,
  setIsShowingSortBy,
}) => {
  const [stat, setStat] = useState<string>("");

  useEffect(() => {
    if (statName) {
      setStat(statName);
    } else {
      setStat("default");
    }
  }, []);

  return (
    <span
      role="radio"
      aria-label={stat}
      tabIndex={0}
      className={`sort__pill ${sortedBy === stat ? "active" : ""}`}
      aria-checked={sortedBy === renderName.toLowerCase()}
      onClick={() => {
        setSortedBy(stat);
        setIsShowingSortBy(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSortedBy(stat);
          setIsShowingSortBy(false);
        }
      }}
    >
      {" "}
      {renderName}
    </span>
  );
};
