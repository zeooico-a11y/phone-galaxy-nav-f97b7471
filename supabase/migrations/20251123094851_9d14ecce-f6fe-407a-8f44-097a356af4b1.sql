-- Corrigir caminhos das imagens dos produtos
UPDATE products 
SET image_url = REPLACE(image_url, '/src/assets/', '/assets/')
WHERE image_url LIKE '/src/assets/%';