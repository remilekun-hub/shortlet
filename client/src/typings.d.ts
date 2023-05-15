export interface Property {
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

export interface SingleProperty {
  _id: string;
  country: string;
  category: string;
  city: string;
  createdBy: {
    name: string;
    id: string;
    img: string;
  };
  price: number;
  title: string;
  bed: number;
  bathrooms: number;
  bedrooms: number;
  images: string[];
  guests: number;
  description: string;
  ameneties: string[] | [];
  reviews: string[] | [];
  __v?: number;
}

export interface Category {
  label: string;
  description: string;
}
