import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import Link from "next/link";
import Head from 'next/head';
import axios from 'axios';

import styles from "./projects.module.css"


export async function getStaticProps() {
  try {

    const url = process.env.URL;
///(filters:  { projectID: { gt: "0" , lt:"4"}} )
    const fetchParams = {
      method: 'post',
      url: `${url}/graphql`,
      headers: {
        'content-type': 'application/json'
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
         `
      })
    }

    const res = await axios(fetchParams);
    console.log('res', res.data.data.projects.data)
    const projectsList = await res.data.data.projects.data;
    ///.data.data.projects.data
    ///  attributes.map((attribute) => setData(attribute));
    // console.log('projectsList999', projectsList)
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
}



const Projects = ({ projectsList }) => {

  const [selectedProject, setSelectedProject] = useState(false);
  const [sProjectNo, setSProjectNo] = useState(0);
  const [eProjectNo, setEProjectNo] = useState(4);
  const [activePage, setActivePage] = useState(1);

  console.log('projectsList', projectsList[projectsList.length-1].attributes.projectID)

  const setPage = (no) =>{

     no > 1 && no!==undefined && Math.ceil(projectsList[projectsList.length-1].attributes.projectID/3) >= no ?
        setActivePage(no): setActivePage(1);
     no > 1 && no!==undefined && Math.ceil(projectsList[projectsList.length-1].attributes.projectID/3) >= no ?
          setSProjectNo(3 * no - 3):setSProjectNo(0); 
     no > 1 && no!==undefined && Math.ceil(projectsList[projectsList.length-1].attributes.projectID/3) >= no ?
             setEProjectNo(3 * no + 1): setEProjectNo(4);
          
     console.log("activePage", activePage);
     
  }

  useEffect(() => {
    setActivePage(1);
    setSProjectNo(0);
    setEProjectNo(4);
  },[])

  console.log("eprojectNo" , eProjectNo)

  // const myLoader = ({ src, width, quality }) => {
  //      return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
  //  }

  return (

    <section className={styles.projectSection}>
      <Head>

        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>ProjectsList</title>
        <link rel="icon" href="/settings.png" />

      </Head>

      <Row className={classnames("w-100 text-center mt-0 mb-1 justify-content-center", styles.projectList)}>

        {projectsList.map((project) => (
          project.attributes.projectID > sProjectNo && project.attributes.projectID < eProjectNo && 
          <Col
            key={project.attributes.projectID}
            className="m-5"
            xl={3}
            lg={3}
            md={5}
            sm={11}
            xs={11}
            onMouseEnter={() => {
              setSelectedProject(true);
            }}
            onMouseLeave={() => {
              setSelectedProject(false);
            }}
          >
            <div className={classnames(styles.card_font_hover)}>
              <Card className={classnames("p-10", styles.card)}>
                <Card.Img 
                  //  loader={myLoader}
                    className={selectedProject ? styles.project_hover : undefined}
                    alt="project`${project.attributes.projectID}`"
                    src={project.attributes.projectImage} width={300} height={260} />
                    
                <p className={selectedProject ? classnames(styles.text_img_slider, styles.white_text) : undefined}>{project.attributes.projectType}</p>
                <div className="card-body">
                  <h4 className="card-title">{project.attributes.projectName}</h4>
                  <p className="card-text">Technology: {project.attributes.technology}</p>
                  <p className="card-text">DataBase: {project.attributes.database}</p>
                  <Link href={{ pathname: "/projects/[project]", 
                                 query:{
                                     projectID: project.attributes.projectID,

                                 }
                                }} 
                        as={`/projects/projectID=${project.attributes.projectID}`}>
                    <Button variant="outline-success">See Project</Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Col>

        ))}

       </Row>
        <nav aria-label="Page navigation" className="position-absolute start-50 translate-middle-x">
          <ul className="pagination">
            <li className="page-item">
              <Button onClick= {()=> setPage(activePage - 1)}  variant="outline-success" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </Button>
            </li>
            <li className="page-item"><Button onClick= {()=> setPage(1)}  variant="outline-success" >1</Button></li>
            <li className="page-item"><Button onClick= {()=> setPage(2)}  variant="outline-success">2</Button></li>
            <li className="page-item"><Button onClick= {()=> setPage(3)}  variant="outline-success">3</Button></li>
            <li className="page-item">
              <Button onClick= {()=> setPage(activePage + 1)}  variant="outline-success" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </Button>
            </li>
          </ul>
        </nav>

   
    </section>

  );
}

export default Projects;