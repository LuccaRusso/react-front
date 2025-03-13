import styles from './Overlay.module.css'
import buttonStart from '../../assets/button-start.jpg'
import buttonRules from '../../assets/button-rules.png'
import timer from '../../assets/timer.png'
import howToPlay from '../../assets/howtoplay.png'


function Overlay({ showTutorial, setShowTutorial, showRegra, setShowRegra}) {

    return (
        <div className={styles.background}>
            {showTutorial && (
                <div className={styles.tutorial}>
                    <h1>Tutorial</h1>
                    <p>Este é o tutorial para ensinar a jogar!</p>
                    <p>Para começar clique no botão "Começar o jogo"</p>
                    <img src={buttonStart} alt='' className={styles.image} />
                    <br />
                    <p>Depois disso leia as regras para entender o jogo</p>
                    <p>Agora com as regras lidas, clique no botão continuar</p>
                    <br />
                    <img src={buttonRules} alt='' className={styles.image} />
                    <br />
                    <p>Se inicia um cronômetro de 10 minutos</p>
                    <img src={timer} alt='' className={styles.image} />
                    <br />
                    <p>Você tem que responder todas as perguntas</p>
                    <p>da forma certa, antes que o tempo acabe!</p>
                    <img src={howToPlay} alt='' className={styles.image} />
                    <p>Boa sorte!</p>
                    <br />
                    <button onClick={() => setShowTutorial(false)}>Continuar</button>
                    <br /><br />
                </div>
            )}
            {showRegra && (
                <div className={styles.regra}>
                    <br/><br/>
                    <h1>Regras</h1>
                    <p>As regras do jogo são as seguintes:</p>
                    <p>1ª O quiz tem que ser feito de forma individual</p>
                    <p>2ª Somente uma alternativa é a correta</p>
                    <p>3ª Respostas corretas recebem pontos</p>
                    <p>4ª Você só tem 10 minutos</p>
                    <button onClick={() => setShowRegra(false)}>Continuar</button>
                </div>
            )}
        </div>

    )

}

export default Overlay