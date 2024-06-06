import { useState } from 'react';

const banner = [
  '/_new/img/banner-phones.png',
  '/_new/img/banner-accessories.png',
  '/_new/img/banner-tablets.png',
];

export const Banner = () => {
  const [BannersPerPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(1);

  const lastBannerIndex = activeIndex * BannersPerPage;
  const firstBannerindex = lastBannerIndex - BannersPerPage;
  const currentBanners = banner.slice(firstBannerindex, lastBannerIndex);

  const prevBannerPhoto = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }

    if (activeIndex === 1) {
      setActiveIndex(banner.length);
    }
  };

  const nextBannerPhoto = () => {
    if (activeIndex < banner.length) {
      setActiveIndex(prev => prev + 1);
    }

    if (activeIndex === banner.length) {
      setActiveIndex(banner.length - 2);
    }
  };

  return (
    <div className="banner">
      {/* eslint-disable-next-line */}
      <button
        type="submit"
        className="banner__button"
        onClick={prevBannerPhoto}
      >
        <img
          src="/img/icon/left.png"
          alt=""
          className="banner__button-img"
        />
      </button>

      {currentBanners.map(data => (
        <img
          alt=""
          src={data}
          className="banner-photo"
          key={data}
        />
      ))}

      {/* eslint-disable-next-line */}
      <button
        type="submit"
        className="banner__button"
        onClick={nextBannerPhoto}
      >
        <img
          src="/img/icon/right.png"
          alt=""
          className="banner__button-img"
        />
      </button>
    </div>

  );
};
