import { useContext } from 'react';
import { Headers } from '../Headers/Headers';
import { ProductList } from '../ProductList/ProductList';
import { GoodsContext } from '../../Context/GoodsContext';
import { Footer } from '../Footer/Footer';
import { Location } from '../Location/Location';
// import { Link } from 'react-router-dom';

export const Favourite = () => {
  const { favourite } = useContext(GoodsContext);

  return (
    <div className="favourite">
      <Headers />
      <div>
        <Location />

        <p>
          {`${favourite.length} ${'items'}`}
        </p>
      </div>
      <ProductList filteredGoods={favourite} />
      <Footer />
    </div>
  );
};
