const brands = {
  men: [
    "Nike",
    "Adidas",
    "Puma",
    "Levi's",
    "Allen Solly",
    "Van Heusen",
    "Zara",
  ],
  women: ["Zara", "H&M", "ONLY", "Biba", "Forever 21", "AND"],
  unisex: ["Nike", "Adidas", "Puma", "Fastrack", "Skybags"],
};

const categories = [
  "Top Wear",
  "Bottom Wear",
  "Footwear",
  "Accessories",
  "Ethnic Wear",
];

const topWear = ["T-Shirt", "Shirt", "Hoodie", "Sweater", "Jacket"];

const bottomWear = ["Jeans", "Joggers", "Shorts", "Chinos"];

const footwear = ["Running Shoes", "Sneakers", "Sandals", "Flip Flops"];

const accessories = ["Watch", "Backpack", "Sunglasses", "Belt"];

const ethnic = ["Kurta Set", "Saree", "Anarkali Dress"];

const colors = ["Black", "White", "Blue", "Red", "Grey", "Beige"];
const sizesClothes = ["S", "M", "L", "XL", "XXL"];
const sizesFootwear = ["6", "7", "8", "9", "10"];

const imageMap = {
  "T-Shirt": "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  Shirt: "https://images.unsplash.com/photo-1603252109303-2751441dd157",
  Hoodie: "https://images.unsplash.com/photo-1556821840-3a9fbc0b6e4c",
  Sweater: "https://images.unsplash.com/photo-1516822003754-cca485356ecb",
  Jacket: "https://images.unsplash.com/photo-1542060748-10c28b62716f",

  Jeans: "https://images.unsplash.com/photo-1542272604-787c3835538c",
  Joggers: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea",
  Shorts: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7",
  Chinos: "https://images.unsplash.com/photo-1516822003754-cca485356ecb",

  "Running Shoes":
    "https://images.unsplash.com/photo-1528701800489-20be3cbe4b52",
  Sneakers: "https://images.unsplash.com/photo-1528701800489-20be3cbe4b52",
  Sandals: "https://images.unsplash.com/photo-1528702748617-c64d49f918af",
  "Flip Flops": "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",

  Watch: "https://images.unsplash.com/photo-1519744346363-d0caa7c44d60",
  Backpack: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
  Sunglasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  Belt: "https://images.unsplash.com/photo-1585386959984-a4155224a1c1",

  "Kurta Set": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  Saree: "https://images.unsplash.com/photo-1610030469668-8e66c7d56a4d",
  "Anarkali Dress":
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
};

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateName = (brand, type, gender) => {
  return `${brand} ${gender === "Men" ? "Men's" : gender === "Women" ? "Women's" : ""} ${type}`;
};

const generateProducts = (count = 300) => {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const gender = getRandom(["Men", "Women", "Unisex"]);
    const category = getRandom(categories);

    let type;

    if (category === "Top Wear") type = getRandom(topWear);
    else if (category === "Bottom Wear") type = getRandom(bottomWear);
    else if (category === "Footwear") type = getRandom(footwear);
    else if (category === "Accessories") type = getRandom(accessories);
    else type = getRandom(ethnic);

    const brandList =
      gender === "Men"
        ? brands.men
        : gender === "Women"
          ? brands.women
          : brands.unisex;

    const brand = getRandom(brandList);

    const price = Math.floor(Math.random() * 200) + 20;
    const discount = Math.floor(Math.random() * 30) + 10;

    const product = {
      name: generateName(brand, type, gender),
      description: `Premium ${type.toLowerCase()} designed for comfort, durability, and modern style.`,
      price,
      discountPrice: price - discount,
      countInStock: Math.floor(Math.random() * 100) + 10,
      sku: `SKU-${i}`,
      category,
      brand,
      sizes: category === "Footwear" ? sizesFootwear : sizesClothes,
      colors: [getRandom(colors)],
      collections: getRandom([
        "Casual",
        "Formal",
        "Sports",
        "Winter",
        "Festive",
      ]),
      material: getRandom(["Cotton", "Polyester", "Denim", "Leather", "Silk"]),
      gender,
      images: [
        {
          url:
            imageMap[type] ||
            "https://images.unsplash.com/photo-1520975916090-3105956dac38",
          altText: type,
        },
      ],
      rating: Number((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      numReviews: Math.floor(Math.random() * 1000),
      isFeatured: Math.random() > 0.7,
      tags: ["trending", "sale"],
    };

    products.push(product);
  }

  return products;
};

const products = generateProducts(300);

module.exports = products;
