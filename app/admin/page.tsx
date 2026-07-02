import { Package, FolderOpen, Layers, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { categoriesData, getAllProducts } from "@/lib/data"

const allProducts = getAllProducts()
const totalProducts = allProducts.length
const totalCategories = categoriesData.length
const totalSubcategories = categoriesData.reduce(
  (acc, cat) => acc + cat.subcategories.length,
  0
)

const stats = [
  {
    title: "Produits",
    value: totalProducts.toString(),
    icon: Package,
    color: "#1eb3e7",
    href: "/admin/products",
  },
  {
    title: "Categories",
    value: totalCategories.toString(),
    icon: FolderOpen,
    color: "#d81751",
    href: "/admin/categories",
  },
  {
    title: "Sous-categories",
    value: totalSubcategories.toString(),
    icon: Layers,
    color: "#fcd10f",
    href: "/admin/categories",
  },
  {
    title: "Vues ce mois",
    value: "2,847",
    icon: Eye,
    color: "#1d7bbf",
    href: "#",
  },
]

// Get recent products from actual data
const recentProducts = allProducts.slice(0, 8).map((product, index) => ({
  id: index + 1,
  name: product.name,
  category: product.category,
  subcategory: product.subcategory,
  status: "Publie",
}))

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans votre espace d&apos;administration
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categoriesData.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{category.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {category.subcategories.length} sous-categories
                    </p>
                  </div>
                  <span className="text-sm font-medium text-[#1d7bbf]">
                    {category.subcategories.reduce(
                      (acc, sub) => acc + sub.products.length,
                      0
                    )}{" "}
                    produits
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Products */}
        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Produits recents</CardTitle>
            <Link
              href="/admin/products"
              className="text-sm text-[#1d7bbf] hover:underline"
            >
              Voir tout
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {product.category} &gt; {product.subcategory}
                    </p>
                  </div>
                  <span
                    className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                  >
                    {product.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
