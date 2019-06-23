import React from "react";
import { Link } from "react-router-dom";
import { css } from "linaria";

const styles = {
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
  <div>
    <header>
      <h1 className={styles.title}>React GraphQL Blueprint</h1>
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