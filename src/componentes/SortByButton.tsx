export const SortByButton = ({
  sortedBy,
  renderName,
  statName,
  setSortedBy,
  setIsShowingSortBy,
}) => {
  return (
    <span
      role="radio"
      aria-label={statName}
      tabIndex={0}
      className={`sort__pill ${sortedBy === statName.toLowerCase() ? "active" : ""}`}
      aria-checked={sortedBy === renderName.toLowerCase()}
      onClick={() => {
        setSortedBy(statName.toLowerCase());
        setIsShowingSortBy(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setSortedBy(statName.toLowerCase());
          setIsShowingSortBy(false);
        }
      }}
    >
      {" "}
      {renderName}
    </span>
  );
};
