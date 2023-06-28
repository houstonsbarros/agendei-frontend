import FooterProfessional from '@/components/common/footerProfessional';
import Header from '@/components/common/headerProfessional';
import PageSpinner from '@/components/common/spinner';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import styles from '../../../styles/profissional/servicos/editar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiEdit, BiExit } from 'react-icons/bi';

interface Servico {
    id: number;
    name: string;
    description: string;
    price: number;
    professional_id: number;
}

const EditarServico = () => {
    const [servico, setServico] = useState<Servico[]>([]);
    const [id, setIdServico] = useState(0);
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState(0);

    const handleNameChange = (e: any) => {
        setServiceName(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setServiceDescription(e.target.value);
    };

    const handlePriceChange = (e: any) => {
        setServicePrice(e.target.value);
    };


    const fetchServico = async () => {
        const token = sessionStorage.getItem('agendei-token-professional');
        const id = sessionStorage.getItem('agendei-servico');

        try {
            const response = await fetch(`https://agendei-api.onrender.com/service/getById/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const servico = await response.json();
                const servico_info = [
                    servico.name,
                    servico.description,
                    servico.price,
                ];

                setIdServico(servico.id);
                setServiceName(servico.name);
                setServiceDescription(servico.description);
                setServicePrice(servico.price);

                setServico(servico_info as never);
            }
        } catch (error) {
            console.log('Erro ao buscar o serviço: ', error)
        }
    }

    useEffect(() => {
        fetchServico();
    }, []);

    const atualizar = async (e: any) => {

        const token = sessionStorage.getItem('agendei-token-professional');


        const data = {
            name: serviceName,
            description: serviceDescription,
            price: servicePrice,
        }

        fetch(`https://agendei-api.onrender.com/service/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Serviço atualizado com sucesso!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    setTimeout(() => {
                        window.location.href = '/profissional/servicos';
                    }, 2000);
                } else {
                    toast.error('Erro ao atualizar o serviço!', {
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
            })
            .catch((error) => {
                console.log('Erro ao atualizar o serviço: ', error);
            });

        e.preventDefault();

        fetchServico();
    }

    const voltar = () => {
        window.location.href = '/profissional/servicos';
    }

    return (
        <>
            <Head>
                <title>Editar Serviço - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <Header />
                <ToastContainer />
                <Container className={styles.container}>
                    <Form className={styles.form} autoComplete="off" onSubmit={atualizar}>
                        <h1 className={styles.titulo}>Atualize seus serviços<br /></h1>
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    type="text"
                                    name="text"
                                    placeholder=" "
                                    required
                                    value={serviceName}
                                    onChange={handleNameChange}
                                />
                                <label>Nome</label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    type="text"
                                    name="text"
                                    placeholder=" "
                                    required
                                    value={serviceDescription}
                                    onChange={handleDescriptionChange}
                                />
                                <label>Descrição</label>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    type="text"
                                    name="text"
                                    placeholder=" "
                                    required
                                    mask="R$ 0.00"
                                    maskChar=""
                                    value={servicePrice}
                                    onChange={handlePriceChange}
                                />
                                <label>Preço</label>
                            </div>
                        </FormGroup>
                        <div className={styles.btnGroup}>
                            <Button type="submit" outline className={styles.btn}>
                            <BiEdit/>Editar
                            </Button>
                            
                            <Button onClick={voltar} outline className={styles.btnVoltar}>
                            <BiExit/> Voltar
                            </Button>
                        </div>
                    </Form>
                </Container>
                <FooterProfessional />
            </main>
        </>
    )
}

export default EditarServico;