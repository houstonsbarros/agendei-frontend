import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/servicos.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import Image from 'next/image';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';

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

    useEffect(() => {
        const id = sessionStorage.getItem('id-professional');

        const fetchServicos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/professional/getServices?id=${id}`);
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

            setServicosSelecionados(servicosIds as never[]);

            handleAgendar();
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
        
        const total = servicosSelecionados.reduce((acc, curr) => acc + curr.price, 0);
        setValorTotal(total);
    };

    const handleAgendar = async () => {
        sessionStorage.setItem('servicos', JSON.stringify(servicosSelecionados));
        window.location.href = '/cliente/agendar/data';
    };

    const handleVoltar = () => {
        window.location.href = '/cliente/agendar/profissionais';
    };

    const mudarValor = () => {
        const servicosSelecionados = document.querySelectorAll('input[name="servicos"]:checked');
      
        const servicosIds = Array.from(servicosSelecionados).map((servico) => servico.value);
      
        const total = servicos.map((servico) => {
            if (servicosIds.includes(String(servico.id))) {
                return servico.price;
            }
            return 0;
        }).reduce((acc, curr) => acc + curr, 0);

        setValorTotal(total);

        console.log(total)
     };

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
                <Footer />
            </main>
        </>
    )
}

export default Servico