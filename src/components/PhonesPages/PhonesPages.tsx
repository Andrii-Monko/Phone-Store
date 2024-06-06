import classNames from 'classnames';
import { useContext, useState } from 'react';
import { Iphone } from '../../types/Iphone';
import { Footer } from '../Footer/Footer';
import { Headers } from '../Headers/Headers';
import { Location } from '../Location/Location';
import { ProductList } from '../ProductList/ProductList';
import { GoodsContext } from '../../Context/GoodsContext';
import { SortGoodsFile } from '../SortGoodsFile/SortGoodsFile';

const sortGoods = (goods: Iphone[], sortParam: string) => {
  const arr = [...goods];

  arr.sort((good1, good2) => {
    const value1 = good1[sortParam as keyof Iphone];
    const value2 = good2[sortParam as keyof Iphone];

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2);
    }

    return (value1 as number) - (value2 as number);
  });

  return arr;
};

export const PhonesPages = () => {
  const { goods, selectedParam, goodsPerPage } = useContext(GoodsContext);

  const [currentPage, setCurrentPage] = useState(1);

  const lastGoodsIndex = currentPage * goodsPerPage;
  const firstGoodsIndex = lastGoodsIndex - goodsPerPage;
  const currentGoods = goods
    .sort((a, b) => b.price - a.price)
    .slice(firstGoodsIndex, lastGoodsIndex);

  const pageNumbers = [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }

    if (currentPage === 1) {
      setCurrentPage(currentGoods.length + 1);
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

  for (let i = 1; i <= Math.ceil(goods.length / goodsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const visibleGoods = sortGoods(currentGoods, selectedParam as string);

  return (
    <div className="mainBlock">
      <Headers />
      <Location />

      <div className="phone__top-container">

        <p className="phone__amount">
          {`${goods.length} ${'models'}`}
        </p>

        <SortGoodsFile />
      </div>

      <ProductList filteredGoods={visibleGoods} />

      <div className="paginate__container">
        <button
          type="submit"
          id="prevButton"
          className="paginate__link"
          onClick={prevPage}
        >
          <img
            src="./img/icon/left.png"
            alt="left-icon"
          />
        </button>
        {pageNumbers.map((number) => (
          <button
            type="submit"
            className={classNames('paginate__link', {
              'active-state': currentPage === number,
            })}
            onClick={() => {
              paginate(number);
            }}
            key={number}
          >
            {number}
          </button>
        ))}

        <button
          type="submit"
          className="paginate__link"
          onClick={nextPage}
        >
          <img
            src="./img/icon/right.png"
            alt="right-icon"
          />
        </button>
      </div>

      <Footer />
    </div>
  );
};
