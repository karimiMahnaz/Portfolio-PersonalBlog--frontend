import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

import styles from "./postContent.module.css";

export async function getServerSideProps(context) {

  const articleid = context.query.article !== undefined ? context.query.article.split('=')[1] : null
  console.log('articleid_props', articleid)

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
        query: `{
          articles
          {
        data {
          attributes {
            articleId
            articleTitle
            articleGroup
            articleContent
            articleAuthor
            articleImage
            createDate
            upTodate
          }
        }
      }
      }
          `
      })
    }

    const res = await axios(fetchParams);
    console.log('res', res.data.data.articles.data)
    const articlesList = await res.data.data.articles.data;

    return {
      props: {
        articlesList,

      }
    }
  }
  catch (err) {
    console.log('error', err)
    return {
      props: {
        articlesList: {}
      }
    };
  }

};


const Post = ({ articlesList }) => {
  console.log('articlesList', articlesList)
  const [activePage, setActivePage] = useState(1);
  const { query } = useRouter();


  const setPage = (no) => {

    no > 1 && no !== undefined && articlesList[articlesList.length-1].attributes.articleId >= no ?
      setActivePage(no) : setActivePage(1);

    console.log("activePage", activePage);
  }




  useEffect(() => {
    const articleid = query.article !== undefined ? query.article.split('=')[1] : 1
  // console.log("query", query)
    activePage === 0 || activePage === undefined || activePage === null ? setActivePage(1) : setActivePage(articleid);
  }, [])

  // const myLoader = ({ src, width, quality }) => {
  //   return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
  // }

  return (
    <div className="p-5">

      <div className={classnames(styles.container)}>
        <Head>

          <meta name="description" content="Mahnaz Karimi" />
          <meta property="og:type" content="webSite" />
          <meta property="og:title" content="SofTesting Blog" />
          <meta property="og:site_name" content="SofTesting Blog" />
          <title>SofTesting Blog</title>
          <link rel="icon" href="/settings.png" />

        </Head>
        <Card className={classnames("mb-1", styles.card)} >
          {articlesList.map((article, index) => (
            article.attributes.articleId == activePage &&

            <Row key={article.attributes.articleId} className="no-gutters">
              <Col className={classnames("col-md-3", styles.col)}
                xl={3}
                lg={3}
                md={4}
                sm={12}
                xs={12}>
                <Card.Img 
                    //  loader={myLoader}
                      src={article.attributes.articleImage} 
                      className="card-img" width={310} height={270}   
                      alt="article`${article.attributes.articleId}`"/>
              </Col>
              <Col className={classnames("col-md-9", styles.col)}
                xl={9}
                lg={9}
                md={8}
                sm={12}
                xs={12}>
                <div className="card-body">
                  <h5 className="card-title">{article.attributes.articleTitle}</h5>
                  <h6 className="card-text">{article.attributes.articleGroup}</h6>
                  <ReactMarkdown className="card-text">{article.attributes.articleContent}</ReactMarkdown>
                  <p className="card-text"><small className="text-muted">Last updated {article.attributes.upTodate.substring(0,16)}</small></p>
                </div>
              </Col>
            </Row>
          ))}

        </Card>
      </div>
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



export default Post;