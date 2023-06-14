import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";

import { Row, Col, Button, Card } from "react-bootstrap";
import classnames from "classnames";

import styles from "./profile.module.css";
import Profile0 from "../../components/profile";
import Animation from "../../components/animation";

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
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  function closeModal() {
    setShowModal(false);
    router.push('/');
  }

  return (
    <div className={styles.container}>
      <Head>

        <Link rel="icon" href="/favicon.ico" />
        <Link rel="shortcut icon" href="/favicon.ico" />
        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>Portfolio, Mahnaz Karimi</title>
        
       </Head>
     
       
      <main className={styles.main}>
        <Animation/>
        <Profile0
           onClose={() => closeModal()}
           show={showModal}
           attributes={attributes}
           certificatesList = {certificatesList}

        ></Profile0> 
      </main>
    </div>
  )
};


export default Profile;
