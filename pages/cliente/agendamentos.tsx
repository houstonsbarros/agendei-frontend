import Footer from '@/components/common/footer';
import Header from '@/components/common/header';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'reactstrap';
import styles from '../../styles/cliente/agendamentos.module.scss';

interface Agendamento {
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
    const date = new Date();

    const getAgendamentos = async () => {
        try {
            const response = await fetch("https://agendei-api.onrender.com/client/agendamentos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem('agendei-token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                setAgendamentos(data);

                const addresses = data.map((agendamento: Agendamento) => {
                    const addressString = agendamento.professional_adress.replace(/\\/g, '');
                    const addressObject = JSON.parse(addressString);
                    return addressObject;
                });

                const updatedAgendamentos = data.map((agendamento: Agendamento, index: number) => {
                    const updatedAgendamento = { ...agendamento, professional_adress_json: addresses[index] };
                    return updatedAgendamento;
                });

                setAgendamentos(updatedAgendamentos);
                mudarData();
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

        setAgendamentos(formatDate());
      }

    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.titulo}>Olá, você tem os seguintes agendamentos</h1>
                <div className={styles.containerAgendamentos}>
                    {agendamentos.map((agendamento, index) => {
                        return (
                            <div className={styles.card} key={index}>
                                <div className={styles.cima}>
                                    <h1 className={styles.tituloBtn}>{agendamento.formattedDate} às {agendamento.schedule.hour}</h1>
                                </div>
                                <div className={styles.baixo}>
                                    <p className={styles.subtituloBtn}><b>Profissional: </b>{agendamento.professional_name}</p>
                                    <p className={styles.subtituloBtn}><b>Endereço: </b>
                                    {agendamento.professional_adress_json.street}, {agendamento.professional_adress_json.number}, {agendamento.professional_adress_json.complement}, {agendamento.professional_adress_json.city}, {agendamento.professional_adress_json.state}
                                    </p>
                                    <p className={styles.subtituloBtn}><b>Serviços: </b>{agendamento.service_names}</p>
                                    <p className={styles.subtituloBtn}><b>Valor Total: </b>R$ {agendamento.total_price}</p>
                                    <p className={styles.subtituloBtn}><b>Forma de Pagamento: </b>{agendamento.payment.method} - {agendamento.payment.status}</p>
                                    <Button className={`${styles.status} ${getStatusClass(agendamento.status)}`}>
                                        {agendamento.status}
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div>
            <Footer />
            </div>
        </main>
    )
}

export default Agendamentos;