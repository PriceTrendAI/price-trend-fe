import axios from 'axios';
import type { PropertyCardData } from '../types/property';

const baseURL = 'http://127.0.0.1:8000';


const api = axios.create({
  baseURL,
  withCredentials: false,
});

interface PropertySearchResponse {
  results: PropertyCardData[];
}

export async function fetchSearchResults(keyword: string): Promise<PropertyCardData[]> {
  const response = await api.get<PropertySearchResponse>('/search', {
    params: { keyword },
  });
  return response.data.results;
}

export async function fetchPropertyDetails(keyword: string) {
  const response = await api.get('/complex-info', {
    params: { keyword },
  });
  return response.data;
}

export async function fetchPricePrediction(keyword: string, area: string, deal_type: string) {
  const response = await api.get('/all-info', {
    params: {
      keyword,
      area: area.replace('㎡', ''),
      deal_type,
    },
  });
  return response.data;
}

export async function fetchAllHistory(): Promise<PropertyCardData[]> {
  const res = await api.get('/apartments');
  return res.data;
}

export async function fetchHistoryDetail(id: number): Promise<PropertyCardData> {
  const res = await api.get(`/apartments/${id}`);
  return res.data;
}

export async function deleteHistoryDetail(id: number): Promise<PropertyCardData> {
  const res = await api.delete(`/apartments/${id}`);
  return res.data;
}
