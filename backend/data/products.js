const createProduct = (
  name,
  sku,
  category,
  brand,
  sizes,
  colors,
  collections,
  material,
  gender,
  images
) => ({
  name,
  description: `Premium ${name.toLowerCase()} designed for comfort and style.`,
  price: Math.floor(Math.random() * 80) + 20,
  discountedPrice: Math.floor(Math.random() * 60) + 15,
  countInStock: Math.floor(Math.random() * 100) + 20,
  sku,
  category,
  brand,
  sizes,
  colors,
  collections,
  material,
  gender,
  images: images.map((img) => ({ url: img, altText: name })), // 🔥 MULTIPLE IMAGES
  isFeatured: Math.random() > 0.7,
  isPublished: true,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  numReviews: Math.floor(Math.random() * 500),
  tags: [category.toLowerCase(), gender.toLowerCase()],
});

// 🔥 IMAGE VARIETY ARRAYS
const img = {
  tshirt: [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1",
    "https://images.unsplash.com/photo-1583743814966-8936f37f4678",
  ],
  shirt: [
    "https://images.unsplash.com/photo-1603252109303-2751441dd157",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
  ],
  jeans: [
    "https://images.unsplash.com/photo-1542272604-787c3835538c",
    "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec",
  ],
  joggers: [
    "https://images.unsplash.com/photo-1552902865-b72c031ac5ea",
    "https://images.unsplash.com/photo-1593032465171-8f0a2f1e6e4a",
  ],
  dress: [
    "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03",
  ],
  top: [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    "https://images.unsplash.com/photo-1495121605193-b116b5b09a0e",
  ],
  hoodie: [
    "https://images.unsplash.com/photo-1556821840-3a9fbc0b6e4c",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  ],
  sweater: [
    "https://images.unsplash.com/photo-1516822003754-cca485356ecb",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  ],
  chinos: [
    "https://images.unsplash.com/photo-1584865288642-42078afe6942",
    "https://images.unsplash.com/photo-1593032465171-8f0a2f1e6e4a",
  ],
  shorts: [
    "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
    "https://images.unsplash.com/photo-1562183241-b937e95585b6",
  ],
};

// 🔥 RANDOM IMAGE PICKER
const getRandomImages = (arr) => {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 2); // 2 images per product
};

const products = [];
let id = 1;

// ================= MEN TOP WEAR =================
for (let i = 1; i <= 20; i++) {
  const type = i % 2 === 0 ? "T-Shirt" : "Shirt";
  const images = type === "T-Shirt"
    ? getRandomImages(img.tshirt)
    : getRandomImages(img.shirt);

  products.push(
    createProduct(
      `Nike Men's ${type} ${i}`,
      `MEN-TOP-${id++}`,
      "Top Wear",
      "Nike",
      ["S", "M", "L", "XL"],
      ["Black", "White"],
      "Casual",
      "Cotton",
      "Men",
      images
    )
  );
}

// ================= MEN BOTTOM WEAR =================
for (let i = 1; i <= 20; i++) {
  const type = i % 2 === 0 ? "Jeans" : "Joggers";
  const images = type === "Jeans"
    ? getRandomImages(img.jeans)
    : getRandomImages(img.joggers);

  products.push(
    createProduct(
      `Levi's Men's ${type} ${i}`,
      `MEN-BOTTOM-${id++}`,
      "Bottom Wear",
      "Levi's",
      ["30", "32", "34"],
      ["Blue", "Black"],
      "Casual",
      "Denim",
      "Men",
      images
    )
  );
}

// ================= WOMEN TOP WEAR =================
for (let i = 1; i <= 20; i++) {
  const type = i % 2 === 0 ? "Dress" : "Top";
  const images = type === "Dress"
    ? getRandomImages(img.dress)
    : getRandomImages(img.top);

  products.push(
    createProduct(
      `Zara Women's ${type} ${i}`,
      `WOMEN-TOP-${id++}`,
      "Top Wear",
      "Zara",
      ["S", "M", "L"],
      ["Red", "Pink"],
      "Casual",
      "Polyester",
      "Women",
      images
    )
  );
}

// ================= WOMEN BOTTOM WEAR =================
for (let i = 1; i <= 20; i++) {
  const type = i % 2 === 0 ? "Jeans" : "Joggers";
  const images = type === "Jeans"
    ? getRandomImages(img.jeans)
    : getRandomImages(img.joggers);

  products.push(
    createProduct(
      `H&M Women's ${type} ${i}`,
      `WOMEN-BOTTOM-${id++}`,
      "Bottom Wear",
      "H&M",
      ["26", "28", "30"],
      ["Blue", "Black"],
      "Casual",
      "Denim",
      "Women",
      images
    )
  );
}

// ================= EXTRA VARIETY =================

