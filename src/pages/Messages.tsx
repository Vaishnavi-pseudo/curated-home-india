import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, MessageCircle, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Conversation = {
  id: string;
  buyer_id: string;
  seller_user_id: string | null;
  brand_slug: string;
  brand_name: string;
  product_key: string;
  product_name: string;
  product_image: string | null;
  last_message_at: string;
};

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

const Messages = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user.id ?? null);
      setAuthChecked(true);
      if (!data.session) navigate("/auth");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user.id ?? null));
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  // Load conversations (buyer OR seller side, RLS handles filtering)
  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("last_message_at", { ascending: false });
      if (error) {
        toast({ title: "Failed to load conversations", description: error.message, variant: "destructive" });
        return;
      }
      setConversations(data ?? []);
      if ((data?.length ?? 0) > 0 && !activeId) setActiveId(data![0].id);
    })();
  }, [userId, activeId]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    (async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", activeId)
        .order("created_at", { ascending: true });
      setMessages(data ?? []);
    })();

    const channel = supabase
      .channel(`messages-page:${activeId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${activeId}` },
        (payload) =>
          setMessages((prev) =>
            prev.some((m) => m.id === (payload.new as Message).id) ? prev : [...prev, payload.new as Message],
          ),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !activeId || !userId) return;
    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert({ conversation_id: activeId, sender_id: userId, content: text });
    if (error) toast({ title: "Send failed", description: error.message, variant: "destructive" });
    else setInput("");
    setSending(false);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const active = conversations.find((c) => c.id === activeId) ?? null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="container mx-auto flex-1 px-4 py-8 lg:px-8">
        <h1 className="mb-6 font-serif text-3xl font-bold text-foreground">Messages</h1>

        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <MessageCircle className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="font-serif text-lg text-foreground">No conversations yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a product and tap the chat icon to talk to a brand.
            </p>
            <Button className="mt-4 rounded-full" onClick={() => navigate("/categories")}>
              Browse products
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-[280px_1fr]">
            {/* Conversation list */}
            <aside className="overflow-hidden rounded-2xl border border-border bg-card">
              <ul className="max-h-[70vh] divide-y divide-border overflow-y-auto">
                {conversations.map((c) => {
                  const isSeller = c.seller_user_id === userId;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setActiveId(c.id)}
                        className={`flex w-full items-center gap-3 p-3 text-left transition-colors ${
                          activeId === c.id ? "bg-muted" : "hover:bg-muted/50"
                        }`}
                      >
                        <Avatar className="h-10 w-10 shrink-0">
                          {c.product_image && <AvatarImage src={c.product_image} alt={c.brand_name} />}
                          <AvatarFallback>{c.brand_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {isSeller ? "Buyer inquiry" : c.brand_name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">{c.product_name}</p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Active thread */}
            <section className="flex h-[70vh] flex-col overflow-hidden rounded-2xl border border-border bg-card">
              {active ? (
                <>
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <Avatar className="h-10 w-10">
                      {active.product_image && <AvatarImage src={active.product_image} alt={active.brand_name} />}
                      <AvatarFallback>{active.brand_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-base text-foreground">{active.brand_name}</p>
                      <p className="truncate text-xs text-muted-foreground">About: {active.product_name}</p>
                    </div>
                  </div>

                  <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
                    {messages.map((m) => {
                      const mine = m.sender_id === userId;
                      return (
                        <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                              mine
                                ? "rounded-br-sm bg-primary text-primary-foreground"
                                : "rounded-bl-sm border border-border bg-background text-foreground"
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words">{m.content}</p>
                            <p
                              className={`mt-1 text-[10px] ${
                                mine ? "text-primary-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {new Date(m.created_at).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={send} className="flex items-center gap-2 border-t border-border bg-background p-3">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type a message…"
                      disabled={sending}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={sending || !input.trim()} className="rounded-full">
                      {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Select a conversation
                </div>
              )}
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
