export interface IReview {
  id: number;
  documentId: string;
  email: string;
  coachDocId?: string;
  prodDocId?: string;
  review?: string;
  date: Date;
  rating: number
}
