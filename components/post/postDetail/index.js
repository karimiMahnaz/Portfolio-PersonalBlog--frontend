import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useRouter } from "next/router";
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import styles from "./postDetail.module.css";

const PostDetail = ({ show, onClose, articlesList }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { query } = useRouter();

  const setPage = (no) => {
    no > 1 &&
    no !== undefined &&
    articlesList[articlesList.length - 1].attributes.articleId >= no
      ? setActivePage(no)
      : setActivePage(1);

    console.log("activePage", activePage);
  };

  useEffect(() => {
    const articleid =
      query.article !== undefined ? query.article.split("=")[1] : 1;
    // console.log("query", query)
    activePage === 0 || activePage === undefined || activePage === null
      ? setActivePage(1)
      : setActivePage(articleid);
  }, []);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <div className="p-5">
        <div className={classnames(styles.container)}>
        <a style={{color:'white', textAlign:"left", marginLeft:"40px"}} href="#" onClick={handleCloseClick}>
            x
          </a>
          <Card className={classnames("mb-1", styles.card)}>
            {articlesList.map(
              (article, index) =>
                article.attributes.articleId == activePage && (
                  <Row
                    key={article.attributes.articleId}
                    className="no-gutters"
                  >
                    <Col
                      className={classnames("col-md-3", styles.col)}
                      xl={3}
                      lg={3}
                      md={4}
                      sm={12}
                      xs={12}
                    >
                      <Card.Img
                        //  loader={myLoader}
                        src={article.attributes.articleImage}
                        className="card-img"
                        width={310}
                        height={270}
                        alt="article`${article.attributes.articleId}`"
                      />
                    </Col>
                    <Col
                      className={classnames("col-md-9", styles.col)}
                      xl={9}
                      lg={9}
                      md={8}
                      sm={12}
                      xs={12}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          {article.attributes.articleTitle}
                        </h5>
                        <h6 className="card-text">
                          {article.attributes.articleGroup}
                        </h6>
                        <ReactMarkdown className="card-text">
                          {article.attributes.articleContent}
                        </ReactMarkdown>
                        <p className="card-text">
                          <small className="text-muted">
                            Last updated{" "}
                            {article.attributes.upTodate.substring(0, 16)}
                          </small>
                        </p>
                      </div>
                    </Col>
                  </Row>
                )
            )}
          </Card>
        </div>
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

export default PostDetail;
