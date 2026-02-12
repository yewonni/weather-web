import { useState, useMemo } from "react";
import { searchAddress } from "../api/searchApi";

export function useSearch() {
  const [searchText, setSearchText] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const results = useMemo(() => {
    if (!searchText.trim()) return [];
    return searchAddress(searchText);
  }, [searchText]);

  const showDropdown = isFocus && searchText.trim().length > 0;

  return {
    searchText,
    setSearchText,
    isFocus,
    setIsFocus,
    results,
    showDropdown,
  };
}
