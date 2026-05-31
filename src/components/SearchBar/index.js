import { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch, onClear, appliedSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== appliedSearch) {
        if (inputValue.trim() === "") {
          onClear();
        } else {
          onSearch(inputValue);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, appliedSearch, onSearch, onClear]);

  const handleClearClick = () => {
    setInputValue("");
    onClear();
  };

  return (
    <div className={styles.searchForm}>
      <input 
        type="text" 
        placeholder="Pesquisar um jogo..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.searchInput}
      />
      
      {appliedSearch && (
        <button type="button" className={styles.clearBtn} onClick={handleClearClick}>
          Limpar
        </button>
      )}
    </div>
  );
};

export default SearchBar;