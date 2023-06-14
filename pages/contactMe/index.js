import React, {useState} from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';

import Contact from "../contact";
import Animation from "../../components/animation";

import styles from "./contactMe.module.css"

const ContactMe = () => {
  
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  function closeModal() {
    setShowModal(false);
    router.push('/');
  }

        return(<div>
        <Head>

            <meta name="description" content="Mahnaz Karimi" />
            <meta property="og:type" content="webSite" />
            <meta property="og:title" content="SofTesting Contact" />
            <meta property="og:site_name" content="SofTesting Contact" />
            <title>SofTesting Blog Contact</title>
            <link rel="icon" href="/settings.png" />

        </Head>
        <Animation/>
        
       <Contact
          onClose={() => closeModal()}
           show={showModal}>
       </Contact>
    </div>);
}

export default ContactMe;