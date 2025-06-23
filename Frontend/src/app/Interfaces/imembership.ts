export interface IMembership {
    id: number;
    documentId: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    discountPrecent?: number;
}
