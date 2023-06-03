import { useEffect, useState } from "react";
import Head from "next/head";
import PageSpinner from "@/components/common/spinner";
import Link from "next/link";
import { Button } from "reactstrap";
import styles from "../../styles/cliente/inicio.module.scss";
import { BiBookmark, BiCalendar } from "react-icons/bi";

const Inicio = () => {
    const [logado, setLogado] = useState(false);
    const [client_info, setClientInfo] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("http://localhost:3000/client/current", {
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

                    console.log(client_info);

                    setLogado(true);
                    setClientInfo(client_info as never[]);
                } else {
                    console.log('Não foi possível obter os dados do usuário!');
                }
            } catch (error) {
                window.location.href = "/cliente/login";
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
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Bem vindo, {client_info[0]} {client_info[1]}</h1>
                    <p className={styles.subtitulo}>O que você deseja fazer hoje?</p>
                    <div className={styles.containerBtns}>
                        <Link href="/cliente/agendar" className={styles.agendar}>
                            <BiCalendar size="40px" className={styles.icone}/>
                            <Button>Agendar</Button>
                        </Link>
                        <Link href="/cliente/agendamentos" className={styles.agendamentos}>
                            <BiBookmark size="40px" className={styles.icone}/>
                            <Button>Ver Meus<br/>Agendamentos</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Inicio;
