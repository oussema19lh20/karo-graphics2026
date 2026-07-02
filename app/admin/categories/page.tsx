"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, ChevronDown, ChevronRight, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  categoriesData,
  type Category,
  type Subcategory,
  getProductCountForCategory,
} from "@/lib/data"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(categoriesData)
  const [newCategory, setNewCategory] = useState("")
  const [newSubcategory, setNewSubcategory] = useState("")
  const [newProduct, setNewProduct] = useState("")
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubDialogOpen, setIsSubDialogOpen] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<number[]>([])

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat: Category = {
        id: Date.now(),
        name: newCategory,
        subcategories: [],
      }
      setCategories([...categories, newCat])
      setNewCategory("")
      setIsDialogOpen(false)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id))
  }

  const handleAddSubcategory = () => {
    if (editingCategory && newSubcategory.trim()) {
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              subcategories: [
                ...cat.subcategories,
                { name: newSubcategory, products: [] },
              ],
            }
          : cat
      )
      setCategories(updated)
      setNewSubcategory("")
      setEditingCategory(updated.find((c) => c.id === editingCategory.id) || null)
    }
  }

  const handleDeleteSubcategory = (categoryId: number, subName: string) => {
    const updated = categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            subcategories: cat.subcategories.filter((s) => s.name !== subName),
          }
        : cat
    )
    setCategories(updated)
    setEditingCategory(updated.find((c) => c.id === categoryId) || null)
  }

  const handleAddProduct = () => {
    if (editingCategory && editingSubcategory && newProduct.trim()) {
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id
          ? {
              ...cat,
              subcategories: cat.subcategories.map((sub) =>
                sub.name === editingSubcategory.name
                  ? { ...sub, products: [...sub.products, { name: newProduct }] }
                  : sub
              ),
            }
          : cat
      )
      setCategories(updated)
      setNewProduct("")
      const updatedCat = updated.find((c) => c.id === editingCategory.id)
      setEditingCategory(updatedCat || null)
      setEditingSubcategory(
        updatedCat?.subcategories.find((s) => s.name === editingSubcategory.name) || null
      )
    }
  }

  const handleDeleteProduct = (categoryId: number, subName: string, productName: string) => {
    const updated = categories.map((cat) =>
      cat.id === categoryId
        ? {
            ...cat,
            subcategories: cat.subcategories.map((sub) =>
              sub.name === subName
                ? { ...sub, products: sub.products.filter((p) => p.name !== productName) }
                : sub
            ),
          }
        : cat
    )
    setCategories(updated)
    const updatedCat = updated.find((c) => c.id === categoryId)
    setEditingCategory(updatedCat || null)
    setEditingSubcategory(
      updatedCat?.subcategories.find((s) => s.name === subName) || null
    )
  }

  const getTotalProducts = (cat: Category) => {
    return cat.subcategories.reduce((acc, sub) => acc + sub.products.length, 0)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-1">
            Gerez vos categories, sous-categories et produits
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1d7bbf] hover:bg-[#1d7bbf]/90">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter une categorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle categorie</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Input
                placeholder="Nom de la categorie"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <Button
                onClick={handleAddCategory}
                className="w-full bg-[#1d7bbf] hover:bg-[#1d7bbf]/90"
              >
                Creer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-0 shadow-md">
            <Collapsible
              open={expandedCategories.includes(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CollapsibleTrigger asChild>
                    <button className="flex items-center gap-3 text-left">
                      {expandedCategories.includes(category.id) ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {category.subcategories.length} sous-categories | {getTotalProducts(category)} produits
                        </p>
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCategory(category)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Sous-categorie
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Ajouter une sous-categorie a {editingCategory?.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                          <Input
                            placeholder="Nom de la sous-categorie"
                            value={newSubcategory}
                            onChange={(e) => setNewSubcategory(e.target.value)}
                          />
                          <Button
                            onClick={handleAddSubcategory}
                            className="w-full bg-[#1d7bbf] hover:bg-[#1d7bbf]/90"
                          >
                            Ajouter
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  {category.subcategories.length === 0 ? (
                    <p className="text-sm text-muted-foreground italic py-4">
                      Aucune sous-categorie
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {category.subcategories.map((sub) => (
                        <div
                          key={sub.name}
                          className="bg-muted/50 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{sub.name}</span>
                              <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded-full">
                                {sub.products.length} produits
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Dialog open={isSubDialogOpen} onOpenChange={setIsSubDialogOpen}>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      setEditingCategory(category)
                                      setEditingSubcategory(sub)
                                    }}
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>
                                      Produits de {editingSubcategory?.name}
                                    </DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 pt-4">
                                    <div className="flex gap-2">
                                      <Input
                                        placeholder="Nouveau produit"
                                        value={newProduct}
                                        onChange={(e) => setNewProduct(e.target.value)}
                                      />
                                      <Button onClick={handleAddProduct}>
                                        <Plus className="w-4 h-4" />
                                      </Button>
                                    </div>
                                    <div className="space-y-2 max-h-64 overflow-y-auto">
                                      {editingSubcategory?.products.map((product) => (
                                        <div
                                          key={product.name}
                                          className="flex items-center justify-between bg-muted rounded-lg px-3 py-2"
                                        >
                                          <div className="flex items-center gap-2">
                                            <Package className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-sm">{product.name}</span>
                                          </div>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={() =>
                                              editingCategory &&
                                              handleDeleteProduct(
                                                editingCategory.id,
                                                editingSubcategory.name,
                                                product.name
                                              )
                                            }
                                          >
                                            <Trash2 className="w-3 h-3 text-destructive" />
                                          </Button>
                                        </div>
                                      ))}
                                      {editingSubcategory?.products.length === 0 && (
                                        <p className="text-sm text-muted-foreground italic text-center py-4">
                                          Aucun produit
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleDeleteSubcategory(category.id, sub.name)
                                }
                              >
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          {sub.products.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {sub.products.slice(0, 5).map((product) => (
                                <span
                                  key={product.name}
                                  className="px-2 py-1 bg-background rounded text-xs text-muted-foreground"
                                >
                                  {product.name}
                                </span>
                              ))}
                              {sub.products.length > 5 && (
                                <span className="px-2 py-1 bg-[#1d7bbf]/10 text-[#1d7bbf] rounded text-xs font-medium">
                                  +{sub.products.length - 5} autres
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  )
}
