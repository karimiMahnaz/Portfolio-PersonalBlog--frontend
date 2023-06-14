import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Row, Col, Card } from "react-bootstrap";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import styles from "./aboutMe.module.css";

const AboutMe = ({ show, onClose, attributes }) => {

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
      <Row
        className={classnames(
          "w-100 text-left mt-100 mb-100 justify-content-center",
          styles.aboutMe
        )}
      >
        <a
          style={{ color: "white", textAlign: "left", marginLeft: "100px" }}
          href="#"
          onClick={handleCloseClick}
        >
          x
        </a>
        <Col className="m-5" xl={8} lg={8} md={11} sm={12} xs={12}>
          <Card className={styles.card}>
            <div className="card-body">
              <br />
              <h4 className="card-title">{attributes.title}</h4>
              <div className={styles.yellowColor}></div>
              <br />
              <ReactMarkdown className="card-text">
                {" "}
                {attributes.content}
              </ReactMarkdown>
              <ReactMarkdown className="card-text">
                {attributes.content}
              </ReactMarkdown>
              <br />
              <p className="card-text"> {attributes.slogan}</p>
              <br />
            </div>
          </Card>
        </Col>
      </Row>
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

export default AboutMe;
