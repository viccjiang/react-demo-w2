export type Product = {
  id: string | number;
  title: string;
  origin_price: number;
  price: number;
  unit: string;
  is_enabled: boolean | number;
  category: string;
  description: string;
  content: string;
  imageUrl?: string;
  imagesUrl?: string[];
};

export type Pagination = {
  total_pages: number;
  current_page: number;
  has_pre: boolean;
  has_next: boolean;
  category: string;
};
