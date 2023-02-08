import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Row, Col, Card, Button } from "react-bootstrap";
import Head from 'next/head';
import Link from "next/link";
import axios from 'axios';

import styles from './blog.module.css';

export async function getStaticProps() {
    try {

        const url = process.env.URL;
        ///(filters:  { articleId: { eq: 1 }} )
        const fetchParams = {
            method: 'post',
            url: `${url}/graphql`,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
                query: `{
            articles
            {
          data {
            attributes {
              articleId
              articleTitle
              articleBrief
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
        console.log('articlesList0', articlesList)
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
                articlesList: null,
            }
        };
    }
}

const Blog = ({ articlesList }) => {

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
   
    // const myLoader = ({ src, width, quality }) => {
    //     return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
    //   }

    return (
        <section className={classnames("p-5", styles.container)}>
            <Head>

                <meta name="description" content="Mahnaz Karimi" />
                <meta property="og:type" content="webSite" />
                <meta property="og:title" content="SofTesting Blog" />
                <meta property="og:site_name" content="SofTesting Blog" />
                <title>SofTesting Blog</title>
                <link rel="icon" href="/settings.png" />

            </Head>


            {articlesList.map((article, index) => (
                article.attributes.articleId > sArticleNo && article.attributes.articleId < eArticleNo &&
                <Card className={classnames("mb-2", styles.card)}
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
                              className="card-img" width={300} height={270}   
                              alt="article`${article.attributes.articleId}`" />
                        </Col>
                        <Col className={classnames("col-md-8", styles.col)}
                            xl={8}
                            lg={8}
                            md={7}
                            sm={12}
                            xs={12}>
                            <div className="card-body">
                                <h5 className="card-title">{article.attributes.articleTitle}</h5>
                                  <p className="card-text">{article.attributes.articleBrief}</p>
                                <p className="card-text">{article.attributes.articleGroup}</p>
                                <Link href={{
                                    pathname: "/blog/[post]",
                                    query: {
                                        articleId: article.attributes.articleId,
                                    }
                                }}
                                    as={`/blog/articleId= ${article.attributes.articleId}`}>
                                    <Button variant="outline-success">See Post</Button>
                                </Link>
                                <p className="card-text"></p>
                                <p className="card-text"><small className="text-muted">Last updated {article.attributes.upTodate.substring(0,16)}</small></p>
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
        </section>);
}

export default Blog;