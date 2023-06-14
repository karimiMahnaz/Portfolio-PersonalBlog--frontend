import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import axios from "axios";
import { useRouter } from 'next/router';
import ReactMarkdown from "react-markdown";

import styles from "./projectContent.module.css";
import Animation from "../../components/animation";
import ProjectDetail from "../../components/project/projectDetail";

export async function getServerSideProps(context) {
  // const projectId = context.query.project !== undefined ? context.query.project.split('=')[1] : null
  console.log("project00000", context.query);
  const projectsList = context.query;
  try {
   // const url = process.env.URL;
    const url = 'http://localhost:2689';
    
    const fetchParams = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      ///(filters:  { projectID: { eq: "${projectId}" }} )
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
    console.log("res00", res.data.data.projects.data);
    const projectsList = await res.data.data.projects.data;

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

const ProjectPage = ({ projectsList }) => {

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
        <title>Projects | Portfolio</title>
        <link rel="icon" href="/settings.png" />
      </Head>

      <Animation />
      <ProjectDetail
        onClose={() => closeModal()}
        show={showModal}
        projectsList={projectsList}
      ></ProjectDetail>

    </div>
  );
};

export default ProjectPage;
