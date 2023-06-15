import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import 'aos/dist/aos.css';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [opcao, setOpcao] = useState(0);
    
    const notify = () => toast.error('Selecione uma opção!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const [botaoCliente, setBotaoCliente] = useState('#FFF');
    const [TextoBotaoCliente, setTextoBotaoCliente] = useState('#000');
    const [botaoProfissional, setBotaoProfissional] = useState('#FFF');
    const [TextoBotaoProfissional, setTextoBotaoProfissional] = useState('#000');
    const [botaoEntrar, setBotaoEntrar] = useState('#FFF');
    const [TextoBotaoEntrar, setTextoBotaoEntrar] = useState('#000');
    const [background, setBackground] = useState('#FFF');

    const mudarCorCliente = () => {
        setBotaoCliente('#0C2141');
        setBotaoProfissional('#FFF');
        setBotaoEntrar('#0C2141');
        setBackground('#0C2141');
        setTextoBotaoCliente('#FFF');
        setTextoBotaoEntrar('#FFF');
        setTextoBotaoProfissional('#000');

        setOpcao(1);
    }

    const mudarCorProfissional = () => {
        setBotaoCliente('#FFF');
        setBotaoProfissional('#940F15');
        setBotaoEntrar('#940F15');
        setBackground('#940F15');
        setTextoBotaoProfissional('#FFF');
        setTextoBotaoEntrar('#FFF');
        setTextoBotaoCliente('#000');

        setOpcao(2);
    }

    const entrar = () => {
        if (opcao === 1) {
            window.location.href = '/cliente/login';
        } else if (opcao === 2) {
            console.log('Profissional');
        } else {
            notify();
        }
    }

    return (
        <>
            <Head>
                <title>Agendei - Testes</title>
            </Head>
            <main style={{ backgroundColor: background }} className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.info}>
                        <h1 className={styles.titulo}>Bem-Vindo</h1>
                        <p className={styles.subtitulo}>Deseja entrar como?</p>
                        <div className={styles.btns}>
                            <Button style={{ backgroundColor: botaoCliente, color: TextoBotaoCliente }} className={styles.btnCliente} onClick={mudarCorCliente}>Cliente</Button>
                            <Button style={{ backgroundColor: botaoProfissional, color: TextoBotaoProfissional }} className={styles.btnProfissional} onClick={mudarCorProfissional}>Profissional</Button>
                            <Button style={{ backgroundColor: botaoEntrar, color: TextoBotaoEntrar }} className={styles.btnEntrar} onClick={entrar}>Entrar</Button>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
