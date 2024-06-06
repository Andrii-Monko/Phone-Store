import '../../App.scss';
import classNames from 'classnames';
import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import { GoodsContext } from '../../Context/GoodsContext';
import { useContext } from 'react';

export const Headers = () => {
  const headerLink = ['Home', 'Phones', 'Tablets', 'Accessories'];
  const location = useLocation();
  const { selected, favourite } = useContext(GoodsContext)

  const phoneSearchInput = headerLink
    .slice(1)
    .map(link => `${'/'}${link}`).includes(location.pathname);

  /* АКТИВНІ ПОСИЛАННЯ В HEADER */
  const getActiveLink = ({ isActive }:
    { isActive: boolean }) => classNames('header__link',
      { activeState: isActive });

  /* АКТИВНІ BUTTON В HEADER */
  const getActiveButton = ({ isActive }:
    { isActive: boolean }) => classNames('header__button',
      { activeButton: isActive });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    const form = event.target;
    const query = form.search.value;

    setSearchParams({ good: query });
  };

  const Placeholder = `${'Search in'} ${location.pathname.replace('/', ' ').toLowerCase()}${'...'}`;

  return (
    <div className="header" id="header ">
      <div className="header__top-container">
        <nav className="header__nav">
          <Link to="/Home">
            <img
              src="/img/icon/logo.png"
              alt="logo"
              className="header__logo"
            />
          </Link>

          {headerLink.map((link) => (
            <NavLink
              key={link}
              to={`${'/'}${link}`}
              className={getActiveLink}
              id={link}
            >
              {link}
            </NavLink>
          ))}
        </nav>

        <div className="header__button-box">
          {phoneSearchInput
            && (
              <form
                onSubmit={handleSubmit}
              >
                <input
                  value={searchParams.get('good') || ''}
                  onChange={(event) => setSearchParams(
                    { good: event.target.value },
                  )}
                  type="search"
                  placeholder={Placeholder}
                  className="header__input"
                />
              </form>
            )}

          <NavLink
            to="/Favourite"
            className={getActiveButton}
          >
            <img
              src="/img/icon/like.png"
              alt="like-icon"
            />

            {favourite.length < 1 ?
              null :
              <p
                className='header__amountGoods'
              >
                {favourite.length}
              </p>
            }
          </NavLink>

          <NavLink
            to="/Cart"
            className={getActiveButton}
          >
            <img
              src="/img/icon/cart.png"
              alt="cart-icon"
            />

            {selected.length < 1 ?
              null :
              <p
                className='header__amountGoods'
              >
                {selected.length}
              </p>
            }
          </NavLink>
        </div>
      </div>
    </div>
  );
};
