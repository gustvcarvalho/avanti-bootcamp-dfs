import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import finder from '../assets/finder.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const resposta = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();
      console.log('🔍 Dados recebidos no login:', dados);

      if (!resposta.ok) throw new Error(dados.message || 'Erro ao fazer login');

      localStorage.setItem('usuario', JSON.stringify({ nome: dados.nome, id: dados.id }));
      localStorage.setItem('usuarioId', dados.id);

      navigate('/', { replace: true });
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-300 to-purple-600"
      style={{
        backgroundColor: '#330033',
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'120\' viewBox=\'0 0 800 800\'%3E%3Cg fill=\'none\' stroke=\'%23404\' stroke-width=\'1\'%3E%3Cpath d=\'M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63\'/%3E%3Cpath d=\'M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764\'/%3E%3Cpath d=\'M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880\'/%3E%3Cpath d=\'M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382\'/%3E%3Cpath d=\'M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269\'/%3E%3C/g%3E%3Cg fill=\'%23505\'%3E%3Ccircle cx=\'769\' cy=\'229\' r=\'6\'/%3E%3Ccircle cx=\'539\' cy=\'269\' r=\'6\'/%3E%3Ccircle cx=\'603\' cy=\'493\' r=\'6\'/%3E%3Ccircle cx=\'731\' cy=\'737\' r=\'6\'/%3E%3Ccircle cx=\'520\' cy=\'660\' r=\'6\'/%3E%3Ccircle cx=\'309\' cy=\'538\' r=\'6\'/%3E%3Ccircle cx=\'295\' cy=\'764\' r=\'6\'/%3E%3Ccircle cx=\'40\' cy=\'599\' r=\'6\'/%3E%3Ccircle cx=\'102\' cy=\'382\' r=\'6\'/%3E%3Ccircle cx=\'127\' cy=\'80\' r=\'6\'/%3E%3Ccircle cx=\'370\' cy=\'105\' r=\'6\'/%3E%3Ccircle cx=\'578\' cy=\'42\' r=\'6\'/%3E%3Ccircle cx=\'237\' cy=\'261\' r=\'6\'/%3E%3Ccircle cx=\'390\' cy=\'382\' r=\'6\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-[900px] h-[500px]">
        <div className="w-1/2 bg-purple-700 text-white flex flex-col items-center justify-center p-10 relative">
          <div className="text-center flex flex-col items-center">
            <h1 className="text-4xl md:text-5x2 font-bold">Bem-vindo(a)!</h1>
            <img
              src={finder}
              alt="Logo 7"
              className="w-42 h-32 mt-4 object-contain bg-transparent"
            />
            <p className="text-center text-sm opacity-90 mt-4 font-lighter">
              Nosso sistema conecta você com a comunidade para recuperar objetos perdidos.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Login</h2>
          {erro && <p className="text-red-500 text-sm mb-2 text-center">{erro}</p>}

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 mb-4">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              placeholder="Senha"
              className="outline-none w-full"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
          >
            Entrar
          </button>

          <p className="text-sm text-center mt-4">
            Não tem conta?{' '}
            <Link to="/register" className="text-purple-600 hover:underline">
              Crie aqui
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
