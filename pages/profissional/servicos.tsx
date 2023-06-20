import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../styles/profissional/servicos.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import Image from 'next/image';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Modal from 'react-modal';
import Head from 'next/head';
import { BiEdit, BiTrash } from 'react-icons/bi';
import PageSpinner from '@/components/common/spinner';

interface Servico {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    professional_id: number;
    category_id: number;
}

const Servico = () => {
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [valorTotal, setValorTotal] = useState(0);
    const [servicosSelecionados, setServicosSelecionados] = useState<Servico[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalServico, setModalServico] = useState<Servico>();
    const [id, setIdProfessional] = useState(0);

    useEffect(() => {
        const token = sessionStorage.getItem('agendei-token-professional');

        const fetchProfessional = async () => {
            try {
                const response = await fetch("https://agendei-api.onrender.com/professional/current", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const professional = await response.json();
                    const client_info = [
                        professional.id,
                    ];

                    setIdProfessional(client_info as never);
                }
            } catch (error) {
                console.log('Erro ao buscar o profissional: ', error)
            }
        }

        fetchProfessional();
    }, []);

    

    const fetchServicos = async () => {
        try {
            const response = await fetch(`https://agendei-api.onrender.com/professional/getServices?id=${id}`);
            if (response.ok) {
                const data = await response.json();

                if (Array.isArray(data)) {
                    setServicos(data as never[]);
                } else {
                    setServicos([]);
                }
            } else {
                console.log('Erro ao buscar os serviços');
            }
        } catch (error) {
            console.log('Erro ao buscar os serviços:', error);
        }
    };

    if(id != 0) {
        fetchServicos();
    } else {
        <PageSpinner />
    }

    const handleAgendar = async () => {
        sessionStorage.setItem('agendei-servicos', servicosSelecionados.toString())

        setTimeout(() => {
            window.location.href = '/cliente/agendar/data';
        }, 1000);
    }

    const handleDelete = async (id: number) => {
        try {
            const token = sessionStorage.getItem('agendei-token-professional');
            
            const response = await fetch(`https://agendei-api.onrender.com/service/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                toast.success('Serviço deletado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else {
                toast.error('Erro ao deletar o serviço!', {
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
            console.log('Erro ao deletar o serviço: ', error);
        }
    }

    return (
        <>
            <Head>
                <title>Selecione o Serviço - Agendei</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <ToastContainer />
                <Header />
                <div className={styles.container}>
                    <h1 className={styles.title}>Olá, Profissional, aqui você pode gerenciar os seus serviços</h1>
                    <Button className={styles.btnExcluir}><BiEdit /> Novo Serviço</Button>
                    <div className={styles.containerServicos}>
                        {servicos.map((servico, index) => (
                            <div className={styles.card} key={index}>
                                <div className={styles.cima}>
                                    <h1 className={styles.tituloBtn}>{servico.name}</h1>
                                </div>
                                <div className={styles.baixo}>
                                    <p className={styles.subtituloBtn}><b>Descrição: </b>{servico.description}</p>
                                    <p className={styles.subtituloBtn}><b>Valor: </b>R${servico.price}</p>
                                    <p className={styles.subtituloBtn}><b>Duração: </b>{servico.duration} min</p>

                                    <div className={styles.btnGroup}>
                                        <Button onClick={() => {
                                            handleDelete(servico.id)
                                        }} className={styles.btnExcluir}><BiEdit /></Button>
                                        <Button onClick={() => {
                                            handleDelete(servico.id)
                                        }} className={styles.btnEditar}><BiTrash /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <Modal
                        className={styles.modal}
                        isOpen={modalIsOpen}
                        onRequestClose={() => setModalIsOpen(false)}
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(5px)',
                            },
                            content: {
                                maxWidth: '500px',
                                maxHeight: '400px',
                                margin: 'auto',
                                borderRadius: '50px',
                                background: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                textAlign: 'center',
                                gap: '15px',
                            },
                        }}
                    >
                        <h2 className={styles.tituloModal}>Serviços Selecionados</h2>
                        <div className={styles.divServicosModal}>
                            {modalServico && Array.isArray(modalServico) && modalServico.map((servico, item) => (
                                <div className={styles.servicosModal} key={item}>
                                    <h2 className={styles.titleServiceModal}>{servico.name}</h2>
                                    <p><b>Preço: </b>R${servico.price}</p>
                                </div>
                            ))}
                        </div>
                        <p className={styles.textoModal}><b>Deseja prosseguir?</b></p>
                        <div className={styles.divBtnModal}>
                            <Button className={styles.btnModal} onClick={handleAgendar}>Sim</Button>
                            <Button className={styles.btnModal} onClick={() => setModalIsOpen(false)}>Não</Button>
                        </div>
                    </Modal>
                </div>
                <Footer />
            </main>
        </>
    )
}

export default Servico