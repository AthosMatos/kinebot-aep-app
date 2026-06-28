import { analysesToast } from "@/toasts/analyses.toast";
import { api } from "../axios.config";

type FieldValue = {
    [K in keyof Analyse]?: string
}

export interface GetAllAnalysesParams {
    _sort?: Omit<'result', keyof Analyse>
    _order?: 'desc' | 'asc'
    _page?: number
    _limit?: number
    q?: string

    fieldValue?: FieldValue
}

export interface Analyse {
    id: string
    title?: string
    company?: string
    industrialPlant?: string
    sector?: string
    workstation?: string
    activity?: string
    evaluator?: string
    analysisDate?: string
    result?: Result[]
}

export interface Result {
    key: string
    label: string
    color: string
    percentage: number
}


export const analysesService = {
    async get(params?: GetAllAnalysesParams) {
        const cleanedParams = {
            _sort: params?._sort,
            _order: params?._order,
            _page: params?._page,
            _limit: params?._limit,
            q: params?.q,
            ...params?.fieldValue
        }
        try {
            const res = await api.get<Analyse[]>("/analyses", { params: cleanedParams });
            return res.data
        }
        catch (error) {
            analysesToast.error.get((error as Error).message)
            throw error
        }
    },
    async getbyId(id: string) {
        try {
            const res = await api.get<Analyse>(`/analyses/${id}`);
            return res.data
        } catch (error) {
            analysesToast.error.getbyId((error as Error).message)
            throw error
        }
    },
    async post(body: Partial<Omit<Analyse, 'id'>>) {
        try {
            const res = await api.post<Analyse>(`/analyses`, body);
            return res.data
        } catch (error) {
            analysesToast.error.post((error as Error).message)
            throw error
        }
    },
    async put(id: string, body: Partial<Omit<Analyse, 'id'>>) {
        try {
            const res = await api.put<Analyse>(`/analyses/${id}`, body);
            return res.data
        } catch (error) {
            analysesToast.error.put((error as Error).message)
            throw error
        }
    },
    async patch(id: string, body: Partial<Omit<Analyse, 'id'>>) {
        try {
            const res = await api.patch<Analyse>(`/analyses/${id}`, body);
            return res.data
        } catch (error) {
            analysesToast.error.patch((error as Error).message)
            throw error
        }
    },
    async delete(id: string) {
        try {
            const res = await api.delete<Analyse>(`/analyses/${id}`);
            return res.data
        } catch (error) {
            analysesToast.error.delete((error as Error).message)
            throw error
        }
    },

};
