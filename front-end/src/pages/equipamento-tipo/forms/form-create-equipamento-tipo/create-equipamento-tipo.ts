import { z } from 'zod';

export const schema = z.object({
  nome: z.string().min(1, 'Nome do tipo de equipamento é obrigatório'),
});

export type FormData = z.infer<typeof schema>;

export async function postEquipamentoTipo(data: FormData) {
  const response = await fetch('/api/equipamento-tipo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Erro ao cadastrar tipo de equipamento');
  }

  return await response.json();
}