const extraBrands = [
  "Urban Threads",
  "Modern Fit",
  "Street Style",
  "Beach Breeze",
  "Fashionista",
  "ChicStyle",
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const materials = ["Cotton", "Wool", "Polyester", "Fleece"];

// MEN HOODIES
for (let i = 1; i <= 20; i++) {
  products.push(
    createProduct(
      `${extraBrands[i % 6]} Men's Hoodie ${i}`,
      `EXTRA-HOODIE-${id++}`,
      "Top Wear",
      extraBrands[i % 6],
      sizeOptions,
      ["Black", "Grey"],
      "Winter",
      materials[i % materials.length],
      "Men",
      getRandomImages(img.hoodie)
    )
  );
}

// WOMEN SWEATERS
for (let i = 1; i <= 20; i++) {
  products.push(
    createProduct(
      `${extraBrands[i % 6]} Women's Sweater ${i}`,
      `EXTRA-SWEATER-${id++}`,
      "Top Wear",
      extraBrands[i % 6],
      sizeOptions,
      ["Pink", "Beige"],
      "Winter",
      materials[i % materials.length],
      "Women",
      getRandomImages(img.sweater)
    )
  );
}
// ================= ADDITIONAL 100 PRODUCTS =================

const moreBrands = [
  "Urban Threads",
  "Modern Fit",
  "Street Style",
  "Beach Breeze",
  "Fashionista",
  "ChicStyle",
];

const moreMaterials = [
  "Cotton",
  "Wool",
  "Denim",
  "Polyester",
  "Silk",
  "Linen",
  "Viscose",
  "Fleece",
];

const moreColors = [
  "Red",
  "Blue",
  "Black",
  "Green",
  "Yellow",
  "Grey",
  "White",
  "Pink",
  "Beige",
  "Navy",
];

const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];

// 🔥 TYPES
const topTypes = ["T-Shirt", "Shirt", "Hoodie", "Sweater"];
const bottomTypes = ["Jeans", "Joggers", "Chinos", "Shorts"];

// ================= MEN TOP WEAR =================
for (let i = 1; i <= 25; i++) {
  const type = topTypes[i % topTypes.length];
  const brand = moreBrands[i % moreBrands.length];
  const material = moreMaterials[i % moreMaterials.length];
  const color = moreColors[i % moreColors.length];

  const imageType =
    type === "Hoodie"
      ? img.hoodie
      : type === "Sweater"
      ? img.sweater
      : type === "Shirt"
      ? img.shirt
      : img.tshirt;

  products.push(
    createProduct(
      `${brand} Men's ${type} ${i}`,
      `MORE-MEN-TOP-${id++}`,
      "Top Wear",
      brand,
      allSizes,
      [color],
      "Casual",
      material,
      "Men",
      getRandomImages(imageType)
    )
  );
}

// ================= MEN BOTTOM WEAR =================
for (let i = 1; i <= 25; i++) {
  const type = bottomTypes[i % bottomTypes.length];
  const brand = moreBrands[i % moreBrands.length];
  const material = moreMaterials[i % moreMaterials.length];
  const color = moreColors[(i + 2) % moreColors.length];

  const imageType =
    type === "Jeans"
      ? img.jeans
      : type === "Joggers"
      ? img.joggers
      : type === "Chinos"
      ? img.chinos
      : img.shorts;

  products.push(
    createProduct(
      `${brand} Men's ${type} ${i}`,
      `MORE-MEN-BOTTOM-${id++}`,
      "Bottom Wear",
      brand,
      ["30", "32", "34", "36"],
      [color],
      "Casual",
      material,
      "Men",
      getRandomImages(imageType)
    )
  );
}

// ================= WOMEN TOP WEAR =================
for (let i = 1; i <= 25; i++) {
  const type = i % 2 === 0 ? "Top" : "Sweater";
  const brand = moreBrands[i % moreBrands.length];
  const material = moreMaterials[i % moreMaterials.length];
  const color = moreColors[(i + 3) % moreColors.length];

  const imageType = type === "Sweater" ? img.sweater : img.top;

  products.push(
    createProduct(
      `${brand} Women's ${type} ${i}`,
      `MORE-WOMEN-TOP-${id++}`,
      "Top Wear",
      brand,
      allSizes,
      [color],
      "Casual",
      material,
      "Women",
      getRandomImages(imageType)
    )
  );
}

// ================= WOMEN BOTTOM WEAR =================
for (let i = 1; i <= 25; i++) {
  const type = bottomTypes[i % bottomTypes.length];
  const brand = moreBrands[i % moreBrands.length];
  const material = moreMaterials[i % moreMaterials.length];
  const color = moreColors[(i + 5) % moreColors.length];

  const imageType =
    type === "Jeans"
      ? img.jeans
      : type === "Joggers"
      ? img.joggers
      : type === "Chinos"
      ? img.chinos
      : img.shorts;

  products.push(
    createProduct(
      `${brand} Women's ${type} ${i}`,
      `MORE-WOMEN-BOTTOM-${id++}`,
      "Bottom Wear",
      brand,
      ["26", "28", "30", "32"],
      [color],
      "Casual",
      material,
      "Women",
      getRandomImages(imageType)
    )
  );
}

module.exports = products;