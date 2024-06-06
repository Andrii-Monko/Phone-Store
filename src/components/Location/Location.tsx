import { Link, useLocation } from 'react-router-dom';

export const Location = () => {
  const location = useLocation();
  
  const addressWay = location.pathname
    .replaceAll('/', '-')
    .split('-')
    .splice(1)
    //.map(word => word[0].toUpperCase + word.substring(1))
    .join(' ');

  return (
    <div className="location">
      <div className="address__box">
        <Link
          to="/Home"
          className="icon"
        >
          <img
            src="/img/icon/home.png"
            alt="home"
          />
        </Link>

        <img
          className="icon"
          src="/img/icon/right.png"
          alt="left-icon"
        />

        <p className="address__way">
          {addressWay}
        </p>
      </div>

      {addressWay.length > 11
        ? null
        : (
          <h1 className="location__title">
            {addressWay === 'Phones'
              ? 'Mobile Phones'
              : addressWay}

          </h1>
        )}
    </div>
  );
};
