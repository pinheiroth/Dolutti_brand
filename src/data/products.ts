import { Product, Category } from "@/types/product";

export const categories: Category[] = [
  { id: "1", name: "Bolsas de Mão", slug: "bolsas-de-mao" },
  { id: "2", name: "Tiracolo", slug: "tiracolo" },
  { id: "3", name: "Mochilas", slug: "mochilas" },
  { id: "4", name: "Carteiras", slug: "carteiras" },
  { id: "5", name: "Novidades", slug: "novidades" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Bolsa Tote Milano",
    description: "Bolsa tote em couro legítimo curtido ao vegetal. Espaçosa, com forro interno em algodão e bolso para notebook. Acabamento artesanal feito à mão.",
    price: 1290.00,
    originalPrice: 1490.00,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
    ],
    category: "bolsas-de-mao",
    tags: ["couro", "tote", "artesanal"],
    inStock: true,
    featured: true,
    colors: [
      { name: "Caramelo", hex: "#8B5A2B" },
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Conhaque", hex: "#6E3B1F" }
    ]
  },
  {
    id: "2",
    name: "Bolsa Tiracolo Verona",
    description: "Bolsa tiracolo compacta em couro liso. Alça regulável e fechamento magnético. Ideal para o dia a dia com elegância discreta.",
    price: 890.00,
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80"
    ],
    category: "tiracolo",
    tags: ["couro", "tiracolo", "compacta"],
    inStock: true,
    featured: true,
    colors: [
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Caramelo", hex: "#8B5A2B" }
    ]
  },
  {
    id: "3",
    name: "Bolsa Hobo Toscana",
    description: "Bolsa hobo em couro natural macio. Design fluido com alça de ombro reforçada. Capacidade generosa e bolsos internos organizadores.",
    price: 1150.00,
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    ],
    category: "bolsas-de-mao",
    tags: ["couro", "hobo", "natural"],
    inStock: true,
    featured: true,
    colors: [
      { name: "Caramelo", hex: "#8B5A2B" },
      { name: "Bordô", hex: "#5C1A1B" }
    ]
  },
  {
    id: "4",
    name: "Mochila Firenze",
    description: "Mochila em couro legítimo com compartimento acolchoado para notebook 14''. Alças ergonômicas e fechamento por zíper YKK premium.",
    price: 1490.00,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    category: "mochilas",
    tags: ["couro", "mochila", "notebook"],
    inStock: true,
    colors: [
      { name: "Marrom", hex: "#5D4037" },
      { name: "Preto", hex: "#1A1A1A" }
    ]
  },
  {
    id: "5",
    name: "Carteira Compacta Roma",
    description: "Carteira compacta em couro com porta-cartões, espaço para cédulas e bolso para moedas. Acabamento costurado à mão.",
    price: 390.00,
    originalPrice: 480.00,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80"
    ],
    category: "carteiras",
    tags: ["couro", "carteira", "compacta"],
    inStock: true,
    featured: true,
    colors: [
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Caramelo", hex: "#8B5A2B" },
      { name: "Vinho", hex: "#5C1A1B" }
    ]
  },
  {
    id: "6",
    name: "Bolsa Baguete Siena",
    description: "Bolsa baguete em couro acetinado com alça curta de ombro. Design elegante para ocasiões especiais e looks sofisticados.",
    price: 950.00,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    ],
    category: "bolsas-de-mao",
    tags: ["couro", "baguete", "elegante"],
    inStock: true,
    colors: [
      { name: "Preto", hex: "#1A1A1A" },
      { name: "Nude", hex: "#D4B59E" }
    ]
  },
  {
    id: "7",
    name: "Bolsa Crossbody Pisa",
    description: "Crossbody compacta em couro estruturado. Alça longa removível, ideal para viagens e o uso casual com mãos livres.",
    price: 790.00,
    images: [
      "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=800&q=80"
    ],
    category: "tiracolo",
    tags: ["couro", "crossbody", "viagem"],
    inStock: true,
    colors: [
      { name: "Caramelo", hex: "#8B5A2B" },
      { name: "Preto", hex: "#1A1A1A" }
    ]
  },
  {
    id: "8",
    name: "Mochila Compacta Bologna",
    description: "Mochila compacta em couro macio para o dia a dia. Bolso frontal, alças ajustáveis e design minimalista atemporal.",
    price: 1190.00,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"
    ],
    category: "mochilas",
    tags: ["couro", "mochila", "minimalista"],
    inStock: true,
    colors: [
      { name: "Marrom", hex: "#5D4037" },
      { name: "Preto", hex: "#1A1A1A" }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.featured);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
