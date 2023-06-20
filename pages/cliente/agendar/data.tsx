import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label, Toast } from 'reactstrap';
import styles from '../../../styles/cliente/agendar/data.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import Modal from 'react-modal';
import { set } from 'date-fns';
import Head from 'next/head';

interface Servico {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    professional_id: number;
    category_id: number;
}

const Data = () => {
    const [date, setDate] = useState(new Date());
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [data, setData] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [titulo, setTitulo] = useState('Por favor, selecione a data que deseja agendar');

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

    const handleAgendar = () => {
        const servicosSelecionados = selectedServices;
        const dataSelecionada = formatDate(selectedDate);
        const horarioSelecionado = selectedTime;

        if (servicosSelecionados.length > 0 && dataSelecionada !== '' && horarioSelecionado !== '') {
            sessionStorage.setItem('agendei-data', JSON.stringify(dataSelecionada));
            sessionStorage.setItem('agendei-horario', JSON.stringify(horarioSelecionado));

            window.location.href = '/cliente/agendar/concluir';
        }
    };

    useEffect(() => {
        if (selectedTime !== '') {
            setModalIsOpen(true);
        }
    }, [selectedTime]);

    useEffect(() => {
        const fetchData = async () => {
            const id = sessionStorage.getItem('id-professional');
            const url = `https://agendei-api.onrender.com/professional/availableSchedules?id=${id}&date=${encodeURIComponent(new Date(selectedDate).toLocaleDateString('en-CA'))}`;
            const servicosString = sessionStorage.getItem('agendei-servicos');
            const servicosArray = servicosString ? servicosString.split(',') : [];

            setSelectedServices(servicosArray as never[]);

            const date = new Date(selectedDate);
            const today = new Date();

            try {
                const response = await fetch(url);

                if (response.ok) {
                    const jsonData = await response.json();

                    const futureHours = jsonData.filter((item: string) => {
                        if (item) {
                            const hour = Number(item.split(':')[0]);
                            const date = new Date();
                            const hourNow = date.getHours();
                            const minuteNow = date.getMinutes();
                            const hourItem = hour;
                            const minuteItem = Number(item.split(':')[1]);

                            if (hourItem > hourNow) {
                                return true;
                            } else if (hourItem === hourNow && minuteItem > minuteNow) {
                                return true;
                            }
                        }

                        return false;
                    });

                    setTitulo('Agora, selecione o horário que deseja agendar');

                    if (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) {
                        setData(futureHours)
                    } else if (Array.isArray(jsonData)) {
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

    const handleVoltar = () => {
        window.location.href = '/cliente/agendar/servico';
    };

    const voltarParaCalendario = () => {
        data.length = 0
    };

    return (
        <>
            <Head>
                <title>Selecionar Data e Horário - Agendei</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <ToastContainer />
                <Header />
                <h1 className={styles.titulo}>{titulo}</h1>
                <div className={data.length > 0 ? styles.containerDwo : styles.container}>
                    <div className={styles.calendario}>
                        <DayPicker
                            className={styles.dayPicker}
                            selected={date}
                            classNames={{
                                day: styles.day,
                            }}
                            disabled={[isHoliday, isDisabledDay]}
                            modifiers={{ available: diasDaSemana }}
                            modifiersClassNames={
                                { selected: styles.selected }
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
                                <h2 className={styles.tituloHorarios}>Horários disponíveis para<br />o dia {formatDate(selectedDate)}:</h2>
                                <div className={styles.horas}>
                                    {data.map((item) => (
                                        <button key={item} className={styles.button} onClick={() => handleButtonClick(item)}>{item}</button>
                                    ))}
                                </div>
                            </div>
                        )}
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
                                maxWidth: '400px',
                                maxHeight: '300px',
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
                        <h2 className={styles.tituloModal}>Horário Selecionado</h2>
                        <p className={styles.textoModal}>Data: {formatDate(selectedDate)}</p>
                        <p className={styles.textoModal}>Horário: {selectedTime}</p>
                        <p className={styles.textoModal}><b>Deseja prosseguir?</b></p>
                        <div className={styles.divBtnModal}>
                            <Button className={styles.btnModal} onClick={handleAgendar}>Sim</Button>
                            <Button className={styles.btnModal} onClick={() => setModalIsOpen(false)}>Não</Button>
                        </div>
                    </Modal>
                </div>
                <Button onClick={handleVoltar} className={styles.btnVoltar}>Voltar</Button>
                <Footer />
            </main>
        </>
    );
}

export default Data;