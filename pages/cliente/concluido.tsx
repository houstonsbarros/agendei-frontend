import PageSpinner from '@/components/common/spinner';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import styles from '../../styles/cliente/concluido.module.scss'

interface Professional {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    cpf: string;
    adress: string;
}

interface Servico {
    id: number;
    name: string;
    price: number;
}

const Concluido = () => {
    const [data, setData] = useState([])
    const [servicos, setServicos] = useState<Servico[]>([]);
    const [logado, setLogado] = useState(false);
    const [client_info, setClientInfo] = useState([]);
    const [professional_info, setProfessionalInfo] = useState<Professional | null>(null);

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

                    console.log("Cliente Info", client_info);

                    setLogado(true);
                    setClientInfo(client_info as never[]);
                } else {
                    console.log('Não foi possível obter os dados do usuário!');
                }
            } catch (error) {
                window.location.href = "/cliente/login";
            }

            try {
                const response = await fetch('http://localhost:3000/professional/getProfessionals', {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
              
                if (response.ok) {
                  const professionals: Professional[] = await response.json();
                  const selectedProfessionalId = 4;
                  const selectedProfessional = professionals.find((professional: Professional) => professional.id === selectedProfessionalId);
              
                  console.log("Professional Info", selectedProfessional);
              
                  setProfessionalInfo(selectedProfessional || null);
                }
              } catch (error) {
                console.error("Error:", error);
              }
            };              
          
        fetchUserData();
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('agendei-token');
        const data = sessionStorage.getItem('agendei-agendamento');
        sessionStorage.removeItem('agendei-data')
        sessionStorage.removeItem('agendei-horario')
        sessionStorage.removeItem('agendei-servicos')
        const dataString = JSON.parse(data as string)

        if (dataString) {
            const data = dataString;

            if (Array.isArray(data)) {
                setData(data as never[]);
            } else {
                setData([]);
            }
        } else {
            console.log('Erro ao buscar os serviços');
        }

        setData(dataString as never)
    } , []);

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

      const voltar = () => {
        window.location.href = "/cliente/inicio";
      }

      

    if (!logado) {
        return <PageSpinner />
    }

    console.log('Data:', data)

    let professionalAdress = '';
    let professionalAdressParsed;

    if (professional_info) {
        professionalAdress = professional_info.adress;
        professionalAdressParsed = JSON.parse(professionalAdress);
    }

    console.log(professionalAdressParsed)

    return (
        <>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Agendamento Concluído</h1>
                    <h2 className={styles.subtitulo}>Cliente: {client_info[0]} {client_info[1]}</h2>
                    <h2 className={styles.subtitulo}>Profissional: {professional_info ? `${professional_info.first_name} ${professional_info.last_name}` : 'Carregando...'}</h2>
                    <h2 className={styles.subtitulo}>Horário: {formatDate(data.schedule.date)} às {data.schedule.hour}</h2>
                    <h2 className={styles.subtitulo}>Serviços:</h2>
                    <ul className={styles.lista}>
                        {servicos.map((servico, index) => {
                            const { name, price } = servico;
                            const servicosSelecionados = data.services.toString().split(",").map(Number);
                            const isSelected = servicosSelecionados.includes(servico.id);
                            console.log('Serviços Selecionados:', isSelected)

                            return isSelected && (
                                <li key={index} className={styles.itemLista}>
                                    <span className={styles.itemListaNome}>{name}</span>
                                    <span className={styles.itemListaPreco}>R$ {price}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <h2 className={styles.subtitulo}>Forma de Pagamento: {data[3]}</h2>
                    {professionalAdress !== '' && (
                        <h2 className={styles.subtitulo}>Endereço:  
                        {professionalAdressParsed.street && ` ${professionalAdressParsed.street},`}
                        {professionalAdressParsed.number && ` ${professionalAdressParsed.number} ,`}
                        {professionalAdressParsed.complement && ` ${professionalAdressParsed.complement},`}
                        {professionalAdressParsed.city && ` ${professionalAdressParsed.city}/`}
                        {professionalAdressParsed.state && `${professionalAdressParsed.state} - `}
                        {professionalAdressParsed.zip_code && ` ${professionalAdressParsed.zip_code}`}
                        </h2>
                    )}
                    <div className={styles.containerBtn}>
                        <Button onClick={() => window.print()} outline className={styles.formBtn}>IMPRIMIR</Button>
                        <Button onClick={voltar} outline className={styles.formBtn}>VOLTAR</Button>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Concluido;