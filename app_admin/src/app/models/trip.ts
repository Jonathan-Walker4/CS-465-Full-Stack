export interface Trip {
    code: string;
    name: string;
    length: number;
    start: Date;
    resort: string;
    perPerson: string | number; // Make sure this type is correct
    image: string;
    description: string;
  }
  