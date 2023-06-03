import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../styles/cliente/agendar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Servico {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    professional_id: number;
    category_id: number;
}

const Agendar = () => {
    const [selecionarServico, setSelecionarServico] = useState(false);
    const [servicos, setServicos] = useState<Servico[]>([]);

    useEffect(() => {
        const fetchServicos = async () => {
            try {
                const response = await fetch('http://localhost:3000/professional/getServices?id=4');
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

        if(servicosSelecionados.length > 0) {
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

            console.log(servicosIds)

            setSelecionarServico(true);

            return servicosIds;
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
    };

    return (
        <>
            {!selecionarServico ? (
                <main className={styles.main}>
                    <ToastContainer/>
                    <div className={styles.container}>
                        <Form>
                            {servicos.map((servico, item) => (
                                <FormGroup key={item} className={styles.service}>
                                    <Label check>
                                        <Input type="checkbox" name="servicos" value={servico.id}/>
                                        <div className="card">
                                            <h2 className="title">{servico.name}</h2>
                                        </div>
                                    </Label>
                                </FormGroup>
                            ))}

                            <Button onClick={handleSelecionarServico}>Selecionar Serviço</Button>
                        </Form>
                    </div>
                </main>
            ) : (
                <div className="container">
                    <h1 className="titulo">Certo, agora me informe a data e tals</h1>
                    <Button>Enviar Serviços</Button>
                </div>
            )}
        </>
    );
};

export default Agendar;