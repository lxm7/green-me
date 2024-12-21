export interface BusinessDocument {
  coordinates: {
    type: "Point";
    coordinates: number[]; // [longitude, latitude]
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
  keywords: string[];
  coordinates: {
    type: "Point";
    coordinates: number[]; // [longitude, latitude]
  };
  environmentScore: number; // Ensure it's a tuple of exactly two numbers
}

export interface Document {
  name: string;
  business: string;
  score: number;
  greenScore: number;
  co2e: number;
  image: string;
  publishedLCAs: string[] | null;
  coordinates: {
    type: string;
    coordinates: number[];
  };
  // products: Product[];
}

export interface Business {
  id: string;
  document: Document;
}

export type TravelMode = "walk" | "drive";
