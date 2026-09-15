// Image imports
import ragiPapadImg from '../assets/products/ragi_papad.jpg';
import ricePapadImg from '../assets/products/rice_papad.jpg';
import sabudanaPapadImg from '../assets/products/sabudana_papad.jpg';
import cornPapadImg from '../assets/products/corn_papad.jpg';
import appadaluImg from '../assets/products/appadalu.jpg';
import gummadikayaVadiyaluImg from '../assets/products/gummadikaya_vadiyalu.jpg';
import nuvvulaVadiyaluImg from '../assets/products/nuvvula_vadiyalu.jpg';
import challaMirapakayaImg from '../assets/products/challa_mirapakaya.jpg';

import tomatoPickleImg from '../assets/products/tomato_pickle.jpg';
import picklesImg from '../assets/products/pickles.jpg';
import tamarindPickleImg from '../assets/products/tamarind_pickle.jpg';
import lemonPickleImg from '../assets/products/lemon_pickle.jpg';

import ragiPindiImg from '../assets/products/ragi_pindi.jpg';
import pajjunnulaGadkaPindiImg from '../assets/products/pajjunnula_gadka_pindi.jpg';
import multiMilletPowderImg from '../assets/products/multi_millet_powder.jpg';
import kankulaGadkaPowderImg from '../assets/products/kankula_gadka_powder.jpg';
import karivepakuPodiImg from '../assets/products/karivepaku_podi.jpg';
import moringaPowderImg from '../assets/products/moringa_powder.jpg';
import nuvvuluImg from '../assets/products/nuvvulu.jpg';
import soapnutImg from '../assets/products/soapnut.jpg';

export const TAGLINES = [
  "సాంప్రదాయం • రుచి • అనుబంధం",
  "Pure Tradition • Pure Taste • Made with Love",
  "Handcrafted Traditional Homemade Foods & Farm Essentials"
];

export const ORDER_CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'papadalu', label: '🥣 Papadalu & Vadiyalu' },
  { id: 'pickles', label: '🌶️ Traditional Pickles' },
  { id: 'pindilu', label: '🌾 Pindilu & Powders' },
  { id: 'provisions', label: '🌱 Other Items & Provisions' }
];

