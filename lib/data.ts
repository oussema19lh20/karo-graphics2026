export interface Product {
  name: string
  image?: string
}

// Helper function to check if a file is a PDF
export function isPDFFile(filePath?: string): boolean {
  if (!filePath) return false
  return filePath.toLowerCase().endsWith('.pdf')
}

export interface Subcategory {
  name: string
  products: Product[]
}

export interface Category {
  id: number
  name: string
  subcategories: Subcategory[]
}

export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Design graphique",
    subcategories: [
      {
        name: "Chartes graphiques",
        products: [
          {
            name: "Charte Chaaben",
            image: "/Design graphique/les chartes graphique/charte chaaben.pdf",
          },
          {
            name: "Charte Othmen Outo",
            image: "/Design graphique/les chartes graphique/charte othmen outo.pdf",
          },
        ],
      },
      {
        name: "Poste réseaux sociaux",
        products: [
          {
            name: "Design social 1",
            image: "/Design graphique/poste réseau sociaux/لقطة شاشة 2026-04-15 144135.png",
          },
          {
            name: "Design social 2",
            image: "/Design graphique/poste réseau sociaux/لقطة شاشة 2026-04-15 144144.png",
          },
          {
            name: "Design social 3",
            image: "/Design graphique/poste réseau sociaux/لقطة شاشة 2026-04-15 144252.png",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Evénementiel",
    subcategories: [
      {
        name: "Invitations de mariage",
        products: [
          {
            name: "Invitation Modèle 1",
            image: "/Evénementiel/Invitations de mariage/modéle 1 & 2/modéle 1.png",
          },
          {
            name: "Invitation Modèle 2",
            image: "/Evénementiel/Invitations de mariage/modéle 1 & 2/modéle 2.png",
          },
          {
            name: "Invitation Modèle 3",
            image: "/Evénementiel/Invitations de mariage/modéle 3/لقطة شاشة 2026-04-15 160411.png",
          },
          {
            name: "Invitation Modèle 4",
            image: "/Evénementiel/Invitations de mariage/modéle 4/لقطة شاشة 2026-04-15 160300.png",
          },
          {
            name: "Invitation Modèle 5",
            image: "/Evénementiel/Invitations de mariage/modéle 5/لقطة شاشة 2026-04-15 160358.png",
          },
          {
            name: "Invitation Modèle 6",
            image: "/Evénementiel/Invitations de mariage/modéle 6/لقطة شاشة 2026-04-15 161014.png",
          },
          {
            name: "Invitation Modèle 7",
            image: "/Evénementiel/Invitations de mariage/modéle 7/modéle 7.png",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Les Packs",
    subcategories: [
      {
        name: "Pack anniversaire",
        products: [
          {
            name: "Pack anniversaire Design 1",
            image: "/les packs/Pack anniversaire/لقطة شاشة 2026-04-14 133159.png",
          },
          {
            name: "Pack anniversaire Design 2",
            image: "/les packs/Pack anniversaire/لقطة شاشة 2026-04-14 133219.png",
          },
          {
            name: "Pack anniversaire Design 3",
            image: "/les packs/Pack anniversaire/لقطة شاشة 2026-04-14 133234.png",
          },
        ],
      },
      {
        name: "Pack médecin",
        products: [
          {
            name: "Carte de visite",
            image: "/les packs/Pack médcin/Carte de visite.png",
          },
          {
            name: "Enveloppe",
            image: "/les packs/Pack médcin/Envoloppe.png",
          },
          {
            name: "Ordonnance",
            image: "/les packs/Pack médcin/Ordonnance.png",
          },
          {
            name: "Plaque",
            image: "/les packs/Pack médcin/Plaque.png",
          },
        ],
      },
      {
        name: "Pack soutenance",
        products: [
          {
            name: "Pack soutenance Design 1",
            image: "/les packs/Pack soutenance/لقطة شاشة 2026-04-14 133253.png",
          },
          {
            name: "Pack soutenance Design 2",
            image: "/les packs/Pack soutenance/لقطة شاشة 2026-04-14 133309.png",
          },
        ],
      },
      {
        name: "Pack thème cinéma",
        products: [
          {
            name: "Design cinéma",
            image: "/les packs/Pack théme cinéma/لقطة شاشة 2026-04-14 133328.png",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Objets & Cadeaux Personnalisés",
    subcategories: [
      {
        name: "Plexi",
        products: [
          {
            name: "Motifs personnalisés 1",
            image: "/Objets & Cadeaux Personnalisés/Plexi/Des motifs personalisées/لقطة شاشة 2026-04-14 132853.png",
          },
          {
            name: "Eventail 1",
            image: "/Objets & Cadeaux Personnalisés/Plexi/Eventail/لقطة شاشة 2026-04-15 142618.png",
          },
          {
            name: "Mini trophée 1",
            image: "/Objets & Cadeaux Personnalisés/Plexi/Mini trophée/لقطة شاشة 2026-04-15 142704.png",
          },
          {
            name: "Trophée 1",
            image: "/Objets & Cadeaux Personnalisés/Plexi/Trophée/لقطة شاشة 2026-04-15 135952.png",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Papeterie Professionnelle",
    subcategories: [
      {
        name: "Facture & Bon de Livraison",
        products: [
          {
            name: "Modèle facture",
            image: "/Papeterie Professionnelle/Facture & Bon de Livraison/لقطة شاشة 2026-04-15 163533.png",
          },
        ],
      },
      {
        name: "Cartes de visite",
        products: [
          {
            name: "Carte visite 7",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c7.png",
          },
          {
            name: "Carte visite 8",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c8.png",
          },
          {
            name: "Carte visite 1",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 1/لقطة شاشة 2026-04-15 153754.png",
          },
          {
            name: "Carte visite 2",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 2/لقطة شاشة 2026-04-15 154252.png",
          },
          {
            name: "Carte visite 3",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 3/لقطة شاشة 2026-04-15 154013.png",
          },
          {
            name: "Carte visite 4",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 4/لقطة شاشة 2026-04-15 154126.png",
          },
          {
            name: "Carte visite 5",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 5/لقطة شاشة 2026-04-15 154738.png",
          },
          {
            name: "Carte visite 6",
            image: "/Papeterie Professionnelle/Les cartes/carte visite/c 6/لقطة شاشة 2026-04-15 154729.png",
          },
          {
            name: "Cartes personnalisées",
            image: "/Papeterie Professionnelle/Les cartes/cartes personnalisés/لقطة شاشة 2026-04-15 154301.png",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Personnalisation",
    subcategories: [
      {
        name: "Décoration vitrine",
        products: [
          {
            name: "Design vitrine 1",
            image: "/Personnalisation/décoration vitrine/لقطة شاشة 2026-04-15 162124.png",
          },
          {
            name: "Design vitrine 2",
            image: "/Personnalisation/décoration vitrine/لقطة شاشة 2026-04-15 162224.png",
          },
        ],
      },
      {
        name: "Flyer",
        products: [
          {
            name: "Flyer design",
            image: "/Personnalisation/flyer/لقطة شاشة 2026-04-15 161905.png",
          },
        ],
      },
      {
        name: "Impression sur tissu",
        products: [
          {
            name: "Capuche",
            image: "/Personnalisation/Impression sur tissu/Capuche/لقطة شاشة 2026-04-15 133246.png",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Support de communication",
    subcategories: [
      {
        name: "Supports",
        products: [
          {
            name: "Flags",
            image: "/images%20karo%20design/flag.png",
          },
          {
            name: "Roll-Up",
            image: "/images%20karo%20design/roll-up.png",
          },
          {
            name: "X-Banner",
            image: "/images%20karo%20design/x-banner.png",
          },
          {
            name: "Bâche",
            image: "/images%20karo%20design/bache.png",
          },
        ],
      },
    ],
  },
]

// Helper function to get all category names
export function getCategoryNames(): string[] {
  return categoriesData.map((cat) => cat.name)
}

// Helper function to get subcategories for a category
export function getSubcategoriesForCategory(categoryName: string): Subcategory[] {
  const category = categoriesData.find((cat) => cat.name === categoryName)
  return category?.subcategories || []
}

// Helper function to get all subcategory names
export function getAllSubcategoryNames(): string[] {
  return categoriesData.flatMap((cat) =>
    cat.subcategories.map((sub) => sub.name)
  )
}

// Helper function to get total product count for a category
export function getProductCountForCategory(categoryName: string): number {
  const category = categoriesData.find((cat) => cat.name === categoryName)
  if (!category) return 0
  return category.subcategories.reduce(
    (acc, sub) => acc + sub.products.length,
    0
  )
}

// Helper function to get all products flat
export function getAllProducts(): Array<{
  name: string
  category: string
  subcategory: string
  image?: string
}> {
  const products: Array<{ name: string; category: string; subcategory: string; image?: string }> = []
  categoriesData.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((product) => {
        products.push({
          name: product.name,
          category: cat.name,
          subcategory: sub.name,
          image: product.image,
        })
      })
    })
  })
  return products
}
