import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Iphone } from '../../types/Iphone';
import { Headers } from '../Headers/Headers';
import { GoodsContext } from '../../Context/GoodsContext';
import { Footer } from '../Footer/Footer';

export const Basket = () => {
  const { selected, setSelected } = useContext(GoodsContext);
  const [chooseGoods, setChooseGoods] = useState<Iphone[]>(selected);
  const [goodsAmount, setGoodsAmount] = useState(chooseGoods.length);

  let price = 0;

  if (chooseGoods.length > 0) {
    price = chooseGoods.map(s => s.price)
      .reduce((prev: number, next: number) => prev + next);
  }

  /* ВИДАЛЕННЯ ТОВАРІВ ІЗ КОРЗИНИ */
  const deleteSelectedGoods = (key: string, query: string) => {
    const goodList = JSON.parse(localStorage.getItem(key) || '[]');

    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify([...goodList
      .filter((deleteGood: Iphone) => deleteGood.phoneId !== query)]));

    setSelected([...chooseGoods
      .filter((deleteGood: Iphone) => deleteGood.phoneId !== query)]);
    setChooseGoods([...chooseGoods
      .filter((deleteGood: Iphone) => deleteGood.phoneId !== query)]);
    setGoodsAmount(chooseGoods.length - 1);
  };

  return (
    <div className="basket">
      <div>
        <Headers />

        <Link to="/" className="basket__back-button">
          <img
            src="/img/icon/left.png"
            alt="left"
          />

          <p className="basket__button-text">
            Back
          </p>
        </Link>

        <h1 className="basket__title">
          Cart
        </h1>

        {chooseGoods.length > 0
          ? (
            <div className="basket__good-box">
              <div>
                {chooseGoods.map((select) => (
                  <div
                    className="basket__container"
                    key={select.id}
                  >
                    <button
                      type="submit"
                      className="basket__button"
                      onClick={() => {
                        deleteSelectedGoods('id', select.phoneId);
                      }}
                    >
                      <img
                        src="./img/icon/close.png"
                        alt="close"
                      />
                    </button>
                    <img
                      src={select.image}
                      alt=""
                      className="basket__photo"
                    />

                    <p className="basket__name">
                      {select.name}
                    </p>

                    <div className="button__box">
                      <button
                        type="submit"
                        className="basket__btn"
                      >
                        -
                      </button>

                      <p>
                        1
                      </p>

                      <button
                        type="submit"
                        className="basket__btn"
                      >
                        +
                      </button>
                    </div>

                    <h2>
                      {`${'$'}${select.price}`}
                    </h2>
                  </div>
                ))}
              </div>

              <div className="basket__price-box">
                <h1>
                  {`${'$'} ${price}`}
                </h1>

                <p className="price__text">
                  {`${'Total for'} ${goodsAmount} ${'items'}`}
                </p>

                <button
                  type="submit"
                  className="basket__cheked-button"
                >
                  Checkout
                </button>
              </div>
            </div>
          )
          : (
            <div>
              КОРЗИНА ПУСТА
            </div>
          )}
      </div>
      <Footer />
    </div>
  );
};
