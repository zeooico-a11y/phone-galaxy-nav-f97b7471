import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Image as ImageIcon } from "lucide-react";

interface SiteImage {
  id: string;
  image_key: string;
  image_url: string;
  title: string | null;
  description: string | null;
}

const IMAGE_KEYS = [
  { key: "hero-banner", title: "Banner Principal / Home", description: "Imagem de fundo da página inicial" },
  { key: "hero-destaque", title: "Imagem Destaque Home (Card)", description: "Imagem grande em destaque na home" },
  { key: "oferta-semana-banner", title: "Banner Oferta da Semana", description: "Banner principal da seção de ofertas" },
  { key: "ofertas-dia-banner", title: "Banner Ofertas do Dia", description: "Banner da página de ofertas diárias" },
  { key: "catalogo-iphone", title: "Banner Catálogo iPhone", description: "Fundo da página de catálogo iPhone" },
  { key: "catalogo-samsung", title: "Banner Catálogo Samsung", description: "Fundo da página de catálogo Samsung" },
  { key: "catalogo-xiaomi", title: "Banner Catálogo Xiaomi", description: "Fundo da página de catálogo Xiaomi" },
  { key: "catalogo-smartwatch", title: "Banner Catálogo Smartwatch", description: "Fundo da página de smartwatches" },
  { key: "catalogo-peliculas", title: "Banner Catálogo Películas", description: "Fundo da página de películas" },
  { key: "catalogo-capinhas", title: "Banner Catálogo Capinhas", description: "Fundo da página de capinhas" },
  { key: "catalogo-carregadores", title: "Banner Catálogo Carregadores", description: "Fundo da página de carregadores" },
  { key: "catalogo-fones", title: "Banner Catálogo Fones", description: "Fundo da página de fones" },
  { key: "catalogo-powerbank", title: "Banner Catálogo Power Bank", description: "Fundo da página de power banks" },
  { key: "catalogo-acessorios", title: "Banner Catálogo Acessórios", description: "Fundo da página de acessórios" },
  { key: "quem-somos-banner", title: "Banner Quem Somos", description: "Imagem da página sobre nós" },
  { key: "assistencia-banner", title: "Banner Assistência", description: "Imagem da página de serviços" },
  { key: "agendamento-banner", title: "Banner Agendamento", description: "Imagem da página de agendamento de reparo" },
  { key: "faq-banner", title: "Banner Perguntas Frequentes", description: "Imagem da página de FAQ" },
  { key: "logo-principal", title: "Logo Principal", description: "Logo da loja (cabeçalho e rodapé)" },
];

export default function SiteImages() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);
  const [formData, setFormData] = useState({
    image_key: "",
    image_url: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from("site_images")
        .select("*");

      if (error) throw error;
      setImages(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar imagens: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.image_key || !formData.image_url) {
        toast.error("Tipo de imagem e URL são obrigatórios");
        return;
      }

      const { error } = await supabase
        .from("site_images")
        .upsert([formData], { onConflict: "image_key" });

      if (error) throw error;

      toast.success("Imagem salva com sucesso!");
      setDialogOpen(false);
      resetForm();
      fetchImages();
    } catch (error: any) {
      toast.error("Erro ao salvar imagem: " + error.message);
    }
  };

  const handleEdit = (image: SiteImage) => {
    setEditingImage(image);
    setFormData({
      image_key: image.image_key,
      image_url: image.image_url,
      title: image.title || "",
      description: image.description || "",
    });
    setDialogOpen(true);
  };

  const handleAddNew = (imageKey: string, title: string, description: string) => {
    setEditingImage(null);
    setFormData({
      image_key: imageKey,
      image_url: "",
      title,
      description,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingImage(null);
    setFormData({
      image_key: "",
      image_url: "",
      title: "",
      description: "",
    });
  };

  const getImageForKey = (key: string) => images.find(img => img.image_key === key);

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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Imagens do Site</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as imagens principais do site (banners, fundos, capas)
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {IMAGE_KEYS.map((imageKey) => {
            const existingImage = getImageForKey(imageKey.key);
            
            return (
              <Card key={imageKey.key} className="bg-card/40 border-primary/30 hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="text-foreground text-lg">{imageKey.title}</CardTitle>
                  <CardDescription className="text-sm">{imageKey.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {existingImage?.image_url ? (
                    <div className="space-y-3">
                      <img
                        src={existingImage.image_url}
                        alt={imageKey.title}
                        className="w-full h-40 object-cover rounded-lg border border-primary/30"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(existingImage)}
                        className="w-full"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Alterar Imagem
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="w-full h-40 bg-muted/20 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground" />
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddNew(imageKey.key, imageKey.title, imageKey.description)}
                        className="w-full"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Imagem
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl bg-[#0B253A] border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingImage ? "Alterar Imagem" : "Adicionar Imagem"}
            </DialogTitle>
            <DialogDescription>
              {formData.title || "Configure a imagem do site"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo de Imagem</Label>
              <p className="text-sm text-muted-foreground">{formData.description}</p>
            </div>

            <ImageUpload
              currentImage={formData.image_url}
              onUploadComplete={(url) => setFormData({ ...formData, image_url: url })}
              label="Imagem"
            />

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} className="flex-1" disabled={!formData.image_url}>
                Salvar Imagem
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
    </AdminLayout>
  );
}
