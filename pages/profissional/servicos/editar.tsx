import React, { useEffect, useState } from 'react';

interface Servico {
    id: number;
    name: string;
    description: string;
    price: number;
    professional_id: number;
}

const EditarServico = () => {
    const [servico, setServico] = useState<Servico[]>([]);

    const getAgendamentos = async () => {
    
        try {
            const token = sessionStorage.getItem('agendei-token-client');
    
            const response = await fetch("https://agendei-api.onrender.com/client/schedule", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (Array.isArray(data)) {
                    setServico(data as never[]);
                }
            }
        } catch (error) {
            console.log('Erro ao buscar os agendamentos: ', error)
        }
    }
    
    return (
        <div>
            <h1>Editar Servico</h1>
        </div>
    )
}

export default EditarServico;