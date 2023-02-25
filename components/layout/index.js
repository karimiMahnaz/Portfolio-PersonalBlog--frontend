
import Head from 'next/head';

import styles from "./layout.module.css";

import NavBar from "../navBar";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
       <Head>
        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />

        <link rel="icon" href="/settings.png" />
     </Head>
      <NavBar />

       <div>{children}</div>
    
    </div>
  )
}
export default Layout;