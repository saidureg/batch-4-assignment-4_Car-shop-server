export interface ICar {
  name: string;
  brand: string;
  model: string;
  year: number;
  CC: number;
  price: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description?: string;
  quantity: number;
  location?: string;
  Mileage?: number;
  image: string | string[];
  AC?: boolean;
  PST?: boolean;
  MG?: boolean;
  CNG?: boolean;
  inStock: boolean;
}
