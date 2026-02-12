export type Region = {
  city: string;
  district: string;
  dong: string;
};

export function makeFullAddress(r: Region) {
  return `${r.city} ${r.district} ${r.dong}`;
}

export function searchRegions(regions: Region[], keyword: string) {
  if (!keyword.trim()) return [];

  const lowerKeyword = keyword.toLowerCase();

  return regions
    .filter((r) => {
      return (
        r.city.toLowerCase().includes(lowerKeyword) ||
        r.district.toLowerCase().includes(lowerKeyword) ||
        r.dong.toLowerCase().includes(lowerKeyword)
      );
    })
    .slice(0, 10);
}
