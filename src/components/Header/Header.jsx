import style from './Header.module.css';
import PropTypes from 'prop-types';
import {Logo} from './Logo/Logo';
import {Auth} from './Auth/Auth';
import Layout from '../Layout';

export const Header = props => {
  console.log();
  return (
    <header className={style.header}>
      <Layout>
        <div className={style.container}>
          <Logo />
          <Auth />
        </div>
      </Layout>
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string,
};
