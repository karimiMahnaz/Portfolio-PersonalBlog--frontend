import React, { useState } from "react";
import classnames from "classnames";
import { Row, Col, Card } from "react-bootstrap";
import Head from 'next/head';
import styles from "./projectDetail.module.css";

const ProjectDetail = ({ projectId }) => {
    return (
        <div className={classnames(styles.container)}>
            <Head>

                <meta name="description" content="Mahnaz Karimi Portfolio" />
                <meta property="og:type" content="webSite" />
                <meta property="og:title" content="SofTesting Blog" />
                <meta property="og:site_name" content="SofTesting Blog" />
                <title>Project Detail  | Portfolio</title>
                <link rel="icon" href="/settings.png" />

            </Head>
            <Card className={classnames(styles.card)} >
                <Row className="no-gutters">

                    <Col className={classnames("col-md-12", styles.col)}
                        xl={12}
                        lg={12}
                        md={12}
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

export default ProjectDetail;