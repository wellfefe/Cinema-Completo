import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { LancheCombo } from '../../models/LancheCombo';

type LancheForm = {
  nome: string;
  valorUnitario: number;
  qtdUnidade: number;
  subtotal: number;
  pedidoId?: number | null;
};

const initialForm: LancheForm = {
  nome: '',
  valorUnitario: 0,
  qtdUnidade: 0,
  subtotal: 0,
  pedidoId: null,
};

export function LanchesPage() {
  const [lanches, setLanches] = useState<LancheCombo[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<LancheForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarLanches() {
    try {
      const response = await api.get('/lanche-combo');
      setLanches(response.data);
    } catch (error) {
      console.error('Erro ao carregar lanches:', error);
      toast.error('Erro ao carregar lanches.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarLanches();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setForm((old) => ({
      ...old,
      [name]:
        name === 'nome'
          ? value
          : name === 'pedidoId'
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
        await api.patch(`/lanche-combo/${editingId}`, payload);
        toast.success('Lanche atualizado com sucesso!');
      } else {
        await api.post('/lanche-combo', payload);
        toast.success('Lanche cadastrado com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarLanches();
    } catch (error) {
      console.error('Erro ao salvar lanche:', error);
      toast.error('Erro ao salvar lanche.');
    }
  }

  function handleEdit(lanche: LancheCombo) {
    setEditingId(lanche.id);
    setForm({
      nome: lanche.nome,
      valorUnitario: lanche.valorUnitario,
      qtdUnidade: lanche.qtdUnidade,
      subtotal: lanche.subtotal,
      pedidoId: lanche.pedidoId ?? null,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir este lanche?');
    if (!confirmar) return;

    try {
      await api.delete(`/lanche-combo/${id}`);
      toast.success('Lanche excluído com sucesso!');
      carregarLanches();
    } catch (error) {
      console.error('Erro ao excluir lanche:', error);
      toast.error('Erro ao excluir lanche.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lanches</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Lanche' : 'Cadastrar Lanche'}</h3>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Nome</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Valor Unitário</label>
            <input
              type="number"
              name="valorUnitario"
              className="form-control"
              value={form.valorUnitario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Quantidade</label>
            <input
              type="number"
              name="qtdUnidade"
              className="form-control"
              value={form.qtdUnidade}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
            <label className="form-label">Subtotal</label>
            <input
              type="number"
              name="subtotal"
              className="form-control"
              value={form.subtotal}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-2">
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
        <p>Carregando lanches...</p>
      ) : lanches.length === 0 ? (
        <p>Nenhum lanche encontrado.</p>
      ) : (
        <div className="row">
          {lanches.map((lanche) => (
            <div key={lanche.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{lanche.nome}</h5>

                  <p><strong>Valor unitário:</strong> R$ {lanche.valorUnitario}</p>
                  <p><strong>Quantidade:</strong> {lanche.qtdUnidade}</p>
                  <p><strong>Subtotal:</strong> R$ {lanche.subtotal}</p>
                  <p><strong>Pedido:</strong> {lanche.pedidoId ?? 'Não vinculado'}</p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(lanche)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(lanche.id)}
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