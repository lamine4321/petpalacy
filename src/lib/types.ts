export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  photoUrl: string;
  dataAiHint: string;
}

export interface Medication {
  id: string;
  petName: string;
  name: string;
  dosage: string;
  schedule: string;
}

export interface Appointment {
  id:string;
  date: string;
  time: string;
  vetName: string;
  type: 'In-Person' | 'Telehealth';
  status: 'Upcoming' | 'Past';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  dataAiHint: string;
}
