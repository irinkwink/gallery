---
to: <%= absPath %>/<%= component_name %>.jsx
---
import style from './<%= component_name %>.module.css';
import PropTypes from 'prop-types';

export const <%= component_name %> = props => {
  console.log();
  return (
    <div className={style.<%= component_name %>}></div>
  );
};

<%= component_name %>.propTypes = {
  name: PropTypes.string,
};
