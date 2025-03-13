import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Questao.module.css'

function Questao(props) {
    const navigate = useNavigate()
    const location = useLocation()


     // Estado para os valores booleanos
     const [valores, setValores] = useState([false, false, false, false, false, false, false]);
     const [point, setPoint] = useState(Number(localStorage.getItem('point')) || 0);
 
     const num = Number(props.num);
 
     // Atualiza os valores com base na rota
     useEffect(() => {
         const novosValores = Array(7).fill(false); // Reset dos valores
         switch (location.pathname) {
             case '/questao1':
                 novosValores[0] = true;
                 break;
             case '/questao2':
                 novosValores[1] = true;
                 break;
             case '/questao3':
                 novosValores[2] = true;
                 break;
             case '/questao4':
                 novosValores[3] = true;
                 break;
             case '/questao5':
                 novosValores[4] = true;
                 break;
             case '/questao6':
                 novosValores[5] = true;
                 break;
             case '/questao7':
                 novosValores[6] = true;
                 break;
             default:
                 break;
         }
         setValores(novosValores);
     }, [location.pathname]);
 
     const handleClick = (index) => {
         if (valores[index]) {
             const novoPoint = point + 10;
             setPoint(novoPoint);
             localStorage.setItem('point', novoPoint);
             console.log('Pontos:', novoPoint);
         }
 
         // Navegação para a próxima questão
         if ((num + 1) <= 7) {
             navigate(`/questao${num + 1}`);
         } else {
             navigate('/final');
         }
     };

    return (
        <>
            <div className={styles.body}>
                <div className={styles.caixa}>
                    <div className={styles.pergunta}>
                        <div className={styles.container}>
                            <img src={props.image} alt="" />
                            <div className={styles.questao}>
                                <p>{props.num}/7</p>
                                <p>{props.pergunta}</p>
                            </div>
                            <img src={props.image} alt="" />
                        </div>
                        <div className={styles.alternativa}>
                            <button
                                className={styles.humildade}
                                onClick={() => handleClick(5)}>
                                <div>
                                    <strong>Humildade</strong>
                                    <br />
                                    "Não é arrogante, <br />
                                    não é o dono da <br />
                                    verdade, acha que <br />
                                    sabe de tudo e <br />
                                    valoriza a opinião <br />
                                    dos outros."
                                </div>
                            </button>
                            <button
                                className={styles.disciplina}
                                onClick={() => handleClick(2)}>
                                <div>
                                    <strong>Disciplina</strong>
                                    <br />
                                    ”Ser planejador, <br />
                                    faz bem feito, <br />
                                    pontual com o horário, <br />
                                    não cria justificativas, <br />
                                    sempre entregando <br />
                                    resultados bons.”
                                </div>
                            </button>
                            <button
                                className={styles.determinacao}
                                onClick={() => handleClick(1)}>
                                <div>
                                    <strong>Determinação</strong>
                                    <br />
                                    "Ser proativo, <br />
                                    comprometido com <br />
                                    progresso pessoal,<br />
                                    supera expectativas, <br />
                                    engaja pessoas."
                                </div>
                            </button>
                            <button
                                className={styles.franqueza}
                                onClick={() => handleClick(4)}>
                                <div>
                                    <strong>Franqueza</strong>
                                    <br />
                                    “Ser claro na <br />
                                    comunicação, sabe <br />
                                    dizer não, sempre<br />
                                    acolhe as pessoas, <br />
                                    e não tem vergonha de <br />
                                    dizer que não sabe.”
                                </div>
                            </button>
                            <button
                                className={styles.atitude}
                                onClick={() => handleClick(0)}>
                                <div>
                                    <strong>Atitude de dono</strong>
                                    <br />
                                    "Ser líder, <br />
                                    comprometido, <br />
                                    inspira pelo exemplo, <br />
                                    abraça desafios, <br />
                                    busca a excelência."
                                </div>
                            </button>
                            <button
                                className={styles.disponibilidade}
                                onClick={() => handleClick(3)}>
                                <div>
                                    <strong>Disponibilidade</strong>
                                    <br />
                                    ”Estar sempre <br />
                                    pronto, realizando <br />
                                    seus propósitos, <br />
                                    fazer o que precisa <br />
                                    ser feito, fazer<br />
                                    escolhas conscientes.”
                                </div>
                            </button>
                            <button
                                className={styles.simplicidade}
                                onClick={() => handleClick(6)}>
                                <div>
                                    <strong>Simplicidade</strong>
                                    <br />
                                    “Tem um pensamento <br />
                                    direto, um <br />
                                    raciocínio lógico, <br />
                                    não complica as coisas, <br />
                                    sendo objetivo <br />
                                    e mão na massa.”
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Questao
