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
import ValidadorCPF from '@/services/validandocpf';

dotenv.config();

const Cadastrar = function () {
    const apiUrl = process.env.API_URL;

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [logado, setLogado] = useState(false);
    const [cpf, setCPF] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [body, setBody] = useState({
        first_name: '',
        last_name: '',
        cpf: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleInputChange = (event: any) => {
        const { value } = event.target;
        setCPF(value);
        setIsValid(false);
    };
    

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);

        const validarCpf = () => {
            const validador = new ValidadorCPF(cpf);
            const cpfValido = validador.valida();

            if(cpfValido == true) {
                setIsValid(true);
            }
        }

        validarCpf();

        const first_name = formData.get("nome") as string;
        const last_name = formData.get("sobrenome") as string;
        var phone = formData.get("telefone") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        phone = phone.replace(/\D/g, '');
        
        setBody({
            first_name: first_name,
            last_name: last_name,
            cpf: cpf,
            phone: phone,
            email: email,
            password: password,
        });

        if (isValid == false) {
            toast.error('CPF inválido');
            return;
        } else {
            handleCadastrar();
        }
    };

    const handleCadastrar = async () => {
        setIsLoading(true);
            try {
                setIsLoading(true);
                const response = await fetch('https://agendei-api.onrender.com/client/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({body})
                });
                const data = await response.json();
                if (response.ok) {
                    toast.success('Cadastro realizado com sucesso!');
                    setLogado(true);
                } else {
                    toast.error('Erro ao realizar cadastro');
                }       
            } catch (error) {
                toast.error('Erro ao realizar cadastro');
            }

            setIsLoading(false);
    };

    if (logado) {
        toast.success('Cadastro realizado com sucesso! Você será redirecionado para a página inicial');

        setTimeout(() => {
            window.location.href = "/cliente/inicio";
        }, 2500);
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
                                        value={cpf}
                                        onChange={handleInputChange}
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