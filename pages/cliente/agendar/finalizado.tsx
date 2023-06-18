import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import PageSpinner from '@/components/common/spinner';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/finalizado.module.scss'


interface Agendamento {
    id: number;
    schedule: {
        date: string;
        hour: string;
    };
    payment: {
        method: string;
        status: string;
    };
    status: string;
    total_price: number;
    service_names: string;
    client_name: string;
    professional_name: string;
}

const Concluido = () => {
    const [data, setData] = useState({ schedule: { date: "", hour: "" }, services: [] });
    const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
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

                    console.log("Cliente Info", client_info);

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

    useEffect(() => {
        const token = sessionStorage.getItem('agendei-token');
        const data = sessionStorage.getItem('agendei-agendamento');
        sessionStorage.removeItem('agendei-data')
        sessionStorage.removeItem('agendei-horario')
        sessionStorage.removeItem('agendei-servicos')
        const dataString = JSON.parse(data as string)

        if (dataString) {
            const data = dataString;

            if (Array.isArray(data)) {
                setData(data as never);
            } else {
                setData({} as never);
            }
        } else {
            console.log('Erro ao buscar os serviços');
        }

        setData(dataString as never)
    }, []);

    useEffect(() => {
        const agendamento = sessionStorage.getItem('agendei-agendamento')
        const agendamentoJson = JSON.parse(agendamento as string)
        const agendamentoId = agendamentoJson.id
        const token = sessionStorage.getItem('agendei-token');

        const fetchAgendamento = async () => {
            try {
                const response = await fetch(`https://agendei-api.onrender.com/client/finalizado?appointmentId=${agendamentoId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    if (Array.isArray(data)) {
                        setAgendamento(data as never);
                    }
                } else {
                    console.log('Erro ao buscar o agendamento!');
                }
            } catch (error) {
                console.log('Erro ao buscar o agendamento:', error);
            }
        };

        fetchAgendamento();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(formatDateString(dateString));
        return date.toLocaleDateString('pt-BR');
    };

    const formatDateString = (dateString: string) => {
        if (typeof dateString === 'string') {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month}-${day}`;
        }
        return dateString;
    };

    const voltar = () => {
        window.location.href = "/cliente/inicio";
    }



    if (!logado) {
        return <PageSpinner />
    }

    return (
        <>
            <main className={styles.main}>
                <Header />
                <div className={styles.container}>
                    <Image src="/relogio.gif" alt="Logo" width={80} height={80} />
                    <h1 className={styles.titulo}>Agendamento Concluído</h1>
                    {Array.isArray(agendamento) && agendamento.length > 0 && (
                        <div className={styles.informacoes}>
                            <div className={styles.containerTexto}>
                                <p className={styles.subtitulo}>Cliente:</p>
                                <p className={styles.subtituloInfo}>{agendamento[0].client_name}</p>
                            </div>
                            
                            <div className={styles.containerTexto}>
                                <p className={styles.subtitulo}>Profissional:</p>
                                <p className={styles.subtituloInfo}>{agendamento[0].professional_name}</p>
                            </div>

                            <div className={styles.containerTexto}>
                                <p className={styles.subtitulo}>Horário:</p>
                                <p className={styles.subtituloInfo}>{formatDate(agendamento[0].schedule.date)} às {agendamento[0].schedule.hour}</p>
                            </div>

                            <div className={styles.containerTexto}>
                                <p className={styles.subtitulo}>Serviços:</p>
                                <p className={styles.subtituloInfo}>{agendamento[0].service_names}</p>
                            </div>
                            
                            <div className={styles.containerTexto}>
                                <p className={styles.subtitulo}>Valor Total:</p>
                                <p className={styles.subtituloInfo}>R$ {agendamento[0].total_price}</p>
                            </div>
                        </div>
                    )}
                    
                    <Button onClick={voltar} outline className={styles.btnVoltar}>Voltar</Button>
                    <Button href="/cliente/agendamentos" outline className={styles.btnVoltar}>Ver Meus Agendamentos</Button>
                </div>
                <Footer />
            </main>
        </>
    );
}

export default Concluido;