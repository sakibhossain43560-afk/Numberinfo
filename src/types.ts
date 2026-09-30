export interface NumberInfoResult {
  mobile: string;
  rawWith880?: string;
  formattedInternational?: string;
  name: string;
  isPrivate?: boolean;
  gender?: string;
  fname?: string;
  location?: string;
  carrier?: string;
  type?: string;
  spamReports?: number;
  spamRisk?: 'Clean' | 'Low risk' | 'Medium risk' | 'High risk';
  isSpam?: boolean;
  country?: string;
  countryCode?: string;
  email?: string | null;
  coordinates?: { lat: number; lng: number };
  source?: string;
  operatorInfo?: {
    operator: string;
    shortName: string;
    circle: string;
    color: string;
    bgGradient?: string;
    type: string;
  };
  isFallbackRegistry?: boolean;
}

export interface NumberInfoResponse {
  status: boolean;
  query: string;
  count: number;
  results?: NumberInfoResult[];
  developer?: string;
  credit?: string;
  error?: string;
  source?: string;
  operatorInfo?: any;
  isFallbackRegistry?: boolean;
  gatewayNotice?: string;
}

export interface CountryOption {
  code: string;
  dialCode: string;
  name: string;
  flag: string;
  placeholder: string;
}

export interface SearchHistoryItem {
  number: string;
  name: string;
  carrier: string;
  timestamp: number;
  isSpam: boolean;
}
