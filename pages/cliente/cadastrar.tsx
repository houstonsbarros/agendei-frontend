import styles from '../../styles/cadastroCliente.module.scss'
import Head from 'next/head'
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputMask from 'react-input-mask';
import Link from 'next/link';
import dotenv from 'dotenv';
import Carregar from '@/components/carregar';
import { PongSpinner } from 'react-spinners-kit';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

dotenv.config();

const Cadastrar = function () {
    const apiUrl = process.env.API_URL;

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [logado, setLogado] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const first_name = formData.get("nome") as string;
        const last_name = formData.get("sobrenome") as string;
        var cpf = formData.get("cpf") as string;
        var phone = formData.get("telefone") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        cpf = cpf.replace(/\D/g, '');
        phone = phone.replace(/\D/g, '');

        console.log(email, password);

        try {
            const response = await fetch('https://agendei-api.onrender.com/client/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ first_name, last_name, cpf, phone, email, password })
            });

            if (response.ok) {
                const data = await response.json();
                const client_info = [data.client.first_name, data.client.last_name, data.client.email, data.client.id];
                sessionStorage.setItem('client_info', JSON.stringify(client_info));

                localStorage.setItem('agendei-token', data.token);

                toast.success('Cliente cadastrado!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


                setIsLoading(true);
                setLogado(true);
            } else {
                toast.error('Erro ao cadastrar!', {
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

    if (logado) {
        setTimeout(() => {
            window.location.href = "/cliente/inicio";
        }, 2500);

        return <Carregar />
    }

    return (
        <>
            <Head>
                <title>Cadastrar - Agendei</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <ToastContainer />
                <Container className="py-5" onSubmit={handleSubmit}>
                    <Form className={styles.form} autoComplete="off">
                        <h1 className={styles.titulo}>Faça seu cadastro e agende<br />
                            serviços com facilidade</h1>
                        <p className={styles.subtitulo}>Faça seu login para continuar</p>
                        <div className={styles.formGroup}>
                            <FormGroup>
                                <div className={styles.label}>
                                    <Input
                                        id="nome"
                                        type="text"
                                        name="nome"
                                        placeholder=" "
                                        required
                                    />
                                    <label>Nome</label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className={styles.label}>
                                    <Input
                                        id="sobrenome"
                                        type="text"
                                        name="sobrenome"
                                        placeholder=" "
                                        required
                                    />
                                    <label>Sobrenome</label>
                                </div>
                            </FormGroup>
                        </div>
                        <div className={styles.formGroup}>
                            <FormGroup>
                                <div className={styles.label}>
                                    <InputMask
                                        id="cpf"
                                        name="cpf"
                                        mask="999.999.999-99"
                                        placeholder=" "
                                        required
                                    />
                                    <label>CPF</label>
                                </div>
                            </FormGroup>
                            <FormGroup>
                                <div className={styles.label}>
                                    <InputMask
                                        id="telefone"
                                        name="telefone"
                                        mask="(99) 99999-9999"
                                        placeholder=" "
                                        required
                                    />
                                    <label>Telefone</label>
                                </div>
                            </FormGroup>
                        </div>
                        <div className={styles.formGroup}>
                            <FormGroup>
                                <div className={styles.label}>
                                    <Input
                                        id="email"
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
                        </div>
                        {isLoading ? (
                            <Button type="submit" outline className={styles.btnLoading}>
                                <PongSpinner color="#FFF" className={styles.spinner} />
                            </Button>
                        ) : (
                            <Button type="submit" outline className={styles.btn}>
                                Cadastrar
                            </Button>
                        )}
                        <p className={styles.cadastrar}>Já possui uma conta? <Link href="/cliente/login" className={styles.cadastrarLink}>
                            Logar-se</Link></p>
                    </Form>
                </Container>
                <Footer />
            </main>
        </>
    )
};

export default Cadastrar;