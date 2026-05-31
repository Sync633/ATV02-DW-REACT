import styles from "./DealCard.module.css";

const DealCard = ({ deal, onClick, taxaCambio }) => {

  const precoNormalBRL = (deal.normalPrice * taxaCambio).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const precoPromoBRL = (deal.salePrice * taxaCambio).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const emPromocao = deal.isOnSale === "1";

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={deal.thumb} alt={deal.title} className={styles.image} />
      <h3>{deal.title}</h3>

      {emPromocao ? (
        <>
          <p>Preço Normal: <s>{precoNormalBRL}</s></p>
          <p>Preço Promo: <strong>{precoPromoBRL}</strong></p>
        </>
      ) : (
        <p>Preço: <strong>{precoNormalBRL}</strong></p>
      )}
      
      <button>Ver Detalhes</button>
    </div>
  );
};

export default DealCard;