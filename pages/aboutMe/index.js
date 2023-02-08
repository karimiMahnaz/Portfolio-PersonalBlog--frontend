import React from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import Link from "next/link";
import Head from 'next/head';
import axios from 'axios';

import styles from "./aboutMe.module.css"


export async function getStaticProps() {
    try {

        const url = process.env.URL;

        const fetchParams = {
            method: 'post',
            url: `${url}/graphql`,
            headers: {
                'content-type': 'application/json'
            },
            data: JSON.stringify({
               
                query:` {
                    aboutMe
                        {
                      data {
                        attributes {
                          title
                          slogan
                          content
                        }
                      }
                    }
                  } `
            })
        }

        const res = await axios(fetchParams);
        console.log('res', res.data.data.aboutMe.data)
        const {attributes} =  res.data.data.aboutMe.data;

        return {
            props: {
                attributes,
            }
        }
    }
    catch (err) {
        console.log('error', err)
        return {
            props: {
                attributes: ''
            }
        };
    }
}

const aboutMe = ({ attributes }) => {
    return (
        <section className={styles.projectSection}>
            <Head>

                <meta name="description" content="Mahnaz Karimi Portfolio" />
                <meta property="og:type" content="webSite" />
                <meta property="og:title" content="SofTesting Blog" />
                <meta property="og:site_name" content="SofTesting Blog" />
                <title>aboutMe</title>
                <link rel="icon" href="/settings.png" />
            </Head>


            <Row className={classnames("w-100 text-left mt-100 mb-100 justify-content-center", styles.aboutMe)}>
              <Col
              className="m-5"
              xl={8}
              lg={8}
              md={11}
              sm={12}
              xs={12}
              >
                <Card className={styles.card}>
                   <div className="card-body">
                    <br/>
                     <h4 className="card-title">{attributes.title}</h4>
                     <div className={styles.yellowColor}></div>
                     <br/>
                     <p className="card-text"> {attributes.content}</p>
                     <br/>
                     <p className="card-text"> {attributes.slogan}</p>
                     <br/>
                    </div>
                </Card>
              </Col>
            </Row>

        </section>
    );
}

export default aboutMe;