import { IProduct } from "./iproduct";

export interface IWishlistItem {
  id: number;
  documentId: string;
  email: string;
  product: IProduct;
}
