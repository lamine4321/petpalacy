import type { Pet, Medication, Appointment, Product, Farm } from './types';

export const placeholderPets: Pet[] = [
  { id: '1', name: 'Buddy', breed: 'Golden Retriever', age: 5, photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'golden retriever' },
  { id: '2', name: 'Lucy', breed: 'Siamese Cat', age: 3, photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'siamese cat' },
  { id: '3', name: 'Rocky', breed: 'German Shepherd', age: 7, photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'german shepherd' },
];

export const placeholderMedications: Medication[] = [
  { id: '1', petName: 'Buddy', name: 'Heartgard Plus', dosage: '1 tablet', schedule: 'Monthly', utilization: 'Heartworm prevention', posology: 'Give one tablet monthly with food.' },
  { id: '2', petName: 'Lucy', name: 'Feline Greenies', dosage: '5 treats', schedule: 'Daily', utilization: 'Dental care', posology: 'Up to 5 treats per day.' },
  { id: '3', petName: 'Rocky', name: 'Rimadyl', dosage: '50mg', schedule: 'Twice daily', utilization: 'Pain and inflammation', posology: 'One 50mg tablet every 12 hours.' },
  { id: '4', petName: 'Buddy', name: 'NexGard', dosage: '1 chew', schedule: 'Monthly', utilization: 'Flea and tick prevention', posology: 'One chewable tablet monthly.' },
];

export const placeholderAppointments: Appointment[] = [
  { id: '1', date: '2024-08-15', time: '10:00 AM', vetName: 'Dr. Smith', type: 'In-Person', status: 'Upcoming' },
  { id: '2', date: '2024-09-01', time: '02:30 PM', vetName: 'Dr. Jones', type: 'Telehealth', status: 'Upcoming' },
  { id: '3', date: '2024-05-20', time: '11:00 AM', vetName: 'Dr. Smith', type: 'In-Person', status: 'Past' },
  { id: '4', date: '2024-04-10', time: '09:00 AM', vetName: 'Dr. Davis', type: 'In-Person', status: 'Past' },
];

export const placeholderProducts: Product[] = [
  { id: '1', name: 'Premium Dog Food', category: 'Food', price: 59.99, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'dog food' },
  { id: '2', name: 'Interactive Cat Toy', category: 'Toys', price: 19.99, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'cat toy' },
  { id: '3', name: 'Flea & Tick Prevention', category: 'Medication', price: 35.50, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'flea collar' },
  { id: '4', name: 'Cozy Pet Bed', category: 'Accessories', price: 75.00, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'pet bed' },
  { id: '5', name: 'Organic Catnip', category: 'Treats', price: 8.99, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'catnip' },
  { id: '6', name: 'Heavy-Duty Leash', category: 'Accessories', price: 24.99, imageUrl: 'https://placehold.co/300x300.png', dataAiHint: 'dog leash' },
];

export const placeholderFarms: Farm[] = [
  {
    id: '1',
    name: 'Green Meadows Farm',
    owner: 'John Doe',
    animals: [
      { id: 'a1', name: 'Bessie', species: 'Cow', photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'cow' },
      { id: 'a2', name: 'Cluck', species: 'Chicken', photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'chicken' },
    ],
  },
  {
    id: '2',
    name: 'Sunny Slope Ranch',
    owner: 'Jane Smith',
    animals: [
      { id: 'a3', name: 'Spirit', species: 'Horse', photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'horse' },
      { id: 'a4', name: 'Porky', species: 'Pig', photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'pig' },
      { id: 'a5', name: 'Woolly', species: 'Sheep', photoUrl: 'https://placehold.co/400x400.png', dataAiHint: 'sheep' },
    ],
  },
];
