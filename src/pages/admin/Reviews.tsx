import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Star, Check, X, MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Reviews() {
  const queryClient = useQueryClient();
  const [answerText, setAnswerText] = useState<{ [key: string]: string }>({});

  const { data: reviews } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, products(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: questions } = useQuery({
    queryKey: ["admin-questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_questions")
        .select("*, products(name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approveReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: true })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Avaliação aprovada");
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Avaliação removida");
    },
  });

  const answerQuestionMutation = useMutation({
    mutationFn: async ({ id, answer }: { id: string; answer: string }) => {
      const { error } = await supabase
        .from("product_questions")
        .update({ answer, answered_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questions"] });
      toast.success("Resposta enviada");
      setAnswerText({});
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("product_questions")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-questions"] });
      toast.success("Pergunta removida");
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Star className="w-8 h-8" />
            Avaliações e Perguntas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie avaliações e responda perguntas
          </p>
        </div>

        <Tabs defaultValue="reviews">
          <TabsList>
            <TabsTrigger value="reviews">
              Avaliações ({reviews?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="questions">
              Perguntas ({questions?.filter((q) => !q.answer).length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Nota</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews?.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-semibold">
                        {review.products?.name}
                      </TableCell>
                      <TableCell>{review.customer_name}</TableCell>
                      <TableCell>
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
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {review.review_text}
                      </TableCell>
                      <TableCell>
                        {review.is_approved ? (
                          <Badge className="bg-green-500">Aprovado</Badge>
                        ) : (
                          <Badge variant="secondary">Pendente</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {new Date(review.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {!review.is_approved && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                approveReviewMutation.mutate(review.id)
                              }
                            >
                              <Check className="w-4 h-4 text-green-500" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              deleteReviewMutation.mutate(review.id)
                            }
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <div className="space-y-4">
              {questions?.map((question) => (
                <div
                  key={question.id}
                  className="bg-card rounded-xl border border-border p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="w-5 h-5 text-primary" />
                        <span className="font-semibold">
                          {question.products?.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {question.customer_name} •{" "}
                        {new Date(question.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                      <p className="text-foreground">{question.question}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        deleteQuestionMutation.mutate(question.id)
                      }
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>

                  {question.answer ? (
                    <div className="ml-6 pl-4 border-l-2 border-primary">
                      <p className="text-sm font-semibold mb-1">Resposta:</p>
                      <p className="text-muted-foreground">{question.answer}</p>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      <Textarea
                        placeholder="Digite sua resposta..."
                        value={answerText[question.id] || ""}
                        onChange={(e) =>
                          setAnswerText({
                            ...answerText,
                            [question.id]: e.target.value,
                          })
                        }
                        rows={3}
                      />
                      <Button
                        onClick={() =>
                          answerQuestionMutation.mutate({
                            id: question.id,
                            answer: answerText[question.id],
                          })
                        }
                        disabled={!answerText[question.id]}
                      >
                        Enviar Resposta
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
