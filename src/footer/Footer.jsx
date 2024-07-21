export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/img/GioTours_logo-green.png" alt="Natour logo" />
        <h2 className="heading-secondary">GioTours</h2>
      </div>
      <p className="footer__copyright">
        <span>
          The website is developed for personal purposes. Provided information
          is fictitious.
        </span>
        <br />
        <span className="footer__copyright">
          &copy;{new Date().getFullYear()} by Giorgi Gogsadze. The web design is
          inspired by Jonas Schmedtmann.
        </span>
      </p>
    </footer>
  );
}
