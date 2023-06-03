/* eslint-disable @next/next/no-img-element */
import styles from './styles.module.scss';
import { Button, Container } from "reactstrap";
import Link from 'next/link';

const Header = () => {
    return (
        <>
            <Container className={styles.container}>
                <Link href="/">
                <img src="/Logo.png" alt="Logo CAADS" className={styles.logo}/>
                </Link>
                <div className={styles.buttons}>
                    <Link href="/acompanhar"><Button className={styles.buttonAcessar}>ACESSAR CARTEIRINHA</Button></Link>
                    <Link href="/solicitar"><Button className={styles.buttonSolicitar}>SOLICITAR AGORA</Button></Link>
                </div>
            </Container>
        </>
    )
}

export default Header;