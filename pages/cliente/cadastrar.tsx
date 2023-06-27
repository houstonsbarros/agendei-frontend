import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import dotenv from 'dotenv';
import { PongSpinner } from 'react-spinners-kit';
import Footer from '@/components/common/footer';
import styles from '../../styles/cadastroCliente.module.scss';
import Head from 'next/head';
import { cpf } from 'cpf-cnpj-validator';

dotenv.config();

const Cadastrar = function () {
  const apiUrl = process.env.API_URL;

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logado, setLogado] = useState(false);
  const [cpfInput, setCPF] = useState('');
  const [phone, setPhone] = useState('');
  const [body, setBody] = useState({
    first_name: "",
    last_name: "",
    cpf: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    if (name === 'cpf') {
      setCPF(formatarCPF(value));
    }
  };

  const handleInputTelefone = (event: any) => {
    const { name, value } = event.target;

    if (name === 'telefone') {
      setPhone(formatarPhone(value));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formatarCPF = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  };

  const formatarPhone = (phone: string) => {
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
    return phone;
  }

  const handleCadastrar = async () => {
    console.log("Entrou no Fetch", body)
    try {
      const response = await fetch("https://agendei-api.onrender.com/client/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      console.log(body)
      const data = await response.json();

      console.log(data)
      if (response.ok) {
        toast.success('Cadastro realizado com sucesso!');
      } else {
        toast.error('Erro ao realizar cadastro');
      }
    } catch (error) {
      toast.error('Erro ao realizar cadastro');
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    cpf.isValid(cpfInput);
    console.log(cpf.isValid(cpfInput))

    const testMail = event.target.email.value;

    const isValidEmail = () => {
      return /\S+@\S+\.\S+/.test(testMail);
    }

    console.log("Email: ", isValidEmail())

    if (!cpf.isValid(cpfInput)) {
      toast.error('CPF Inválido!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (!isValidEmail()) {
      toast.error('Email Inválido!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const body = {
        first_name: event.target.nome.value,
        last_name: event.target.sobrenome.value,
        cpf: cpfInput.replace(/\D/g, ''),
        phone: phone.replace(/\D/g, ''),
        email: event.target.email.value,
        password: event.target.password.value
      };

      setBody(body);

      handleCadastrar();
    }
  }

  if (logado) {
    toast.success('Cadastro realizado com sucesso! Você será redirecionado para a página de login', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setTimeout(() => {
      window.location.href = "/cliente/login";
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
        <Container className="py-5">
          <Form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
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
                  <Input
                    id="cpf"
                    name="cpf"
                    value={cpfInput}
                    placeholder=" "
                    minLength={14}
                    maxLength={14}
                    required
                    onChange={handleInputChange}
                  />
                  <Label>CPF</Label>
                </div>
              </FormGroup>
              <FormGroup>
                <div className={styles.label}>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={phone}
                    placeholder=" "
                    minLength={15}
                    maxLength={15}
                    required
                    onChange={handleInputTelefone}
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
            <Button type="submit" outline className={styles.btn}>
              Cadastrar
            </Button>
            <p className={styles.cadastrar}>Já possui uma conta? <Link href="/cliente/login" className={styles.cadastrarLink}>
              Logar-se</Link></p>
          </Form>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default Cadastrar;
