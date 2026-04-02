import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import type { Pedido } from '../../models/Pedido';

type PedidoForm = {
  qInteira: number;
  qMeia: number;
  valorTotal: number;
};

const initialForm: PedidoForm = {
  qInteira: 0,
  qMeia: 0,
  valorTotal: 0,
};

export function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<PedidoForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function carregarPedidos() {
    try {
      const response = await api.get('/pedido');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      toast.error('Erro ao carregar pedidos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedidos();
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
        await api.patch(`/pedido/${editingId}`, form);
        toast.success('Pedido atualizado com sucesso!');
      } else {
        await api.post('/pedido', form);
        toast.success('Pedido cadastrado com sucesso!');
      }

      setForm(initialForm);
      setEditingId(null);
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
      toast.error('Erro ao salvar pedido.');
    }
  }

  function handleEdit(pedido: Pedido) {
    setEditingId(pedido.id);
    setForm({
      qInteira: pedido.qInteira,
      qMeia: pedido.qMeia,
      valorTotal: pedido.valorTotal,
    });

    toast.info('Modo de edição ativado.');
  }

  async function handleDelete(id: number) {
    const confirmar = window.confirm('Deseja excluir este pedido?');
    if (!confirmar) return;

    try {
      await api.delete(`/pedido/${id}`);
      toast.success('Pedido excluído com sucesso!');
      carregarPedidos();
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      toast.error('Erro ao excluir pedido.');
    }
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(initialForm);
    toast.info('Edição cancelada.');
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Pedidos</h1>

      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <h3 className="mb-3">{editingId ? 'Editar Pedido' : 'Cadastrar Pedido'}</h3>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Quantidade Inteira</label>
            <input
              type="number"
              name="qInteira"
              className="form-control"
              value={form.qInteira}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Quantidade Meia</label>
            <input
              type="number"
              name="qMeia"
              className="form-control"
              value={form.qMeia}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Valor Total</label>
            <input
              type="number"
              name="valorTotal"
              className="form-control"
              value={form.valorTotal}
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
        <p>Carregando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <div className="row">
          {pedidos.map((pedido) => (
            <div key={pedido.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Pedido #{pedido.id}</h5>

                  <p><strong>Inteiras:</strong> {pedido.qInteira}</p>
                  <p><strong>Meias:</strong> {pedido.qMeia}</p>
                  <p><strong>Total:</strong> R$ {pedido.valorTotal}</p>
                  <p><strong>Ingressos:</strong> {pedido.ingressos?.length ?? 0}</p>
                  <p><strong>Lanches:</strong> {pedido.lanches?.length ?? 0}</p>

                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(pedido)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(pedido.id)}
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