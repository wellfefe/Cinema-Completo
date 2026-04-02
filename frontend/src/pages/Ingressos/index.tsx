import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { Ingresso } from '../../models/Ingresso';

type IngressoForm = {
  valorInteira: number;
  valorMeia: number;
  sessaoId: number;
  pedidoId?: number | null;
};

const initialForm: IngressoForm = {
  valorInteira: 0,
  valorMeia: 0,
  sessaoId: 1,
  pedidoId: null,
};

export function IngressosPage() {
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<IngressoForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarIngressos() {
    try {
      const response = await api.get('/ingresso');
      setIngressos(response.data);
    } catch (error) {
      console.error('Erro ao carregar ingressos:', error);
      toast.error('Erro ao carregar ingressos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarIngressos();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]:
        name === 'pedidoId'
          ? value === '' ? null : Number(value)
          : Number(value),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        pedidoId: form.pedidoId === null ? undefined : form.pedidoId,
      };

      if (editingId) {
        await api.patch(`/ingresso/${editingId}`, payload);
        toast.success('Ingresso atualizado com sucesso!');
      } else {
        await api.post('/ingresso', payload);
        toast.success('Ingresso cadastrado com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarIngressos();
    } catch (error) {
      console.error('Erro ao salvar ingresso:', error);
      toast.error('Erro ao salvar ingresso.');
    }
  }

  function handleEdit(ingresso: Ingresso) {
    setEditingId(ingresso.id);
    setForm({
      valorInteira: ingresso.valorInteira,
      valorMeia: ingresso.valorMeia,
      sessaoId: ingresso.sessaoId,
      pedidoId: ingresso.pedidoId ?? null,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir este ingresso?');
    if (!confirmar) return;

    try {
      await api.delete(`/ingresso/${id}`);
      toast.success('Ingresso excluído com sucesso!');
      carregarIngressos();
    } catch (error) {
      console.error('Erro ao excluir ingresso:', error);
      toast.error('Erro ao excluir ingresso.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Ingressos</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Ingresso' : 'Cadastrar Ingresso'}</h3>

        <div className="row g-3">
          <div className="col-md-3">
            <label className="form-label">Valor Inteira</label>
            <input
              type="number"
              name="valorInteira"
              className="form-control"
              value={form.valorInteira}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Valor Meia</label>
            <input
              type="number"
              name="valorMeia"
              className="form-control"
              value={form.valorMeia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Sessão ID</label>
            <input
              type="number"
              name="sessaoId"
              className="form-control"
              value={form.sessaoId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <label className="form-label">Pedido ID</label>
            <input
              type="number"
              name="pedidoId"
              className="form-control"
              value={form.pedidoId ?? ''}
              onChange={handleChange}
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
        <p>Carregando ingressos...</p>
      ) : ingressos.length === 0 ? (
        <p>Nenhum ingresso encontrado.</p>
      ) : (
        <div className="row">
          {ingressos.map((ingresso) => (
            <div key={ingresso.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Ingresso #{ingresso.id}</h5>

                  <p><strong>Inteira:</strong> R$ {ingresso.valorInteira}</p>
                  <p><strong>Meia:</strong> R$ {ingresso.valorMeia}</p>

                  <p>
                    <strong>Filme:</strong>{' '}
                    {ingresso.sessao?.filme?.titulo ?? `Sessão ${ingresso.sessaoId}`}
                  </p>

                  <p>
                    <strong>Sala:</strong>{' '}
                    {ingresso.sessao?.sala
                      ? `Sala ${ingresso.sessao.sala.numero}`
                      : '-'}
                  </p>

                  <p>
                    <strong>Pedido:</strong>{' '}
                    {ingresso.pedidoId ?? 'Não vinculado'}
                  </p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(ingresso)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(ingresso.id)}
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