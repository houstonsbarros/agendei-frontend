import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import 'aos/dist/aos.css';
import { Button } from 'reactstrap';
import Image from 'next/image';
import Footer from '@/components/common/footer';

const Home = () => {
    const redirect = () => {
        window.location.href = 'cliente/login';
    };

    return (
        <>
            <Head>
                <title>Início - Agendei</title>
                <link rel="icon" href="/favicon.png"/>
            </Head>
            <main className={styles.background}>
                <div className={styles.container}>
                        <Image src="/agenda.svg" alt="Agenda" width={300} height={230} />
                        <h1 className={styles.titulo}>Agendei</h1>
                        <Button className={styles.btn} onClick={redirect}>Iniciar Sessão</Button>
                        <p className={styles.subtitulo}>Faça seus agendamentos de<br/>
                        forma rápida e eficaz.</p>
                </div>
                <Footer/>
            </main>
        </>
    );
};

export default Home;
