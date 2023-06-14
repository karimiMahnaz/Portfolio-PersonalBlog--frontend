import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import classnames from "classnames";
import { Row, Col, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

import styles from "./projectDetail.module.css";

const ProjectDetail = ({ show, onClose, projectsList }) => {
  console.log("projectsList", projectsList);
  const [isBrowser, setIsBrowser] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { query } = useRouter();

  const setPage = (no) => {
    try {
      no > 1 &&
      no !== undefined &&
      projectsList[projectsList.length - 1].attributes.projectID >= no
        ? setActivePage(no)
        : setActivePage(1);

      console.log("activePage", activePage);
    } catch {
      console.log("projectsList.length", projectsList.length);
    }
  };
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    const projectId =
      query.project !== undefined ? query.project.split("=")[1] : 1;
    console.log("query", query);
    activePage === 0 || activePage === undefined || activePage === null
      ? setActivePage(1)
      : setActivePage(parseInt(projectId));
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <div className={classnames("p-5", styles.container)}>
        <a
          style={{ color: "white", textAlign: "left", marginLeft: "40px" }}
          href="#"
          onClick={handleCloseClick}
        >
          x
        </a>
        <Card className={classnames("mb-1", styles.card)}>
          {projectsList.map(
            (project, index) =>
              (project.attributes.projectID == activePage && (
                <Row key={project.attributes.projectID} className="no-gutters">
                  <Col
                    className={classnames("col-md-4", styles.col)}
                    xl={3}
                    lg={3}
                    md={4}
                    sm={12}
                    xs={12}
                  >
                    <Card.Img
                      //   loader={myLoader}
                      src={project.attributes.projectImage}
                      className="card-img"
                      width={310}
                      height={270}
                      alt="project`${project.attributes.projectID}`"
                    />
                  </Col>
                  <Col
                    className={classnames("col-md-8", styles.col)}
                    xl={9}
                    lg={9}
                    md={8}
                    sm={12}
                    xs={12}
                  >
                    <div className="card-body">
                      <h5 className="card-title">
                        {project.attributes.projectName}
                      </h5>
                      <h6 className="card-title">
                        {project.attributes.projectType}
                      </h6>
                      <h6 className="card-title">
                        {project.attributes.technology},{" "}
                        {project.attributes.database}{" "}
                      </h6>
                      <div className={styles.yellowColor}></div>
                      <br />
                      <ReactMarkdown className="card-text">
                        {project.attributes.projectDescription}
                      </ReactMarkdown>
                      <br />
                      <p className="card-text">
                        <small className="text-muted">
                          Last updated{" "}
                          {project.attributes.updateTime.substring(0, 16)}
                        </small>
                      </p>
                    </div>
                  </Col>
                </Row>
              ) /*:
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
          </Row> */)
          )}
        </Card>

        <nav
          aria-label="Page navigation"
          className="position-absolute start-50 translate-middle-x"
        >
          <ul className="pagination">
            <li className="page-item">
              <Button
                onClick={() => setPage(activePage - 1)}
                variant="outline-success"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </Button>
            </li>
            <li className="page-item">
              <Button onClick={() => setPage(1)} variant="outline-success">
                1
              </Button>
            </li>
            <li className="page-item">
              <Button onClick={() => setPage(2)} variant="outline-success">
                2
              </Button>
            </li>
            <li className="page-item">
              <Button onClick={() => setPage(3)} variant="outline-success">
                3
              </Button>
            </li>
            <li className="page-item">
              <Button
                onClick={() => setPage(activePage + 1)}
                variant="outline-success"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </StyledModalOverlay>
  ) : null;

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

export default ProjectDetail;
