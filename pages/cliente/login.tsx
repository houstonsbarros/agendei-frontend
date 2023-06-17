import styles from '../../styles/loginCliente.module.scss'
import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Footer from '@/components/common/footer';
import Carregar from '../carregar';

const Login = function () {

    const [showPassword, setShowPassword] = useState(false);
    const [logado, setLogado] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await fetch("https://agendei-api.onrender.com/client/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('agendei-token', data.token);

                setLogado(true)
            } else {
                toast.error('Usuário ou senha inválidos!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error('Erro ao logar cliente!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    if(logado){
        setTimeout(() => {
            window.location.href = '/cliente/inicio';
        }, 2500);

        return <Carregar />
    }

    return (
        <>
            <Head>
                <title>Login - Agendei</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                <ToastContainer />
                <Container className={styles.container} onSubmit={handleSubmit}>
                    <Form className={styles.form} autoComplete="off">
                        <h1 className={styles.titulo}>Comece a agendar<br />agora mesmo</h1>
                        <p className={styles.subtitulo}>Faça seu login para continuar</p>
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder=" "
                                    required
                                />
                                <label>Email</label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    required
                                    autoComplete="new-password"
                                />
                                <label>Senha</label>
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
                        <Button type="submit" outline className={styles.btn}>Entrar</Button>
                        <p className={styles.cadastrar}><Link href="/cliente/cadastrar" className={styles.cadastrarLink}>Crie agora mesmo sua conta</Link></p>
                    </Form>
                </Container>
                <Footer/>
            </main>
        </>
    )
};

export default Login;