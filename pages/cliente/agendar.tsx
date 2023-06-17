import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../styles/cliente/agendar.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';

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
    const [date, setDate] = useState(new Date());

    const [selecionado, setSelecionado] = useState(false)
    const [servico, setServico] = useState('#FFF');
    const [TextoStyleServico, setTextoStyleServico] = useState('#000');

    const isHoliday = (date: Date) => {
        const day = date.getDay();
        return day === 0;
    }

    const isDisabledDay = (date: Date) => {
        const today = new Date(); // Obtém a data atual
        const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // Remove a informação de tempo da data atual
        const providedDateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Remove a informação de tempo da data fornecida
      
        return providedDateWithoutTime < todayWithoutTime; // Retorna true se a data fornecida for anterior à data atual
      }

    const diasDaSemana = (date: Date) => {
        const day = date.getDay();
        return day !== 0;
    }

    const [servicos, setServicos] = useState<Servico[]>([]);
    const [data, setData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    const handleAgendar = () => {
        const servicosSelecionados = selectedServices;
        const dataSelecionada = formatDate(selectedDate);
        const horarioSelecionado = selectedTime;

        if (servicosSelecionados.length > 0 && dataSelecionada !== '' && horarioSelecionado !== '') {
            sessionStorage.setItem('agendei-servicos', JSON.stringify(servicosSelecionados));
            sessionStorage.setItem('agendei-data', JSON.stringify(dataSelecionada));
            sessionStorage.setItem('agendei-horario', JSON.stringify(horarioSelecionado));

            window.location.href = '/cliente/finalizar';
        }
    };

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

            console.log(servicosIds)

            setSelecionarServico(true);
            setSelectedServices(servicosIds as never[]);
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

    useEffect(() => {
        const fetchData = async () => {
            const id = 4;
            const url = `http://localhost:3000/professional/availableSchedules?id=${id}&date=${encodeURIComponent(new Date(selectedDate).toLocaleDateString('en-CA'))}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const jsonData = await response.json();

                    if (Array.isArray(jsonData)) {
                        setData(jsonData as never[]);
                    } else {
                        setData([]);
                    }
                } else {
                    throw new Error('Erro ao buscar os horários disponíveis');
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedDate) {
            fetchData();
        }
    }, [selectedDate]);

    const handleDateChange = (event: { target: { value: string; }; }) => {
        setSelectedDate(event.target.value);
        setDate(new Date(event.target.value));
    };

    const handleButtonClick = (time: string) => {
        console.log('Horário selecionado:', time);

        setSelectedTime(time);
    };

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

    const nextMonthDate = new Date();
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);

    const currentMonth = new Date();
    currentMonth.setMonth(currentMonth.getMonth());

    console.log(servicos)
    
    return (
        <>
            {!selecionarServico ? (
                <main className={styles.main}>
                    <ToastContainer />
                    <div className={styles.container}>
                        <h1 className={styles.title}>Agora, selecione os serviços desejados</h1>
                        <Form className={styles.form}>
                            <FormGroup className={styles.service}>
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

                            <Button onClick={handleSelecionarServico} className={styles.btnSelecionar}>Selecionar Serviço</Button>
                        </Form>
                    </div>
                </main>
            ) : (
                <main className={styles.main}>
                    <ToastContainer />
                    <div className={styles.container}>
                        <div className={styles.calendario}>
                            <DayPicker
                                className={styles.dayPicker}
                                selected={date}
                                classNames={{
                                    day: styles.day,
                                }}
                                disabled={[isHoliday, isDisabledDay]}
                                modifiers={{available: diasDaSemana}}
                                modifiersClassNames={
                                    {selected: styles.selected}
                                }
                                mode="single"
                                fromMonth={new Date()}
                                toMonth={nextMonthDate}
                                onDayClick={(day) => handleDateChange({ target: { value: day.toString() } })}
                                locale={ptBR}
                                defaultMonth={new Date()} fromYear={2023} toYear={2023}
                            />
                        </div>
                    <div className={styles.horariosAgendar}>
                        {data.length > 0 && (
                            <div className={styles.horarios}>
                                <h2 className={styles.titulo}>Horários disponíveis para<br />o dia {formatDate(selectedDate)}:</h2>
                                <div className={styles.horas}>
                                    {data.map((item) => (
                                        <button key={item} className={styles.button} onClick={() => handleButtonClick(item)}>{item}</button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className={styles.agendamento}>
                                {selectedTime && (
                                        <div className={styles.confirmacao}>
                                            <p className={styles.dataHora}>{selectedTime} | {formatDate(selectedDate)}</p>
                                            <div className={styles.divBtnConfirmar}>
                                                <Button className={styles.btnConfirmar} onClick={handleAgendar}><Image src="/confirmar.svg" alt='' width={20} height={20} className={styles.iconConfirmar}/> </Button>
                                                <Button className={styles.btnConfirmar} onClick={() => setSelectedTime('')}><Image src="/cancelar.svg" alt='' width={20} height={20} className={styles.iconConfirmar}/></Button>
                                            </div>
                                        </div>
                                    )}
                            </div>
                    </div>
                    </div>
                </main>
            )}
        </>
    );
};

export default Agendar;