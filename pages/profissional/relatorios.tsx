import FooterProfessional from '@/components/common/footerProfessional';
import HeaderProfessional from '@/components/common/headerProfessional';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import styles from '../../styles/profissional/relatorios.module.scss';
import PageSpinner from '@/components/common/spinner';
import Head from 'next/head';

interface Relatorio {
    total_agendamentos: string;
    total_agendamentos_cancelados: string;
    total_agendamentos_dia_atual: string;
    total_agendamentos_finalizados: string;
    total_agendamentos_pendentes: string;
    total_clientes: string;
}

const Profissionais = () => {
    const [data, setData] = useState<Relatorio[]>([]);
    const [professionalName, setProfessionalName] = useState<string>("");

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
                    const data = await response.json();
                    const nome = `${data.first_name} ${data.last_name}`;
                    setProfessionalName(nome as string);
                }
            } catch (error) {
                console.log("Ih, deu erro: ", error)
            }

            try {
                const response = await fetch("https://agendei-api.onrender.com/professional/reports", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setData(data as never[]);
                }
            } catch (error) {
                console.log("Ih, deu erro: ", error)
            }
        };

        fetchUserData();
    }, []);

    if (data.length === 0) {
        return <PageSpinner />
    }

    return (
        <>
            <Head>
                <title>Relatórios - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <HeaderProfessional />
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Olá, {professionalName},<br />
                        aqui está seus Relatórios</h1>
                    <div className={styles.containerBtns}>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Total de Clientes</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_clientes} </b>Clientes</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Total de Agendamentos</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_agendamentos} </b>Agendamentos</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Agendamentos Hoje</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_agendamentos_dia_atual} </b>Agendamentos</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Agendamentos Finalizados</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_agendamentos_finalizados} </b>Finalizados</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Agendamentos Pendentes</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_agendamentos_pendentes} </b>Pendentes</p>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <div className={styles.cima}>
                                <h1 className={styles.tituloBtn}>Agendamentos Cancelados</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}><b className={styles.subtituloNumero}>{data[0].total_agendamentos_cancelados} </b>Clientes</p>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterProfessional />
            </main>
        </>
    )
}

export default Profissionais;