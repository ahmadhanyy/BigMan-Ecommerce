import { ICategory } from "./icategory";

export interface IProduct {
  id: number;
  documentId: string;
  name: string;
  price: number;
  description: string;
  images: IImage[];
  returnable: boolean;
  freeShipping: boolean;
  shippingPrice: number;
  discountPrecent?: number;
  material?: string;
  productionCountry: string;
  Fit?: string;
  brand: string;
  categories: ICategory[];
  prod_variants: IProdVariant[];
}

export interface IProdVariant {
  id: number;
  documentId: string;
  color?: string;
  size?: string;
  quantity: number;
}

export interface IImage {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: IImageFormat;
  };
}

export interface IImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  url: string;
}
