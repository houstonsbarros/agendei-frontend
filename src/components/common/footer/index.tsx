/* eslint-disable @next/next/no-img-element */
import { Container } from 'reactstrap';
import styles from './styles.module.scss';

const Footer = function () {
    return (
        <>
            <Container className={styles.footer}>
                <p className={styles.by}>Designed and Developed by <a href="https://houstonbarros.site" target={"_blank"} className={styles.footerLink}><b>Cafézinho Do ADS</b></a></p>
            </Container>
        </>
    );
};

export default Footer;