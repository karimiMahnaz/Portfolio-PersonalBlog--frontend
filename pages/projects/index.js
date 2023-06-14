import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useRouter } from 'next/router';

import styles from "./projects.module.css";
import ProjectContent from "../../components/project/projectContent";
import Animation from "../../components/animation";

export async function getStaticProps() {
  try {
    const url = process.env.URL;
    ///(filters:  { projectID: { gt: "0" , lt:"4"}} )
    const fetchParams = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify({
        query: `
          {
            projects
            {
             data{      
              attributes {
                projectID
                projectName
                projectType
                projectImage
                projectDescription
                technology
                database
                updateTime
                         } 
                   }
                      }
             }
         `,
      }),
    };

    const res = await axios(fetchParams);
    console.log("res", res.data.data.projects.data);
    const projectsList = await res.data.data.projects.data;
    ///.data.data.projects.data
    ///  attributes.map((attribute) => setData(attribute));
    console.log("projectsList999", projectsList);
    return {
      props: {
        projectsList,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        projectID: 0,
        projectName: "",
        projectType: "",
        projectImage: "",
        projectDescription: "",
        technology: "",
        database: "",
        updateTime: 0,
      },
    };
  }
}

const Projects = ({ projectsList }) => {
 
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  function closeModal() {
    setShowModal(false);
    router.push('/');
  }

  return (
    <div>
      <Head>
        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>ProjectsList</title>
        <Link rel="icon" href="/settings.png" />
      </Head>
      <Animation />

      <ProjectContent
        onClose={() => closeModal()}
        show={showModal}
        projectsList={projectsList}
      ></ProjectContent>
    </div>
  );
};

export default Projects;
