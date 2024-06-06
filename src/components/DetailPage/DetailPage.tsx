import { GoHeartFill } from 'react-icons/go';
import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Iphone } from '../../types/Iphone';
import { Footer } from '../Footer/Footer';
import { Headers } from '../Headers/Headers';
import { Location } from '../Location/Location';
import { GoodsDetail } from '../../types/GoodsDetail';
import { GoodsContext } from '../../Context/GoodsContext';
import { YouAlsoMayLike } from '../YouAlsoMayLike/YouAlsoMauLike';

export const DetailPage = () => {
  const [detail, setDetail] = useState<GoodsDetail | null>(null);
  const { id } = useParams();
  const [mainPhoto, setMainPhoto] = useState(0);
  const {
    addToBasket,
    addToFavourite,
    setSelected,
    setFavourite,
    goods,
  } = useContext(GoodsContext);

  const selectThing = goods.find((param) => param.itemId === detail?.id);

  useEffect(() => {
    fetch(`https://mate-academy.github.io/react_phone-catalog/_new/products/${id}.json`)
      .then((responce) => responce.json())
      .then((data) => setDetail(data));
  }, [id]);

  const photos = detail?.images;
  const memoriesAmount = detail?.capacityAvailable;
  const colors = detail?.colorsAvailable;

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

  return (
    <div className="detail">
      <Headers />
      <div>
        <div>
          <Location />

          <Link to="/Phones" className="detail__back-button">
            <img
              src="/img/icon/left.png"
              alt=""
            />

            <p className="detail__button-text">
              Back
            </p>
          </Link>

          <h1 className="detail__good-name">
            {detail?.name}
          </h1>
        </div>

        <div className="detail__main-content">
          <div className="detail__left-sidebar">
            <div
              className="photo__container"
            >
              {photos?.map((photo, index) => (
                <button
                  aria-label={photo}
                  onClick={() => {
                    setMainPhoto(index);
                  }}
                  type="submit"
                  key={photo}
                  className="detail__photo"
                >
                  <img
                    src={`${'/'}${photo}`}
                    alt=""
                    className="detail__img"
                  />
                </button>
              ))}
            </div>

            <img
              src={`../${photos?.[mainPhoto]}`}
              alt=""
              className="mainPhoto"
            />
          </div>

          <div className="detail__right-sidebar">
            <div className="detail__title">
              <p>
                Available colors
              </p>

              <div className="detail__color-box">
                {colors?.map((color) => (
                  <p
                    title={color}
                    key={color}
                    className="detail__available-color"
                    style={{ backgroundColor: `${color}` }}
                  />
                ))}
              </div>
            </div>

            <div className="detail__memory-box">
              <p>
                Select capacity
              </p>

              <div className="memoryAmount-container">
                {memoriesAmount?.map((memory) => (

                  <button
                    type="submit"
                    key={memory}
                    className="memory"
                  >
                    {memory}
                  </button>
                ))}
              </div>
            </div>

            <div className="detail__price-box">
              <h1 className="detail__price">
                {`${'$'}${detail?.priceRegular}`}
              </h1>

              <p className="detail__Fullprice">
                {`${'$'}${detail?.priceDiscount}`}
              </p>
            </div>

            <div className="button-box">

              {/* eslint-disable-next-line */}
              <button
                type="submit"
                className="button__buy button"
                onClick={() => {
                  addToBasket('id', selectThing as Iphone);
                  setSelected(addGoodToBasket());
                }}
              >
                Add to cart
              </button>

              {/* eslint-disable-next-line */}
              <button
                type="submit"
                className="button__like button"
                onClick={() => {
                  addToFavourite('like', selectThing as Iphone);
                  setFavourite(addGoodToFavourite());
                }}
              >
                <GoHeartFill
                  className="phone__like-icon"
                />
              </button>
            </div>

            <tr className="detail__container">
              <tr className="detail__box">
                <td className="detail__param">Screen</td>
                <td className="detail__info">{detail?.screen}</td>
              </tr>
              <tr className="detail__box">
                <td className="detail__param">Resolution</td>
                <td className="detail__info">{detail?.resolution}</td>
              </tr>
              <tr className="detail__box">
                <td className="detail__param">Processor</td>
                <td className="detail__info">{detail?.processor}</td>
              </tr>
              <tr className="detail__box">
                <td className="detail__param">RAM</td>
                <td className="detail__info">{detail?.ram}</td>
              </tr>
            </tr>
          </div>
        </div>

        <div className="detail__bottom-container">
          <div>
            <h2 className="detail__bottom-title">
              About
            </h2>
            {detail?.description.map((param) => (
              <div
                key={param.title}
                className="detail__describe"
              >
                <h3>
                  {param.title}

                </h3>
                <p>
                  {param.text}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="detail__title">
              Tech specs
            </h2>

            <div className="detail__bottom-param">
              <div>
                <p>Screen</p>
                <p>Resolution</p>
                <p>Processor</p>
                <p>RAM</p>
                <p>Built in memory</p>
                <p>Camera</p>
                <p>Zoom</p>
                <p>Cell</p>
              </div>

              <div>
                <p className="detail__info">{detail?.screen}</p>
                <p className="detail__info">{detail?.resolution}</p>
                <p className="detail__info">{detail?.processor}</p>
                <p className="detail__info">{detail?.ram}</p>
                <p className="detail__info">{detail?.capacity}</p>
                <p className="detail__info">{detail?.camera}</p>
                <p className="detail__info">{detail?.zoom}</p>
                <p className="detail__info">{detail?.cell}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <YouAlsoMayLike />
      <Footer />
    </div>
  );
};
