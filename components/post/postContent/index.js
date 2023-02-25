import React, { useState } from "react";
import classnames from "classnames";
import { Row, Col, Card } from "react-bootstrap";
import Image from 'next/image';
import Head from 'next/head';
import styles from "./postContent.module.css";

const PostContent = ({ postId }) => {

    const myLoader = ({ src, width, quality }) => {
        return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <div className={classnames("p-5", styles.container)}>
            <Head>

                <meta name="description" content="Mahnaz Karimi" />
                <meta property="og:type" content="webSite" />
                <meta property="og:title" content="SofTesting Blog" />
                <meta property="og:site_name" content="SofTesting Blog" />
                <title>SofTesting Blog</title>
                <link rel="icon" href="/settings.png" />

            </Head>
            <Card className={classnames("mb-3", styles.card)} >
                <Row className="no-gutters">
                    <Col className={classnames("col-md-4", styles.col)} 
                        xl={4}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}>
                        <Image 
                          loader={myLoader}
                          src="/assets/projects/424725117.png" 
                          className="card-img" alt="post" />
                    </Col>
                    <Col className= {classnames("col-md-8" , styles.col)} 
                        xl={4}
                        lg={4}
                        md={6}
                        sm={12}
                        xs={12}>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default PostContent;