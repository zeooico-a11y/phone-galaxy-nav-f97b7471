import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, MessageSquare, FileText, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    testimonials: 0,
    sections: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [products, testimonials, sections] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("testimonials").select("id", { count: "exact", head: true }),
      supabase.from("site_sections").select("id", { count: "exact", head: true }),
    ]);

    setStats({
      products: products.count || 0,
      testimonials: testimonials.count || 0,
      sections: sections.count || 0,
    });
  };

  const statCards = [
    {
      title: "Total de Produtos",
      value: stats.products,
      icon: Package,
      color: "text-blue-500",
    },
    {
      title: "Depoimentos Ativos",
      value: stats.testimonials,
      icon: MessageSquare,
      color: "text-green-500",
    },
    {
      title: "Seções do Site",
      value: stats.sections,
      icon: FileText,
      color: "text-purple-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bem-vindo ao painel administrativo
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-[#0B253A] border-primary/30">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
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

        {/* Quick Actions */}
        <Card className="bg-[#0B253A] border-primary/30">
          <CardHeader>
            <CardTitle className="text-foreground">Atalhos Rápidos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Button
                onClick={() => navigate("/admin/products")}
                className="justify-start"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto
              </Button>
              <Button
                onClick={() => navigate("/admin/testimonials")}
                className="justify-start"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Depoimento
              </Button>
              <Button
                onClick={() => navigate("/admin/sections")}
                className="justify-start"
                variant="outline"
              >
                <FileText className="w-4 h-4 mr-2" />
                Editar Seções
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}