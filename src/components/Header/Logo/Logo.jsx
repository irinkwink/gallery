import style from './Logo.module.css';
import logo from './img/logo.svg';

export const Logo = props => {
  console.log();
  return (
    <a className={style.link} href="/">
      <img className={style.logo} src={logo} alt="Логотип Blogget" />
    </a>
  );
};
