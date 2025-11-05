export interface Boat {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  capacity: number;
  engine: string;
  images: string[];
  pricePerDay: number;
  priceNotes?: string;
  // Technical specifications
  manufacturer?: string;
  model?: string;
  yearBuilt?: string;
  yearRefurbished?: string;
  boatType?: string;
  length?: string;
  sleepGuests?: number;
  cruiseGuests?: number;
  bathrooms?: number;
  kitchens?: number;
  cabins?: number;
  fuelType?: string;
  fuelConsumption?: string;
  waterCapacity?: string;
  fuelCapacity?: string;
  maxSpeed?: string;
  // Rules and regulations
  smokingDeck?: boolean;
  smokingInside?: boolean;
  petsAllowed?: boolean;
  infantsAllowed?: boolean;
  childrenAllowed?: boolean;
  partiesAllowed?: boolean;
  flexibleArrival?: boolean;
  flexibleDeparture?: boolean;
}

export const boats: Boat[] = [
  {
    id: '01',
    slug: 'lobster-23-rent-rib-athens',
    name: 'Lobster 23',
    shortDescription:
      'Άνετο και γρήγορο σκάφος – ιδανικό για ημερήσιες εκδρομές και κρουαζιέρα.',
    longDescription:
      'Το Lobster 23 προσφέρει άνεση για έως 9 επιβάτες, με ισχυρό κινητήρα 150 ίππων και χώρο για ηλιοθεραπεία. Ιδανικό για κλασικές αποδράσεις προς Σαρωνικό.',
    capacity: 9,
    engine: '150 HP',
    pricePerDay: 400,
    images: [
      '/images/boats/01-1.jpg',
      '/images/boats/01-2.jpg',
      '/images/boats/01-3.jpg',
      '/images/boats/01-4.jpg',
      '/images/boats/01-5.jpg',
      '/images/boats/01-6.jpg',
      '/images/boats/01-7.jpg',
      '/images/boats/01-8.jpg',
      '/images/boats/01-9.jpg',
      '/images/boats/01-10.jpg',
    ],
    // Technical specifications
    manufacturer: 'Lobster',
    model: 'Rib 23ft',
    yearBuilt: '02 / 2022',
    boatType: 'Rigid Inflatable',
    length: '23 πόδια (7 μ.)',
    sleepGuests: 0,
    cruiseGuests: 9,
    bathrooms: 1,
    kitchens: 0,
    cabins: 0,
    fuelType: 'Βενζίνη',
    waterCapacity: '150 λίτρα',
    fuelCapacity: '200 λίτρα',
    maxSpeed: '36 κόμβοι',
    // Rules and regulations
    smokingDeck: true,
    smokingInside: false,
    petsAllowed: true,
    infantsAllowed: false,
    childrenAllowed: true,
    partiesAllowed: true,
    flexibleArrival: true,
    flexibleDeparture: true,
  },
  {
    id: '02',
    slug: 'ribco-27-rent-rib-athens',
    name: 'Ribco 27',
    shortDescription:
      'Ισχυρό και γρήγορο σκάφος — ιδανικό για μεγάλες παρέες και μακρινές εκδρομές.',
    longDescription:
      'Το Ribco 27 είναι ένα εντυπωσιακό σκάφος με κινητήρα 250 ίππων και χωρητικότητα 8 ατόμων. Ιδανικό για εξαιρετικές εκδρομές και γρήγορες μετακινήσεις.',
    capacity: 8,
    engine: '250 HP',
    pricePerDay: 500,
    images: [
      '/images/boats/02-8.jpg',
      '/images/boats/02-1.jpg',
      '/images/boats/02-2.jpg',
      '/images/boats/02-3.jpg',
      '/images/boats/02-4.jpg',
      '/images/boats/02-5.jpg',
      '/images/boats/02-6.jpg',
      '/images/boats/02-7.jpg',
      '/images/boats/02-9.jpg',
      '/images/boats/02-10.jpg',
      '/images/boats/02-11.jpg',
      '/images/boats/02-12.jpg',
    ],
    // Technical specifications
    manufacturer: 'Ribco',
    model: 'Scorpion 8,2',
    yearBuilt: '06 / 2012',
    yearRefurbished: '09 / 2022',
    boatType: 'Μηχανοκίνητο',
    length: '27 πόδια (8,2 μ.)',
    sleepGuests: 0,
    cruiseGuests: 8,
    bathrooms: 0,
    kitchens: 0,
    cabins: 0,
    fuelType: 'Βενζίνη',
    fuelConsumption: '45 λίτρα /ώρα',
    waterCapacity: '150 λίτρα',
    fuelCapacity: '400 λίτρα',
    maxSpeed: '45 κόμβοι',
    // Rules and regulations
    smokingDeck: true,
    smokingInside: false,
    petsAllowed: true,
    infantsAllowed: false,
    childrenAllowed: true,
    partiesAllowed: true,
    flexibleArrival: true,
    flexibleDeparture: true,
  },
  {
    id: '03',
    slug: 'olympic-490-rent-rib-athens',
    name: 'Olympic 490',
    shortDescription:
      'Συμπαγές μηχανοκίνητο σκάφος — ιδανικό για ημερήσιες εκδρομές και γρήγορη πλεύση.',
    longDescription:
      'Το Olympic 490 είναι ένα άνετο και αξιόπιστο σκάφος με κινητήρα 34 ίππων. Ιδανικό για εκδρομές μέχρι 5 ατόμων, με άνετη πλεύση και οικονομική κατανάλωση καυσίμου.',
    capacity: 5,
    engine: '34 HP',
    pricePerDay: 180,
    images: [
      '/images/boats/03-4.png',
      '/images/boats/03-1.jpg',
      '/images/boats/03-2.jpg',
      '/images/boats/03-3.jpg',
      '/images/boats/03-5.png',
      '/images/boats/03-6.png',
      '/images/boats/03-7.png',
    ],
    // Technical specifications
    manufacturer: 'Olympic',
    model: '490cc',
    yearBuilt: '04 / 2023',
    boatType: 'Μηχανοκίνητο',
    length: '16 πόδια (5 μ.)',
    sleepGuests: 0,
    cruiseGuests: 5,
    bathrooms: 0,
    kitchens: 0,
    cabins: 0,
    fuelType: 'Βενζίνη',
    fuelConsumption: '10 λίτρα /ώρα',
    fuelCapacity: '25 λίτρα',
    maxSpeed: '21 κόμβοι',
    // Rules and regulations
    smokingDeck: true,
    smokingInside: false,
    petsAllowed: true,
    infantsAllowed: false,
    childrenAllowed: true,
    partiesAllowed: true,
    flexibleArrival: true,
    flexibleDeparture: true,
  },
];
