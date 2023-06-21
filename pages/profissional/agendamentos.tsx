import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import { set } from 'date-fns';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { GiCancel } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'reactstrap';
import styles from '../../styles/profissional/agendamentos.module.scss';
import HeaderProfessional from '@/components/common/headerProfessional';

interface Agendamento {
    id: number;
    client_name: string;
    payment: {
        method: string;
        status: string;
    };
    professional_name: string;
    professional_adress: string;
    professional_adress_json: {
        city: string;
        complement: string;
        number: number;
        state: string;
        street: string;
        zip_code: string;
    };
    schedule: {
        date: string;
        hour: string;
    };
    service_names: string;
    status: string;
    total_price: number;
    formattedDate: string;
}

const Agendamentos = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [professionalInfo, setProfessionalInfo] = useState<never[]>([]);

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
                    const professional_info = [
                        userData.first_name,
                        userData.last_name,
                        userData.email,
                        userData.id,
                    ];

                    setProfessionalInfo(professional_info as never[]);
                } else {
                    //window.location.href = "/cliente/login";
                }
            } catch (error) {
                //window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    const getAgendamentos = async () => {
        const token = sessionStorage.getItem('agendei-token-professional');

        try {
            const response = await fetch("https://agendei-api.onrender.com/professional/agendamentos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data)

                setAgendamentos(data);

                const addresses = data.map((agendamento: Agendamento) => {
                    const addressString = agendamento.professional_adress.replace(/\\/g, '');
                    const addressObject = JSON.parse(addressString);
                    return addressObject;
                });

                const formattedDate = data.map((agendamento: Agendamento) => {
                    const date = new Date(agendamento.schedule.date);
                    const month = date.toLocaleString('pt-BR', { month: 'long' });
                    const formattedDate = `${date.getDate()} de ${month} ${date.getFullYear()}`;
                    return formattedDate;
                });

                const updatedAgendamentos = data.map((agendamento: Agendamento, index: number) => {
                    const updatedAgendamento = { ...agendamento, professional_adress_json: addresses[index] };
                    return updatedAgendamento;
                });

                setAgendamentos(updatedAgendamentos);
            } else {
                toast.error('Erro ao buscar agendamentos!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAgendamentos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getStatusClass(status: any) {
        switch (status) {
            case 'Concluído':
                return styles['status--concluido'];
            case 'Pendente':
                return styles['status--pendente'];
            case 'Cancelado':
                return styles['status--cancelado'];
            default:
                return '';
        }
    }

    const mudarData = () => {
        formatDate();
    }

    const formatDate = (): Agendamento[] => {
        const formattedAgendamentos = agendamentos.map((agendamento: Agendamento) => {
            const date = new Date(agendamento.schedule.date);
            const month = date.toLocaleString('pt-BR', { month: 'long' });
            const formattedDate = `${date.getDate()} de ${month} ${date.getFullYear()}`;
            return {
                ...agendamento,
                formattedDate: formattedDate,
            };
        });

        return formattedAgendamentos;
    };

    const handleVoltar = () => {
        window.location.href = '/profissional/inicio';
    };

    const formatDatee = (dateString: string) => {
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

    const handleSetCancelado = async (id: number) => {
        const token = sessionStorage.getItem('agendei-token-professional');
        const parseId = id;

        const body = {
            id: parseId,
            status: 'Cancelado',
            payment: {
                method: agendamentos.map((agendamento: Agendamento) => agendamento.payment.method),
                status: 'Cancelado'
            }
        };

        try {
            const response = await fetch(`https://agendei-api.onrender.com/appointment/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                mode: "cors",
                body: JSON.stringify(body)
            }).then((res) => res.json()).then((data) => console.log(data));
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <Head>
                <title>Agendamentos - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <HeaderProfessional />
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Olá, você tem os seguintes agendamentos</h1>
                    <div className={styles.containerAgendamentos}>
                        {agendamentos.map((agendamento, index) => {
                            return (
                                <div className={styles.card} key={index}>
                                    <div className={styles.cima}>
                                        <h1 className={styles.tituloBtn}>{formatDatee(agendamento.schedule.date)} às {agendamento.schedule.hour}</h1>
                                    </div>
                                    <div className={styles.baixo}>
                                        <p className={styles.subtituloBtn}><b>Cliente: </b>{agendamento.client_name}</p>
                                        <p className={styles.subtituloBtn}><b>Serviços: </b>{agendamento.service_names}</p>
                                        <p className={styles.subtituloBtn}><b>Valor Total: </b>R$ {agendamento.total_price}</p>
                                        <p className={styles.subtituloBtn}><b>Forma de Pagamento: </b>{agendamento.payment.method} - {agendamento.payment.status}</p>
                                        <p className={styles.subtituloBtn}><b>Status: </b>{agendamento.status}</p>
                                        <div className={styles.btnGroup}>
                                            <Button onClick={() => handleSetCancelado(agendamento.id)} className={styles.btnCancelar}><GiCancel /></Button>
                                            <Button className={styles.btnFinalizado}><IoMdCheckmarkCircleOutline /></Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                    <Button onClick={handleVoltar} className={styles.btnVoltar}>Voltar</Button>
                </div>
            </main>
        </>
    )
}

export default Agendamentos;