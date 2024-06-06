import { Link } from 'react-router-dom';

export const Footer = () => (
  <div className="footer">

    <Link
      to="/App"
      className="footer__logo-box"
    >
      <img
        src="/img/icon/logo.png"
        alt="logo.icon"
        className="footer__logo"
      />
    </Link>

    <nav className="footer__nav">
      <ul className="footer__list">
        <li className="footer__link">
          Github
        </li>

        <li className="footer__link">
          Contacts
        </li>

        <li className="footer__link">
          rights
        </li>
      </ul>
    </nav>

    <div className="footer__button-box">
      <p className="footer__button-text">
        Back to top
      </p>

      <img
        src="/img/icon/top.png"
        alt="top-string"
        className="footer__button"
      />
    </div>
  </div>
);
