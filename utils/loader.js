import React, { useEffect } from "react";
import classnames from "classnames";
import Head from 'next/head';

import styles from "../styles/loader.module.css";

const Loader = ({ isFirst, setLoader }) => {

  useEffect(() => {
    if (isFirst) {
      setLoader(false)
    }
  })

  return (
    <div className={styles.container}>
      <Head>

        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>SofTesting Blog</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className={classnames(styles.circles)} >
        <div className={styles.circle1} ></div>
        <div className={styles.circle2} ></div>
        <div className={styles.circle3} ></div>
        <div className={styles.circle4} ></div>
        <div className={styles.circle5} ></div>
        <div className={styles.circle6} ></div>
        <div className={styles.circle7} ></div>
        <div className={styles.circle8} ></div>
        <div className={styles.circle9} ></div>
        <div className={styles.circle10} ></div>
        <div className={styles.circle11} ></div>
        <div className={styles.circle12} ></div>
        <div className={styles.circle13} ></div>
        <div className={styles.circle14} ></div>
        <div className={styles.circle15} ></div>

      </div>
      <div className={classnames(styles.Desc, "position-absolute start-50 translate-middle mt-5")} >SofTesting Blog</div>
    </div>);
}

export default Loader;

