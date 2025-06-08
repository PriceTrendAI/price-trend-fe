// src/api/search.ts
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
