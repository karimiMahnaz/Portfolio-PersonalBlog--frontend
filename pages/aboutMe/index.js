import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from 'next/router';

import styles from "./aboutMe.module.css";

import AboutMe0 from "../../components/aboutMe";
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
        query: ` {
                    aboutMe
                        {
                      data {
                        attributes {
                          title
                          slogan
                          content
                        }
                      }
                    }
                  } `,
      }),
    };

    const res = await axios(fetchParams);
    console.log("res", res.data.data.aboutMe.data);
    const { attributes } = res.data.data.aboutMe.data;

    return {
      props: {
        attributes,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        attributes: "",
      },
    };
  }
}

const AboutMe = ({attributes}) => {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  
  function closeModal() {
    setShowModal(false);
    router.push('/');
  }

  return (
    <section className={styles.projectSection}>
      <Head>
        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>aboutMe</title>
        <link rel="icon" href="/settings.png" />
      </Head>

      <Animation />

      <AboutMe0
       onClose={() => closeModal()}
       show={showModal}
       attributes={attributes}>
       </AboutMe0>
    </section>
  );
};

export default AboutMe;
