import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ArrowLeft, Star, MessageCircle, Package, Shield, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [question, setQuestion] = useState("");
  const [questionName, setQuestionName] = useState("");

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, categories(name)")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: reviews } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", id)
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["questions", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_questions")
        .select("*")
        .eq("product_id", id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reviews").insert({
        product_id: id,
        customer_name: customerName,
        rating,
        review_text: reviewText,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Avaliação enviada! Será publicada após aprovação.");
      setReviewText("");
      setCustomerName("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
    },
  });

  const addQuestionMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("product_questions").insert({
        product_id: id,
        customer_name: questionName,
        question,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Pergunta enviada! Responderemos em breve.");
      setQuestion("");
      setQuestionName("");
      queryClient.invalidateQueries({ queryKey: ["questions", id] });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  const avgRating = reviews?.length
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <Badge className="mb-2">{product.categories?.name}</Badge>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              {reviews && reviews.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= avgRating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <span>
                    {avgRating.toFixed(1)} ({reviews.length} avaliações)
                  </span>
                </div>
              )}
            </div>

            <div className="text-4xl font-bold text-primary">
              {product.price_text}
            </div>

            {product.description && (
              <p className="text-muted-foreground">{product.description}</p>
            )}

            <div className="space-y-3">
              {product.color && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Cor:</span>
                  <span className="font-semibold">{product.color}</span>
                </div>
              )}
              {product.storage && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    Armazenamento:
                  </span>
                  <span className="font-semibold">{product.storage}</span>
                </div>
              )}
              {product.brand && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Marca:</span>
                  <span className="font-semibold">{product.brand}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Entrega Rápida</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Garantia</p>
              </div>
              <div className="text-center">
                <Package className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Original</p>
              </div>
            </div>

            <div className="space-y-3">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                productPrice={product.price || 0}
                productPriceText={product.price_text || ""}
                productImage={product.image_url}
                productColor={product.color}
                productStorage={product.storage}
                className="w-full h-14 text-lg"
              />
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                productPrice={product.price || 0}
                productPriceText={product.price_text || ""}
                productImage={product.image_url}
                productColor={product.color}
                productStorage={product.storage}
                redirectToCheckout={true}
                variant="secondary"
                className="w-full h-14 text-lg"
              />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="reviews">
              Avaliações ({reviews?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="questions">
              Perguntas ({questions?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="text-xl font-bold">Especificações Técnicas</h3>
              {product.brand && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Marca</span>
                  <span className="font-semibold">{product.brand}</span>
                </div>
              )}
              {product.color && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Cor</span>
                  <span className="font-semibold">{product.color}</span>
                </div>
              )}
              {product.storage && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Armazenamento</span>
                  <span className="font-semibold">{product.storage}</span>
                </div>
              )}
              {product.compatibility && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Compatibilidade</span>
                  <span className="font-semibold">{product.compatibility}</span>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6 space-y-6">
            {/* Review Form */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Deixe sua avaliação</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Sua nota
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        type="button"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  placeholder="Seu nome"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <Textarea
                  placeholder="Escreva sua avaliação..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                />
                <Button
                  onClick={() => addReviewMutation.mutate()}
                  disabled={!customerName || !reviewText}
                >
                  Enviar Avaliação
                </Button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {reviews?.map((review) => (
                <div
                  key={review.id}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{review.customer_name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.review_text}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(review.created_at).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-6 space-y-6">
            {/* Question Form */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold mb-4">Faça uma pergunta</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Seu nome"
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                />
                <Textarea
                  placeholder="Digite sua pergunta..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={3}
                />
                <Button
                  onClick={() => addQuestionMutation.mutate()}
                  disabled={!questionName || !question}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar Pergunta
                </Button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions?.map((q) => (
                <div
                  key={q.id}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <MessageCircle className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="font-semibold mb-1">{q.customer_name}</p>
                      <p className="text-muted-foreground">{q.question}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(q.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  {q.answer && (
                    <div className="ml-8 mt-4 pl-4 border-l-2 border-primary">
                      <p className="font-semibold text-sm mb-1">Resposta:</p>
                      <p className="text-muted-foreground">{q.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
