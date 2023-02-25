import React from 'react'
import Head from 'next/head';
import { Row, Col} from "react-bootstrap";
import classnames from "classnames";

import ContactForm from "../../components/contactForm";
import MediaLogo from "../../components/mediaLogo";

import styles from "./contact.module.css"

const Contact = () => {
  

        return(<div>
        <Head>

            <meta name="description" content="Mahnaz Karimi" />
            <meta property="og:type" content="webSite" />
            <meta property="og:title" content="SofTesting Contact" />
            <meta property="og:site_name" content="SofTesting Contact" />
            <title>SofTesting Blog Contact</title>
            <link rel="icon" href="/settings.png" />

        </Head>
        <Row className="w-100 text-center">
            <Col
              xl={1}
              lg={1}
              md={1}
              sm={1}
              xs={1}>
              <MediaLogo />
            </Col>
            <Col
              xl={8}
              lg={8}
              md={10}
              sm={10}
              xs={10}>
               <ContactForm/>        
             </Col>
         </Row>
    </div>);
}

export default Contact;