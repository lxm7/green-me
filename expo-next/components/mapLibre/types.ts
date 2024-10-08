export interface BusinessDocument {
  coordinates: [number, number]; // [longitude, latitude]
  name: string;
  products: Product[];
}

export interface Product {
  name: string;
  price: string;
  available: boolean;
  business: string;
  greenScore: number;
  accredited: boolean;
  keywords: string[];
  coordinates: [number, number]; // Ensure it's a tuple of exactly two numbers
}

export interface Document {
  name: string;
  business: string;
  score: number | null;
  accreditors: boolean;
  coordinates: [number, number]; // Ensure it's a tuple of exactly two numbers
  products: Product[];
}

export interface Business {
  id: string;
  document: Document;
}

export type TavelMode = "walk" | "drive";
