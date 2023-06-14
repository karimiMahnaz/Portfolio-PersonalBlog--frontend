import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { Row, Col, Button, Card } from "react-bootstrap";
import classnames from "classnames";
import styled from "styled-components";

import styles from "./profile.module.css";
import MediaLogo from "../../components/mediaLogo";
//import Attributes from "../../functions/preBuild/protfolio.json";

export async function getStaticProps() {
  try {
    const url = process.env.URL;

    const fetchParams = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        query: `
         {
          portfolio{
           data{      
            attributes {
              name
              mainSpeciality
              speciality1
              speciality2
              speciality3
              description
              avatorUrl
              email 
                       } 
                 }
                    }
           }
         `,
      }),
    };

    const res = await axios(fetchParams);
    const { attributes } = res.data.data.portfolio.data;
    // console.log('res', attributes)
    console.log("url", url);
    const fetchCertificates = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        query: `
         {
          certificates{
           data{      
            attributes {
              certificateID
              certificatePath
                       } 
                 }
                    }
           }
         `,
      }),
    };

    const resCertificates = await axios(fetchCertificates);
    const certificatesList = resCertificates.data.data.certificates.data;
    console.log("resCertificates", certificatesList);
    //.certificates.data.attributes
    //    const portfolios = data.portfolio.map((x)=>{
    //      x.name
    // })
    return {
      props: {
        attributes: attributes,
        certificatesList: certificatesList,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        name: "John Doe",
        mainSpeciality: "mainSpeciality",
        speciality1: "speciality1",
        speciality2: "speciality2",
        speciality3: "speciality3",
        description: "description",
        avatorUrl: "/assets/github.svg",
        email: "",
      },
    };
  }
}


const Profile = ({ show, onClose, children, title, attributes, certificatesList }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(false);
  const [showCerificates, setShowCertificates] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  /// const { ref } = useParallax({ speed: 10 });
  const [isBrowser, setIsBrowser] = useState(false);

 // const attributes=Attributes;

  console.log("attributes", attributes);
  
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const certificateShow = () => {
    setShowCertificates(true);
  };
  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
    setShowCertificates(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const modalContent = show ? (
    <StyledModalOverlay>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>Portfolio</title>
      </Head>


      <div className={styles.main}>
          <a style={{color:'white', textAlign:"left", marginLeft:"40px"}} href="#" onClick={handleCloseClick}>
            x
          </a>
        <div className={styles.body}>
          <Row className="w-100 mr-auto ml-auto text-center">
            <Col xl={1} lg={1} md={1} sm={1} xs={1}>
              <MediaLogo />
            </Col>
            <Col
              className="ml-auto mr-auto text-center"
              xl={6}
              lg={6}
              md={8}
              sm={8}
              xs={8}
            >
              <div className={styles.content}>
                <p className={styles.hello}>Hello! I am </p>

                <h1 className={styles.title}>{attributes.name}</h1>
                <p className={styles.description1}>{attributes.description}</p>
                <p className={styles.description}>
                  {attributes.mainSpeciality}
                </p>
                <div className={styles.exp}>
                  {attributes.speciality1} <p className={styles.bullet}>.</p>{" "}
                  {attributes.speciality2} <p className={styles.bullet}>.</p>{" "}
                  {attributes.speciality3}
                </div>

                <Button
                  href="/contactMe"
                  className={styles.btnW}
                  variant="success"
                >
                  Let&apos;s work together
                </Button>

                <div className={styles.ps}>
                  <Link
                    href="#certificate"
                    className={styles.project}
                    onClick={(e) => certificateShow(e)}
                  >
                    {" "}
                    My Certificates{" "}
                  </Link>
                  <Link
                    href="#certificate"
                    className={classnames(styles.arrow, styles.down)}
                    onClick={(e) => certificateShow(e)}
                  ></Link>
                </div>
              </div>
            </Col>
            <Col
              className="ml-auto mr-auto text-center"
              xl={5}
              lg={5}
              md={3}
              sm={3}
              xs={3}
            >
              <div>
                <Image
                  //      loader={myLoader}
                  border="0"
                  alt="avator"
                  src={attributes.avatorUrl}
                  width={150}
                  height={180}
                  className={styles.avator}
                />

                <div className={styles.emailad}>karimimahnaz122@gmail.com</div>
              </div>
            </Col>
          </Row>
          </div>
          <section
            id="certificate"
            className={showCerificates ? styles.certificateSection : undefined}
          >
            <Row
              className={classnames(
                "w-100 text-center  mt-50 mb-30 justify-content-center",
                styles.certificatesList
              )}
            >
              {certificatesList.map((certificate) => (
                <Col
                  className="m-5 justify-content-center"
                  key={certificate.attributes.certificateID}
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  onMouseEnter={() => {
                    setSelectedCertificate(true);
                  }}
                  onMouseLeave={() => {
                    setSelectedCertificate(false);
                  }}
                >
                  <div
                    className={classnames(
                      "justify-content-center",
                      styles.card_font_hover
                    )}
                  >
                    <Card
                      className={classnames("p-10", styles.certificateCard)}
                    >
                      <Card.Img
                        className={
                          selectedCertificate ? styles.certificate : undefined
                        }
                        alt="certificate`${certificate.attributes.certificateID}`"
                        border="0"
                        src={certificate.attributes.certificatePath}
                        width={60}
                        height={100}
                      />
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </section>
     
      </div>
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

export default Profile;
