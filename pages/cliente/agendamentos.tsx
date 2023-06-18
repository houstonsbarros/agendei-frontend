import Head from 'next/head'
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const Agendamentos = () => {
    const [agendamentos, setAgendamentos] = useState([] as never[]);
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
                console.log(data)
                setAgendamentos(data);
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
    
    return (
        <>
            <Head>
                <title>Agendamentos - Agendei</title>
            </Head>
            <main>
                <h1>Agendamentos</h1>
                <ToastContainer/>
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Profissional</th>
                            <th>Serviços</th>
                            <th>Data</th>
                            <th>Horário</th>
                            <th>Valor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {agendamentos.map((agendamento: any) => (
                        <tr key={agendamento.id}>
                            <td>{agendamento.professional_name}</td>
                            <td>{agendamento.service_names}</td>
                            <td>{agendamento.schedule.date}</td>
                            <td>{agendamento.schedule.hour}</td>
                            <td>R${agendamento.total_price}</td>
                            <td>{agendamento.status}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </>
    )
}

export default Agendamentos;