export interface Asset {
    name: string;
    value: number;
}
  
export interface MarketTrend {
    name: string;
    series: { name: string; value: number }[];
}

export interface ReviewData {
    assetType: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
}
  