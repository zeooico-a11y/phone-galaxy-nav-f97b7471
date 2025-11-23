import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Star } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Testimonial {
  id: string;
  client_name: string;
  client_location: string;
  client_photo: string;
  testimonial_text: string;
  rating: number;
  is_active: boolean;
  order_position: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client_name: "",
    client_location: "",
    client_photo: "",
    testimonial_text: "",
    rating: 5,
    is_active: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("order_position");

    if (error) {
      toast.error("Erro ao carregar depoimentos");
      return;
    }

    setTestimonials(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!formData.client_name || !formData.testimonial_text) {
      toast.error("Nome e depoimento são obrigatórios");
      return;
    }

    if (formData.testimonial_text.length > 500) {
      toast.error("Depoimento deve ter no máximo 500 caracteres");
      return;
    }

    const testimonialData = {
      client_name: formData.client_name,
      client_location: formData.client_location,
      client_photo: formData.client_photo,
      testimonial_text: formData.testimonial_text,
      rating: formData.rating,
      is_active: formData.is_active,
    };

    let error;

    if (editingTestimonial) {
      ({ error } = await supabase
        .from("testimonials")
        .update(testimonialData)
        .eq("id", editingTestimonial.id));
    } else {
      ({ error } = await supabase
        .from("testimonials")
        .insert([testimonialData]));
    }

    if (error) {
      toast.error("Erro ao salvar depoimento");
      return;
    }

    toast.success("✓ Depoimento salvo com sucesso!");
    setDialogOpen(false);
    resetForm();
    fetchTestimonials();
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", deleteId);

    if (error) {
      toast.error("Erro ao excluir depoimento");
      return;
    }

    toast.success("Depoimento excluído com sucesso");
    setDeleteId(null);
    fetchTestimonials();
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      client_name: testimonial.client_name,
      client_location: testimonial.client_location || "",
      client_photo: testimonial.client_photo || "",
      testimonial_text: testimonial.testimonial_text,
      rating: testimonial.rating,
      is_active: testimonial.is_active,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      client_name: "",
      client_location: "",
      client_photo: "",
      testimonial_text: "",
      rating: 5,
      is_active: true,
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-600"
        }`}
      />
    ));
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
            <h1 className="text-3xl font-bold text-foreground">Depoimentos</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie os depoimentos dos clientes
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Depoimento
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0B253A] border-primary/30 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingTestimonial ? "Editar Depoimento" : "Novo Depoimento"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome do Cliente *</Label>
                  <Input
                    value={formData.client_name}
                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="Ana Silva"
                    className="bg-background/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Localização</Label>
                  <Input
                    value={formData.client_location}
                    onChange={(e) => setFormData({ ...formData, client_location: e.target.value })}
                    placeholder="Centro, São Paulo"
                    className="bg-background/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL da Foto</Label>
                  <Input
                    value={formData.client_photo}
                    onChange={(e) => setFormData({ ...formData, client_photo: e.target.value })}
                    placeholder="https://..."
                    className="bg-background/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Depoimento * (máx. 500 caracteres)</Label>
                  <Textarea
                    value={formData.testimonial_text}
                    onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                    placeholder="Escreva o depoimento do cliente..."
                    className="bg-background/50 border-border"
                    rows={4}
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.testimonial_text.length}/500 caracteres
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Avaliação</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                      >
                        <Star
                          className={`w-6 h-6 cursor-pointer transition-colors ${
                            star <= formData.rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-gray-600 hover:text-yellow-500"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_active: checked })
                    }
                  />
                  <Label>Ativo no site</Label>
                </div>
                <Button onClick={handleSave} className="w-full">
                  Salvar Depoimento
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-[#0B253A] border-primary/30">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      {testimonial.client_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.client_name}
                      </p>
                      {testimonial.client_location && (
                        <p className="text-xs text-muted-foreground">
                          {testimonial.client_location}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      testimonial.is_active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {testimonial.is_active ? "Ativo" : "Inativo"}
                  </span>
                </div>

                <div className="flex gap-1">{renderStars(testimonial.rating)}</div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {testimonial.testimonial_text}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Pencil className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setDeleteId(testimonial.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="bg-[#0B253A] border-primary/30">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-foreground">
                Confirmar exclusão
              </AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir este depoimento? Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}