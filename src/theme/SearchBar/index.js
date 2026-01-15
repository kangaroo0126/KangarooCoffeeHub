import React from 'react';
import SearchBar from '@theme-original/SearchBar';

export default function SearchBarWrapper(props) {
  const handleSearch = (query) => {
    // 過濾太短的搜尋詞
    if (query.length < 2) {
      return [];
    }
    return props.onSearch(query);
  };

  return <SearchBar {...props} onSearch={handleSearch} />;
}