export const PRODUCTS_SHOWCASE = [
  // ==========================================
  // 🥣 PAPADALU & VADIYALU (Priced per 100 gms)
  // ==========================================
  {
    id: 'ragi-papad',
    name: 'Ragi Papad',
    telugu: 'రాగి అప్పడాలు',
    category: 'papadalu',
    img: ragiPapadImg,
    leftCallout: 'Nutritious & Crisp',
    rightCallout: 'Stone-Ground Finger Millet',
    desc: 'Wholesome finger millet (Ragi) papads sun-cured naturally with cumin seeds and mild spices. Rich in dietary fiber and traditional flavor.',
    highlight: '100% Sun-Dried • Finger Millet',
    variants: [
      { size: '100 gms', price: 90 },
      { size: '250 gms', price: 225 },
      { size: '500 gms', price: 450 },
      { size: '1 kg', price: 900 }
    ]
  },
  {
    id: 'rice-papad',
    name: 'Rice Papad',
    telugu: 'బియ్యం అప్పడాలు',
    category: 'papadalu',
    img: ricePapadImg,
    leftCallout: 'Crispy & Light as Air',
    rightCallout: 'The Timeless Home Favorite',
    desc: 'Pure stone-ground rice flour appadalu flavored with crushed cumin and sea salt. Fries into a feather-light, crunchy accompaniment.',
    highlight: 'Traditional Recipe • Pure Crispness',
    variants: [
      { size: '100 gms', price: 40 },
      { size: '250 gms', price: 100 },
      { size: '500 gms', price: 200 },
      { size: '1 kg', price: 400 }
    ]
  },
  {
    id: 'sabudana-papad',
    name: 'Sabudana Papad',
    telugu: 'సగ్గుబియ్యం అప్పడాలు',
    category: 'papadalu',
    img: sabudanaPapadImg,
    leftCallout: 'Puffed & Translucent',
    rightCallout: 'Festive Pearl Crunch',
    desc: 'Handcrafted saggubiyyam (tapioca pearl) papads seasoned with cumin and gentle green chili. Puffs to a delightful melt-in-mouth crispness.',
    highlight: 'Crispy Pearls • Sun-Cured',
    variants: [
      { size: '100 gms', price: 60 },
      { size: '250 gms', price: 150 },
      { size: '500 gms', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },
  {
    id: 'corn-papad',
    name: 'Corn Papad',
    telugu: 'మొక్కజొన్న అప్పడాలు',
    category: 'papadalu',
    img: cornPapadImg,
    leftCallout: 'Golden Sweet & Savory Crunch',
    rightCallout: 'Natural Farm-Fresh Corn',
    desc: 'Golden sun-dried corn wafers with a delightful earthy aroma and a gentle kick of traditional spices.',
    highlight: 'Pure Corn Grain • Natural Sun-Drying',
    variants: [
      { size: '100 gms', price: 50 },
      { size: '250 gms', price: 125 },
      { size: '500 gms', price: 250 },
      { size: '1 kg', price: 500 }
    ]
  },
  {
    id: 'ravva-papad',
    name: 'Ravva Papad',
    telugu: 'రవ్వ అప్పడాలు',
    category: 'papadalu',
    img: appadaluImg,
    leftCallout: 'Ultra Thin & Crunchy',
    rightCallout: 'Classic Semolina Wafers',
    desc: 'Delicately rolled semolina (sooji/ravva) papads crafted with cumin and red chili specks for everyday meal crunch.',
    highlight: 'Handmade Batch • Crispy Delight',
    variants: [
      { size: '100 gms', price: 40 },
      { size: '250 gms', price: 100 },
      { size: '500 gms', price: 200 },
      { size: '1 kg', price: 400 }
    ]
  },
  {
    id: 'gummadikaya-vadiyalu',
    name: 'Gummadikaya Vadiyalu',
    telugu: 'గుమ్మడికాయ వడియాలు',
    category: 'papadalu',
    img: gummadikayaVadiyaluImg,
    leftCallout: 'Heritage Ash Gourd Vadiyalu',
    rightCallout: 'Sun-Dried with Spices & Dal',
    desc: 'Authentic Ash Gourd (Gummadikaya) dumplings prepared with urad dal, green chilies, ginger, and asafoetida. Slow sun-cured for deep traditional flavor.',
    highlight: 'Ash Gourd & Urad Dal • Sun-Dried',
    variants: [
      { size: '100 gms', price: 80 },
      { size: '250 gms', price: 200 },
      { size: '500 gms', price: 400 },
      { size: '1 kg', price: 800 }
    ]
  },
  {
    id: 'nuvvula-vadiyalu',
    name: 'Nuvvula Vadiyalu',
    telugu: 'నువ్వుల వడియాలు',
    category: 'papadalu',
    img: nuvvulaVadiyaluImg,
    leftCallout: 'Rich Nutty Sesame Crisp',
    rightCallout: 'Loaded with Desi Sesame Seeds',
    desc: 'Crispy sun-dried vadiyalu loaded with unpolished natural sesame seeds, cumin, and mild seasoning. An aromatic crunch that elevates any South Indian meal.',
    highlight: 'Desi Sesame • Aromatic & Crispy',
    variants: [
      { size: '100 gms', price: 80 },
      { size: '250 gms', price: 200 },
      { size: '500 gms', price: 400 },
      { size: '1 kg', price: 800 }
    ]
  },
  {
    id: 'challa-mirapakaya',
    name: 'Challa Mirapakaya',
    telugu: 'చల్లా మిరపకాయలు (మజ్జిగ మిరపకాయలు)',
    category: 'papadalu',
    img: challaMirapakayaImg,
    leftCallout: 'Sour, Salty & Spicy',
    rightCallout: 'Soaked in Buttermilk & Sun-Dried',
    desc: 'Green chilies slit and soaked for days in sour spiced curd (majjiga), then sun-dried until salted and crispy. The ultimate companion for curd rice and dal.',
    highlight: 'Buttermilk Soaked • Sun-Dried Crisp',
    variants: [
      { size: '100 gms', price: 60 },
      { size: '250 gms', price: 150 },
      { size: '500 gms', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },

  // ==========================================
  // 🌶️ TRADITIONAL PICKLES (₹600/kg)
  // ==========================================
  {
    id: 'tomato-pickle',
    name: 'Tomato Pickle',
    telugu: 'టమాటో నిల్వ పచ్చడి',
    category: 'pickles',
    img: tomatoPickleImg,
    leftCallout: 'Rich, Tangy & Spicy',
    rightCallout: 'Cold-Pressed Oil Tempering',
    desc: 'Ripe farm-fresh tomatoes cooked to a rich tangy relish, sun-tempered with cold-pressed sesame oil, mustard, fenugreek, and Guntur chili.',
    highlight: 'Slow-Simmered • Traditional Tempering',
    variants: [
      { size: '250g', price: 150 },
      { size: '500g', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },
  {
    id: 'mango-pickle',
    name: 'Mango Pickle (Avakaya)',
    telugu: 'మామిడికాయ ఆవకాయ పచ్చడి',
    category: 'pickles',
    img: picklesImg,
    leftCallout: 'Fiery, Tangy & Irresistible',
    rightCallout: 'The King of Andhra Pickles',
    desc: 'Classic Andhra Avakaya crafted with hand-cut raw sour mangoes, stone-ground mustard, fiery red chili, garlic, and pure cold-pressed sesame oil.',
    highlight: 'Hand-Cut Mangoes • Cold-Pressed Sesame Oil',
    variants: [
      { size: '250g', price: 150 },
      { size: '500g', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },
  {
    id: 'tamarind-pickle',
    name: 'Tamarind Pickle',
    telugu: 'చింతకాయ తొక్కు పచ్చడి',
    category: 'pickles',
    img: tamarindPickleImg,
    leftCallout: 'Intense Sour & Spicy Punch',
    rightCallout: 'Raw Tamarind & Turmeric',
    desc: 'Traditional Chintakaya Tokku prepared from fresh green tamarind pounded with turmeric, sea salt, and seasoned with fragrant mustard tempering.',
    highlight: 'Fresh Raw Tamarind • Authentic Stone Pounded',
    variants: [
      { size: '250g', price: 150 },
      { size: '500g', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },
  {
    id: 'lemon-pickle',
    name: 'Lemon Pickle',
    telugu: 'నిమ్మకాయ నిల్వ పచ్చడి',
    category: 'pickles',
    img: lemonPickleImg,
    leftCallout: 'Zesty, Aged & Digestive',
    rightCallout: 'Juicy Lemons in Spiced Oil',
    desc: 'Juicy farm lemons naturally cured in sea salt, turmeric, and aromatic roasted fenugreek-mustard powder. Perfectly balanced sourness and zest.',
    highlight: 'Naturally Cured • Zero Artificial Preservatives',
    variants: [
      { size: '250g', price: 150 },
      { size: '500g', price: 300 },
      { size: '1 kg', price: 600 }
    ]
  },

  // ==========================================
  // 🌾 PINDILU & POWDERS
  // ==========================================
  {
    id: 'ragi-pindi',
    name: 'Ragi Pindi',
    telugu: 'రాగి పిండి (Finger Millet Flour)',
    category: 'pindilu',
    img: ragiPindiImg,
    leftCallout: 'Stone-Ground Wholesome Grain',
    rightCallout: 'Rich in Calcium & Natural Iron',
    desc: 'Finely ground 100% pure Finger Millet (Ragi) flour. Ideal for soft healthy rotis, traditional Ragi Sankati, and energizing breakfast porridges.',
    highlight: '100% Pure Millet • Stone-Ground',
    variants: [
      { size: '500g', price: 130 },
      { size: '1 kg', price: 260 },
      { size: '2 kg', price: 520 }
    ]
  },
  {
    id: 'pajjunnula-gadka-pindi',
    name: 'Pajjunnula Gadka Pindi',
    telugu: 'పచ్చజొన్నల గట్క పిండి (Fresh Yellow Jowar Flour)',
    category: 'pindilu',
    img: pajjunnulaGadkaPindiImg,
    leftCallout: 'Traditional Yellow Jowar Flour',
    rightCallout: 'Perfect for Healthy Jowar Rotis',
    desc: 'Freshly milled yellow sorghum (Pacha Jonna) flour with natural dietary fiber and minerals, stone-milled for soft rotis and nutritious porridge.',
    highlight: 'Natural Sorghum • Wholesome Nutrition',
    variants: [
      { size: '500g', price: 130 },
      { size: '1 kg', price: 260 },
      { size: '2 kg', price: 520 }
    ]
  },
  {
    id: 'multi-millet-powder',
    name: 'Multi Millet Powder',
    telugu: 'మల్టీ మిల్లెట్ పిండి (Navadhanya Flour)',
    category: 'pindilu',
    img: multiMilletPowderImg,
    leftCallout: 'Power of 9 Sacred Millets',
    rightCallout: 'Wholesome Everyday Health',
    desc: 'A powerhouse blend of selected traditional millets (Ragi, Jowar, Bajra, Foxtail, Kodo & Little Millet) stone-milled together for complete daily nutrition.',
    highlight: 'Multi-Millet Blend • Nutrient Dense',
    variants: [
      { size: '500g', price: 130 },
      { size: '1 kg', price: 260 },
      { size: '2 kg', price: 520 }
    ]
  },
  {
    id: 'kankula-gadka-powder',
    name: 'Kankula Gadka Powder',
    telugu: 'కంకుల గట్క పొడి (Coarse Millet Grain Powder)',
    category: 'pindilu',
    img: kankulaGadkaPowderImg,
    leftCallout: 'Rustic Coarse Millet Blend',
    rightCallout: 'For Traditional Gadka & Porridge',
    desc: 'Coarsely crushed farm millet grain powder specifically crafted for slow-cooked traditional Telangana/Andhra Gadka and morning energy drinks.',
    highlight: 'Coarse Grain • Heritage Comfort Food',
    variants: [
      { size: '500g', price: 130 },
      { size: '1 kg', price: 260 },
      { size: '2 kg', price: 520 }
    ]
  },
  {
    id: 'karivepaku-podi',
    name: 'Karivepaku Podi',
    telugu: 'కరివేపాకు కారం పొడి (Curry Leaf Gunpowder)',
    category: 'pindilu',
    img: karivepakuPodiImg,
    leftCallout: 'Aromatic, Roasted & Spicy',
    rightCallout: 'Pure Curry Leaves & Ghee Rice Pair',
    desc: 'Fragrant roasted garden curry leaves blended with roasted lentils, garlic, cumin, and red chillies. Delicious with steaming hot rice, idlis, and dosas.',
    highlight: 'Fresh Curry Leaves • Aromatic Gunpowder',
    variants: [
      { size: '100g', price: 70 },
      { size: '250g', price: 175 },
      { size: '500g', price: 350 },
      { size: '1 kg', price: 700 }
    ]
  },
  {
    id: 'moringa-powder',
    name: 'Moringa Powder',
    telugu: 'మునగాకు పొడి (Pure Moringa Leaves Powder)',
    category: 'pindilu',
    img: moringaPowderImg,
    leftCallout: 'Immunity & Superfood Booster',
    rightCallout: '100% Shade-Dried Moringa',
    desc: 'Pure, shade-dried organic Moringa (Munagaku) leaves finely ground into a nutrient-rich superfood powder. Packed with natural antioxidants, iron, and multivitamins.',
    highlight: '100% Organic • Natural Superfood',
    variants: [
      { size: '100g', price: 200 },
      { size: '250g', price: 500 },
      { size: '500g', price: 1000 }
    ]
  },

  // ==========================================
  // 🌱 OTHER ITEMS & PROVISIONS
  // ==========================================
  {
    id: 'nuvvulu',
    name: 'Nuvvulu (Desi Sesame Seeds)',
    telugu: 'నాటు నువ్వులు (Natural Sesame Seeds)',
    category: 'provisions',
    img: nuvvuluImg,
    leftCallout: 'Unpolished & Aromatic',
    rightCallout: 'Rich in Healthy Calcium & Oils',
    desc: '100% natural, unpolished desi sesame seeds. High in natural oil content and calcium, ideal for traditional sweets, spice powders, and seasoning.',
    highlight: 'Unpolished Desi Sesame • High Oil Content',
    variants: [
      { size: '250g', price: 130 },
      { size: '500g', price: 260 },
      { size: '1 kg', price: 520 }
    ]
  },
  {
    id: 'soapnut',
    name: 'Black Soapnut (Kunkudukayalu)',
    telugu: 'నల్ల కుంకుడుకాయలు (Natural Soapnuts)',
    category: 'provisions',
    img: soapnutImg,
    leftCallout: '100% Natural Herbal Cleanser',
    rightCallout: 'Traditional Hair & Fabric Wash',
    desc: 'Wild-harvested, premium quality black soapnuts (Kunkudukayalu / Reetha). The timeless South Indian natural alternative for chemical-free hair care and gentle cleaning.',
    highlight: '100% Natural • Chemical-Free Reetha',
    variants: [
      { size: '250g', price: 100 },
      { size: '500g', price: 200 },
      { size: '1 kg', price: 400 }
    ]
  }
];
