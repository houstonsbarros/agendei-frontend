import styles from '../../styles/profissional/login.module.scss';
import Head from 'next/head'
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PongSpinner, SwapSpinner } from 'react-spinners-kit';
import FooterProfessional from '@/components/common/footerProfessional';

const Login = function () {

    const [showPassword, setShowPassword] = useState(false);
    const [logado, setLogado] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);
    

        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await fetch("https://agendei-api.onrender.com/professional/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('agendei-token-professional', data.token);

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
                

                setIsLoading(false);
            }
        } catch (error) {
            toast.error('Erro ao logar profissional!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            setIsLoading(false);
        }
    };

    if(logado){
        window.location.href = "/profissional/inicio";
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
                        <h1 className={styles.titulo}>Veja seus atendimentos<br />agora mesmo</h1>
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
                        {isLoading ? (
                            <Button type="submit" outline className={styles.btnLoading}>
                                <PongSpinner color="#FFF" className={styles.spinner}/>
                            </Button>
                        ) : (
                            <Button type="submit" outline className={styles.btn}>
                            Entrar
                            </Button>
                        )}
                    </Form>
                </Container>
                <FooterProfessional/>
            </main>
        </>
    )
};

export default Login;