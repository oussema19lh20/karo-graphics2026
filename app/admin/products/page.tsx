"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Plus, Edit2, Trash2, Search, Filter, Package, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  categoriesData,
  getCategoryNames,
  getSubcategoriesForCategory,
  isPDFFile,
} from "@/lib/data"

interface Product {
  id: number
  name: string
  description: string
  category: string
  subcategory: string
  price: string
  image: string
  status: "published" | "draft"
}

// Generate initial products from data
const generateInitialProducts = (): Product[] => {
  const products: Product[] = []
  let id = 1
  
  categoriesData.forEach((cat) => {
    cat.subcategories.forEach((sub) => {
      sub.products.forEach((product) => {
        products.push({
          id: id++,
          name: product.name,
          description: `${product.name} - ${sub.name}`,
          category: cat.name,
          subcategory: sub.name,
          price: "Sur devis",
          image: product.image || "",
          status: "published",
        })
      })
    })
  })
  
  return products
}

const initialProducts = generateInitialProducts()

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterSubcategory, setFilterSubcategory] = useState<string>("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    image: "",
  })

  const categories = getCategoryNames()
  
  const subcategories = useMemo(() => {
    if (filterCategory === "all") return []
    return getSubcategoriesForCategory(filterCategory).map((s) => s.name)
  }, [filterCategory])

  const formSubcategories = useMemo(() => {
    if (!formData.category) return []
    return getSubcategoriesForCategory(formData.category).map((s) => s.name)
  }, [formData.category])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesCategory =
      filterCategory === "all" || product.category === filterCategory
    const matchesSubcategory =
      filterSubcategory === "all" || product.subcategory === filterSubcategory
    return matchesSearch && matchesCategory && matchesSubcategory
  })

  const handleSubmit = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...p, ...formData }
            : p
        )
      )
    } else {
      const newProduct: Product = {
        id: Date.now(),
        ...formData,
        status: "draft",
      }
      setProducts([newProduct, ...products])
    }
    resetForm()
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      image: product.image,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const resetForm = () => {
    setFormData({ name: "", description: "", category: "", subcategory: "", price: "", image: "" })
    setEditingProduct(null)
    setIsDialogOpen(false)
  }

  const handleCategoryFilterChange = (value: string) => {
    setFilterCategory(value)
    setFilterSubcategory("all")
  }

  const handleFormCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value, subcategory: "" })
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Produits</h1>
          <p className="text-muted-foreground mt-1">
            Gerez votre catalogue de produits ({products.length} produits)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-[#d81751] hover:bg-[#d81751]/90">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Modifier le produit" : "Nouveau produit"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nom</label>
                <Input
                  placeholder="Nom du produit"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Description
                </label>
                <Textarea
                  placeholder="Description du produit"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Categorie
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={handleFormCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Sous-categorie
                  </label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(value) =>
                      setFormData({ ...formData, subcategory: value })
                    }
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {formSubcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Prix</label>
                <Input
                  placeholder="Ex: 150 DH ou Sur devis"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  URL de l&apos;image
                </label>
                <Input
                  placeholder="https://..."
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="w-full bg-[#1d7bbf] hover:bg-[#1d7bbf]/90"
              >
                {editingProduct ? "Mettre a jour" : "Creer le produit"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-md mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={filterCategory} onValueChange={handleCategoryFilterChange}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {filterCategory !== "all" && subcategories.length > 0 && (
              <div>
                <Select value={filterSubcategory} onValueChange={setFilterSubcategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Sous-categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les sous-categories</SelectItem>
                    {subcategories.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const isPDF = isPDFFile(product.image)
          return (
          <Card key={product.id} className="border-0 shadow-md overflow-hidden">
            <div className="relative aspect-square bg-muted">
              {isPDF ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#d81751]/20 to-[#1eb3e7]/20">
                  <FileText className="w-16 h-16 text-[#d81751] mb-2" />
                  <p className="text-xs text-muted-foreground text-center px-2">PDF Document</p>
                </div>
              ) : product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground/30" />
                </div>
              )}
              <div className="absolute top-2 right-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {product.status === "published" ? "Publie" : "Brouillon"}
                </span>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                {product.category} &gt; {product.subcategory}
              </p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[#d81751] font-semibold text-sm">
                  {product.price}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          )
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground">Aucun produit trouve</p>
        </div>
      )}
    </div>
  )
}
