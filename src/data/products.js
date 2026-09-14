import appadaluImg from '../assets/products/appadalu.jpg';
import chekkaluImg from '../assets/products/chekkalu.jpg';
import murukuluImg from '../assets/products/murukulu.jpg';
import boondiImg from '../assets/products/boondi.jpg';
import karapusaImg from '../assets/products/karapusa.jpg';
import mixtureImg from '../assets/products/mixture.jpg';
import ladduImg from '../assets/products/laddu.jpg';
import payasamImg from '../assets/products/payasam.jpg';
import picklesImg from '../assets/products/pickles.jpg';

export const TAGLINES = [
  "సాంప్రదాయం • రుచి • అనుబంధం",
  "Pure Tradition • Pure Taste • Made with Love",
  "Handcrafted Traditional Homemade Foods"
];

export const ORDER_CATEGORIES = [
  { id: 'all', label: 'All Delicacies' },
  { id: 'savories', label: 'Crisp Savories (పిండి వంటలు)' },
  { id: 'sweets', label: 'Pure Ghee Sweets (మిఠాయిలు)' },
  { id: 'pickles', label: 'Traditional Pickles (పచ్చళ్ళు)' }
];

export const PRODUCTS_SHOWCASE = [
  {
    id: 'appadalu',
    name: 'Sun-Dried Appadalu',
    telugu: 'సాంప్రదాయ అప్పడాలు',
    category: 'savories',
    img: appadaluImg,
    leftCallout: 'Sun-Dried, Light & Crisp',
    rightCallout: 'A Soulful Crunch to Every Meal',
    desc: 'Handcrafted from stone-ground lentils and sun-cured naturally under open skies. Light, crispy, and pure — delivering the authentic comforting crunch of traditional South Indian homes.',
    highlight: '100% Sun-Dried • Zero Preservatives',
    variants: [
      { size: '250g', price: 120 },
      { size: '500g', price: 230 },
      { size: '1 kg', price: 440 }
    ]
  },
  {
    id: 'chekkalu',
    name: 'Crispy Andhra Chekkalu',
    telugu: 'కరకరలాడే పప్పు చెక్కలు',
    category: 'savories',
    img: chekkaluImg,
    leftCallout: 'Crunchy, Spiced Rice Flour',
    rightCallout: 'The Timeless Tea-Time Classic',
    desc: 'Crisp golden rice crackers lovingly enriched with soaked chana dal, roasted sesame seeds, cumin, and fresh garden curry leaves. Fried in small artisanal batches for an unbeatable crunch.',
    highlight: 'Artisanal Batch • Pure Wood-Pressed Oil',
    variants: [
      { size: '250g', price: 140 },
      { size: '500g', price: 270 },
      { size: '1 kg', price: 520 }
    ]
  },
  {
    id: 'murukulu',
    name: 'Artisanal Golden Murukulu',
    telugu: 'ఘుమఘుమలాడే మురుకులు',
    category: 'savories',
    img: murukuluImg,
    leftCallout: 'Golden Coils of Pure Joy',
    rightCallout: 'Wood-Pressed Oil, Pure Taste',
    desc: 'Delicately spiced spiral chaklis crafted with premium rice flour, roasted gram, and aromatic carom seeds (ajwain). Hand-pressed and fried in pure wood-pressed oil for that authentic festive crunch.',
    highlight: 'Traditional Spices • Handcrafted Daily',
    variants: [
      { size: '250g', price: 140 },
      { size: '500g', price: 270 },
      { size: '1 kg', price: 520 }
    ]
  },
  {
    id: 'boondi',
    name: 'Spicy Masala Kara Boondi',
    telugu: 'స్పైసీ కారప్పూస బూందీ',
    category: 'savories',
    img: boondiImg,
    leftCallout: 'Crispy, Golden Spiced Pearls',
    rightCallout: 'Roasted Peanuts & Curry Leaves',
    desc: 'Golden gram flour droplets fried to crisp lightness, tossed generously with slow-roasted crunchy peanuts, cashews, and crispy fried curry leaves in our signature spicy blend.',
    highlight: 'Crunchy Peanuts • Signature Spice Blend',
    variants: [
      { size: '250g', price: 130 },
      { size: '500g', price: 250 },
      { size: '1 kg', price: 480 }
    ]
  },
  {
    id: 'karapusa',
    name: 'Crispy Andhra Karapusa',
    telugu: 'సాంప్రదాయ కారప్పూస',
    category: 'savories',
    img: karapusaImg,
    leftCallout: 'Ribbon-Thin, Irresistibly Spiced',
    rightCallout: 'The Signature Festival Savory',
    desc: 'Melt-in-crunch ribbon sev infused with carom seeds (vaamu), cumin, and gentle red chili. Prepared using pure wood-pressed groundnut oil following our cherished family recipe.',
    highlight: 'Light & Crisp • Pure Groundnut Oil',
    variants: [
      { size: '250g', price: 130 },
      { size: '500g', price: 250 },
      { size: '1 kg', price: 480 }
    ]
  },
  {
    id: 'mixture',
    name: 'Royal South Indian Mixture',
    telugu: 'రాయల్ స్పెషల్ మిక్చర్',
    category: 'savories',
    img: mixtureImg,
    leftCallout: 'A Symphony of Flavors',
    rightCallout: 'Loaded with Roasted Cashews',
    desc: 'A royal festive medley of crunchy sev, spicy boondi, crisp lentils, roasted peanuts, and golden fried whole cashews tossed in fragrant roasted curry leaves and spices.',
    highlight: 'Premium Cashews • Rich Festive Blend',
    variants: [
      { size: '250g', price: 150 },
      { size: '500g', price: 290 },
      { size: '1 kg', price: 560 }
    ]
  },
  {
    id: 'laddu',
    name: 'Pure Desi Cow Ghee Laddus',
    telugu: 'స్వచ్ఛమైన నెయ్యి లడ్డూలు',
    category: 'sweets',
    img: ladduImg,
    leftCallout: 'Melt-in-Mouth Ghee Bliss',
    rightCallout: 'Infused with Saffron & Cashews',
    desc: 'Decadent sweet boondi laddus lovingly made with 100% pure desi cow ghee, fragrant green cardamom, saffron strands, and roasted crunchy cashews. Melt-in-mouth divine goodness.',
    highlight: '100% Pure Desi Cow Ghee • Saffron Infused',
    variants: [
      { size: '250g', price: 180 },
      { size: '500g', price: 350 },
      { size: '1 kg', price: 680 }
    ]
  },
  {
    id: 'payasam',
    name: 'Traditional Festive Payasam',
    telugu: 'సాంప్రదాయ పాయసం / ఖీర్',
    category: 'sweets',
    img: payasamImg,
    leftCallout: 'Rich, Creamy & Celebratory',
    rightCallout: 'Simmered in Milk & Pure Ghee',
    desc: 'A divine traditional sweet pudding simmered slowly in rich dairy milk and pure desi ghee, sweetened to perfection and crowned with golden roasted cashews and plump raisins.',
    highlight: 'Slow-Simmered • Rich Roasted Dry Fruits',
    variants: [
      { size: '500 ml', price: 220 },
      { size: '1 Litre', price: 420 }
    ]
  },
  {
    id: 'pickles',
    name: 'Authentic Andhra Avakaya',
    telugu: 'ఘాటైన ఆవకాయ నిల్వ పచ్చడి',
    category: 'pickles',
    img: picklesImg,
    leftCallout: 'Sun-Cured, Fiery & Tangy',
    rightCallout: 'Cold-Pressed Sesame Oil & Spices',
    desc: 'The undisputed king of South Indian pickles — handcrafted with raw sour mangoes, stone-ground Guntur chili, mustard powder, garlic cloves, and pure cold-pressed sesame oil.',
    highlight: 'Hand-Cut Mangoes • Cold-Pressed Sesame Oil',
    variants: [
      { size: '250g', price: 160 },
      { size: '500g', price: 300 },
      { size: '1 kg', price: 580 }
    ]
  }
];
