-- Inserir todos os produtos existentes no site

-- IPHONES (12 produtos)
INSERT INTO products (name, description, color, storage, price_text, image_url, brand, category_id, is_active) VALUES
('iPhone 17 Pro Max', 'O mais avançado iPhone com tela de 6,9 polegadas, câmeras revolucionárias e chip A19 Bionic.', 'Laranja', '256GB', 'R$ 10.499', '/src/assets/iphone-17-pro-max-orange.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 16 Pro Max', 'Tela ProMotion 120Hz, câmeras profissionais e bateria de longa duração.', 'Preto Meia-noite', '256GB', 'R$ 8.999', '/src/assets/iphone-16-pro-max-black.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 16 Pro', 'Design compacto premium com câmeras de cinema e desempenho excepcional.', 'Azul', '256GB', 'R$ 8.299', '/src/assets/iphone-16-pro-blue.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 16', 'Tela OLED brilhante, câmeras aprimoradas e chip A18 para uso diário.', 'Roxo', '128GB', 'R$ 6.999', '/src/assets/iphone-16-purple.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 15 Pro Max', 'O mais poderoso iPhone já criado, com chip A17 Pro, câmera de 48MP e titânio aeroespacial.', 'Titânio Natural', '256GB', 'R$ 7.999', '/src/assets/iphone-15-pro-max-titanium.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 15 Pro', 'Desempenho profissional com botão de ação, formato compacto.', 'Titânio Natural', '128GB', 'R$ 6.999', '/src/assets/iphone-15-pro-titanium.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 15', 'Dynamic Island, câmera de 48MP e design em alumínio premium.', 'Azul', '128GB', 'R$ 5.499', '/src/assets/iphone-15-blue.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 14 Pro Max', 'Tela sempre ligada, câmeras profissionais e chip A16 Bionic.', 'Roxo Profundo', '256GB', 'R$ 6.499', '/src/assets/iphone-14-pro-max-purple.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 14', 'Chip A15 Bionic, câmera dupla e bateria de longa duração.', 'Meia-noite', '128GB', 'R$ 4.999', '/src/assets/iphone-14-midnight.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 13', 'Ótimo custo-benefício, com chip A15 e câmera dupla de qualidade.', 'Azul', '128GB', 'R$ 3.999', '/src/assets/iphone-13-blue.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 12', 'Tela Super Retina XDR de 6,1 polegadas, 5G e câmera dupla com Modo Noite.', 'Azul', '128GB', 'R$ 3.299', '/src/assets/iphone-12-blue.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),
('iPhone 11', 'Excelente custo-benefício com câmera dupla, boa bateria e desempenho para o dia a dia.', 'Preto', '128GB', 'R$ 2.699', '/src/assets/iphone-11-black.jpg', 'Apple', 'f7e31c2e-a335-4c02-ae11-9c26b053ea9e', true),

-- SAMSUNG (7 produtos)
('Galaxy S24 Ultra', 'O melhor da Samsung, com S Pen integrada, câmera de 200MP e inteligência artificial.', 'Preto Phantom', '512GB', 'R$ 7.999', '/src/assets/samsung-s24-ultra-black.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy S24+', 'Tela grande de 6.7 polegadas, desempenho top e câmera profissional.', 'Preto Phantom', '256GB', 'R$ 6.499', '/src/assets/samsung-s24-plus-black.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy S24', 'Compacto e poderoso, ideal para quem busca qualidade em tamanho menor.', 'Creme', '256GB', 'R$ 5.799', '/src/assets/samsung-s24-cream.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy Z Fold 5', 'Smartphone dobrável premium, se transforma em tablet na palma da mão.', 'Preto Phantom', '512GB', 'R$ 9.999', '/src/assets/samsung-z-fold-5-black.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy Z Flip 5', 'Design dobrável compacto, tela externa maior e super estilo.', 'Creme', '256GB', 'R$ 5.999', '/src/assets/samsung-z-flip-5-cream.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy A55', 'Excelente custo-benefício, câmera de 50MP e bateria de 5000mAh.', 'Azul Claro', '128GB', 'R$ 2.499', '/src/assets/samsung-a55-blue.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),
('Galaxy A35', 'Intermediário premium com recursos avançados e preço acessível.', 'Azul Escuro', '128GB', 'R$ 1.899', '/src/assets/samsung-a35-navy.jpg', 'Samsung', '43a471ba-3c86-41dc-8bee-546acc6676af', true),

-- XIAOMI (6 produtos)
('Xiaomi 14 Pro', 'Top de linha com câmera Leica, carregamento ultra rápido e design premium.', 'Preto', '512GB', 'R$ 5.799', '/src/assets/xiaomi-14-pro-black.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),
('Xiaomi 14', 'Potência flagship em tamanho compacto, com câmera Leica e AMOLED.', 'Branco', '256GB', 'R$ 4.999', '/src/assets/xiaomi-14-white.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),
('Xiaomi 13T Pro', 'Câmera de 50MP, carregamento de 120W e chip MediaTek Dimensity 9200+.', 'Preto Meia-Noite', '256GB', 'R$ 3.999', '/src/assets/xiaomi-13t-pro-black.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),
('Redmi Note 13 Pro', 'Melhor custo-benefício, com câmera de 200MP e carregamento de 67W.', 'Azul', '256GB', 'R$ 2.999', '/src/assets/redmi-note-13-pro-blue.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),
('Poco X6 Pro', 'Focado em performance gaming, com chip MediaTek Dimensity 8300 Ultra.', 'Amarelo', '256GB', 'R$ 2.499', '/src/assets/poco-x6-pro-yellow.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),
('Redmi 12', 'Entrada premium com tela de 90Hz, câmera de 50MP e bateria gigante.', 'Azul Céu', '128GB', 'R$ 1.299', '/src/assets/redmi-12-blue.jpg', 'Xiaomi', '4e7b4ef9-ef7f-4945-82d3-4b0f49e4221b', true),

-- SMARTWATCHES (10 produtos)
('Samsung Galaxy Watch 6 44mm', 'Smartwatch premium com tela AMOLED, monitoramento de saúde avançado e Galaxy AI.', 'Preto', '44mm · Wear OS', 'R$ 1.799', '/src/assets/samsung-galaxy-watch-6-44mm.jpg', 'Samsung', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Samsung Galaxy Watch 5 40mm', 'Design elegante com sensor de temperatura corporal, GPS e bateria de longa duração.', 'Prata', '40mm · Wear OS', 'R$ 1.299', '/src/assets/samsung-galaxy-watch-5-40mm.jpg', 'Samsung', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Apple Watch Series 9 41mm', 'Relógio inteligente com chip S9, tela sempre ligada e recursos de saúde avançados.', 'Midnight', '41mm · watchOS', 'R$ 3.299', '/src/assets/apple-watch-series-9-41mm.jpg', 'Apple', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Apple Watch SE 2ª Geração 40mm', 'Versão acessível com detecção de quedas, monitoramento cardíaco e resistência à água.', 'Starlight', '40mm · watchOS', 'R$ 2.199', '/src/assets/apple-watch-se-40mm.jpg', 'Apple', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Huawei Watch GT 4 46mm', 'Bateria de até 14 dias, monitoramento de saúde 24h e design premium em aço inoxidável.', 'Preto', '46mm · HarmonyOS', 'R$ 1.499', '/src/assets/huawei-watch-gt4-46mm.jpg', 'Huawei', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Xiaomi Smart Band 8 Pro', 'Pulseira inteligente com GPS integrado, 150+ modos esportivos e bateria de 14 dias.', 'Preto', '1.74" AMOLED · Mi Fitness', 'R$ 499', '/src/assets/xiaomi-smart-band-8-pro.jpg', 'Xiaomi', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Amazfit Bip 5', 'Relógio acessível com Alexa integrada, monitoramento de oxigênio no sangue e bateria de 10 dias.', 'Preto', '1.91" TFT · Zepp OS', 'R$ 399', '/src/assets/amazfit-bip-5.jpg', 'Amazfit', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Redmi Watch 3 Active', 'Smartwatch básico com chamadas Bluetooth, 100+ modos esportivos e resistência à água 5 ATM.', 'Preto', '1.83" LCD · Mi Fitness', 'R$ 299', '/src/assets/redmi-watch-3-active.jpg', 'Xiaomi', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Samsung Galaxy Fit 3', 'Pulseira fitness com tela AMOLED, monitoramento de sono e até 13 dias de bateria.', 'Preto', '1.6" AMOLED · Samsung Health', 'R$ 599', '/src/assets/samsung-galaxy-fit-3.jpg', 'Samsung', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),
('Huawei Band 9', 'Pulseira inteligente com tela AMOLED, 100+ modos esportivos e bateria de 14 dias.', 'Preto', '1.47" AMOLED · HarmonyOS', 'R$ 349', '/src/assets/huawei-band-9.jpg', 'Huawei', 'feecd755-e1cf-4ce1-bd98-5f80c5833b73', true),

-- PELÍCULAS (6 produtos)
('Película 3D iPhone', 'Proteção 3D com cobertura total da tela, borda a borda.', 'Transparente', NULL, 'R$ 49', '/src/assets/pelicula-3d.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),
('Película 3D Samsung', 'Película 3D para Galaxy S24, S23, A55 e outros modelos.', 'Transparente', NULL, 'R$ 45', '/src/assets/pelicula-3d.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),
('Película 11D', 'Máxima proteção com bordas reforçadas e instalação fácil.', 'Transparente', NULL, 'R$ 59', '/src/assets/pelicula-11d.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),
('Película de Privacidade', 'Protege sua tela de olhares curiosos, anti-espião 360°.', 'Preto', NULL, 'R$ 69', '/src/assets/pelicula-privacidade.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),
('Película Hidrogel Frente', 'Película flexível com auto-regeneração de riscos leves.', 'Transparente', NULL, 'R$ 39', '/src/assets/pelicula-hidrogel.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),
('Película Hidrogel Frente + Verso', 'Kit completo de proteção para frente e verso do aparelho.', 'Transparente', NULL, 'R$ 69', '/src/assets/pelicula-hidrogel.jpg', NULL, 'eb9415b9-1f0c-45d4-af69-8c817f241698', true),

-- CAPINHAS (6 produtos)
('Capinha Transparente Antishock iPhone', 'Proteção de quinas reforçadas, cristal transparente ultra fino.', 'Transparente', NULL, 'R$ 49', '/src/assets/capinha-transparente.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),
('Capinha Transparente Antishock Samsung', 'Compatível com Galaxy S24, S23, A55 e outros modelos.', 'Transparente', NULL, 'R$ 45', '/src/assets/capinha-transparente.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),
('Capinha Transparente Antishock Xiaomi', 'Proteção completa para Xiaomi 14, Redmi Note 13 e outros.', 'Transparente', NULL, 'R$ 39', '/src/assets/capinha-transparente.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),
('Capinha Silicone Colorida', 'Silicone macio, cores vibrantes, ótimo grip.', 'Diversas cores', NULL, 'R$ 39', '/src/assets/capinha-colorida.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),
('Capinha Premium MagSafe', 'Suporte magnético para carregamento sem fio rápido.', 'Preto / Transparente', NULL, 'R$ 89', '/src/assets/capinha-magsafe.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),
('Capinha Tipo Carteira', 'Compartimentos para cartões, suporte para vídeos.', 'Couro Sintético', NULL, 'R$ 79', '/src/assets/capinha-carteira.jpg', NULL, 'bc3b7045-14b0-4f16-ba92-9c90a00ddd65', true),

-- CARREGADORES (8 produtos)
('Carregador USB-C 20W para iPhone (Modelos Novos)', 'Fonte oficial USB-C 20W para carregar rapidamente os iPhones mais novos com cabo USB-C.', 'Branco', 'iPhone 15 e posteriores', 'R$ 129,90', '/src/assets/fonte-usbc-20w-iphone-novo.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Carregador USB 20W para iPhone (Modelos Antigos)', 'Fonte 20W para usar com cabo Lightning, ideal para os iPhones anteriores à linha 15.', 'Branco', 'iPhone 8 ao iPhone 14', 'R$ 119,90', '/src/assets/fonte-usb-20w-iphone-antigo.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Cabo USB-C para USB-C Reforçado 1m', 'Cabo reforçado de 1 metro, ideal para carregamento rápido e transferência de dados.', 'Branco', 'iPhone 15, Android, iPad', 'R$ 59,90', '/src/assets/cabo-usb-c.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Cabo USB-C para Lightning 1m', 'Cabo para usar iPhones com Lightning em fontes USB-C, carregamento rápido e seguro.', 'Branco', 'iPhone 8 ao 14, iPhone SE', 'R$ 89,90', '/src/assets/cabo-usbc-lightning.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Cabo USB para Lightning 1m', 'Cabo clássico USB para Lightning, ideal para uso com fontes antigas e computadores.', 'Branco', 'iPhone 5 ao 14, iPhone SE', 'R$ 69,90', '/src/assets/cabo-lightning.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Carregador Turbo 25W Samsung', 'Carregamento rápido oficial para diversos modelos Samsung Galaxy.', 'Branco', 'Galaxy com Super Fast Charging', 'R$ 139,90', '/src/assets/carregador-samsung-25w.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Carregador Turbo 45W Samsung', 'Máxima velocidade de carregamento para Galaxy Ultra e modelos premium.', 'Branco', 'Galaxy Ultra e S Series', 'R$ 179,90', '/src/assets/carregador-45w.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),
('Carregador Veicular Dual USB', 'Duas portas USB para carregar até dois aparelhos ao mesmo tempo no carro.', 'Preto', 'Todos os smartphones', 'R$ 79,90', '/src/assets/carregador-veicular.jpg', NULL, 'a4b2ba64-6d6d-4171-81c7-3c10bc5fb535', true),

-- FONES (6 produtos)
('Fone Bluetooth TWS Pro', 'Cancelamento de ruído ativo, graves potentes, até 24h de bateria.', 'Branco / Preto', NULL, 'R$ 149', '/src/assets/fone-bluetooth.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),
('Fone Bluetooth TWS Lite', 'Qualidade de som premium, confortável para uso prolongado.', 'Branco', NULL, 'R$ 89', '/src/assets/fone-bluetooth.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),
('Fone Bluetooth Esportivo', 'À prova d''água IPX7, gancho de orelha ajustável.', 'Preto', NULL, 'R$ 119', '/src/assets/fone-esportivo.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),
('Fone com Fio P2', 'Som cristalino, microfone integrado, conector universal.', 'Branco', NULL, 'R$ 29', '/src/assets/fone-p2.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),
('Caixa de Som Bluetooth', 'Som potente 360°, resistente à água, até 12h de autonomia.', 'Preto', NULL, 'R$ 199', '/src/assets/caixa-som-360.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),
('Caixa de Som Portátil Mini', 'Compacta e potente, perfeita para levar para qualquer lugar.', 'Diversas cores', NULL, 'R$ 79', '/src/assets/caixa-som-mini.jpg', NULL, 'dfff4bed-516c-4513-b466-98887acebccf', true),

-- POWER BANK (6 produtos)
('Power Bank 10.000mAh', 'Compacto e leve, carrega até 2x seu smartphone, display digital.', 'Preto', NULL, 'R$ 89', '/src/assets/power-bank-10000.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),
('Power Bank 20.000mAh', 'Alta capacidade, carrega múltiplos dispositivos, entrada e saída rápida.', 'Preto / Branco', NULL, 'R$ 149', '/src/assets/power-bank.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),
('Power Bank 30.000mAh', 'Máxima autonomia, ideal para viagens longas e uso intenso.', 'Preto', NULL, 'R$ 199', '/src/assets/power-bank-30000.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),
('Carregador Magnético MagSafe', 'Carregamento sem fio magnético, compatível com iPhone 12+.', 'Branco', NULL, 'R$ 129', '/src/assets/magsafe-charger.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),
('Estação de Carregamento 3 em 1', 'Carregue iPhone, Apple Watch e AirPods simultaneamente.', 'Branco / Preto', NULL, 'R$ 249', '/src/assets/estacao-3em1.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),
('Base de Carregamento Sem Fio', 'Carregamento wireless 15W, design premium em alumínio.', 'Preto', NULL, 'R$ 99', '/src/assets/base-wireless.jpg', NULL, '8e61e146-38c6-4b9e-94f9-2b55a465634e', true),

-- ACESSÓRIOS GERAIS (6 produtos)
('Capinha Premium', 'Proteção completa com design elegante, disponível para iPhone, Samsung e Xiaomi.', 'Transparente', NULL, 'R$ 89', '/src/assets/capinha-transparente.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true),
('Película de Vidro 3D', 'Proteção de tela ultra resistente com cobertura total e toque suave.', 'Transparente', NULL, 'R$ 49', '/src/assets/pelicula-3d.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true),
('Carregador Turbo', 'Carregamento rápido de 30W a 67W, compatível com diversos modelos.', 'Branco', NULL, 'R$ 79', '/src/assets/carregador-turbo.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true),
('Fone Bluetooth Premium', 'Cancelamento de ruído ativo, graves potentes e bateria de longa duração.', 'Preto', NULL, 'R$ 249', '/src/assets/fone-bluetooth.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true),
('Power Bank 20000mAh', 'Carregue seu celular múltiplas vezes, ideal para viagens e uso intenso.', 'Preto', NULL, 'R$ 149', '/src/assets/power-bank.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true),
('Cabo USB-C Original', 'Cabo reforçado com suporte a carregamento rápido e transferência de dados.', 'Branco', NULL, 'R$ 39', '/src/assets/cabo-usb-c.jpg', NULL, '2f34d7e8-393f-400d-b6fe-e9c3f16d1ad8', true);