export interface IProduct {
  id: number;
  documentId: string;
  name: string;
  catDocId: string;
  catId: number;
  price: number;
  quantity: number;
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
  prod_colors: IProdColor[];
  prod_sizes: IProdSize[];
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

export interface IProdColor {
  id: number;
  color: string;
}

export interface IProdSize {
  id: number;
  size: string;
}
