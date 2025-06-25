export interface IVoucher {
  id: number;
  documentId: string;
  email: string;
  voucherCode: string;
  value: number;
  isExpired: boolean;
  expiryDate: Date;
  isUsed: boolean;
  usageDate?: Date;
}
