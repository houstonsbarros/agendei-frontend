import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '@/components/common/footer';
import Header from '@/components/headerNoAuth';

const Acompanhar = function () {
    return (
        <>
            <Head>
                <title>Acompanhar - CAADS</title>
            </Head>
            <main className={styles.main}>
                <Header/>
                <Container>
                    <Form className={styles.form}>
                    <p className={styles.formTitle}>Acompanhar Solicitação <br/>Documento 2023</p>
                        <FormGroup>
                            <Label for="matricula" className={styles.label}>
                                Matrícula
                            </Label>
                            <Input
                                id="matricula"
                                name="matricula"
                                type="text"
                                placeholder="Digite a sua matrícula"
                                required
                                className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>
                                Senha
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Digite a sua senha"
                                required
                                className={styles.input} />
                        </FormGroup>
                        <Button type="submit" outline className={styles.formBtn}>ENTRAR</Button>
                        <a href="/forgot-password" className={styles.formLink}>Esqueceu a senha? Clique aqui</a>
                    </Form>
                </Container>
                <Footer/>
            </main>
        </>
    )
};

export default Acompanhar;