-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon_name TEXT,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add category_id to products table
ALTER TABLE public.products 
ADD COLUMN category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
ADD COLUMN brand TEXT,
ADD COLUMN compatibility TEXT,
ADD COLUMN product_type TEXT,
ADD COLUMN price_text TEXT;

-- Create promotions table
CREATE TABLE public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  original_price TEXT,
  promotional_price TEXT NOT NULL,
  highlight_text TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create site_images table
CREATE TABLE public.site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_key TEXT NOT NULL UNIQUE,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create faq table
CREATE TABLE public.faq (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_position INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories
CREATE POLICY "Anyone can view active categories"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert categories"
  ON public.categories FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update categories"
  ON public.categories FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete categories"
  ON public.categories FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for promotions
CREATE POLICY "Anyone can view active promotions"
  ON public.promotions FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert promotions"
  ON public.promotions FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update promotions"
  ON public.promotions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete promotions"
  ON public.promotions FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for site_images
CREATE POLICY "Anyone can view site images"
  ON public.site_images FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage site images"
  ON public.site_images FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for faq
CREATE POLICY "Anyone can view active faq"
  ON public.faq FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert faq"
  ON public.faq FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update faq"
  ON public.faq FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete faq"
  ON public.faq FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_promotions_updated_at
  BEFORE UPDATE ON public.promotions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_faq_updated_at
  BEFORE UPDATE ON public.faq
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon_name, order_position) VALUES
  ('Apple · iPhone', 'iphone', 'Linha completa de iPhones', 'Smartphone', 1),
  ('Samsung Galaxy', 'samsung', 'Smartphones Samsung', 'Smartphone', 2),
  ('Xiaomi / Redmi / Poco', 'xiaomi', 'Linha Xiaomi, Redmi e Poco', 'Smartphone', 3),
  ('Smartwatch', 'smartwatch', 'Relógios Inteligentes', 'Watch', 4),
  ('Películas', 'peliculas', 'Proteção de Tela', 'Shield', 5),
  ('Capinhas', 'capinhas', 'Cases e Capinhas', 'Package', 6),
  ('Carregadores', 'carregadores', 'Carregadores e Cabos', 'Battery', 7),
  ('Fones', 'fones', 'Fones e Áudio', 'Headphones', 8),
  ('Power Bank', 'powerbank', 'Baterias Portáteis', 'BatteryCharging', 9),
  ('Acessórios', 'acessorios', 'Outros Acessórios', 'Package', 10);