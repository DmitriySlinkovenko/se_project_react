import "./Footer.css";

function Footer() {
  const currentDate = new Date().toLocaleString("default", {
    year: "numeric",
  });

  return (
    <footer className="footer__container">
      <p className="footer__signature">Developed by Dmitriy Slinkovenko</p>
      <p className="footer__date">{currentDate}</p>
    </footer>
  );
}
export default Footer;
