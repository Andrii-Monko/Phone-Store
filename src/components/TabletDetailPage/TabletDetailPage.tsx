import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Headers } from '../Headers/Headers';
import { TabletDetail } from '../../types/TabletDetail';
import { Location } from '../Location/Location';

export const TabletDetailPage = () => {
  const [tabletsDetail, setTabletsDetail] = useState<TabletDetail | null>();
  const { id } = useParams();
  const [mainPhoto, setMainPhoto] = useState(0);

  useEffect(() => {
    fetch(`https://mate-academy.github.io/react_phone-catalog/api/products/${id}.json`)
      .then((responce) => responce.json())
      .then((data) => setTabletsDetail(data));
  }, [id]);

  const photos = tabletsDetail?.images;

  return (
    <div className="tablet">
      <Headers />
      <Location />
      <div className="tablet__left-sidebar">

        <h1>
          {tabletsDetail?.name}
        </h1>

        <div className="photo__conatiner">
          <div className="photo__box">
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
      </div>
    </div>
  );
};
