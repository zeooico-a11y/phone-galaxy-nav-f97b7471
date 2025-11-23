import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteImage(imageKey: string, fallbackImage: string) {
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data, error } = await supabase
          .from("site_images")
          .select("image_url")
          .eq("image_key", imageKey)
          .single();

        if (data?.image_url && !error) {
          setImageUrl(data.image_url);
        }
      } catch (error) {
        console.error(`Error fetching image for ${imageKey}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageKey, fallbackImage]);

  return { imageUrl, loading };
}
