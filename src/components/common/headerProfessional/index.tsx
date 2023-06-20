import Image from 'next/image';
import { Container } from 'reactstrap';
import styles from './styles.module.scss';
import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';

const Header = function () {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(false);

    
    const toogleIcon = () => {
        setSelectedIcon(!selectedIcon);
    };
  
    const toggleMenu = () => {
        toogleIcon();
      setShowMenu(!showMenu);
    };

    const removeToken = () => {
        sessionStorage.removeItem("agendei-token-professional");
        window.location.href = "/profissional/login";
    };

    return (
        <>
            <Container className={styles.header}>
                <Link href="/profissional/inicio">
                    <Image src="/agendei.png" alt="Perfil" className={styles.logo} width={100} height={30} />
                </Link>
                <p className={styles.text}><a className={styles.link} onClick={toggleMenu}>Meu Perfil
                {selectedIcon ? (
                    <FaChevronUp size="10px" className={styles.icone} />
                ) : (
                    <FaChevronDown size="10px" className={styles.icone} />
                )}
                </a></p>
                {showMenu && (
                <ul className={styles.menu}>
                    <li><Link href='/profissional/configurar'>Configurar Conta</Link></li>
                    <hr/>
                    <li><a onClick={removeToken}>Sair</a></li>
                </ul>
                )}
            </Container>
        </>
    );
};

export default Header;