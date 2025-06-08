export interface PropertySearchParams {
  keyword: string;
  area?: string | number;
  deal_type?: string;
}

export interface PropertyCardData {
  index: number;
  title: string;
  address: string;
  type: string;
  households: string;
  buildings: string;
  approval_date: string;
  area: string;
}

export interface PropertyComplexInfo {
  세대수: string;
  '저/최고층': string;
  사용승인일: string;
  총주차대수: string;
  용적률: string;
  건폐율: string;
  건설사: string;
  난방: string;
  관리사무소: string;
  지번주소: string;
  도로명주소: string;
  면적: string;
}
