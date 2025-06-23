export interface IMessage {
  id: number;
  documentId: string;
  email: string;
  title: string;
  message: string;
  date: Date;
  prodDocId?: string;
  coachDocId?: string;
}
