import axios from 'axios';
import type { PropertyCardData } from '../types/property';

interface PropertySearchResponse {
  results: PropertyCardData[];
}

export async function fetchSearchResults(keyword: string): Promise<PropertyCardData[]> {
  const response = await axios.get<PropertySearchResponse>('http://127.0.0.1:8000/search', {
    params: { keyword },
  });
  return response.data.results;
}

export async function fetchPropertyDetails(keyword: string) {
  const response = await axios.get('http://127.0.0.1:8000/complex-info', {
    params: { keyword },
  });
  return response.data;
}

export async function fetchPricePrediction(keyword: string, area: string, deal_type: string) {
  const response = await axios.get('http://127.0.0.1:8000/all-info', {
    params: {
      keyword,
      area: area.replace('㎡', ''),
      deal_type,
    },
  });
  return response.data;
}

export async function fetchAllHistory(): Promise<PropertyCardData[]> {
  const res = await axios.get('http://127.0.0.1:8000/apartments');
  return res.data;
}

export async function fetchHistoryDetail(id: number): Promise<PropertyCardData> {
  const res = await axios.get(`http://127.0.0.1:8000/apartments/${id}`);
  return res.data;
}

export async function deleteHistoryDetail(id: number): Promise<PropertyCardData> {
  const res = await axios.delete(`http://127.0.0.1:8000/apartments/${id}`);
  return res.data;
}
