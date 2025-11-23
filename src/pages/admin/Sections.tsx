import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Section {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
  icon_name: string;
  is_active: boolean;
}

export default function Sections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    const { data, error } = await supabase
      .from("site_sections")
      .select("*")
      .order("order_position");

    if (error) {
      toast.error("Erro ao carregar seções");
      return;
    }

    setSections(data || []);
    setLoading(false);
  };

  const handleSave = async (section: Section) => {
    setSaving(section.id);

    const { error } = await supabase
      .from("site_sections")
      .update({
        title: section.title,
        subtitle: section.subtitle,
        button_text: section.button_text,
        button_link: section.button_link,
        icon_name: section.icon_name,
        is_active: section.is_active,
      })
      .eq("id", section.id);

    if (error) {
      toast.error("Erro ao salvar");
    } else {
      toast.success("✓ Salvo com sucesso!");
    }

    setSaving(null);
  };

  const updateSection = (id: string, field: keyof Section, value: any) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const getSectionLabel = (key: string) => {
    const labels: Record<string, string> = {
      delivery: "Delivery / Receba em casa",
      ofertas_banner: "Banner de Ofertas",
      oferta_semana: "Oferta da Semana",
      localizacao: "Localização",
    };
    return labels[key] || key;
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
        <div>
          <h1 className="text-3xl font-bold text-foreground">Seções do Site</h1>
          <p className="text-muted-foreground mt-2">
            Edite o conteúdo de cada seção do site
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {sections.map((section) => (
            <AccordionItem
              key={section.id}
              value={section.id}
              className="bg-[#0B253A] border-primary/30 rounded-lg px-6"
            >
              <AccordionTrigger className="text-foreground hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-semibold">
                    {getSectionLabel(section.section_key)}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      section.is_active
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {section.is_active ? "Ativo" : "Inativo"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input
                      value={section.title || ""}
                      onChange={(e) =>
                        updateSection(section.id, "title", e.target.value)
                      }
                      className="bg-background/50 border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Subtítulo / Descrição</Label>
                    <Textarea
                      value={section.subtitle || ""}
                      onChange={(e) =>
                        updateSection(section.id, "subtitle", e.target.value)
                      }
                      className="bg-background/50 border-border"
                      rows={3}
                    />
                  </div>

                  {section.section_key === "ofertas_banner" && (
                    <div className="space-y-2">
                      <Label>Link do Botão</Label>
                      <Input
                        value={section.button_link || ""}
                        onChange={(e) =>
                          updateSection(section.id, "button_link", e.target.value)
                        }
                        placeholder="/ofertas-do-dia"
                        className="bg-background/50 border-border"
                      />
                    </div>
                  )}

                  {section.section_key === "delivery" && (
                    <div className="space-y-2">
                      <Label>Ícone</Label>
                      <Input
                        value={section.icon_name || ""}
                        onChange={(e) =>
                          updateSection(section.id, "icon_name", e.target.value)
                        }
                        placeholder="package, truck, home, box"
                        className="bg-background/50 border-border"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={section.is_active}
                      onCheckedChange={(checked) =>
                        updateSection(section.id, "is_active", checked)
                      }
                    />
                    <Label>Ativar esta seção no site</Label>
                  </div>

                  <Button
                    onClick={() => handleSave(section)}
                    disabled={saving === section.id}
                    className="w-full"
                  >
                    {saving === section.id ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </>
                    )}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </AdminLayout>
  );
}