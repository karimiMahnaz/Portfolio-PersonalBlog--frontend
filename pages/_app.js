import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import { SSRProvider } from 'react-bootstrap';
import Router from "next/router";
import Script from 'next/script';

import { ParallaxProvider } from 'react-scroll-parallax';

import '../styles/globals.css'

import Loader from '../utils/loader'
import Layout from "../components/layout";


function MyApp({ Component, pageProps }) {

  const [loaderStatus, setLoaderStatus] = useState(true);
  const [isFirst, setIsFirst] = useState(true);

  Router.onRouteChangeStart = () => {
    console.log("onRouteChangeStart");
    setLoaderStatus(true);
    setIsFirst(false);
  };

  Router.onRouteChangeComplete = () => {
    console.log("onRouteChangeComplete");
    setLoaderStatus(false);
    setIsFirst(false);
  };

  Router.onRouteChangeError = () => { };

  return (


    loaderStatus ? <Loader setLoader={(bool) => {
      setLoaderStatus(bool);
      setIsFirst(bool);
    }}
      isFirst={isFirst} /> :
      <SSRProvider>

        <Layout customize={pageProps.customize}>
          <ParallaxProvider scrollAxis='horizontal'>

            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=G-52JDHKF8H2`}
            />

            <Script id="ga-script" strategy="lazyOnload">
              {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-52JDHKF8H2', {
          page_path: window.location.pathname,
              });
          `}
            </Script>

            <Component {...pageProps} />
          </ParallaxProvider>
        </Layout>

      </SSRProvider>

  )
}

export default MyApp
