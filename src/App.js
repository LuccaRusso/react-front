import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import Home from './components/pages/Home'
import Cadastro from './components/pages/Cadastro'
import Final from './components/pages/Final'
import Questao from './components/pages/Questao';
import Atitude from './assets/Atitude_de_Dono.png'
import Determinacao from './assets/Determinação.png'
import Disciplina from './assets/disciplina.png'
import Disponibilidade from './assets/disponibilidade.png'
import Franqueza from './assets/franqueza.png'
import Humildade from './assets/humildade.png'
import Simplicidade from './assets/simplicidade.png'
import Navbar from './components/layout/Navbar';
import { useState } from 'react';

function App() {

  const [tempo, setTempo] = useState(0)
  const[cronometro, setCronometro] = useState()

  function temporizador(t) {
      setTempo(t);
      localStorage.setItem('tempo', t)
  }

  function reiniciarTimer() {
    setTempo(0)
    setCronometro('00:00')
    localStorage.removeItem('tempo') // Remove o tempo armazenado
  }

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/cadastro' element={<Cadastro temporizador={temporizador} reiniciarTimer={reiniciarTimer}/>}/>
        <Route exact path='/final' element={<Final temporizador={temporizador} reiniciarTimer={reiniciarTimer}/>}/>
        <Route exact path='/questao1' element={<Questao image={Atitude} num={'1'} pergunta={"Qual valor pega a responsabilidade para si e toma a frente?"}/>}/>
        <Route exact path='/questao2' element={<Questao image={Determinacao} num={'2'} pergunta={"Quando se tem certeza de que seus objetivos, alvos e metas serão alcançados."}/>}/>
        <Route exact path='/questao3' element={<Questao image={Disciplina} num={'3'} pergunta={"Sempre cumpre o combinado."}/>}/>
        <Route exact path='/questao4' element={<Questao image={Disponibilidade} num={'4'} pergunta={"Alguém que ama o que faz e prioriza o seu trabalho."}/>}/>
        <Route exact path='/questao5' element={<Questao image={Franqueza} num={'5'} pergunta={"Quando se é direto, sincero, verdadeiro e transparente em suas relações, sempre com respeito."}/>}/>
        <Route exact path='/questao6' element={<Questao  image={Humildade} num={'6'} pergunta={"Alguém que está sempre aberto a aprender."}/>}/>
        <Route exact path='/questao7' element={<Questao image={Simplicidade} num={'7'} pergunta={"Soluções simples se resolvem e soluções complicadas se complicam."}/>}/>
      </Routes>
    </Router>
  )
}

export default App
