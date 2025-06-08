// src/api/search.ts
import axios from 'axios';

export interface Apartment {
  index: number;
  title: string;
  address: string;
  type: string;
  specs: string[];
}

interface ApiResponse {
  type: number;
  results: Apartment[];
}

export async function fetchSearchResults(keyword: string): Promise<Apartment[]> {
  const response = await axios.get<ApiResponse>('http://127.0.0.1:8000/search', {
    params: { keyword },
  });
  return response.data.results;
}
