import { GoHeartFill } from 'react-icons/go';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Tablet } from '../../types/Tablet';
import { Headers } from '../Headers/Headers';
import { Location } from '../Location/Location';
import { GoodsContext } from '../../Context/GoodsContext';
import { SortGoodsFile } from '../SortGoodsFile/SortGoodsFile';
import { Footer } from '../Footer/Footer';

const sortTablet = (goods: Tablet[], sortParam: string) => {
  const arr = [...goods];

  arr.sort((good1, good2) => {
    const value1 = good1[sortParam as keyof Tablet];
    const value2 = good2[sortParam as keyof Tablet];

    if (typeof value1 === 'string' && typeof value2 === 'string') {
      return value1.localeCompare(value2);
    }

    return (value1 as number) - (value2 as number);
  });

  return arr;
};

export const Tablets = () => {
  const [tablets, setTablets] = useState<Tablet[]>([]);
  const [searchParam] = useSearchParams();
  const amount = tablets.filter(tablet => tablet.type === 'tablet');
  const { selectedParam } = useContext(GoodsContext);

  useEffect(() => {
    fetch('./api/products.json')
      .then((responce) => responce.json())
      .then((data) => setTablets(data));
  }, []);

  const visibleGoods = sortTablet(tablets, selectedParam as string);

  return (
    <div className="tablets">
      <Headers />
      <Location />

      <div className="tablets__sort-container">
        <p>
          {`${amount.length} ${'models'}`}
        </p>
        <SortGoodsFile />
      </div>

      <div
        className="tablets__container"
      >

        {visibleGoods
          .filter((param) => param.type === 'tablet')
          .filter((query) => query.name.toLowerCase()
            .includes(searchParam.get('good') || ''))
          .map((tablet) => (
            <div
              className="tablets__box"
              key={tablet.id}
            >
              <Link
                className="tablet__link "
                to={`${tablet.id}`}
              >
                <img
                  alt="tabletImg"
                  src={tablet.imageUrl}
                  className="tablets__photo"
                />

                <p className="tablets__name">
                  {tablet.name}
                </p>
              </Link>

              <div className="tablets__price-box">
                {tablet.discount === 0
                  ? null
                  : (
                    <p className="tablets__discount">
                      {tablet.price - tablet.discount}
                      {`${'$'}`}
                    </p>
                  )}

                <p className="tablets__price">
                  {`${tablet.price}${'$'}`}
                </p>
              </div>

              <div className="tablets__param">
                <div className="tablets__category link__style">
                  Screen
                </div>

                <p className="tablets__info link__style">
                  {tablet.screen}
                </p>
              </div>

              <div className="tablets__param">
                <div className="tablets__category link__style">
                  Capacity
                </div>

                <p className="tablets__info link__style">
                  {tablet.capacity}
                </p>
              </div>

              <div className="tablets__param">
                <div className="tablets__category link__style">
                  RAM
                </div>

                <p className="tablets__info link__style">
                  {tablet.ram}
                </p>
              </div>

              <div className="button-box">
                <button
                  type="submit"
                  className="button__buy button"
                >
                  Add to cart
                </button>

                {/* eslint-disable-next-line */}
                <button
                  id="id"
                  type="submit"
                  className="button__like button"
                >
                  <GoHeartFill
                    className="phone__like-icon"
                  />
                </button>
              </div>
            </div>
          ))}

      </div>
      <Footer />
    </div>

  );
};
