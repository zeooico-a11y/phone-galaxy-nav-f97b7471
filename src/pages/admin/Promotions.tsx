import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Tag, Star } from "lucide-react";

interface Promotion {
  id: string;
  product_id: string;
  original_price: string | null;
  promotional_price: string;
  highlight_text: string | null;
  is_active: boolean;
  is_featured: boolean;
  products: {
    id: string;
    name: string;
    image_url: string | null;
    color: string | null;
    storage: string | null;
  } | null;
}

interface Product {
  id: string;
  name: string;
  image_url: string | null;
  color: string | null;
  storage: string | null;
  price_text: string | null;
}

export default function Promotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    product_id: "",
    original_price: "",
    promotional_price: "",
    highlight_text: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [promotionsRes, productsRes] = await Promise.all([
        supabase
          .from("promotions")
          .select("*, products(id, name, image_url, color, storage)")
          .order("created_at", { ascending: false }),
        supabase
          .from("products")
          .select("id, name, image_url, color, storage, price_text")
          .eq("is_active", true)
          .order("name")
      ]);

      if (promotionsRes.error) throw promotionsRes.error;
      if (productsRes.error) throw productsRes.error;

      setPromotions(promotionsRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.product_id || !formData.promotional_price) {
        toast.error("Produto e preço promocional são obrigatórios");
        return;
      }

      if (editingPromotion) {
        const { error } = await supabase
          .from("promotions")
          .update(formData)
          .eq("id", editingPromotion.id);

        if (error) throw error;
        toast.success("Promoção atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("promotions")
          .insert([formData]);

        if (error) throw error;
        toast.success("Promoção criada com sucesso!");
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error("Erro ao salvar promoção: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("promotions")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast.success("Promoção removida com sucesso!");
      setDeleteId(null);
      fetchData();
    } catch (error: any) {
      toast.error("Erro ao remover promoção: " + error.message);
    }
  };

  const handleEdit = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setFormData({
      product_id: promotion.product_id,
      original_price: promotion.original_price || "",
      promotional_price: promotion.promotional_price,
      highlight_text: promotion.highlight_text || "",
      is_active: promotion.is_active,
      is_featured: promotion.is_featured,
    });
    setDialogOpen(true);
  };

  const handleProductSelect = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.price_text) {
      setFormData({
        ...formData,
        product_id: productId,
        original_price: product.price_text,
      });
    } else {
      setFormData({ ...formData, product_id: productId });
    }
  };

  const resetForm = () => {
    setEditingPromotion(null);
    setFormData({
      product_id: "",
      original_price: "",
      promotional_price: "",
      highlight_text: "",
      is_active: true,
      is_featured: false,
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Promoções / Ofertas da Semana</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie as promoções e ofertas especiais
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Adicionar Promoção
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0B253A] border-primary/30">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingPromotion ? "Editar Promoção" : "Nova Promoção"}
                </DialogTitle>
                <DialogDescription>
                  Selecione um produto e defina os preços
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product_id">Produto *</Label>
                  <Select
                    value={formData.product_id}
                    onValueChange={handleProductSelect}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Selecione um produto" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B253A] border-primary/30">
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} 
                          {product.color && ` - ${product.color}`}
                          {product.storage && ` - ${product.storage}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Preço Original</Label>
                    <Input
                      id="original_price"
                      value={formData.original_price}
                      onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      placeholder="R$ 4.999,00"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promotional_price">Preço Promocional *</Label>
                    <Input
                      id="promotional_price"
                      value={formData.promotional_price}
                      onChange={(e) => setFormData({ ...formData, promotional_price: e.target.value })}
                      placeholder="R$ 3.999,00"
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlight_text">Texto Destaque</Label>
                  <Input
                    id="highlight_text"
                    value={formData.highlight_text}
                    onChange={(e) => setFormData({ ...formData, highlight_text: e.target.value })}
                    placeholder="Ex: Oferta da semana, Últimas unidades"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Promoção ativa</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Destaque (banner principal)</Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    {editingPromotion ? "Atualizar" : "Criar"} Promoção
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {promotions.map((promotion) => (
            <Card key={promotion.id} className="bg-card/40 border-primary/30 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start gap-4">
                  {promotion.products?.image_url && (
                    <img
                      src={promotion.products.image_url}
                      alt={promotion.products.name}
                      className="w-20 h-20 object-cover rounded-lg border border-primary/30"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {promotion.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      <CardTitle className="text-foreground">
                        {promotion.products?.name || "Produto não encontrado"}
                      </CardTitle>
                    </div>
                    {promotion.highlight_text && (
                      <CardDescription className="text-primary">{promotion.highlight_text}</CardDescription>
                    )}
                  </div>
                  {!promotion.is_active && (
                    <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded">
                      Inativa
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {promotion.original_price && (
                    <p className="text-muted-foreground line-through">
                      De: {promotion.original_price}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-primary">
                    Por: {promotion.promotional_price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(promotion)}
                    className="flex-1"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(promotion.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {promotions.length === 0 && (
            <div className="col-span-2 text-center py-12">
              <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma promoção cadastrada ainda</p>
              <p className="text-sm text-muted-foreground mt-2">
                Clique em "Adicionar Promoção" para criar a primeira
              </p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#0B253A] border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja remover esta promoção? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Sim, remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
