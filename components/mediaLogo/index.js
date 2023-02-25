import Link from 'next/link';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Image from 'react-bootstrap/Image';
import styles from './mediaLogo.module.css';

const MediaLogo = () => {


    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            hello@softestingca.com
        </Tooltip>
      );

    const sendEmail = () => {
        alert('vvv');
    }

    // const myLoader = ({ src, width, quality }) => {
    //     return `http://localhost:3000/${src}?w=${width}&q=${quality || 75}`
    // }

    
    return (<div className={styles.media}>

        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}
        >
          <Link href="/contact">  <Image id="email"  border="0" alt="email" src={"/assets/purplemail.svg"} width={20} height={17} className={styles.email}  /> </Link>
         
        </OverlayTrigger>
 
        <Link href="https://www.Twitter.com" target="_blank" rel="noreferrer">
            <Image border="0" alt="Twitter" src={"/assets/twitter5.svg"} width={22} height={22} className={styles.twitter}  />
        </Link>

        <Link href="https://www.youtube.com/channel/UCBcHbd6YbpPog5-jR9f9OOA" target="_blank" rel="noopener noreferrer">
            <Image border="0" alt="YouTube" src={"/assets/youtube-play-button.svg"} width={23} height={23} className={styles.YouTube}  />
        </Link>
        <Link href="https://linkedin.com/in/mahnaz-karimi-68042a1a7" target="_blank" rel="noopener noreferrer">
            <Image border="0" alt="linkedin" src={"/assets/LinkedIn-Icon-White-Logo.wine.svg"} width={23} height={23} className={styles.linkedin}    />
        </Link>
        <Link href="https://www.facebook.com/SofTesting-108404168575498" target="_blank" rel="noopener noreferrer">
            <Image border="0" alt="facebook" src={"/assets/facebook-logo.svg"} width={23} height={23} className={styles.facebook}  />
        </Link>
        <Link href="https://www.instagram.com/p/Ce_YjGqtkC6/?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">
            <Image border="0" alt="instagram" src={"/assets/instagram-logo.svg"} width={23} height={23} className={styles.instagram}   />
        </Link>
        <Link href="https://github.com/karimiMahnaz" target="_blank" rel="noopener noreferrer">
            <Image border="0" alt="github" src={"/assets/github.svg"} width={23} height={23} className={styles.github}   />
        </Link>

        <div className={styles.line}></div>
        <p className={styles.contact}>FOLLOW ME</p>


    </div>
    )
}
export default MediaLogo;