import { useMemo } from "react";
import { highlightText } from "@/shared/utils/highlightText";

type Props = {
  results: string[];
  keyword: string;
  onSelect: (region: string) => void;
};

export default function SearchDropdown({ results, keyword, onSelect }: Props) {
  const highlightedResults = useMemo(() => {
    return results.map((region) => ({
      region,
      highlighted: highlightText(region, keyword),
    }));
  }, [results, keyword]);

  return (
    <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-divider overflow-hidden z-50">
      {results.length === 0 ? (
        <div className="px-4 py-3 text-sm text-sub">
          해당 장소의 정보가 제공되지 않습니다.
        </div>
      ) : (
        highlightedResults.map(({ region, highlighted }, i) => (
          <button
            key={i}
            onClick={() => onSelect(region)}
            className="w-full text-left px-4 py-3 text-sm hover:bg-background"
          >
            {highlighted}
          </button>
        ))
      )}
    </div>
  );
}
