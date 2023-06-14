import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Row, Col, Card, Button } from "react-bootstrap";
import classnames from "classnames";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import PostDetail from "../../components/post/postDetail";
import Animation from "../../components/animation";

import styles from "./postContent.module.css";

export async function getServerSideProps() {
  // const articleid = context.query.article !== undefined ? context.query.article.split('=')[1] : null
  // console.log('articleid_props', articleid)

  try {
   // const url = process.env.URL;
    const url = 'http://localhost:2689';
    const fetchParams = {
      method: "post",
      url: `${url}/graphql`,
      headers: {
        "content-type": "application/json",
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
          `,
      }),
    };

    const res = await axios(fetchParams);
    console.log("res", res.data.data.articles.data);
    const articlesList = await res.data.data.articles.data;

    return {
      props: {
        articlesList,
      },
    };
  } catch (err) {
    console.log("error", err);
    return {
      props: {
        articlesList: {},
      },
    };
  }
}

const Post = ({ articlesList }) => {
  console.log("articlesList", articlesList);

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

      <PostDetail
        onClose={() => closeModal()}
        show={showModal}
        articlesList={articlesList}
      ></PostDetail>
    </div>
  );
};

export default Post;
