import { useEffect, useState } from "react";
import Head from "next/head";
import PageSpinner from "@/components/common/spinner";
import Link from "next/link";
import styles from '../../styles/profissional/inicio.module.scss';
import { FaChevronRight } from "react-icons/fa";
import HeaderProfessional from "@/components/common/headerProfessional";
import FooterProfessional from '@/components/common/footerProfessional';

const Inicio = () => {
    const [logado, setLogado] = useState(false);
    const [client_info, setClientInfo] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token-professional");

            try {
                const response = await fetch("https://agendei-api.onrender.com/professional/current", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    const client_info = [
                        userData.first_name,
                        userData.last_name,
                        userData.email,
                        userData.id,
                    ];

                    setLogado(true);
                    setClientInfo(client_info as never[]);
                } else {
                    //window.location.href = "/cliente/login";
                }
            } catch (error) {
                //window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    if (!logado) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title>Inicio - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <HeaderProfessional />
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Bem vindo, {client_info[0]} {client_info[1]}</h1>
                    <p className={styles.subtitulo}>O que você deseja fazer hoje?</p>
                    <div className={styles.containerBtns}>
                        <Link href="/profissional/agendamentos" className={styles.agendar}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Ver Agendamentos</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Veja seus agendamentos</p>
                            </div>
                        </Link>
                        <Link href="/profissional/relatorios" className={styles.agendamentos}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Seus Relatórios</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Verifique agora mesmo seus relatórios</p>
                            </div>
                        </Link>
                        <Link href="/profissional/servicos" className={styles.agendar}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Seus Serviços</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Gerencie seus Serviços</p>
                            </div>
                        </Link>
                        <Link href="" className={styles.agendamentos}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Agendar</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Agende agora mesmo</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <FooterProfessional />
            </main>
        </>
    )
}

export default Inicio;
