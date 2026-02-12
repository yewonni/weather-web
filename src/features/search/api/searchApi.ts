import region from "@/shared/data/korea_districts.json";

export function searchAddress(query: string): string[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.trim().toLowerCase();

  const results = region
    .filter((address: string) => {
      const readable = address.replace(/-/g, " ").toLowerCase();
      return readable.includes(normalizedQuery);
    })
    .map((address: string) => address.replace(/-/g, " "))
    .slice(0, 10);

  return results;
}
