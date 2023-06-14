import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { Row, Col, Card, Button } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router';

import styles from "./blog.module.css";

import PostContent from "../../components/post/postContent";
import Animation from "../../components/animation";

export async function getStaticProps() {
  try {
    const url = process.env.URL;
    ///(filters:  { articleId: { eq: 1 }} )
    const fetchParams = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
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
            `,
      }),
    };

    const res = await axios(fetchParams);
    console.log("res", res.data.data.articles.data);
    const articlesList = await res.data.data.articles.data;
    console.log("articlesList0", articlesList);
    return {
      props: {
        articlesList,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        articlesList: null,
      },
    };
  }
}

const Blog = ({ articlesList }) => {

    const [showModal, setShowModal] = useState(true);
    const router = useRouter();

    function closeModal() {
      setShowModal(false);
      router.push('/');
    }

  return (
    <div>
      <Head>
        <meta name="description" content="Mahnaz Karimi" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>SofTesting Blog</title>
        <link rel="icon" href="/settings.png" />
      </Head>

      <Animation />

      <PostContent
        onClose={() => closeModal()}
        show={showModal}
        articlesList={articlesList}
      ></PostContent>
    </div>
  );
};

export default Blog;
