import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DealsContent.module.css";
import DealCard from "../DealCard";
import DealModal from "../DealModal";
import SearchBar from "../SearchBar";

const DealsContent = () => {
  const [deals, setDeals] = useState([]);
  const [selectedDealId, setSelectedDealId] = useState(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [taxaCambio, setTaxaCambio] = useState(5.20);
  const [appliedSearch, setAppliedSearch] = useState("");

  useEffect(() => {
    const fetchDeals = async () => {
      setLoading(true);
      try {
        let url = `https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=16&pageNumber=${page}`;
        if (appliedSearch) {
          url += `&title=${appliedSearch}`;
        }
        const response = await axios.get(url);
        setDeals(response.data);

      } catch (error) {
        console.error("Erro ao buscar ofertas:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [page, appliedSearch]);

  const handleSearch = (searchTerm) => {
    setPage(0);
    setAppliedSearch(searchTerm);
  };

  const handleClear = () => {
    setAppliedSearch("");
    setPage(0);
  };

  return (
    <div className={styles.container}>
      <h2>Ofertas Atuais na Steam</h2>

      <div style={{ textAlign: "center", marginBottom: "1.5rem", color: "#ccc" }}>
        <p>A taxa de conversão utilizada é de <strong> US$1.00 = R$ {taxaCambio.toFixed(2).replace('.', ',')}</strong></p>
      </div>

      <SearchBar 
        onSearch={handleSearch} 
        onClear={handleClear} 
        appliedSearch={appliedSearch} 
      />

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>Carregando a página {page + 1}...</p>
      ) : (
        <div className={styles.grid}>
          {deals.map((deal) => (
            <DealCard
              key={deal.dealID}
              deal={deal}
              onClick={() => setSelectedDealId(deal.dealID)}
              taxaCambio={taxaCambio}
            />
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Anterior
        </button>

        <span>Página {page + 1}</span>

        <button onClick={() => setPage(page + 1)}>
          Próxima
        </button>
      </div>

      {selectedDealId && (
        <DealModal
          dealId={selectedDealId}
          onClose={() => setSelectedDealId(null)}
          taxaCambio={taxaCambio}
        />
      )}
    </div>
  );
};

export default DealsContent;