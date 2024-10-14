export interface BusinessDocument {
  coordinates: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  name: string;
  products: Product[];
}

export interface Product {
  co2e: number;
  name: string;
  price: number;
  available: boolean;
  business: string;
  greenScore: number;
  keywords: string[];
  coordinates: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  publishedLCAs: string[]; // This reflects the array of published LCAs
  environmentScore: number; // Ensure it's a tuple of exactly two numbers
}

export interface Document {
  name: string;
  business: string;
  score: number | null;
  accreditors: boolean;
  coordinates: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  products: Product[];
}

export interface Business {
  id: string;
  document: Document;
}

export type TavelMode = "walk" | "drive";
