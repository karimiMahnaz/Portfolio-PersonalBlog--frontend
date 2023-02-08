import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import styles from "./projectContent.module.css";
///import ProjectContent from "../../components/project/projectContent";
//import ProjectDetail from "../../components/project/projectDetail";

export async function getServerSideProps(context) {

  const projectId = context.query.project !== undefined ? context.query.project.split('=')[1] : null
  console.log('projectId_props', projectId)

  try {

    const url = process.env.URL;

    const fetchParams = {
      method: 'post',
      url: `${url}/graphql`,
      headers: {
        'content-type': 'application/json'
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
         `
      })
    }

    const res = await axios(fetchParams);
    console.log('res', res.data.data.projects.data)
    const projectsList = await res.data.data.projects.data;

    return {
      props: {
        projectsList,

      }
    }
  }
  catch (err) {
    console.log('error', err)
    return {
      props: {
        projectID: 0,
        projectName: '',
        projectType: '',
        projectImage: '',
        projectDescription: '',
        technology: '',
        database: '',
        updateTime: 0
      }
    };
  }

};


const ProjectPage = ({ projectsList }) => {

  console.log('projectsList', projectsList)
  const [activePage, setActivePage] = useState(1);
  const { query } = useRouter();


  const setPage = (no) => {

     no > 1 && no!==undefined && projectsList[projectsList.length-1].attributes.projectID >= no ?
        setActivePage(no): setActivePage(1);
   
     console.log("activePage", activePage);
  }

  


  useEffect(() => {
    const projectId = query.project !== undefined ? query.project.split('=')[1] : 1
    console.log("query", query)
    activePage === 0 || activePage === undefined || activePage === null ? setActivePage(1) : setActivePage(projectId);
  }, [])

  // const myLoader = ({ src, width, quality }) => {
  //   return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
  // }

  return (
    <div className={classnames("p-5", styles.container)}>
      <Head>

        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>Projects | Portfolio</title>
        <link rel="icon" href="/settings.png" />

      </Head>
      <Card className={classnames("mb-1", styles.card)} >


        {projectsList.map((project, index) => (
          project.attributes.projectID == activePage &&
          <Row   key={project.attributes.projectID}  className="no-gutters">
            <Col className={classnames("col-md-4", styles.col)}
              xl={3}
              lg={3}
              md={4}
              sm={12}
              xs={12}>
              <Card.Img 
                  //   loader={myLoader}
                     src={project.attributes.projectImage} 
                     className="card-img"  width={310} height={270}  
                      alt="project`${project.attributes.projectID}`" />
            </Col>
            <Col className={classnames("col-md-8", styles.col)}
              xl={9}
              lg={9}
              md={8}
              sm={12}
              xs={12}>
              <div className="card-body">
                <h5 className="card-title">{project.attributes.projectName}</h5>
                <h6 className="card-title">{project.attributes.projectType}</h6>
                <h6 className="card-title">{project.attributes.technology}, {project.attributes.database} </h6>
                <div className={styles.yellowColor}></div>
                <br />
                <ReactMarkdown className="card-text">{project.attributes.projectDescription}</ReactMarkdown>
                <br />
                <p className="card-text"><small className="text-muted">Last updated {project.attributes.updateTime.substring(0,16)}</small></p>
              </div>
            </Col>
            </Row>
          /*  :
          <Row   key={project.attributes.projectID}  className="no-gutters">
           <Col  className={classnames("col-md-12", styles.col)}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}>
              <div  className="card-body">
                  <h5  className="card-title" >This project is not published.</h5>
              </div>
           </Col>
          </Row> */
        ))}

      </Card>

      <nav aria-label="Page navigation" className="position-absolute start-50 translate-middle-x">
        <ul className="pagination">
          <li className="page-item">
            <Button onClick={() => setPage(activePage - 1)} variant="outline-success" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Button>
          </li>
          <li className="page-item"><Button onClick={() => setPage(1)} variant="outline-success">1</Button></li>
          <li className="page-item"><Button onClick={() => setPage(2)} variant="outline-success">2</Button></li>
          <li className="page-item"><Button onClick={() => setPage(3)} variant="outline-success">3</Button></li>
          <li className="page-item">
            <Button onClick={() => setPage(activePage + 1)} variant="outline-success" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Button>
          </li>
        </ul>
      </nav>


    </div>
  );
}


export default ProjectPage;