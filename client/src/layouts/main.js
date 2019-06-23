import React from "react";
import { Link } from "react-router-dom";
import { css } from "linaria";

const styles = {
  base: css`
    font-family: Arial, Helvetica, sans-serif
  `,
  title: css`
    color: #872258;
    font-size: 30px;
  `,
  nav: css`
    background-color: #eeeeff;
    padding: 5px;
  `,
  navItem: css`
    margin: 2px 5px;
  `
}

const MainLayout = props => (
  <div className={styles.base} data-testid="base">
    <header>
      <h1 className={styles.title}>Gym</h1>
      <h3>Graphing your workout</h3>
      <nav className={styles.nav}>
        <Link className={styles.navItem} to="/">Home</Link>
        <Link className={styles.navItem} to="/foo">Foo</Link>
      </nav>
    </header>
    <main>
      {props.children}
    </main>
  </div>
);

export default MainLayout;