import { useState, useEffect } from 'react';
import { Button, Container, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../styles/cliente/finalizar.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-day-picker/dist/style.css';
import { toast, ToastContainer } from 'react-toastify';
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

const Finalizar = () => {
    const [data, setData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [body, setBody] = useState({} as never);
    const [client_info, setClientInfo] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("http://localhost:3000/client/current", {
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

                    setClientInfo(client_info as never[]);
                } else {
                    window.location.href = "/cliente/login";
                }
            } catch (error) {
                window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const servicosSelecionados = sessionStorage.getItem('agendei-servicos');
        const dataSelecionada = sessionStorage.getItem('agendei-data');
        const horaSelecionada = sessionStorage.getItem('agendei-horario');

        if (servicosSelecionados) {
            setSelectedServices(JSON.parse(servicosSelecionados));
        }

        if (dataSelecionada) {
            setSelectedDate(JSON.parse(dataSelecionada));
        }

        if (horaSelecionada) {
            setSelectedTime(JSON.parse(horaSelecionada));
        }
    }, []);

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

    const hangleAgendar = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const servicosSelecionados = selectedServices.toString().split(",").map(Number);
        const servicos = servicosSelecionados.map((service) => {
            return {
                id: service,
            };
        });
        var dataSelecionada = sessionStorage.getItem('agendei-data') as string;
        console.log(dataSelecionada);
        dataSelecionada = JSON.parse(dataSelecionada);
        const [dia, mes, ano] = dataSelecionada.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        console.log(dataFormatada);
        var horaSelecionada = sessionStorage.getItem('agendei-horario');
        horaSelecionada = JSON.parse(horaSelecionada as string);
        const pagamento = formData.get("pagamento");


        try {
            fetch('http://localhost:3000/appointment/create', {
                method: 'POST',
                body: JSON.stringify({
                    client_id: client_info[3],
                    professional_id: 4,
                    services: [servicos[0].id],
                    schedule: {
                        date: dataFormatada,
                        hour: horaSelecionada,
                    },
                    payment: {
                        method: pagamento,
                        status: 'Pendente',
                    },
                    status: 'Pendente',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }).then((response) => {
                if (response.ok) {

                    toast.success('Agendamento concluído!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    window.location.href = "/cliente/concluido";
                    return response.json();
                }
                return response.json().then((error) => {
                    toast.error('Você não pode fazer o mesmo agendamento!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log(error);
                }
                );
            }).then((data) => {
                console.log(data);
                sessionStorage.setItem('agendei-agendamento', JSON.stringify(data));
            })
            
        } catch (error) {
            console.log('Erro ao cadastrar o agendamento:', error);
        }
    };

    return (
        <>
            <main className={styles.main}>
                <ToastContainer />
                <Container className={styles.container} onSubmit={hangleAgendar}>
                    <h1 className={styles.titulo}>Finalizar Agendamento</h1>
                    <Form className={styles.form}>
                        <FormGroup>
                            <h2 className={styles.subtitulo}>Serviços Selecionados:</h2>
                            <div className={styles.servicos}>
                                {servicos.map((service, item) => {
                                    const servicosSelecionados = selectedServices.toString().split(",").map(Number);
                                    const isSelected = servicosSelecionados.includes(service.id as never);

                                    return isSelected && (
                                        <p key={item} className={styles.info}>{service.name}</p>
                                    );
                                })}
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <h2 className={styles.subtitulo}>Data e Horário:</h2>
                            <p className={styles.info}>{selectedDate} às {selectedTime}</p>
                        </FormGroup>
                        <FormGroup className={styles.selecionar}>
                            <h2 className={styles.subtitulo}>Forma de Pagamento:</h2>
                            <Input type="select" name="pagamento" className={styles.select} required>
                                <option value="Crédito">Cartão de Crédito</option>
                                <option value="Débito">Cartão de Débito</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="PIX">PIX</option>
                            </Input>
                        </FormGroup>

                        <Button type="submit" outline className={styles.formBtn}>AGENDAR</Button>
                    </Form>
                </Container>
            </main>
        </>
    );
};

export default Finalizar;