import Image from "next/image";
import { useEffect, useState } from "react";
import { ClapSpinner, StageSpinner } from "react-spinners-kit";
import styles from '../src/components/carregar/styles.module.scss';


const Carregar = () => {
    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState('' as string);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token");

            try {
                const response = await fetch("https://agendei-api.onrender.com/client/current", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    const client_info = [
                        userData.first_name,
                    ];

                    console.log(client_info);

                    setNome(client_info as never);
                } else {
                    window.location.href = "/cliente/login";
                }
            } catch (error) {
                window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    return loading ? (
        <>
            <main className={styles.container}>
                <Image src="/agenda.svg" alt="Agenda" width={300} height={230} />
                <h1 className={styles.titulo}>Bem vindo de volta, {nome}</h1>
                <ClapSpinner size={30} frontColor="#0053CC" backColor="#0053CC" loading={loading} className={styles.loader} />
            </main>
        </>
        ) : null;
}

export default Carregar;