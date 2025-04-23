import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarConta() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleCriarConta = async () => {
    try {
      await axios.post('http://localhost:3000/usuarios', { nome, email, telefone, senha });
      alert('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao criar conta');
    }
  };

  return (
    <div className="criar-conta-container">
      <h2>Criar Conta</h2>
      <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button onClick={handleCriarConta}>Criar Conta</button>
    </div>
  );
}

export default CriarConta;