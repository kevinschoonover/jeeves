import CRAB from '../photos/crab.jpg';
import SWEETSOUR from '../photos/sweetsour.jpg';
import EGGROLL from '../photos/eggroll.jpg';
import BLACKPEPPER from '../photos/blackpepper.jpg';
import BROCCOLI from '../photos/broccoli.jpg';
import EGGTART from '../photos/eggtart.jpg';
import FORTUNE from '../photos/fortune.jpg';
import KUNGPAO from '../photos/kungpao.jpg';
import MONGOLIAN from '../photos/mongolian.jpg';
import ORANGE from '../photos/orange.jpg';
import SWEETSAUCE from '../photos/sweetsauce.jpg';
import TSO from '../photos/tso.jpg';

const menucards = [
  {
    id: 1,
    avatar: '1',
    title: 'Crab Rangoon',
    category: 'starter',
    subheader: 2.0,
    image: CRAB,
    description:
      'Crab and cream cheese wontons pinched into little purses and deep fried.',
    details: 'CAL: 150',
  },
  {
    id: 2,
    avatar: '2',
    title: 'Eggrolls',
    category: 'starter',
    subheader: 2.55,
    image: EGGROLL,
    description:
      'Savory roll with shredded cabbage, chopped pork, and other fillings inside a wheat flour skin and deep fried.',
    details: 'CAL: 150',
  },
  {
    id: 3,
    avatar: '3',
    title: 'Sweet and Sour Chicken',
    category: 'entree',
    subheader: 5.6,
    image: SWEETSOUR,
    description:
      'Sweet & Sour sauce, chicken, pineapple, onion, bell peppers, ginge',
    details: 'CAL: 300',
  },
  {
    id: 4,
    avatar: '4',
    title: 'Kung Pao Chicken',
    category: 'entree',
    subheader: 5.6,
    image: KUNGPAO,
    description:
      'Spicy Sichuan chili sauce, chicken, peanuts, green onion, red chili peppers.',
    details: 'CAL: 150',
  },
  {
    id: 5,
    avatar: '5',
    title: 'Orange Chicken',
    category: 'entree',
    subheader: 5.6,
    image: ORANGE,
    description: 'Hunan chili sauce, chicken, fresh orange slices.',
    details: 'CAL: 150',
  },
  {
    id: 6,
    avatar: '6',
    title: 'Mongolian Beef',
    category: 'entree',
    subheader: 5.95,
    image: MONGOLIAN,
    description:
      'Sweet soy glaze, flank steak, garlic and snipped green onion.',
    details: 'CAL: 150',
  },
  {
    id: 7,
    avatar: '7',
    title: 'Black Pepper Chicken',
    category: 'entree',
    subheader: 5.95,
    image: BLACKPEPPER,
    description:
      'Marinated chicken, celery and onions in a bold black pepper sauce.',
    details: 'CAL: 150',
  },
  {
    id: 8,
    avatar: '8',
    title: 'Broccoli Beef',
    category: 'entree',
    subheader: 5.95,
    image: BROCCOLI,
    description:
      'A classic favorite. Tender beef and fresh broccoli in a ginger soy sauce.',
    details: 'CAL: 150',
  },
  {
    id: 9,
    avatar: '9',
    title: 'General Tsos Chicken',
    category: 'entree',
    subheader: 5.95,
    image: TSO,
    description:
      'Fried chicken with a chile-spiked sweet and sour sause. A takeout classic.',
    details: 'CAL: 150',
  },
  {
    id: 10,
    avatar: '10',
    title: 'Fortune Cookies',
    category: 'dessert',
    subheader: 2.0,
    image: FORTUNE,
    description:
      'A cookie made from flour, sugar, vanilla, and sesame seed oil with a fortune inside.',
    details: 'CAL: 150',
  },
  {
    id: 11,
    avatar: '11',
    title: 'Egg Tarts',
    category: 'dessert',
    subheader: 2.0,
    image: EGGTART,
    description:
      'A little custard tart, served warm, with a hard and sweet crust.',
    details: 'CAL: 150',
  },
  {
    id: 99,
    avatar: '99',
    title: 'Sweet and Sour Sauce',
    category: 'addon',
    subheader: 0.25,
    image: SWEETSAUCE,
    description: 'A packet of sweet and sour sauce.',
    details: 'CAL: 150',
  },
];

export default menucards;
