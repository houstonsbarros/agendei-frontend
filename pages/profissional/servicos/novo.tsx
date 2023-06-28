import FooterProfessional from '@/components/common/footerProfessional';
import Header from '@/components/common/headerProfessional';
import PageSpinner from '@/components/common/spinner';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup, Input } from 'reactstrap';
import styles from '../../../styles/profissional/servicos/editar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiExit } from 'react-icons/bi';
import { TbNewSection } from 'react-icons/tb';


const CriarServico = () => {
    const [professional, setProfessional] = useState([]);
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState(0);
    const [professionalName, setProfessionalName] = useState('');

    const handleNameChange = (e: any) => {
        setServiceName(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setServiceDescription(e.target.value);
    };

    const handlePriceChange = (e: any) => {
        setServicePrice(e.target.value);
    };

    const fetchProfessional = async () => {
        const token = sessionStorage.getItem('agendei-token-professional');

        fetch('https://agendei-api.onrender.com/professional/current', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const id = data.id;
                    const name = data.first_name;
                    setProfessional(id)
                    setProfessionalName(name)
                })
            }
        })
    }

    useEffect(() => {
        fetchProfessional();
    }, []);

    
    const voltar = () => {
        window.location.href = '/profissional/servicos';
    }

    const Criar = async (e: any) => {
        const token = sessionStorage.getItem('agendei-token-professional');

        const data = {
            professional_id: professional,
            name: serviceName,
            description: serviceDescription,
            price: servicePrice,
        }

        fetch(`https://agendei-api.onrender.com/service/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Serviço criado com sucesso!', {
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
                    toast.error('Erro ao criar o serviço!', {
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
                console.log('Erro ao criar o serviço: ', error);
            });

        e.preventDefault();
    }

    return (
        <>
            <Head>
                <title>Criar Serviço - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <Header />
                <ToastContainer />
                <Container className={styles.container}>
                    <Form className={styles.form} autoComplete="off" onSubmit={Criar}>
                        <h1 className={styles.titulo}>Crie um novo serviço</h1>
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
                        
                        <FormGroup>
                            <div className={styles.label}>
                                <Input
                                    type="text"
                                    name="text"
                                    placeholder=" "
                                    required
                                    value={professionalName}
                                    disabled
                                />
                                <label>Profissional</label>
                            </div>
                        </FormGroup>
                        <div className={styles.btnGroup}>
                            <Button type="submit" outline className={styles.btn}>
                            <TbNewSection />Criar
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

export default CriarServico;