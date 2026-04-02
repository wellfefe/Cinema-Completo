import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { Sessao } from '../../models/Sessao';

type SessaoForm = {
  horarioExibicao: string;
  cinemaId: number;
  filmeId: number;
  salaId: number;
};

const initialForm: SessaoForm = {
  horarioExibicao: '',
  cinemaId: 1,
  filmeId: 1,
  salaId: 1,
};

export function SessoesPage() {
  const [sessoes, setSessoes] = useState<Sessao[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<SessaoForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarSessoes() {
    try {
      const response = await api.get('/sessao');
      setSessoes(response.data);
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
      toast.error('Erro ao carregar sessões.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarSessoes();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]: name === 'horarioExibicao' ? value : Number(value),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        horarioExibicao: new Date(form.horarioExibicao).toISOString(),
      };

      if (editingId) {
        await api.patch(`/sessao/${editingId}`, payload);
        toast.success('Sessão atualizada com sucesso!');
      } else {
        await api.post('/sessao', payload);
        toast.success('Sessão cadastrada com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarSessoes();
    } catch (error) {
      console.error('Erro ao salvar sessão:', error);
      toast.error('Erro ao salvar sessão.');
    }
  }

  function handleEdit(sessao: Sessao) {
    setEditingId(sessao.id);
    setForm({
      horarioExibicao: sessao.horarioExibicao.slice(0, 16),
      cinemaId: sessao.cinemaId,
      filmeId: sessao.filmeId,
      salaId: sessao.salaId,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir esta sessão?');
    if (!confirmar) return;

    try {
      await api.delete(`/sessao/${id}`);
      toast.success('Sessão excluída com sucesso!');
      carregarSessoes();
    } catch (error) {
      console.error('Erro ao excluir sessão:', error);
      toast.error('Erro ao excluir sessão.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Sessões</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Sessão' : 'Cadastrar Sessão'}</h3>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Horário da Exibição</label>
            <input
              type="datetime-local"
              name="horarioExibicao"
              className="form-control"
              value={form.horarioExibicao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
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

          <div className="col-md-3">
            <label className="form-label">Filme ID</label>
            <input
              type="number"
              name="filmeId"
              className="form-control"
              value={form.filmeId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Sala ID</label>
            <input
              type="number"
              name="salaId"
              className="form-control"
              value={form.salaId}
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
        <p>Carregando sessões...</p>
      ) : sessoes.length === 0 ? (
        <p>Nenhuma sessão encontrada.</p>
      ) : (
        <div className="row">
          {sessoes.map((sessao) => (
            <div key={sessao.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {sessao.filme?.titulo ?? `Filme ID ${sessao.filmeId}`}
                  </h5>

                  <p>
                    <strong>Horário:</strong>{' '}
                    {new Date(sessao.horarioExibicao).toLocaleString('pt-BR')}
                  </p>

                  <p>
                    <strong>Sala:</strong>{' '}
                    {sessao.sala ? `Sala ${sessao.sala.numero}` : sessao.salaId}
                  </p>

                  <p>
                    <strong>Cinema:</strong>{' '}
                    {sessao.cinema?.nome ?? `Cinema ID ${sessao.cinemaId}`}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(sessao)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(sessao.id)}
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