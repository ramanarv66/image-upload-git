export interface CandidateInterface {
  username:string;
  firstname: string;
  lastname:string;
  email:string;
  gender:string;
  phone: number;
  city: string;
  score: number;
}

export class DisplayScores{
  username: string;
  score: number;
  status: string;
}
