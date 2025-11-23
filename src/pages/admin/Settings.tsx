import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface Settings {
  id: string;
  whatsapp_number: string;
  business_name: string;
  business_address: string;
  business_hours: string;
  instagram_url: string;
  facebook_url: string;
  primary_color: string;
  secondary_color: string;
  logo_url: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .single();

    if (error && error.code !== "PGRST116") {
      toast.error("Erro ao carregar configurações");
      return;
    }

    setSettings(data || {
      id: "",
      whatsapp_number: "",
      business_name: "",
      business_address: "",
      business_hours: "",
      instagram_url: "",
      facebook_url: "",
      primary_color: "#00A3FF",
      secondary_color: "#0B253A",
      logo_url: "",
    });
    setLoading(false);
  };

  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);

    const { error } = await supabase
      .from("site_settings")
      .upsert({
        id: settings.id || undefined,
        whatsapp_number: settings.whatsapp_number,
        business_name: settings.business_name,
        business_address: settings.business_address,
        business_hours: settings.business_hours,
        instagram_url: settings.instagram_url,
        facebook_url: settings.facebook_url,
        primary_color: settings.primary_color,
        secondary_color: settings.secondary_color,
        logo_url: settings.logo_url,
      });

    if (error) {
      toast.error("Erro ao salvar configurações");
    } else {
      toast.success("✓ Configurações salvas com sucesso!");
    }

    setSaving(false);
    fetchSettings();
  };

  const updateSetting = (field: keyof Settings, value: string) => {
    if (!settings) return;
    setSettings({ ...settings, [field]: value });
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

  if (!settings) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie as configurações gerais do site
          </p>
        </div>

        <div className="space-y-6">
          <Card className="bg-[#0B253A] border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground">Dados do Negócio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Empresa</Label>
                <Input
                  value={settings.business_name}
                  onChange={(e) => updateSetting("business_name", e.target.value)}
                  placeholder="TechCell Assistência"
                  className="bg-background/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Endereço Completo</Label>
                <Textarea
                  value={settings.business_address}
                  onChange={(e) => updateSetting("business_address", e.target.value)}
                  placeholder="Rua Exemplo, 123 - Centro, São Paulo - SP"
                  className="bg-background/50 border-border"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Horário de Funcionamento</Label>
                <Input
                  value={settings.business_hours}
                  onChange={(e) => updateSetting("business_hours", e.target.value)}
                  placeholder="Seg-Sex: 9h-18h | Sáb: 9h-13h"
                  className="bg-background/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Número do WhatsApp</Label>
                <Input
                  value={settings.whatsapp_number}
                  onChange={(e) => updateSetting("whatsapp_number", e.target.value)}
                  placeholder="5511999999999"
                  className="bg-background/50 border-border"
                />
                <p className="text-xs text-muted-foreground">
                  Formato: código do país + DDD + número (sem espaços ou caracteres especiais)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B253A] border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input
                  value={settings.instagram_url}
                  onChange={(e) => updateSetting("instagram_url", e.target.value)}
                  placeholder="https://instagram.com/seuusuario"
                  className="bg-background/50 border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>Facebook</Label>
                <Input
                  value={settings.facebook_url}
                  onChange={(e) => updateSetting("facebook_url", e.target.value)}
                  placeholder="https://facebook.com/suapagina"
                  className="bg-background/50 border-border"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#0B253A] border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground">Visual</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo (URL)</Label>
                <Input
                  value={settings.logo_url}
                  onChange={(e) => updateSetting("logo_url", e.target.value)}
                  placeholder="https://..."
                  className="bg-background/50 border-border"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primary_color}
                      onChange={(e) => updateSetting("primary_color", e.target.value)}
                      className="w-16 h-10 p-1 bg-background/50 border-border"
                    />
                    <Input
                      value={settings.primary_color}
                      onChange={(e) => updateSetting("primary_color", e.target.value)}
                      placeholder="#00A3FF"
                      className="flex-1 bg-background/50 border-border"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondary_color}
                      onChange={(e) => updateSetting("secondary_color", e.target.value)}
                      className="w-16 h-10 p-1 bg-background/50 border-border"
                    />
                    <Input
                      value={settings.secondary_color}
                      onChange={(e) => updateSetting("secondary_color", e.target.value)}
                      placeholder="#0B253A"
                      className="flex-1 bg-background/50 border-border"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}