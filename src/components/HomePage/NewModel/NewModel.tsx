import React, { useState } from 'react';
import { Iphone } from '../../../types/Iphone';
import { ProductList } from '../../ProductList/ProductList';

type Props = {
  newBrands: Iphone[];
};

export const NewModel: React.FC<Props> = ({ newBrands }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [goodsPerPage] = useState(4);

  const lastGoodsIndex = currentPage * goodsPerPage;
  const firstGoodsIndex = lastGoodsIndex - goodsPerPage;
  const currentGoods = newBrands.slice(firstGoodsIndex, lastGoodsIndex);

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
          Brand new models
        </h1>
        <div className="box">
          <button
            type="submit"
            className="button"
            onClick={prevPage}
          >
            <img
              src="./img/icon/left.png"
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
              src="./img/icon/right.png"
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
