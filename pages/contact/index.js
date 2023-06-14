import React, {useState, useEffect} from 'react'
import Head from 'next/head';
import { Row, Col} from "react-bootstrap";
import ReactDOM from "react-dom";
import styled from "styled-components";

import ContactForm from "../contactForm";
import MediaLogo from "../../components/mediaLogo";


const Contact = ({ show, onClose, children, title}) => {
  
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
      }, []);
    
      const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
      };
    
    const modalContent = show ? (
        <StyledModalOverlay>
        
        <Head>

            <meta name="description" content="Mahnaz Karimi" />
            <meta property="og:type" content="webSite" />
            <meta property="og:title" content="SofTesting Contact" />
            <meta property="og:site_name" content="SofTesting Contact" />
            <title>SofTesting Blog Contact</title>
            <link rel="icon" href="/settings.png" />

        </Head>
        
        <Row className="w-100 text-center">
           <a style={{color:'white', textAlign:"left", marginLeft:"50px"}} href="#" onClick={handleCloseClick}>
                  x
           </a>
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
         </StyledModalOverlay>) : null;

         if (isBrowser) {
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modalRoot")
  );
} else {
  return null;
}
    
  
};

const StyledModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(1, 1, 1, 0.5);
  backdrop-filter: blur(10px);
`;

export default Contact;