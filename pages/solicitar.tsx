import styles from '../styles/registerLogin.module.scss'
import Head from 'next/head'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Footer from '@/components/common/footer';
import Header from '@/components/headerNoAuth';
import InputMask from 'react-input-mask';

const Solicitar = function () {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Head>
                <title>Solicitar - CAADS</title>
            </Head>
            <main className={styles.main}>
                <Header />
                <Container className="py-5">
                    <Form className={styles.form}>
                        <p className={styles.formTitle}>Realizar Solicitação do<br />Documento 2023</p>
                        <FormGroup>
                            <Label for="nome" className={styles.label}>
                                Nome
                            </Label>
                            <Input
                                id="nome"
                                name="nome"
                                type="text"
                                placeholder="Digite o seu nome"
                                required
                                className={styles.input} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="sobrenome" className={styles.label}>
                                Sobrenome
                            </Label>
                            <Input
                                id="sobrenome"
                                name="sobrenome"
                                type="text"
                                placeholder="Digite o seu sobrenome"
                                required
                                className={styles.input} />
                        </FormGroup>
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
                            <Label for="dataNasc" className={styles.label}>
                                Data de Nascimento
                            </Label>
                            <Input
                                id="dataNasc"
                                name="dataNasc"
                                type="date"
                                placeholder="Digite a data do seu nascimento"
                                required
                                className={`${styles.input} ${styles.inputDate}`}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="rg" className={styles.label}>
                                RG
                            </Label>
                            <Input
                                id="rg"
                                name="rg"
                                type="text"
                                placeholder="Digite o número do seu RG"
                                required
                                className={styles.input}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cpf" className={styles.label}>
                                CPF
                            </Label>
                            <InputMask
                                id="cpf"
                                name="cpf"
                                mask="999.999.999-99"
                                placeholder="Digite o seu CPF"
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="telefone" className={styles.label}>
                                Telefone
                            </Label>
                            <InputMask
                                id="telefone"
                                name="telefone"
                                mask="+55 (99) 99999-9999"
                                placeholder="Digite o seu telefone"
                                required
                                className={styles.input}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password" className={styles.label}>
                                Senha
                            </Label>
                            <div className={styles.passwordInputContainer}>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    required
                                    className={styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={toggleShowPassword}
                                    className={`${styles.passwordToggleButton} ${showPassword ? "show" : "hide"
                                        }`}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEye : faEyeSlash}
                                        className="fas fa-fw"
                                    />
                                </button>
                            </div>
                        </FormGroup>
                        <Button type="submit" outline className={styles.formBtn}>SOLICITAR</Button>
                    </Form>
                </Container>
                <Footer />
            </main>
        </>
    )
};

export default Solicitar;