import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { set } from 'date-fns';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/profissionais.module.scss';

interface UserData {
    adress: string;
    schedule: {
        hourStart: number;
        break: number;
        timeBreak: number;
        hourEnd: number;
    };
}

interface Profissional {
    id: number;
    first_name: string;
    last_name: string;
    schedule: {
        hourStart: number;
        break: number;
        timeBreak: number;
        hourEnd: number;
    };
    adress: string;
}


const Profissionais = () => {
    const [profissionais, setProfissionais] = useState<Profissional[]>([]);
    const [endereco, setEndereco] = useState<string[]>([]);
    const [horario, setHorario] = useState<string[]>([]);

    const selecionarProfissional = (id: number | string) => {
        sessionStorage.setItem("id-professional", id.toString());
        sessionStorage.setItem("agendei-professional-endereco", endereco[id as number]);
        window.location.href = "/cliente/agendar/servico";
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("https://agendei-api.onrender.com/professional/getProfessionals", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setProfissionais(userData as never[]);

                    console.log(userData);

                    const endereco = userData.map((item: UserData) => {
                        const enderecoJSON = JSON.parse(item.adress);

                        console.log(enderecoJSON);
                        const enderecoFormatado = `${enderecoJSON.street}, ${enderecoJSON.number} - ${enderecoJSON.complement}, ${enderecoJSON.city} - ${enderecoJSON.state}`;

                        return enderecoFormatado;
                    });

                    const horario = userData.map((horario: UserData) => {
                        const horarioFormatado = `das 0${horario.schedule.hourStart}h às ${horario.schedule.break}h e de ${horario.schedule.break + horario.schedule.timeBreak}h às ${horario.schedule.hourEnd}h`

                        return horarioFormatado;
                    })


                    setEndereco(endereco);
                    setHorario(horario)
                }
            } catch (error) {
                console.log("Ih, deu erro: ", error)
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Head>
                <title>Selecione o Profissional - Agendei</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Para iniciarmos, selecione o Profissional</h1>
                    <div className={styles.containerBtns}>
                        {profissionais.map((profissional, index) => {
                            return (
                                <div className={styles.card} key={index}>
                                    <div className={styles.cima}>
                                        <h1 className={styles.tituloBtn}>{profissional.first_name} {profissional.last_name}</h1>
                                    </div>
                                    <div className={styles.baixo}>
                                        <p className={styles.subtituloBtn}><b>Endereço: </b>{endereco[index]}</p>
                                        <p className={styles.subtituloBtn}><b>Horário: </b>{horario[index]}</p>
                                        <Button className={styles.btn} onClick={() => selecionarProfissional(profissional.id)}>Selecionar</Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Profissionais;