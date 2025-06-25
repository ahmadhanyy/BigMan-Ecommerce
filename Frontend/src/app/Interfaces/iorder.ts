import { IAddress } from "./iaddress";
import { DeliveryStatus, ICartItem } from "./icart-item";

export interface IOrder {
  id: number;
  documentId: string;
  email: string;
  cart_items: ICartItem[];
  address: IAddress;
  orderDate: Date;
  deliveryDate: Date;
  orderStatus: DeliveryStatus;
  cost: number;
  paymentMethod: string;
  cardNumber?: number;
  cardHolder?: string;
  cardExpiryDate?: Date;
  cvv?: number;
}
