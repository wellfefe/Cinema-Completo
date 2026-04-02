import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { api } from "../../services/api";
import type { Sessao } from "../../models/Sessao";
import type { Filme } from "../../models/Filme";
import type { Sala } from "../../models/Sala";
import type { Ingresso, TipoIngresso } from "../../models/Ingresso";
import type { LancheCombo } from "../../models/LancheCombo";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// validação do formulário da venda (valorBase + tipo + quantidade)
const ingressoSchema = z.object({
  valorBase: z
    .string()
    .refine((v) => Number(v) > 0, "O valor deve ser maior que 0."),
  tipo: z.union([z.literal("INTEIRA"), z.literal("MEIA")]),
  quantidade: z
    .string()
    .refine((v) => {
      const n = Number(v);
      return Number.isInteger(n) && n > 0;
    }, "Quantidade deve ser um número inteiro maior que 0."),
});

type IngressoFormData = z.input<typeof ingressoSchema>;

export const VendaIngressoPage = () => {
  const { sessaoId } = useParams();
  const navigate = useNavigate();

  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [filme, setFilme] = useState<Filme | null>(null);
  const [sala, setSala] = useState<Sala | null>(null);

  const [lanches, setLanches] = useState<LancheCombo[]>([]);
  const [selectedLanches, setSelectedLanches] = useState<string[]>([]);

  // ingressos já cadastrados (tabela de preços)
  const [ingressos, setIngressos] = useState<Ingresso[]>([]);
  const [ingressoSelecionadoId, setIngressoSelecionadoId] =
    useState<string>("");

  const [form, setForm] = useState<IngressoFormData>({
    valorBase: "",
    tipo: "INTEIRA",
    quantidade: "1",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const load = async () => {
      if (!sessaoId) return;

      // sessão
      const sessaoRes = await api.get<Sessao>(`/sessoes/${sessaoId}`);
      setSessao(sessaoRes.data);

      // filme
      const filmeRes = await api.get<Filme>(`/filmes/${sessaoRes.data.filmeId}`);
      setFilme(filmeRes.data);

      // sala
      const salaRes = await api.get<Sala>(`/salas/${sessaoRes.data.salaId}`);
      setSala(salaRes.data);

      // combos de lanche
      const lanchesRes = await api.get<LancheCombo[]>("/lanches");
      setLanches(lanchesRes.data);

      // ingressos já cadastrados (preços)
      const ingressosRes = await api.get<Ingresso[]>("/ingressos");
      setIngressos(ingressosRes.data);
    };

    load();
  }, [sessaoId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value as any }));
  };

  const handleToggleLanche = (lancheId: string) => {
    setSelectedLanches((prev) =>
      prev.includes(lancheId)
        ? prev.filter((id) => id !== lancheId)
        : [...prev, lancheId]
    );
  };

  // quando selecionar um ingresso já cadastrado
  const handleSelectIngresso = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setIngressoSelecionadoId(id);

    const ingresso = ingressos.find((i) => i.id === id);
    if (!ingresso) return;

    // preenche o formulário com os dados do ingresso escolhido
    setForm((prev) => ({
      ...prev,
      valorBase: ingresso.valor.toString(),
      tipo: ingresso.tipo,
    }));

    // limpa erros desses campos, se tiver
    setErrors((prev) => ({
      ...prev,
      valorBase: "",
      tipo: "",
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = ingressoSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const valorBase = Number(result.data.valorBase);
    const tipo = result.data.tipo as TipoIngresso;
    const quantidade = Number(result.data.quantidade);

    // se veio da tabela de ingressos cadastrados, o valorBase já é o valor unitário final
    const veioDaTabela = !!ingressoSelecionadoId;

    const valorUnitario = veioDaTabela
      ? valorBase
      : tipo === "MEIA"
      ? valorBase / 2
      : valorBase;

    const valorIngressoTotal = valorUnitario * quantidade;

    // soma dos combos selecionados
    const lanchesSelecionados = lanches.filter(
      (l) => l.id && selectedLanches.includes(l.id)
    );
    const totalLanches = lanchesSelecionados.reduce(
      (sum, l) => sum + l.valorUnitario,
      0
    );

    const valorFinal = valorIngressoTotal + totalLanches;

    // registra a venda como um novo ingresso (total da venda)
    const payload: Ingresso = {
      sessaoId: sessaoId as string,
      tipo,
      valor: valorFinal,
    };

    await api.post("/ingressos", payload);

    alert(
      `Ingresso vendido!
Quantidade: ${quantidade}
Valor unitário: R$ ${valorUnitario.toFixed(2)}
Total ingressos: R$ ${valorIngressoTotal.toFixed(2)}
Combos: R$ ${totalLanches.toFixed(2)}
Total final: R$ ${valorFinal.toFixed(2)}`
    );

    setSelectedLanches([]);
    setIngressoSelecionadoId("");
    navigate("/sessoes");
  };

  if (!sessao || !filme || !sala) {
    return <p>Carregando dados da sessão...</p>;
  }

  // ingresso selecionado (para travar o tipo)
  const ingressoSelecionado = ingressos.find(
    (i) => i.id === ingressoSelecionadoId
  );

  // cálculos de preview
  const valorBaseNumber = Number(form.valorBase || 0);
  const quantidadeNumber = Number(form.quantidade || 0);
  const veioDaTabelaPreview = !!ingressoSelecionadoId;

  const valorUnitPreview = veioDaTabelaPreview
    ? valorBaseNumber
    : form.tipo === "MEIA"
    ? valorBaseNumber / 2
    : valorBaseNumber;

  const valorIngressoPreview = valorUnitPreview * quantidadeNumber;

  const lanchesSelecionadosPreview = lanches.filter(
    (l) => l.id && selectedLanches.includes(l.id)
  );
  const totalLanchesPreview = lanchesSelecionadosPreview.reduce(
    (sum, l) => sum + l.valorUnitario,
    0
  );
  const totalPreview = valorIngressoPreview + totalLanchesPreview;

  return (
    <>
      <h1 className="mb-4">Venda de Ingresso</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{filme.titulo}</h5>
          <p className="card-text mb-1">
            Sala {sala.numero} — Capacidade: {sala.capacidadeMaxima}
          </p>
          <p className="card-text">
            Sessão em: {new Date(sessao.dataHora).toLocaleString()}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Seleção de ingresso já cadastrado */}
        <div className="col-md-3">
          <label className="form-label" htmlFor="ingressoSelecionado">
            Ingresso já cadastrado
          </label>
          <select
            id="ingressoSelecionado"
            className="form-select"
            value={ingressoSelecionadoId}
            onChange={handleSelectIngresso}
          >
            <option value="">Selecione um ingresso</option>
            {ingressos.map((ing) => (
              <option key={ing.id} value={ing.id}>
                {ing.tipo} — R$ {ing.valor.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Valor base (permite ajustar) */}
        <div className="col-md-3">
          <Input
            id="valorBase"
            name="valorBase"
            type="number"
            placeholder="Valor base (R$)"
            value={form.valorBase}
            onChange={handleChange}
            error={errors.valorBase}
          />
        </div>

        {/* Quantidade */}
        <div className="col-md-2">
          <Input
            id="quantidade"
            name="quantidade"
            type="number"
            placeholder="Qtd"
            value={form.quantidade}
            onChange={handleChange}
            error={errors.quantidade}
          />
        </div>

        {/* Tipo de ingresso */}
        <div className="col-md-4">
          <label className="form-label" htmlFor="tipo">
            Tipo de ingresso
          </label>
          <select
            id="tipo"
            name="tipo"
            className={`form-select ${errors.tipo ? "is-invalid" : ""}`}
            value={form.tipo}
            onChange={handleChange}
          >
            <option
              value="INTEIRA"
              // se o ingresso selecionado for MEIA, não deixa mudar para INTEIRA
              disabled={ingressoSelecionado?.tipo === "MEIA"}
            >
              Inteira
            </option>
            <option
              value="MEIA"
              // se o ingresso selecionado for INTEIRA, não deixa mudar para MEIA
              disabled={ingressoSelecionado?.tipo === "INTEIRA"}
            >
              Meia
            </option>
          </select>
          {errors.tipo && <div className="invalid-feedback">{errors.tipo}</div>}
        </div>

        {/* Combos de lanche */}
        <div className="col-12">
          <h5 className="mt-4">Combos de Lanche (opcional)</h5>
          {lanches.length === 0 && (
            <p className="text-muted">Nenhum combo cadastrado.</p>
          )}

          {lanches.length > 0 && (
            <div className="row">
              {lanches.map((lanche) => (
                <div className="col-md-4 mb-3" key={lanche.id}>
                  <div className="form-check border rounded p-2 h-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`lanche-${lanche.id}`}
                      checked={
                        lanche.id
                          ? selectedLanches.includes(lanche.id)
                          : false
                      }
                      onChange={() =>
                        lanche.id && handleToggleLanche(lanche.id)
                      }
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`lanche-${lanche.id}`}
                    >
                      <strong>{lanche.nome}</strong>
                      <br />
                      <small className="text-muted">
                        {lanche.descricao}
                      </small>
                      <br />
                      <span>R$ {lanche.valorUnitario.toFixed(2)}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resumo de valores */}
        <div className="col-12">
          <div className="alert alert-secondary">
            <p className="mb-1">
              <strong>Ingresso:</strong> R$ {valorIngressoPreview.toFixed(2)}{" "}
              {quantidadeNumber > 0 && (
                <span>(Qtd: {quantidadeNumber})</span>
              )}
            </p>
            <p className="mb-1">
              <strong>Combos:</strong> R$ {totalLanchesPreview.toFixed(2)}
            </p>
            <p className="mb-0">
              <strong>Total:</strong> R$ {totalPreview.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="col-12">
          <Button type="submit" label="Confirmar Venda" variant="success" />
        </div>
      </form>
    </>
  );
};