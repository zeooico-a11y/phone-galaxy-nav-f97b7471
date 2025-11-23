import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Star, Package } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Product {
  id: string;
  name: string;
  description: string | null;
  storage: string | null;
  color: string | null;
  image_url: string | null;
  brand: string | null;
  compatibility: string | null;
  product_type: string | null;
  price_text: string | null;
  category_id: string | null;
  is_featured: boolean;
  is_active: boolean;
  categories?: {
    name: string;
  } | null;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    storage: "",
    color: "",
    image_url: "",
    brand: "",
    compatibility: "",
    product_type: "",
    price_text: "",
    category_id: "",
    is_featured: false,
    is_active: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from("products")
          .select("*, categories(name)")
          .order("created_at", { ascending: false }),
        supabase
          .from("categories")
          .select("id, name, slug")
          .eq("is_active", true)
          .order("order_position")
      ]);

      if (productsRes.error) throw productsRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setProducts(productsRes.data || []);
      setCategories(categoriesRes.data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar dados: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error("Nome do produto é obrigatório");
      return;
    }

    if (!formData.category_id) {
      toast.error("Categoria é obrigatória");
      return;
    }

    try {
      const productData = {
        name: formData.name,
        description: formData.description || null,
        storage: formData.storage || null,
        color: formData.color || null,
        image_url: formData.image_url || null,
        brand: formData.brand || null,
        compatibility: formData.compatibility || null,
        product_type: formData.product_type || null,
        price_text: formData.price_text || null,
        category_id: formData.category_id,
        is_featured: formData.is_featured,
        is_active: formData.is_active,
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);

        if (error) throw error;
        toast.success("Produto atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData]);

        if (error) throw error;
        toast.success("Produto criado com sucesso!");
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast.error("Erro ao salvar produto: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast.success("Produto excluído com sucesso!");
      setDeleteId(null);
      fetchData();
    } catch (error: any) {
      toast.error("Erro ao excluir produto: " + error.message);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      storage: product.storage || "",
      color: product.color || "",
      image_url: product.image_url || "",
      brand: product.brand || "",
      compatibility: product.compatibility || "",
      product_type: product.product_type || "",
      price_text: product.price_text || "",
      category_id: product.category_id || "",
      is_featured: product.is_featured,
      is_active: product.is_active,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      storage: "",
      color: "",
      image_url: "",
      brand: "",
      compatibility: "",
      product_type: "",
      price_text: "",
      category_id: "",
      is_featured: false,
      is_active: true,
    });
  };

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Catálogo Completo - Produtos</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie todos os produtos do catálogo por categoria
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0B253A] border-primary/30 max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-foreground text-xl">
                  {editingProduct ? "Editar Produto" : "Novo Produto"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0B253A] border-primary/30">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ImageUpload
                  currentImage={formData.image_url}
                  onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
                  label="Foto do Produto"
                />

                <div className="space-y-2">
                  <Label>Nome do Produto *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: iPhone 15 Pro Max"
                    className="bg-background/50 border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Marca</Label>
                    <Input
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Ex: Apple, Samsung, Xiaomi"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cor Principal</Label>
                    <Input
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      placeholder="Ex: Titânio Natural, Preto"
                      className="bg-background/50 border-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Armazenamento</Label>
                    <Input
                      value={formData.storage}
                      onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                      placeholder="Ex: 256GB, 512GB"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço</Label>
                    <Input
                      value={formData.price_text}
                      onChange={(e) => setFormData({ ...formData, price_text: e.target.value })}
                      placeholder="Ex: R$ 6.999,00"
                      className="bg-background/50 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Descrição Curta</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descrição de 1-2 linhas para o card"
                    className="bg-background/50 border-border"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Compatibilidade</Label>
                    <Input
                      value={formData.compatibility}
                      onChange={(e) => setFormData({ ...formData, compatibility: e.target.value })}
                      placeholder="Ex: iPhone 11 ao 15"
                      className="bg-background/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Input
                      value={formData.product_type}
                      onChange={(e) => setFormData({ ...formData, product_type: e.target.value })}
                      placeholder="Ex: Película 3D, Power Bank"
                      className="bg-background/50 border-border"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_featured: checked })
                      }
                    />
                    <Label>Destacar produto</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, is_active: checked })
                      }
                    />
                    <Label>Produto ativo</Label>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    {editingProduct ? "Atualizar" : "Criar"} Produto
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="bg-card/40 border-primary/30 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start gap-3">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg border border-primary/30"
                    />
                  )}
                  {!product.image_url && (
                    <div className="w-16 h-16 bg-muted/20 rounded-lg border border-border flex items-center justify-center">
                      <Package className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {product.is_featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      )}
                      <CardTitle className="text-foreground text-base truncate">
                        {product.name}
                      </CardTitle>
                    </div>
                    {product.categories && (
                      <p className="text-xs text-primary mt-1">{product.categories.name}</p>
                    )}
                    {product.storage && (
                      <p className="text-xs text-muted-foreground mt-1">{product.storage}</p>
                    )}
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                      product.is_active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.is_active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {product.price_text && (
                  <p className="text-lg font-bold text-primary">{product.price_text}</p>
                )}
                {product.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(product)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(product.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum produto cadastrado ainda</p>
              <p className="text-sm text-muted-foreground mt-2">
                Clique em "Adicionar Produto" para criar o primeiro
              </p>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#0B253A] border-primary/30">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Confirmar exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
