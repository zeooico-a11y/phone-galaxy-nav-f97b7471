import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, Tag, Image, HelpCircle, Layers, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    promotions: 0,
    activePromotions: 0,
    testimonials: 0,
    faq: 0,
    siteImages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [productsByCategory, setProductsByCategory] = useState<{ name: string; count: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [
        productsRes,
        categoriesRes,
        promotionsRes,
        activePromotionsRes,
        testimonialsRes,
        faqRes,
        imagesRes,
        productsByCatRes
      ] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("categories").select("id", { count: "exact", head: true }),
        supabase.from("promotions").select("id", { count: "exact", head: true }),
        supabase.from("promotions").select("id", { count: "exact", head: true }).eq("is_active", true),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("faq").select("id", { count: "exact", head: true }),
        supabase.from("site_images").select("id", { count: "exact", head: true }),
        supabase.from("products").select("category_id, categories(name)").eq("is_active", true)
      ]);

      setStats({
        products: productsRes.count || 0,
        categories: categoriesRes.count || 0,
        promotions: promotionsRes.count || 0,
        activePromotions: activePromotionsRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        faq: faqRes.count || 0,
        siteImages: imagesRes.count || 0,
      });

      // Count products by category
      const catCounts: { [key: string]: number } = {};
      productsByCatRes.data?.forEach((p: any) => {
        const catName = p.categories?.name || "Sem categoria";
        catCounts[catName] = (catCounts[catName] || 0) + 1;
      });

      setProductsByCategory(
        Object.entries(catCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      );
    } catch (error: any) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats.products,
      icon: Package,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      route: "/admin/products"
    },
    {
      title: "Categorias",
      value: stats.categories,
      icon: Layers,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      route: "/admin/categories"
    },
    {
      title: "Promoções Ativas",
      value: stats.activePromotions,
      icon: Tag,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      route: "/admin/promotions"
    },
    {
      title: "Depoimentos",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      route: "/admin/testimonials"
    },
    {
      title: "Imagens do Site",
      value: stats.siteImages,
      icon: Image,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
      route: "/admin/site-images"
    },
    {
      title: "Perguntas FAQ",
      value: stats.faq,
      icon: HelpCircle,
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
      route: "/admin/faq"
    },
  ];

  const quickActions = [
    { label: "Adicionar Produto", icon: Package, route: "/admin/products" },
    { label: "Nova Promoção", icon: Tag, route: "/admin/promotions" },
    { label: "Novo Depoimento", icon: MessageSquare, route: "/admin/testimonials" },
    { label: "Alterar Imagens", icon: Image, route: "/admin/site-images" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visão geral do painel administrativo - MASTER PHONES IMPORTADOS
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.title} 
                className="bg-card/40 border-primary/30 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => navigate(stat.route)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.title}
                  </CardTitle>
                  <div className={`w-10 h-10 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Products by Category */}
        {productsByCategory.length > 0 && (
          <Card className="bg-card/40 border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Produtos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {productsByCategory.map((cat, index) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-foreground">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(cat.count / stats.products) * 100}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground font-medium w-8 text-right">{cat.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="bg-card/40 border-primary/30">
          <CardHeader>
            <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    onClick={() => navigate(action.route)}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2 hover:bg-primary/10 hover:border-primary/50"
                  >
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Overview */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-card/40 border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Resumo de Promoções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total de promoções:</span>
                  <span className="text-foreground font-bold">{stats.promotions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Promoções ativas:</span>
                  <span className="text-green-500 font-bold">{stats.activePromotions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Promoções inativas:</span>
                  <span className="text-red-500 font-bold">{stats.promotions - stats.activePromotions}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground text-lg">Status do Site</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Produtos ativos:</span>
                  <span className="text-green-500 font-bold">{stats.products}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Depoimentos:</span>
                  <span className="text-foreground font-bold">{stats.testimonials}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Perguntas FAQ:</span>
                  <span className="text-foreground font-bold">{stats.faq}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
