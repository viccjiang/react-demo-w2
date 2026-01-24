export type Product = {
  id: string | number;
  title: string;
  origin_price: number;
  price: number;
  is_enabled: boolean | number;
  category: string;
  description: string;
  content: string;
  imageUrl?: string;
  imagesUrl?: string[];
};
