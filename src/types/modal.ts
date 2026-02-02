export type ModalType = "create" | "edit" | "delete";

export type TemplateData = {
  id: string | number;
  title: string;
  category: string;
  origin_price: string | number;
  price: string | number;
  unit: string;
  description: string;
  content: string;
  is_enabled: boolean;
  imageUrl: string;
  imagesUrl: string[];
};

export const INITIAL_TEMPLATE_DATA: TemplateData = {
  id: "",
  title: "",
  category: "",
  origin_price: "",
  price: "",
  unit: "",
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
};

export interface ProductModalHandle {
  openModal: (type: ModalType, data?: TemplateData) => void;
  closeModal: () => void;
}
