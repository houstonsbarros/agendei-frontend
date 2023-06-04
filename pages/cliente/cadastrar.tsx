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

const Cadastrar = function () {
    const [showPassword, setShowPassword] = useState(false);

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
            const response = await fetch("http://localhost:3000/client/register", {
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

                window.location.href = '/cliente/home';
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

    return (
        <>
            <Head>
                <title>Cadastrar Cliente - Agendei</title>
            </Head>
            <main className={styles.main}>
                <ToastContainer />
                <Container className="py-5" onSubmit={handleSubmit}>
                    <Form className={styles.form}>
                        <Image src="/agendeilogo.png" alt="Logo Agendei" width={200} height={135} />
                        <div className={styles.formGroup}>
                            <FormGroup>
                                <Label for="nome" className={styles.label}>
                                    Nome
                                </Label>
                                <Input
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    placeholder="Digite seu nome"
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
                                    placeholder="Digite seu sobrenome"
                                    required
                                    className={styles.input} />
                            </FormGroup>
                        </div>
                        <div className={styles.formGroup}>
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
                                    mask="(99) 99999-9999"
                                    placeholder="Digite o seu telefone"
                                    required
                                    className={styles.input}
                                />
                            </FormGroup>
                        </div>
                        <div className={styles.formGroup}>
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
                        </div>
                        <Button type="submit" outline className={styles.formBtn}>CADASTRAR</Button>
                        <p className={styles.cadastrar}>Já possui uma conta? <Link href="/cliente/login" className={styles.cadastrarLink}>
                            Logar-se</Link></p>
                    </Form>
                </Container>
            </main>
        </>
    )
};

export default Cadastrar;