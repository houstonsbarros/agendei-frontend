import styles from '../../styles/loginCliente.module.scss'
import Head from 'next/head'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = function () {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(email, password);
        
        try {
            const response = await fetch("http://localhost:3000/client/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                toast.success('Cliente logado!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                window.location.href = '/cliente/home';
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
            console.log(error);
        }
    };

    return (
        <>
            <Head>
                <title>Login Cliente - Agendei</title>
            </Head>
            <main className={styles.main}>
                <ToastContainer/>
                <Container className="py-5" onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <Image src="/agendeilogo.png" alt="Logo Agendei" width={200} height={140} />
                        <FormGroup>
                            <Label for="email" className={styles.label}>
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="text"
                                placeholder="Digite seu email"
                                required
                                className={styles.input} />
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
                        <Button type="submit" outline className={styles.formBtn}>ENTRAR</Button>
                        <p  className={styles.cadastrar}>É novo aqui? <a href="/cliente/cadastrar"  className={styles.cadastrarLink}>
                            Cadastre-se</a></p>
                    </Form>
                </Container>
            </main>
        </>
    )
};

export default Login;