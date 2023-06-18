import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/servicos.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import Image from 'next/image';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Modal from 'react-modal';

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

    useEffect(() => {
        const id = sessionStorage.getItem('id-professional');

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

        fetchServicos();
    }, []);

    const handleSelecionarServico = () => {
        const servicosSelecionados = document.querySelectorAll('input[name="servicos"]:checked');

        const arrayElementos = Array.from(servicosSelecionados).map((element: Element) => {
            const name = element.getAttribute('data-name');
            const description = element.getAttribute('data-description');
            const price = parseFloat(element.getAttribute('data-price') || '0');
            const duration = parseInt(element.getAttribute('data-duration') || '0', 10);
          
            return {
              name,
              description,
              price,
              duration,
            };
          }) as Servico[];

        if (servicosSelecionados.length > 0) {
            toast.success('Serviços selecionados!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            const servicosIds = Array.from(servicosSelecionados).map((servico) => (servico as HTMLInputElement).value);

            const servicosSelecionadosIds = Array.from(servicosSelecionados).map(servico => Number((servico as HTMLInputElement).value));
            const servicosModal = servicos.filter(servico => servicosSelecionadosIds.includes(servico.id));

            setServicosSelecionados(servicosIds as never[]);
            setModalServico(servicosModal as never);
        } else {
            toast.error('Selecione pelo menos um serviço!', {
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
        
        const total = arrayElementos.reduce((acc, curr) => acc + curr.price, 0);
        setValorTotal(total);

        setModalIsOpen(true);
    };

    const handleVoltar = () => {
        window.location.href = '/cliente/agendar/profissionais';
    };

    const mudarValor = () => {
        const servicosSelecionados = document.querySelectorAll('input[name="servicos"]:checked');
      
        const servicosIds = Array.from(servicosSelecionados).map((servico) => (servico as HTMLInputElement).value);
      
        const total = servicos.map((servico) => {
            if (servicosIds.includes(String(servico.id))) {
                return servico.price;
            }
            return 0;
        }).reduce((acc, curr) => acc + curr, 0);

        setValorTotal(total);
     };

     const handleAgendar = async () => {
        sessionStorage.setItem('agendei-servicos', servicosSelecionados.toString())

        setTimeout(() => {
            window.location.href = '/cliente/agendar/data';
        }, 1000);
    }

    return (
        <>
            <main className={styles.main}>
                <ToastContainer />
                <Header />
                <div className={styles.container}>
                    <h1 className={styles.title}>Agora, selecione os serviços desejados</h1>
                    <Form className={styles.form}>
                        <FormGroup className={styles.service} onChange={mudarValor}>
                            {servicos.map((servico, item) => (
                                <div className={styles.servicosDiv} key={item}>
                                    <Input type="checkbox" id={servico.name} name="servicos" value={servico.id}/>
                                    <Label check className={styles.card} htmlFor={servico.name}>
                                        <div className={styles.selecionado}>
                                            <Image src='/check.svg' alt='check' width={15} height={15} />
                                            <p className={styles.selecionadoText}>Selecionado</p>
                                        </div>
                                        <h2 className={styles.titleservice}>{servico.name}</h2>
                                        <div className={styles.informacoes}>
                                            <p>{servico.description}</p>
                                            <p><b>Preço: </b>R${servico.price}</p>
                                        </div>
                                    </Label>
                                </div>
                            ))}

                        </FormGroup>
                        
                        <div className={styles.concluir}>
                            <p className={styles.valorTotal}><b>Valor total:</b> R${valorTotal}</p>
                            <div className={styles.btnGroup}>
                                <Button onClick={handleVoltar} className={styles.btnVoltar}>Voltar</Button>
                                <Button onClick={handleSelecionarServico} className={styles.btnSelecionar}>Selecionar Serviço</Button>
                            </div>
                        </div>
                    </Form>
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
                                width: '500px',
                                height: '400px',
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