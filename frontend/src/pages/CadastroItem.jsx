// src/pages/CadastroItem.jsx
import { useState } from 'react';
import axios from 'axios';
import './CadastroItem.css';

function CadastroItem() {
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [status, setStatus] = useState('0');
  const [categoriaId, setCategoriaId] = useState('');
  const [itens, setItens] = useState([]);

  const categorias = [
    { id: 1, nome: 'Chaves' },
    { id: 2, nome: 'Carteiras' },
    { id: 3, nome: 'Documentos' },
    { id: 4, nome: 'Eletrônicos' },
    { id: 5, nome: 'Outros' }
  ];

  const getCategoriaNome = (id) => {
    const categoria = categorias.find(c => c.id === parseInt(id));
    return categoria ? categoria.nome : 'Desconhecida';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      return alert('Usuário não autenticado. Faça login novamente.');
    }

    const novoItem = {
      nome_objeto: nome,
      dataEvento: data,
      localizacao: local,
      status: Number(status),
      categoria_ID: Number(categoriaId),
      usuario_ID: Number(usuarioId),
      foto: null
    };

    try {
      const response = await axios.post('http://localhost:3000/item', novoItem);
      const itemSalvo = response.data;

      setItens([...itens, {
        nome: itemSalvo.nome_objeto || nome,
        data: (itemSalvo.dataEvento || data).split('T')[0],
        local: itemSalvo.localizacao || local,
        status: (itemSalvo.status ?? Number(status)) === 0 ? 'Perdido' : 'Encontrado',
        categoriaNome: getCategoriaNome(itemSalvo.categoria_ID || categoriaId)
      }]);

      setNome('');
      setData('');
      setLocal('');
      setStatus('0');
      setCategoriaId('');
    } catch (error) {
      console.error('Erro ao cadastrar item:', error);
      alert('Erro ao cadastrar item. Verifique o console.');
    }
  };

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-container">
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <h2>Cadastro de Item Perdido</h2>

          <label>Nome do Objeto:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />

          <label>Data do Evento:</label>
          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

          <label>Localização:</label>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} required />

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="0">Perdido</option>
            <option value="1">Encontrado</option>
          </select>

          <label>Categoria:</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>

          <button type="submit" disabled={!nome || !data || !local || !categoriaId}>
            Cadastrar
          </button>
        </form>
      </div>

      {itens.length > 0 && (
        <div className="lista-itens">
          <h3>📋 Itens Perdidos Cadastrados</h3>
          <div className="grid-itens">
            {itens.map((item, index) => (
              <div key={index} className="item-card">
                <p><strong>Nome:</strong> {item.nome}</p>
                <p><strong>Data:</strong> {item.data}</p>
                <p><strong>Local:</strong> {item.local}</p>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Categoria:</strong> {item.categoriaNome}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastroItem;
