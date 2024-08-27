export interface Country {
    name?: string
    code?: string
    capital?: string
    continent?: Continent
    currency?: string
  }
  
  export interface Continent {
    name: string
    code: string
  }