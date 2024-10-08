export interface Product {
  name: string;
  greenScore: number;
  keywords: string[];
}

export interface BusinessDocument {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
  products: Product[];
}

export interface Business {
  id: string;
  document: BusinessDocument;
}

export type TavelMode = "walk" | "drive";
