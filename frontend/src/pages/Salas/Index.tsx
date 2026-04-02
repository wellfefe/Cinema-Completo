import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { Sala } from '../../models/Sala';

type SalaForm = {
  numero: number;
  capacidade: number;
  cinemaId: number;
};

const initialForm: SalaForm = {
  numero: 0,
  capacidade: 0,
  cinemaId: 1,
};

export function SalasPage() {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<SalaForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarSalas() {
    try {
      const response = await api.get('/sala');
      setSalas(response.data);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
      toast.error('Erro ao carregar salas.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarSalas();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]: Number(value),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editingId) {
        await api.patch(`/sala/${editingId}`, form);
        toast.success('Sala atualizada com sucesso!');
      } else {
        await api.post('/sala', form);
        toast.success('Sala cadastrada com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarSalas();
    } catch (error) {
      console.error('Erro ao salvar sala:', error);
      toast.error('Erro ao salvar sala.');
    }
  }

  function handleEdit(sala: Sala) {
    setEditingId(sala.id);
    setForm({
      numero: sala.numero,
      capacidade: sala.capacidade,
      cinemaId: sala.cinemaId,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir esta sala?');
    if (!confirmar) return;

    try {
      await api.delete(`/sala/${id}`);
      toast.success('Sala excluída com sucesso!');
      carregarSalas();
    } catch (error) {
      console.error('Erro ao excluir sala:', error);
      toast.error('Erro ao excluir sala.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Salas</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Sala' : 'Cadastrar Sala'}</h3>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Número da Sala</label>
            <input
              type="number"
              name="numero"
              className="form-control"
              value={form.numero}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Capacidade</label>
            <input
              type="number"
              name="capacidade"
              className="form-control"
              value={form.capacidade}
              onChange={handleChange}
              required
            />
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
        <p>Carregando salas...</p>
      ) : salas.length === 0 ? (
        <p>Nenhuma sala encontrada.</p>
      ) : (
        <div className="row">
          {salas.map((sala) => (
            <div key={sala.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Sala {sala.numero}</h5>
                  <p><strong>Capacidade:</strong> {sala.capacidade}</p>
                  <p><strong>Cinema ID:</strong> {sala.cinemaId}</p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(sala)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(sala.id)}
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