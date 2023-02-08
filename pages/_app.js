import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/reset.css';
import { SSRProvider } from 'react-bootstrap';
import Router from "next/router";
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

 Router.onRouteChangeError = () => {};

  return (loaderStatus ? <Loader setLoader={(bool) => {
            setLoaderStatus(bool);
            setIsFirst(bool);
          }}
          isFirst={isFirst}/> :
    <SSRProvider>
      
        <Layout customize={pageProps.customize}>

          <Component {...pageProps} />
        </Layout>
     
    </SSRProvider>
  )
}

export default MyApp
