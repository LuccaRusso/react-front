import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import PicpayLogo from '../../../assets/picpaylogo.webp'
import styles from './Navbar.module.css'
import Overlay from '../../Overlay'

function Navbar() {

    const navigate = useNavigate()
    const location = useLocation()
    const handleButtonClick = () => {
        navigate('/'); // Caminho para onde deseja redirecionar
    };

    const [showTutorial, setShowTutorial] = useState(false);
    const [showRegra, setShowRegra] = useState(false);
    const [tempo, setTempo] = useState(
        parseInt(localStorage.getItem('tempo')) || 0
    ); // Tempo inicial em segundos
    const [cronometro, setCronometro] = useState('00:00') // Estado do cronômetro

    useEffect(() => {
        let intervaloID;

        function exibeTempo() {
            let min = parseInt(tempo / 60); // pega a parte inteira dos minutos
            let seg = tempo % 60; // calcula os segundos restantes
            let smin = min.toString().padStart(2, '0'); // formata o número em duas casas
            let sseg = seg.toString().padStart(2, '0');

            setCronometro(`${smin}:${sseg}`); // Atualiza o estado do cronômetro
            localStorage.setItem('tempo', tempo); // Atualiza o tempo no localStorage

            if (tempo <= 0) {
                clearInterval(intervaloID); // Para o timer
                localStorage.removeItem('tempo'); // Remove o tempo armazenado
            }
        }

        if (tempo > 0) {
            intervaloID = setInterval(() => {
                setTempo((prevTempo) => prevTempo - 1);
                exibeTempo();
            }, 1000);
        } else {
            setCronometro('00:00'); // Exibição inicial
        }

        return () => clearInterval(intervaloID); // Limpa o intervalo quando o componente desmonta
    }, [tempo]);

    function temporizador(t) {
        setTempo(t);
        localStorage.setItem('tempo', t); // Salva o tempo inicial
    }

    function reiniciarTimer() {
        setTempo(0);
        setCronometro('00:00');
        localStorage.removeItem('tempo'); // Remove o tempo armazenado
    }

    const esconderTemporizador = ['/','/final','/cadastro'].includes(location.pathname);

    return (
        <>
            <div className={styles.navbar}>
                <img src={PicpayLogo} alt="" onClick={handleButtonClick} />
                <div>
                    <button onClick={() => setShowRegra(true)}>Regras</button>
                    <button onClick={() => setShowTutorial(true)}>Tutorial</button>
                    {/* Condicional para renderizar o input do cronômetro */}
                    {!esconderTemporizador && (
                        <input
                            type="text"
                            className={styles.cronometro}
                            value={cronometro}
                            readOnly
                        />
                    )}
                </div>
            </div>
            <Overlay
                showTutorial={showTutorial}
                setShowTutorial={setShowTutorial}
                showRegra={showRegra}
                setShowRegra={setShowRegra}
            />
        </>
    );
}

export default Navbar;
