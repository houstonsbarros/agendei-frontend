/* eslint-disable @next/next/no-img-element */
import { Container } from 'reactstrap';
import styles from './styles.module.scss';

const FooterProfessional = function () {
    return (
        <>
            <Container className={styles.footer}>
                <p className={styles.text}><a href='google.com' className={styles.footerLink}>Status do sistema</a> | <a href='google.com' className={styles.footerLink}>Política de privacidade</a> | <a href='google.com' className={styles.footerLink}>Termos e condições</a></p>
                <p className={styles.text}>Copyright © 2023 Agendei. Todos os direitos reservados.</p>
            </Container>
        </>
    );
};

export default FooterProfessional;