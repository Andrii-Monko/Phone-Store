import { useContext, useState } from 'react';
import { ProductList } from '../ProductList/ProductList';
import { GoodsContext } from '../../Context/GoodsContext';

export const YouAlsoMayLike = () => {
  const { goods } = useContext(GoodsContext);
  const arr = goods.sort((goo1, good2) => goo1.price - good2.price);

  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage] = useState(4);

  const lastGoodsIndex = currentPage * goodsPerPage;
  const firstGoodsIndex = lastGoodsIndex - goodsPerPage;
  const currentGoods = arr.slice(firstGoodsIndex, lastGoodsIndex);

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }

    if (currentPage === 1) {
      setCurrentPage(currentGoods.length);
    }
  };

  const nextPage = () => {
    if (currentPage < currentGoods.length) {
      setCurrentPage(prev => prev + 1);
    }

    if (currentPage === currentGoods.length) {
      setCurrentPage(currentGoods.length - (currentGoods.length - 1));
    }
  };

  return (
    <div>
      <div className="top__container">
        <h1 className="title">
          You may also like
        </h1>
        <div className="box">
          <button
            type="submit"
            className="button"
            onClick={prevPage}
          >
            <img
              src="/img/icon/left.png"
              alt="left"
              className="icon"
            />
          </button>

          <button
            type="submit"
            className="button"
            onClick={nextPage}
          >
            <img
              src="/img/icon/right.png"
              alt="left"
              className="icon"
            />
          </button>
        </div>
      </div>

      <ProductList filteredGoods={currentGoods} />
    </div>
  );
};
