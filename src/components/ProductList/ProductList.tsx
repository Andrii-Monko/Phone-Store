import { GoHeartFill } from 'react-icons/go';
import { Link, useSearchParams } from 'react-router-dom';
import React, { useContext } from 'react';
import { GoodsContext } from '../../Context/GoodsContext';
import { Iphone } from '../../types/Iphone';

type Props = {
  filteredGoods: Iphone[]
};

/* НЕГАЙНЕ ДОБАВЛЕННЯ ВПОДОБАНОГО ТОВАРУ */
const addGoodToFavourite = () => {
  const item = localStorage.getItem('like');

  return item ? JSON.parse(item) as Iphone[] : [];
};

/* НЕГАЙНЕ ДОБАВЛЕННЯ ТОВАРУ В КОРЗНУ */
const addGoodToBasket = () => {
  const item = localStorage.getItem('id');

  return item ? JSON.parse(item) as Iphone[] : [];
};

export const ProductList: React.FC<Props> = ({ filteredGoods }) => {
  const {
    addToBasket,
    addToFavourite,
    setSelected,
    setFavourite,

  } = useContext(GoodsContext);

  const [globalSearchParams] = useSearchParams();
  //const isActive = filteredGoods.includes((id: Iphone) => id.phoneId === phoneId)

  return (
    <>
      <div className="phone">
        {filteredGoods
          .filter(query => query.name.toLowerCase()
            .includes(((globalSearchParams.get('good') || '').toLowerCase())))
          .map((good) => (
            <div className="phone__container" key={good.id}>
              <Link
                to={`${good.phoneId}`}
                className="linkToDetailPage"
              >
                <img
                  alt="good-img"
                  src={`${'/'}${good.image}`}
                  className="phone__photo"
                />

                <p className="phone__name">
                  {good.name}
                </p>

                <div className="phone__price-box">
                  <h2 className="phone__price link__style">
                    {`${'$'}${good.price}`}
                  </h2>

                  <h2 className="phone__fullPrice link__style">
                    {`${'$'}${good.fullPrice}`}
                  </h2>
                </div>

                <div className="phone__param">
                  <div className="phone__category link__style">
                    Screen
                  </div>

                  <p className="phone__info link__style">
                    {good.screen}
                  </p>
                </div>

                <div className="phone__param">
                  <div className="phone__category link__style">
                    Capacity
                  </div>

                  <p className="phone__info link__style">
                    {good.capacity}
                  </p>
                </div>

                <div className="phone__param">
                  <div className="phone__category link__style">
                    RAM
                  </div>

                  <p className="phone__info link__style">
                    {good.ram}
                  </p>
                </div>

              </Link>

              <div className="button-box">
                <button
                  type="submit"
                  onClick={() => {
                    addToBasket('id', good);
                    setSelected(addGoodToBasket());
                  }}
                  //className={`button__buy button ${isActive && 'active'}`}
                  className="button__buy button"
                >
                  Add to cart
                </button>

                {/* eslint-disable-next-line */}
                <button
                  id="id"
                  type="submit"
                  className="button__like button"
                  onClick={() => {
                    addToFavourite('like', good);
                    setFavourite(addGoodToFavourite());
                  }}
                >
                  <GoHeartFill
                    className="phone__like-icon"
                  />
                </button>
              </div>

            </div>
          ))}
      </div>
    </>
  );
};