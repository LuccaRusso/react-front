import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Cadastro.module.css';

function Cadastro(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // Estado para exibir mensagens

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  localStorage.setItem('point', 0)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name, password } = formData;

    // Verificar se todos os campos estão preenchidos
    if (!name || !email || !password) {
        setMessage('⚠️ Todos os campos são obrigatórios! ⚠️');
        return;
      }

    const userData = {
      _id: email,
      name,
      password,
      point: 0,
    };

    try {
      const response = await fetch(`http://localhost:8090/signup/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const isUserCreated = await response.json();

        if (isUserCreated) {
          localStorage.setItem('name', formData.name)
          localStorage.setItem('password', formData.password)
          localStorage.setItem('email', formData.email)
          setMessage('Usuário criado com sucesso!');
          props.reiniciarTimer()
          props.temporizador(600)
          navigate('/questao1'); // Navegar para a próxima página
        } else {
          setMessage('⚠️ Usuário já existe! Tente novamente! ⚠️');
        }
      } else {
        setMessage('⚠️ Erro no servidor. Tente novamente mais tarde! ⚠️');
      }
    } catch (err) {
      setMessage(`⚠️ Erro ao se conectar: ${err.message} ⚠️`);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Cadastro</h1>
          <br />
          <label>
            <p>Nome</p>
            <input
              name="name"
              id="name"
              type="text"
              placeholder="Ex: João Silva"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <p>Email:</p>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Ex: email@gmail.com"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            <p>Senha:</p>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Ex: senha123"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit"  className={styles.restart}>
            Cadastrar
          </button>
          <br />
          {/* Mensagem de feedback */}
        {message && <p className={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
