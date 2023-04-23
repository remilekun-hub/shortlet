export interface Property {
  _id: string;
  country: string;
  address: string;
  name: string;
  city: string;
  price: number;
  title: string;
  bed: number;
  bath: number;
  bedroom: number;
  photos: string[];
  description: string;
  ameneties: string[] | [];
  reviews: string[] | [];
  __v?: number;
}

export interface nuProperty {
  _id: string;
  country: string;
  category: string;
  city: string;
  price: number;
  title: string;
  bed: number;
  bathrooms: number;
  bedrooms: number;
  images: string[];
  guests: number;
  description: string;
  ameneties: string[] | [];
  reviews: any[];
  __v?: number;
}
export interface Category {
  label: string;
  description: string;
}
