export interface Ticket {
  id: string;
  number: number;
  createdAt: Date;
  handleAtDestk? : string;
  handleAt?: Date;
  done: boolean;
}
