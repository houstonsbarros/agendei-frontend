import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { set } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/profissionais.module.scss';

const Profissionais = () => {
    const [profissionais, setProfissionais] = useState([] as never[]);
    const [endereco, setEndereco] = useState([] as never[]);
    const [horario, setHorario] = useState([] as never[])
    
    const selecionarProfissional = (id) => {
        sessionStorage.setItem("id-professional", id);
        window.location.href = "/cliente/agendar/servico";
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("http://localhost:3000/professional/getProfessionals", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setProfissionais(userData as never[]);

                    console.log(userData);

                    const endereco = userData.map((endereco) => {
                        const enderecoJSON = JSON.parse(endereco.adress);

                        console.log(enderecoJSON);
                        const enderecoFormatado = `${enderecoJSON.street}, ${enderecoJSON.number} - ${enderecoJSON.complement}, ${enderecoJSON.city} - ${enderecoJSON.state}`;

                        return enderecoFormatado;
                    })

                    const horario = userData.map((horario) => {
                        const horarioFormatado = `das 0${horario.schedule.hourStart}h às ${horario.schedule.break}h e de ${horario.schedule.break + horario.schedule.timeBreak}h às ${horario.schedule.hourEnd}h`
                        
                        return horarioFormatado;
                    })


                    setEndereco(endereco);
                    setHorario(horario)
                }
            } catch (error) {
                window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    return (
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
                                    <Button className={styles.btn}  onClick={() => selecionarProfissional(profissional.id)}>Selecionar</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default Profissionais;