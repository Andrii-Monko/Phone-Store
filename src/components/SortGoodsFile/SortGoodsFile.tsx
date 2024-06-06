import { useContext } from 'react';
import { GoodsContext } from '../../Context/GoodsContext';

export const SortGoodsFile = () => {
  const { setSelectedParam, setGoodsPerpPage } = useContext(GoodsContext);

  return (
    <div className="sort-box">
      <div>
        <p className="sortParam">
          Sort by
        </p>

        <select
          className="select"
          onChange={event => setSelectedParam(event.target.value)}
        >

          <option value="name">Name</option>
          <option value="color">Color</option>
          <option value="price">Price</option>
        </select>
      </div>
      <div>
        <p className="sortParam">
          Items on page
        </p>

        <select
          className="select"
          onChange={event => setGoodsPerpPage(+event.target.value)}
        >

          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
        </select>
      </div>

    </div>
  );
};
