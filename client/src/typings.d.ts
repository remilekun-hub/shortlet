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
  state: string;
  description: string;
  amenities: string[] | [];
  reviews: ReviewProp[] | [];
  __v?: number;
}

export type PropertyCardProps = {
  data: Property;
  reservation?: Reservation;
  label?: string;
  onSubmit?: () => void;
};

export type Reservation = {
  _id: string;
  propertyId: string;
  propertyOwner: string;
  reservedBy: string;
  startDate: string;
  endDate: string;
  price: number;
};

export type ReviewProp = {
  createdBy: string;
  name: string;
  image: string;
  message: string;
  _id: string;
  propertyId: string;
};

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
  state: string;
  description: string;
  amenities: string[] | [];
  reviews: ReviewProp[] | [];
  __v?: number;
}

export interface Category {
  label: string;
  description: string;
}
