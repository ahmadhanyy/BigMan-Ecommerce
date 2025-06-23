import { IProduct } from "./iproduct";

export interface ICartItem {
  id: number;
  documentId: string;
  email: string;
  product: IProduct
  prodCount: number;
  color?: string;
  size?: string;
  deliveryDate: Date;
  deliveryStatus: DeliveryStatus;
  cost: number;
}

export enum DeliveryStatus {
  pending = 'pending',
  shipped = 'shipped',
  delivered = 'delivered'
}
