import { useEffect, useState } from "react";
import Head from "next/head";
import PageSpinner from "@/components/common/spinner";
import Link from "next/link";
import styles from '../../styles/profissional/inicio.module.scss';
import { FaChevronRight } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { BsReceiptCutoff } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { TbChartInfographic } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import { CiCircleChevRight, CiCircleChevLeft } from 'react-icons/ci'
import HeaderProfessional from "@/components/common/headerProfessional";
import FooterProfessional from '@/components/common/footerProfessional';
import Image from "next/image";
import { FormGroup, Input } from "reactstrap";

const Inicio = () => {
    const [logado, setLogado] = useState(false);
    const [client_info, setClientInfo] = useState([]);
    const [fechado, setFechado] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = sessionStorage.getItem("agendei-token-professional");

            try {
                const response = await fetch("https://agendei-api.onrender.com/professional/current", {
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

                    setLogado(true);
                    setClientInfo(client_info as never[]);
                } else {
                    //window.location.href = "/cliente/login";
                }
            } catch (error) {
                //window.location.href = "/cliente/login";
            }
        };

        fetchUserData();
    }, []);

    if (!logado) {
        return <PageSpinner />
    }

    const handleToggleSidebar = () => {
        if(fechado){
            setFechado(false)
        } else {
            setFechado(true)
        }
    };

    return (
        <>
            <Head>
                <title>Inicio - Agendei | Profissional</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <div className={!fechado ? styles.sidebar : styles.sidebarFechado}>
                    <button onClick={handleToggleSidebar} className={styles.btnToggle}>{!fechado ? (
                        <CiCircleChevLeft size="25px" className={styles.icone} />
                    ) : (
                        <CiCircleChevRight size="20px" className={styles.icone} />
                    )}</button>
                    {!fechado ? (
                        <Image src="/AgendeiLogoBranca.svg" alt="Logo" width={150} height={150} className={styles.sideLogo}/>
                    ) : (
                        <Image src="/IconeBranco.svg" alt="Logo" width={30} height={30} className={styles.sideLogo}/>
                    )}
                    
                    <div className={styles.links}>
                        <Link href="/profissional/inicio" className={styles.sideAtivo}>
                            <div className={styles.sidebarLink}>
                                <RxDashboard size="20px" className={styles.iconeAtivo}/>
                                <h1 className={styles.sidebarTituloAtivo}>Dashboard</h1>
                            </div>
                        </Link>
                        <Link href="/profissional/agendamentos" className={styles.side}>
                            <div className={styles.sidebarLink}>
                                <HiOutlineClipboardCheck size="20px" className={styles.icone} />
                                <h1 className={styles.sidebarTitulo}>Agendamentos</h1>
                            </div>
                        </Link>
                        <Link href="/profissional/servicos" className={styles.side}>
                            <div className={styles.sidebarLink}>
                                <BsReceiptCutoff size="20px" className={styles.icone} />
                                <h1 className={styles.sidebarTitulo}>Serviços</h1>
                            </div>
                        </Link>
                        <Link href="/profissional/relatorios" className={styles.side}>
                            <div className={styles.sidebarLink}>
                                <TbChartInfographic size="20px" className={styles.icone} />
                                <h1 className={styles.sidebarTitulo}>Relatórios</h1>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.conta}>
                        <Link href="/profissional/configuracoes" className={styles.side}>
                            <div className={styles.sidebarLink}>
                                <MdSettings size="20px" className={styles.icone} />
                                <h1 className={styles.sidebarTitulo}>Configurações</h1>
                            </div>
                        </Link>
                        <Link href="/profissional/sair" className={styles.side}>
                            <div className={styles.sidebarLink}>
                                <FiLogOut size="20px" className={styles.icone} />
                                <h1 className={styles.sidebarTitulo}>Sair</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Dashboard</h1>
                    <div className={styles.containerBtns}>
                        <Link href="/profissional/agendamentos" className={styles.agendar}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Ver Agendamentos</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Veja seus agendamentos</p>
                            </div>
                        </Link>
                        <Link href="/profissional/relatorios" className={styles.agendamentos}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Seus Relatórios</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Verifique agora mesmo seus relatórios</p>
                            </div>
                        </Link>
                        <Link href="/profissional/servicos" className={styles.agendar}>
                            <div className={styles.cima}>
                                <FaChevronRight size="25px" className={styles.icone} />
                                <h1 className={styles.tituloBtn}>Seus Serviços</h1>
                            </div>
                            <div className={styles.baixo}>
                                <p className={styles.subtituloBtn}>Gerencie seus Serviços</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Inicio;
