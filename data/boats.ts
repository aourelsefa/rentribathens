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
}

export const boats: Boat[] = [
  {
    id: '01',
    slug: '01',
    name: 'Σκάφος 01',
    shortDescription: 'Άνετο και γρήγορο σκάφος – ιδανικό για ημερήσιες εκδρομές και κρουαζιέρα.',
    longDescription: 'Το Σκάφος 01 προσφέρει άνεση για έως 8 επιβάτες, με ισχυρό κινητήρα και χώρο για ηλιοθεραπεία. Ιδανικό για κλασικές αποδράσεις προς Σαρωνικό.',
    capacity: 8,
    engine: '200 HP',
    pricePerDay: 250,
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
      '/images/boats/01-10.jpg'
    ]
  },
  {
    id: '02',
    slug: '02',
    name: 'Σκάφος 02',
    shortDescription: 'Στυλάτο σκάφος για μικρές παρέες — άνετη καμπίνα και οικονομική κατανάλωση.',
    longDescription: 'Το Σκάφος 02 είναι συμπαγές και σταθερό σκάφος, κατάλληλο για 6 επιβάτες. Ιδανικό για οικογένειες και κοντινές κρουαζιέρες.',
    capacity: 6,
    engine: '150 HP',
    pricePerDay: 200,
    images: [
      '/images/boats/02-1.jpg',
      '/images/boats/02-2.jpg',
      '/images/boats/02-3.jpg',
      '/images/boats/02-4.jpg',
      '/images/boats/02-5.jpg',
      '/images/boats/02-6.jpg',
      '/images/boats/02-7.jpg',
      '/images/boats/02-8.jpg',
      '/images/boats/02-9.jpg',
      '/images/boats/02-10.jpg',
      '/images/boats/02-11.jpg',
      '/images/boats/02-12.jpg'
    ]
  },
  {
    id: '03',
    slug: '03',
    name: 'Σκάφος 03',
    shortDescription: 'Κλασικό ταχύπλοο με μεγάλη χωρητικότητα — για εξατομικευμένες εκδρομές και μεταφορές.',
    longDescription: 'Το Σκάφος 03 φιλοξενεί έως 10 επιβάτες, προσφέρει γρήγορη μετάβαση σε κοντινά νησιά και άνεση κατά την πλεύση.',
    capacity: 10,
    engine: '300 HP',
    pricePerDay: 300,
    images: [
      '/images/boats/03-1.jpg',
      '/images/boats/03-2.jpg'
    ]
  }
];
