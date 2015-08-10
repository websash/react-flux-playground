import React, { PropTypes } from 'react';
import s from './views.css';

class NotFoundView extends React.Component {

  render() {
    return (
      <section className={s.main}>
        <h1>Not found</h1>
      </section>
    )
  }
}

export default NotFoundView;
