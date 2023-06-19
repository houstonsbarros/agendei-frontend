import { useEffect, useState } from "react";
import Head from "next/head";
import PageSpinner from "@/components/common/spinner";
import Link from "next/link";
import { Button } from "reactstrap";
import styles from "../../styles/cliente/inicio.module.scss";
import { BiBookmark, BiCalendar } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

const Inicio = () => {
    const [logado, setLogado] = useState(false);
    const [client_info, setClientInfo] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("https://agendei-api.onrender.com/client/current", {
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
                <title>Inicio Cliente - Agendei</title>
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Bem vindo, {client_info[0]} {client_info[1]}</h1>
                    <p className={styles.subtitulo}>O que você deseja fazer hoje?</p>
                    <div className={styles.containerBtns}>
                        <Link href="/cliente/agendar/profissionais" className={styles.agendar}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone}/>
                                <h1 className={styles.tituloBtn}>Agendar Horário</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Realize já seu agendamento e não perca tempo</p>
                            </div>
                        </Link>
                        <Link href="/cliente/agendamentos" className={styles.agendamentos}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone}/>
                                <h1 className={styles.tituloBtn}>Seus Agendamentos</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Verifique agora mesmo seus agendamentos</p>
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer/>
            </main>
        </>
    )
}

export default Inicio;
