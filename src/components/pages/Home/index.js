import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

function Home() {

  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/cadastro'); // Caminho para onde deseja redirecionar
  }

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.titulo}>
            <h1>Card Game Digital</h1>
            <h2>Bem-vindo ao jogo de cartas dos valores da J&F</h2>
          </div>
          <div className={styles.buttoncontainer}>
            <button className={styles.buttonstart} onClick={handleButtonClick}>Começar o jogo</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home