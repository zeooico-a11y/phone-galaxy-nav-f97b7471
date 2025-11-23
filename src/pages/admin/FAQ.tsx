import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, HelpCircle } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_position: number;
  is_active: boolean;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    order_position: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("order_position");

      if (error) throw error;
      setFaqs(data || []);
    } catch (error: any) {
      toast.error("Erro ao carregar perguntas: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.question || !formData.answer) {
        toast.error("Pergunta e resposta são obrigatórias");
        return;
      }

      if (editingFaq) {
        const { error } = await supabase
          .from("faq")
          .update(formData)
          .eq("id", editingFaq.id);

        if (error) throw error;
        toast.success("Pergunta atualizada com sucesso!");
      } else {
        const { error } = await supabase
          .from("faq")
          .insert([formData]);

        if (error) throw error;
        toast.success("Pergunta criada com sucesso!");
      }

      setDialogOpen(false);
      resetForm();
      fetchFaqs();
    } catch (error: any) {
      toast.error("Erro ao salvar pergunta: " + error.message);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("faq")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast.success("Pergunta removida com sucesso!");
      setDeleteId(null);
      fetchFaqs();
    } catch (error: any) {
      toast.error("Erro ao remover pergunta: " + error.message);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_position: faq.order_position,
      is_active: faq.is_active,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingFaq(null);
    setFormData({
      question: "",
      answer: "",
      order_position: 0,
      is_active: true,
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
            <h1 className="text-3xl font-bold text-foreground">Perguntas Frequentes (FAQ)</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie as perguntas e respostas do FAQ
            </p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm} size="lg">
                <Plus className="mr-2 h-5 w-5" />
                Adicionar Pergunta
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-[#0B253A] border-primary/30">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  {editingFaq ? "Editar Pergunta" : "Nova Pergunta"}
                </DialogTitle>
                <DialogDescription>
                  Preencha a pergunta e resposta
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Pergunta *</Label>
                  <Input
                    id="question"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Ex: Como funciona a garantia?"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Resposta *</Label>
                  <Textarea
                    id="answer"
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Digite a resposta completa aqui..."
                    className="bg-background/50 min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="order_position">Ordem</Label>
                  <Input
                    id="order_position"
                    type="number"
                    value={formData.order_position}
                    onChange={(e) => setFormData({ ...formData, order_position: parseInt(e.target.value) || 0 })}
                    className="bg-background/50"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Pergunta ativa</Label>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave} className="flex-1">
                    {editingFaq ? "Atualizar" : "Criar"} Pergunta
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

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="bg-card/40 border-primary/30 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <CardTitle className="text-foreground mb-2">{faq.question}</CardTitle>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!faq.is_active && (
                      <span className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded whitespace-nowrap">
                        Inativa
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(faq)}
                    className="flex-1"
                  >
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(faq.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {faqs.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhuma pergunta cadastrada ainda</p>
              <p className="text-sm text-muted-foreground mt-2">
                Clique em "Adicionar Pergunta" para criar a primeira
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
              Tem certeza de que deseja remover esta pergunta? Esta ação não pode ser desfeita.
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
