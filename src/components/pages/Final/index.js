import styles from './Final.module.css';
import Twitter from '../../../assets/twitter.webp';
import Facebook from '../../../assets/facebook.jpeg';
import WhatsApp from '../../../assets/zap.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Final({ temporizador, reiniciarTimer }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    // Constante para a URL compartilhada
    const sharedUrl = 'https://site-ggqf.onrender.com/home/home.html';

    // Recupera dados do localStorage
    const name = localStorage.getItem('name') || 'Jogador';
    const password = localStorage.getItem('password');
    const email = localStorage.getItem('email');
    const point = localStorage.getItem('point') || 0;

    // Links para redes sociais
    const tweetText = `Eu consegui ${point} pontos neste jogo de valores da J&F!! \n Venha jogar também para ver o quanto você consegue! 😀 \n`;
    const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(sharedUrl)}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl)}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(tweetText + ' ' + sharedUrl)}`;

    // Navegar para a página inicial e reiniciar temporizador
    const goToHome = () => {
        if (temporizador) {
            temporizador(600);
        }
        navigate('/');
    };

    // Envia dados para o backend
    useEffect(() => {
        const userData = {
            _id: email,
            name,
            password,
            point,
        };

        const sendData = async () => {
            try {
                const response = await fetch('http://localhost:8090/point', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (!response.ok) {
                    throw new Error('Erro ao enviar os dados.');
                }
            } catch (err) {
                setMessage(`⚠️ Erro ao se conectar: ${err.message} ⚠️`);
            }
        };

        sendData();
    }, [email, name, password, point]);

    return (
        <>
            <div className={styles.body}>
                <div className={styles.caixa}>
                    <div className={styles.pergunta}>
                        <br />
                        <br />
                        <p id="nome">Parabéns, {name}</p>
                        <p>Sua pontuação foi de: </p>
                        <h1 id="pontos"> {point} pontos!</h1>
                        <button className={styles.reset} onClick={goToHome}>
                            Reiniciar jogo
                        </button>
                        <div className={styles.redes}>
                            <a id="twitterShare" href={twitterLink} target="_blank" rel="noopener noreferrer">
                                <img width="50" height="50" src={Twitter} alt="Compartilhar no Twitter" />
                            </a>
                            <a id="facebookShare" href={facebookLink} target="_blank" rel="noopener noreferrer">
                                <img width="50" height="50" src={Facebook} alt="Compartilhar no Facebook" />
                            </a>
                            <a id="whatsappShare" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                <img width="50" height="50" src={WhatsApp} alt="Compartilhar no WhatsApp" />
                            </a>
                        </div>
                        {message && <p className={styles.error}>{message}</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Final;
