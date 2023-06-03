/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";

const Apresentacao = () => {
    return (
        <>
            <Head>
                <title>Home - CAADS</title>
                {/* <img src="/images/Carlos.jpg" alt="Carlos" /> */}
            </Head>
            <main className={styles.main}>
                <Container className={styles.container}>
                    <div className={styles.textos}>
                        <h1 className={styles.titulo}>Solicite Agora<br/>Sua Carteirinha<br/>Estudantil 2023</h1>
                        <p className={styles.descricao}>A carteirinha oficial dos estudantes de Análise e
                            Desenvolvimento de Sistemas, emitida pelo
                            Centro Acadêmico Alan Turing</p>
                            <Link href="/solicitar"><Button className={styles.buttonSolicitar}>SOLICITAR AGORA</Button></Link>
                    </div>
                    <img src="/carteirinha.png" alt="Carteirinha Estudantil CAADS" className={styles.img}/>
                </Container>
            </main>
        </>
    );
};

export default Apresentacao;