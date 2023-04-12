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
