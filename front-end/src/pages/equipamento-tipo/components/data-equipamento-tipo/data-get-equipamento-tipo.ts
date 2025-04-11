import axios, { AxiosError } from 'axios';

export interface EquipamentoTipo {
	id: number;
	descricao: string;
}

export const getEquipamentoTipos = async (): Promise<EquipamentoTipo[]> => {
	try {
		const response = await axios.get<EquipamentoTipo[]>('http://localhost:3000/equipamento-tipo');
		return response.data;
	} catch (err) {
		const error = err as AxiosError<{ message?: string }>;
		const errorMessage = error.response?.data?.message ?? 'Erro ao buscar os tipos de equipamento.';
		throw new Error(errorMessage);
	}
};
