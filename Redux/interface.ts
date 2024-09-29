export interface Coin {
    id: string;
    name: string;
    symbol: string;
}

export interface CoinState {
    coins: Coin[];
    nfts:NFT[];
    categories:any;
    coinList:any;
    coinDetails: any | null;
    graphData: any | null;
    selectedCoin:CoinDetail | null;
    loading: boolean;
    error: string | null | undefined;
}

export interface CoinDetail {
 
       item:{
         id: string;
        coin_id: number;
        name: string;
        symbol: string;
        market_cap_rank: number;
        thumb: string;
        small: string;
        large: string;
        slug: string;
        price_btc: number;
        score: number;
        data: {
            price: number;
            price_btc: string;
            price_change_percentage_24h: {
                [currency: string]: number;  // Dynamic keys for various currencies
            };
            market_cap: string;
            market_cap_btc: string;
            total_volume: string;
            total_volume_btc: string;
            sparkline: string;
            content: string | null;
        };
    }
    
}





export interface NFT {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
    native_currency_symbol: string;
    floor_price_in_native_currency: number;
    floor_price_24h_percentage_change: number;
    data: {
      floor_price: string;
      floor_price_in_usd_24h_percentage_change: string;
      h24_volume: string;
      h24_average_sale_price: string;
      sparkline: string;
    };
  }


  // interfaces/CoinWeb.ts

export interface CoinWebImage {
    thumb: string;
    small: string;
    large: string;
}

export interface CoinWebMarketData {
    current_price: {
        usd: number;
        eur: number;
        // Add more currencies as needed
    };
    market_cap: {
        usd: number;
        // Add more currencies as needed
    };
    total_volume: {
        usd: number;
        // Add more currencies as needed
    };
    price_change_percentage_24h: {
        usd: number;
        // Add more currencies as needed
    };
}

export interface CoinWebLinks {
    homepage: string[];
    twitter?: string;
    reddit?: string;
    // Add more links as needed
}

export interface CoinWebDescription {
    en: string;
    // Add more languages if needed
}

export interface CoinWeb {
    id: string;
    symbol: string;
    name: string;
    image: CoinWebImage;
    market_data: CoinWebMarketData;
    description: CoinWebDescription;
    links: CoinWebLinks;
}
