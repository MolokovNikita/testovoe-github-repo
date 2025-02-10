import React from "react";

type SearchBarProps = {
  inputValue: string;
  onInputChange: (value: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onInputChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Введите GitHub имя..."
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
