import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { Row, Col, Card, Button } from "react-bootstrap";
import Image from 'next/image';
import Head from 'next/head';
import Link from "next/link";
import styled from "styled-components";

import styles from "./postContent.module.css";

const PostContent = ({ show, onClose, articlesList }) => {

    const [isBrowser, setIsBrowser] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(false);
    const [sArticleNo, setSArticleNo] = useState(0);
    const [eArticleNo, setEArticleNo] = useState(3);
    const [activePage, setActivePage] = useState(1);
   
    const setPage = (no) => {
    
        no > 1 && no !== undefined && Math.ceil(articlesList.length> 0 ? (articlesList[articlesList.length-1].attributes.articleId / 2) : (articlesList[0].attributes.articleId / 2) ) >= no ?
            setActivePage(no) : setActivePage(1);
        no > 1 && no !== undefined && Math.ceil(articlesList[articlesList.length-1].attributes.articleId / 2) >= no ?
            setSArticleNo(2 * no - 2) : setSArticleNo(0);
        no > 1 && no !== undefined && Math.ceil(articlesList[articlesList.length-1].attributes.articleId / 2) >= no ?
            setEArticleNo(2 * no + 1) : setEArticleNo(3);
         
    }

    useEffect(() => {
        setActivePage(1);
        setSArticleNo(0);
        setEArticleNo(3);
    }, [])

    useEffect(() => {
        setIsBrowser(true);
      }, []);
    
      const handleCloseClick = (e) => {
        e.preventDefault();
        onClose();
      };

   const modalContent = show ? (
    <StyledModalOverlay>
        <section className={classnames("p-5", styles.container)}>
        <a style={{color:'white', textAlign:"left", marginLeft:"40px"}} href="#" onClick={handleCloseClick}>
            x
          </a>
        {articlesList.map((article, index) => (
            article.attributes.articleId > sArticleNo && article.attributes.articleId < eArticleNo &&
            <Card className={classnames("mb-4", styles.card)}
                key={article.attributes.articleId}
            >
                <Row className="no-gutters">
                    <Col className={classnames("col-md-4", styles.col)}
                        xl={4}
                        lg={4}
                        md={5}
                        sm={12}
                        xs={12}
                        onMouseEnter={() => {
                            setSelectedArticle(true);
                        }}
                        onMouseLeave={() => {
                            setSelectedArticle(false);
                        }}
                    >
                    <Card.Img 
                      //    loader={myLoader}
                          src={article.attributes.articleImage} 
                          className="card-img" width={280} height={250}   
                          alt="article`${article.attributes.articleId}`" />
                    </Col>
                    <Col className={classnames("col-md-8", styles.col)}
                        xl={8}
                        lg={8}
                        md={7}
                        sm={12}
                        xs={12}>
                        <div className="card-body p-1 px-2">
                            <h5 className="card-title">{article.attributes.articleTitle}</h5>
                              <p className="card-text px-2 ">{article.attributes.articleBrief}</p>
                            <p className="card-text px-2">{article.attributes.articleGroup}</p>
                            <Link href={{
                                pathname: "/blog/[post]",
                                query: {
                                    articleId: article.attributes.articleId,
                                }
                            }}
                                as={`/blog/articleId= ${article.attributes.articleId}`}>
                                <Button variant="outline-success" px-2>See Post</Button>
                            </Link>
                            <p className="card-text"></p>
                            <p className="card-text px-2"><small className="text-muted">Last updated {article.attributes.upTodate.substring(0,16)}</small></p>
                        </div>
                    </Col>
                </Row>
            </Card>
        ))}

        <nav aria-label="Page navigation" className="position-absolute start-50 translate-middle-x">
            <ul className="pagination">
                <li className="page-item">
                    <Button onClick={() => setPage(activePage - 1)} variant="outline-success" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Button>
                </li>
                <li className="page-item"><Button onClick={() => setPage(1)} variant="outline-success" >1</Button></li>
                <li className="page-item"><Button onClick={() => setPage(2)} variant="outline-success">2</Button></li>
                <li className="page-item"><Button onClick={() => setPage(3)} variant="outline-success">3</Button></li>
                <li className="page-item">
                    <Button onClick={() => setPage(activePage + 1)} variant="outline-success" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Button>
                </li>
            </ul>
        </nav>
          </section>
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

export default PostContent;