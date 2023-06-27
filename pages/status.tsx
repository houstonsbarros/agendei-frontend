import styles from '../styles/status.module.scss'
import FooterProfessional from '@/components/common/footerProfessional';
import Head from 'next/head';

const Status = () => {
    return (
        <>
            <Head>
                <title>Status - Agendei</title>
                <link rel="icon" href="/Favicon.svg" />
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.titulo}>Status do Sistema</h1>
                    <div className={styles.descricao}>
                        <p className={styles.texto}>Abaixo estão listados os requisitos funcionais do sistema, com o status de cada um deles.</p>
                        <div className={styles.statusInfo}>
                            <p className={styles.infoFeito}>Concluído</p>
                            <p className={styles.infoFazendo}>Em desenvolvimento</p>
                            <p className={styles.infoFazer}>A fazer</p>
                        </div>
                    </div>
                    <div className={styles.coluna}>
                        <div className={styles.colunaFazer}>
                            <div className={styles.requisito}>
                                <div className={styles.statusFazer}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.tituloDiv}>RF5</h3>
                                    <p className={styles.textoDiv}>Remarcar Agendamento</p>
                                </div>
                            </div>
                            <div className={styles.requisito}>
                                <div className={styles.statusFazer}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.tituloDiv}>RF6</h3>
                                    <p className={styles.textoDiv}>Desmarcar Agendamento</p>
                                </div>
                            </div>
                            <div className={styles.requisito}>
                                <div className={styles.statusFazer}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.tituloDiv}>RF7</h3>
                                    <p className={styles.textoDiv}>Alterar Status do Agendamento</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.colunaFazendo}>
                            <div className={styles.requisito}>
                                <div className={styles.statusFazendo}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.tituloDiv}>RF8</h3>
                                    <p className={styles.textoDiv}>Relação de Clientes Agendados no Dia</p>
                                </div>
                            </div>
                            <div className={styles.requisito}>
                                <div className={styles.statusFazendo}></div>
                                <div className={styles.info}>
                                    <h3 className={styles.tituloDiv}>RF12</h3>
                                    <p className={styles.textoDiv}>Cadastrar estabelecimento</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.colunaFeito}>
                            <div className={styles.divRequisito}>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF1</h3>
                                        <p className={styles.textoDiv}>Cadastro/Login do Cliente</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF2</h3>
                                        <p className={styles.textoDiv}>Login do Profissional</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF3</h3>
                                        <p className={styles.textoDiv}>Relatórios</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF4</h3>
                                        <p className={styles.textoDiv}>Agendamento de Serviço</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF9</h3>
                                        <p className={styles.textoDiv}>Adicionar novos serviços</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF10</h3>
                                        <p className={styles.textoDiv}>Remover serviços</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF11</h3>
                                        <p className={styles.textoDiv}>Atualizar serviços</p>
                                    </div>
                                </div>
                                <div className={styles.requisito}>
                                    <div className={styles.statusConcluido}></div>
                                    <div className={styles.info}>
                                        <h3 className={styles.tituloDiv}>RF13</h3>
                                        <p className={styles.textoDiv}>Informar disponibilidade de horários</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FooterProfessional />
            </main>
        </>
    )
}

export default Status