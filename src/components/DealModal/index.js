import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./DealModal.module.css";

const DealModal = ({ dealId, onClose, taxaCambio }) => {
  const [dealInfo, setDealInfo] = useState(null);

  useEffect(() => {
    const fetchSingleDeal = async () => {
      try {
        const response = await axios.get(`https://www.cheapshark.com/api/1.0/deals?id=${dealId}`);
        setDealInfo(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      }
    };
    fetchSingleDeal();
  }, [dealId]);

  if (!dealInfo) return <div className={styles.loading}>Carregando detalhes...</div>;

  const precoNormalBRL = (dealInfo.gameInfo.retailPrice * taxaCambio).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const precoPromoBRL = (dealInfo.gameInfo.salePrice * taxaCambio).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const dataLancamento = new Date(dealInfo.gameInfo.releaseDate * 1000).toLocaleDateString("pt-BR");

  const getMetacriticStyle = (score) => {
    const parsedScore = parseInt(score, 10);
    if (parsedScore >= 75) return { backgroundColor: "#66cc33", color: "#fff" };
    if (parsedScore >= 50) return { backgroundColor: "#ffcc33", color: "#333" };
    return { backgroundColor: "#ff0000", color: "#fff" };
  };

  const emPromocao = parseFloat(dealInfo.gameInfo.salePrice) < parseFloat(dealInfo.gameInfo.retailPrice);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{dealInfo.gameInfo.name}</h2>
        <img src={dealInfo.gameInfo.thumb} alt="Capa" />

        <div className={styles.prices}>
          {emPromocao ? (
            <>
              <p>Preço Normal: <s>{precoNormalBRL}</s></p>
              <p>Preço Promocional: <strong>{precoPromoBRL}</strong></p>
            </>
          ) : (
            <p>Preço: <strong>{precoNormalBRL}</strong></p>
          )}
        </div>

        <div className={styles.details}>
          {dealInfo.gameInfo.publisher !== "N/A" && (
            <p><strong>Editora:</strong> {dealInfo.gameInfo.publisher}</p>
          )}

          <p><strong>Lançamento:</strong> {dataLancamento}</p>

          <p>
            <strong>Avaliação Steam:</strong> {dealInfo.gameInfo.steamRatingPercent}%
            {dealInfo.gameInfo.steamRatingText ? ` (${dealInfo.gameInfo.steamRatingText})` : ""}
          </p>

          {dealInfo.gameInfo.metacriticScore && dealInfo.gameInfo.metacriticScore !== "0" && (
            <p style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
              <strong>Metacritic:</strong>
              <span style={{
                ...getMetacriticStyle(dealInfo.gameInfo.metacriticScore),
                padding: "4px 8px",
                borderRadius: "4px",
                fontWeight: "bold",
                fontSize: "0.95rem"
              }}>
                {dealInfo.gameInfo.metacriticScore}
              </span>
            </p>
          )}

        </div>

        <div className={styles.actions}>
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${dealId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyBtn}
          >
            Acessar Loja
          </a>
          <button onClick={onClose} className={styles.closeBtn}>Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default DealModal;