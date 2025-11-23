-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

-- Create site_sections table
CREATE TABLE public.site_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  image_url TEXT,
  icon_name TEXT,
  is_active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  extra_data JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on site_sections
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;

-- Policies for site_sections
CREATE POLICY "Anyone can view active sections" ON public.site_sections
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert sections" ON public.site_sections
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update sections" ON public.site_sections
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete sections" ON public.site_sections
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  storage TEXT,
  color TEXT,
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policies for products
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert products" ON public.products
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update products" ON public.products
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete products" ON public.products
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_location TEXT,
  client_photo TEXT,
  testimonial_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Policies for testimonials
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert testimonials" ON public.testimonials
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update testimonials" ON public.testimonials
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete testimonials" ON public.testimonials
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  whatsapp_number TEXT,
  business_name TEXT,
  business_address TEXT,
  business_hours TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  primary_color TEXT DEFAULT '#00A3FF',
  secondary_color TEXT DEFAULT '#0B253A',
  logo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Policies for site_settings
CREATE POLICY "Anyone can view site settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Only admins can update site settings" ON public.site_settings
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true);

-- Storage policies for site-images bucket
CREATE POLICY "Anyone can view site images" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-images');

CREATE POLICY "Only admins can upload site images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'site-images' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Only admins can update site images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'site-images' AND
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Only admins can delete site images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'site-images' AND
    public.has_role(auth.uid(), 'admin')
  );

-- Insert initial data for site_sections
INSERT INTO public.site_sections (section_key, title, subtitle, icon_name, is_active, order_position)
VALUES
  ('delivery', 'Receba em casa', '', 'package', true, 1),
  ('ofertas_banner', '6 ofertas imperdíveis • Clique para ver →', '', '', true, 2),
  ('oferta_semana', 'OFERTA DA SEMANA', 'Promoções exclusivas só pelo WhatsApp', '', true, 3),
  ('localizacao', 'LOCALIZAÇÃO E ÁREA DE ATENDIMENTO', 'Atendimento especializado para a região...', 'map-pin', true, 4);

-- Insert initial site_settings
INSERT INTO public.site_settings (whatsapp_number, business_name, primary_color, secondary_color)
VALUES ('5535999366561', 'TechCell Assistência', '#00A3FF', '#0B253A');

-- Function to ensure only one featured product
CREATE OR REPLACE FUNCTION public.ensure_single_featured_product()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.is_featured = true THEN
    UPDATE public.products
    SET is_featured = false
    WHERE id != NEW.id AND is_featured = true;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger to maintain single featured product
CREATE TRIGGER enforce_single_featured_product
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW
  WHEN (NEW.is_featured = true)
  EXECUTE FUNCTION public.ensure_single_featured_product();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_site_sections_updated_at
  BEFORE UPDATE ON public.site_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();