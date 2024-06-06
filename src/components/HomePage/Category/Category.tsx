import { Link } from 'react-router-dom';

export const Category = () => (
  <div className="category">
    <h1>
      Shop by category
    </h1>

    <div className="category__box">
      <Link to="/Phone" className="category__container">
        <div className="category__banner phone-box" />

        <h3 className="category__name">
          Mobile Phones
        </h3>

        <p className="category__goods-amount">
          95 models
        </p>
      </Link>

      <Link to="/Tablets" className="category__container">
        <div className="category__banner tablets-box" />

        <h3 className="category__name">
          Tablets
        </h3>

        <p className="category__goods-amount">
          24 models
        </p>
      </Link>

      <Link to="/Accessories" className="category__container">
        <div className="category__banner accessories-box" />

        <h3 className="category__name">
          Accessories
        </h3>

        <p className="category__goods-amount">
          100 models
        </p>
      </Link>
    </div>
  </div>
);
