import { RegionName, REGIONS } from "../../types/types";

export const getSelectedRegion = (regionName: RegionName) => {
  const region = REGIONS.find((region) => region.name === regionName);
  if (region) {
    return region;
  }
  return REGIONS.find((region) => region.name === "kanto")!;
};
