import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import axios from 'axios';

import { Row, Col, Button } from "react-bootstrap";
import classnames from "classnames";
import styles from '../styles/Home.module.css';

import MediaLogo from "../components/mediaLogo";


export async function getStaticProps() {
  try {

    // const token = process.env.HYGRAPH_PERMANENTAUTH_TOKEN;


    // const response = await axios.get("http://127.0.0.1:1337/api/portfolio"
    //  , {
    //    headers: {
    //      Accept: "application/json",
    // //     'Authorization': `Bearer ${token}`
    //  },
    //  }
    // );
    // console.log('response333', response.data)

    
    const url = process.env.URL;
    console.log("url", url)
    const fetchParams = {
      method: 'post',
      url: `${url}/graphql`,
      headers: {
        'content-type': 'application/json'
      },
      data: JSON.stringify({
        query: `
         {
          portfolio{
           data{      
            attributes {
              name
              mainSpeciality
              speciality1
              speciality2
              speciality3
              description
              avatorUrl
              email 
                       } 
                 }
                    }
           }
         `
      })
    }

    const res = await axios(fetchParams);
    const { attributes } = res.data.data.portfolio.data;
    console.log('res', attributes)
     if (attributes ===null || attributes === undefined){

     }
    //    const portfolios = data.portfolio.map((x)=>{
    //      x.name 
    // })
    return {
      props: {
        attributes,
        //  speciality1: data.speciality1
      }
    }
  }
  catch (err) {
    console.log("error", err)
    return {
      props: {
        name: "John Doe",
        mainSpeciality: "mainSpeciality",
        speciality1: "speciality1",
        speciality2: "speciality2",
        speciality3: "speciality3",
        description: "description",
        avatorUrl: "/assets/github.svg",
        email: ""

      }
    };

  }
}


export default function Home({ attributes }) {

  // const localUrl= process.env.NEXT_PUBLIC_LOCAL_URL;

 //  console.log('NEXT_PUBLIC_LOCAL_URL', localUrl)
  // console.log('LOCAL_URL', process.env.LOCAL_URL);

  // const myLoader = ({ src, width, quality }) => {
  //   return `${localUrl}/${src}?w=${width}&q=${quality || 75}`
  // }
  
  return (
    <div className={styles.container}>
      <Head>

        <meta name="description" content="Mahnaz Karimi Portfolio" />
        <meta property="og:type" content="webSite" />
        <meta property="og:title" content="SofTesting Blog" />
        <meta property="og:site_name" content="SofTesting Blog" />
        <title>Portfolio</title>
        <link rel="icon" href="/settings.png" />

      </Head>
      <main className={styles.main}>

        <div className={styles.body}>
          <Row className="w-100 mr-auto ml-auto text-center">
            <Col
              xl={1}
              lg={1}
              md={1}
              sm={1}
              xs={1}>
              <MediaLogo />
            </Col>
            <Col className="ml-auto mr-auto text-center"
              xl={6}
              lg={6}
              md={8}
              sm={8}
              xs={8}>
              <div className={styles.content}>
                <p className={styles.hello}>Hello! I am </p>

                <h1 className={styles.title}>
                  {attributes.name}
                </h1>
                <p className={styles.description1}>
                  {attributes.description}
                </p>
                <p className={styles.description}>
                  {attributes.mainSpeciality}
                </p>
                <div className={styles.exp}>
                  {attributes.speciality1} <p className={styles.bullet}>.</p>  {attributes.speciality2} <p className={styles.bullet}>.</p> {attributes.speciality3}
                </div>

                <Button href="/contact" className={styles.btnW} variant="success">Let&apos;s work together</Button>

                <div className={styles.ps}>
                  <Link href="/projects" className={styles.project}> My Projects </Link>
                  <Link href="/projects" className={classnames(styles.arrow, styles.down)}></Link>
                </div>
              </div>
            </Col>
            <Col
              xl={5}
              lg={5}
              md={3}
              sm={3}
              xs={3}
            >
              <div>
              <Image 
               //      loader={myLoader}
                     border="0" 
                     alt="avator" 
                     src={attributes.avatorUrl} 
                     width={150} height={150} 
                     className={styles.avator}/>

              <div className={styles.emailad}>karimimahnaz122@gmail.com</div>
              </div>
            </Col>
          </Row>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image  
           //  loader={myLoader}
              src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
