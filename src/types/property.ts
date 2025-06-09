export interface PropertySearchParams {
  keyword: string;
  area?: string | number;
  deal_type?: string;
}

export interface PropertyCardData {
  id: number;
  title: string;
  address: string;
  type: string;
  households: string;
  buildings: string;
  approval_date: string;
  area: string;
  created_at?: string;
  deal_type?: string;
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

export interface ForecastPoint {
  date: string;
  actual: number | null;
  predicted: number;
  lower: number;
  upper: number;
  band: number;
  predictedBefore?: number;
  predictedAfter?: number;
}

export interface ApartmentDetailData {
  id?: number;
  area_label?: string;
  complex_name?: string;
  deal_type?: string;
  created_at?: string;
  updated_at?: string;
  crawled_at?: string;

  summary_data?: {
    title?: string;
    feature?: {
      동수?: string;
      면적?: string;
      유형?: string;
      세대수?: string;
      사용승인일?: string;
    };
  };

  area_detail?: {
    area?: string;
    room_count?: string;
    bathroom_count?: string;
    supply_area?: string;
    exclusive_area?: string;
    exclusive_rate?: string;
    official_price?: string;
    entrance_structure?: string;
    household_count?: string;
    price_info?: {
      매매?: string;
      전세?: string;
      월세?: string;
      전세가율?: string;
    };
    maintenance_cost?: {
      월평균?: string;
      현재월?: string;
      동절기평균?: string;
      하절기평균?: string;
    };
    holding_tax?: {
      합계?: string;
    };
    price_count?: {
      단기?: string;
      매매?: string;
      전세?: string;
      월세?: string;
    };
  };

  complex_info?: {
    난방?: string;
    면적?: string;
    건설사?: string;
    건폐율?: string;
    세대수?: string;
    용적률?: string;
    지번주소?: string;
    '저/최고층'?: string;
    관리사무소?: string;
    도로명주소?: string;
    사용승인일?: string;
    총주차대수?: string;
  };

  forecast_json?: {
    [key: string]: {
      actual?: number;
      predicted: number;
      lower: number;
      upper: number;
    };
  };

  price_history?: {
    [date: string]: {
      상한가: string;
      하한가: string;
      평균변동액: string;
      '매매가 대비 전세가': string;
    };
  };

  price_monthly_avg?: {
    [month: string]: {
      '평균 상한가': number;
      '평균 하한가': number;
    };
  };
}
