import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { Filme } from '../../models/Filme';

type FilmeForm = {
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  elenco: string;
  genero: string;
  dataInicioExibicao: string;
  dataFinalExibicao: string;
  cinemaId: number;
};

const initialForm: FilmeForm = {
  titulo: '',
  sinopse: '',
  classificacao: '',
  duracao: 0,
  elenco: '',
  genero: 'ACAO',
  dataInicioExibicao: '',
  dataFinalExibicao: '',
  cinemaId: 1,
};

export default function FilmesPage() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FilmeForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarFilmes() {
    try {
      const response = await api.get('/filme');
      setFilmes(response.data);
    } catch (error) {
      console.error('Erro ao carregar filmes:', error);
      toast.error('Erro ao carregar filmes.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarFilmes();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]:
        name === 'duracao' || name === 'cinemaId'
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await api.patch(`/filme/${editingId}`, form);
        toast.success('Filme atualizado com sucesso!');
      } else {
        await api.post('/filme', form);
        toast.success('Filme cadastrado com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarFilmes();
    } catch (error) {
      console.error('Erro ao salvar filme:', error);
      toast.error('Erro ao salvar filme.');
    }
  }

  function handleEdit(filme: Filme) {
    setEditingId(filme.id);
    setForm({
      titulo: filme.titulo,
      sinopse: filme.sinopse,
      classificacao: filme.classificacao,
      duracao: filme.duracao,
      elenco: filme.elenco,
      genero: filme.genero,
      dataInicioExibicao: filme.dataInicioExibicao.slice(0, 16),
      dataFinalExibicao: filme.dataFinalExibicao.slice(0, 16),
      cinemaId: filme.cinemaId,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir este filme?');
    if (!confirmar) return;

    try {
      await api.delete(`/filme/${id}`);
      toast.success('Filme excluído com sucesso!');
      carregarFilmes();
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
      toast.error('Erro ao excluir filme.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Filmes</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Filme' : 'Cadastrar Filme'}</h3>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Título</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              value={form.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Classificação</label>
            <input
              type="text"
              name="classificacao"
              className="form-control"
              value={form.classificacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Sinopse</label>
            <textarea
              name="sinopse"
              className="form-control"
              value={form.sinopse}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Duração</label>
            <input
              type="number"
              name="duracao"
              className="form-control"
              value={form.duracao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Gênero</label>
            <select
              name="genero"
              className="form-select"
              value={form.genero}
              onChange={handleChange}
            >
              <option value="ACAO">AÇÃO</option>
              <option value="COMEDIA">COMÉDIA</option>
              <option value="DRAMA">DRAMA</option>
              <option value="TERROR">TERROR</option>
              <option value="ROMANCE">ROMANCE</option>
              <option value="FICCAO">FICÇÃO</option>
              <option value="ANIMACAO">ANIMAÇÃO</option>
              <option value="OUTRO">OUTRO</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Cinema ID</label>
            <input
              type="number"
              name="cinemaId"
              className="form-control"
              value={form.cinemaId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Elenco</label>
            <input
              type="text"
              name="elenco"
              className="form-control"
              value={form.elenco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Data início</label>
            <input
              type="datetime-local"
              name="dataInicioExibicao"
              className="form-control"
              value={form.dataInicioExibicao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Data fim</label>
            <input
              type="datetime-local"
              name="dataFinalExibicao"
              className="form-control"
              value={form.dataFinalExibicao}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mt-3 d-flex gap-2">
          <button type="submit" className="btn btn-success">
            {editingId ? 'Atualizar' : 'Cadastrar'}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancelEdit}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p>Carregando filmes...</p>
      ) : filmes.length === 0 ? (
        <p>Nenhum filme encontrado.</p>
      ) : (
        <div className="row">
          {filmes.map((filme) => (
            <div key={filme.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{filme.titulo}</h5>
                  <p>{filme.sinopse}</p>
                  <p><strong>Classificação:</strong> {filme.classificacao}</p>
                  <p><strong>Duração:</strong> {filme.duracao} min</p>
                  <p><strong>Gênero:</strong> {filme.genero}</p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(filme)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(filme.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}