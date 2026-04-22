import { useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { slugify } from "@/lib/slug";

export type BrandChatTarget = {
  brandName: string;
  brandSlug?: string;
  productKey: string | number;
  productName: string;
  productImage?: string;
};

type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: BrandChatTarget;
}

const BrandChatDrawer = ({ open, onOpenChange, target }: Props) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const brandSlug = target.brandSlug ?? slugify(target.brandName);
  const productKey = String(target.productKey);

  // Auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUserId(data.session?.user.id ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setUserId(s?.user.id ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Init conversation when drawer opens
  useEffect(() => {
    if (!open || !userId) return;
    let cancelled = false;

    (async () => {
      setLoading(true);

      // 1. find existing
      const { data: existing } = await supabase
        .from("conversations")
        .select("id")
        .eq("buyer_id", userId)
        .eq("brand_slug", brandSlug)
        .eq("product_key", productKey)
        .maybeSingle();

      let convId = existing?.id ?? null;

      // 2. create if missing
      if (!convId) {
        // Try to resolve seller_user_id from seller_profiles (best effort)
        const { data: sellerProfile } = await supabase
          .from("seller_profiles")
          .select("user_id")
          .eq("brand_name", target.brandName)
          .maybeSingle();

        const { data: created, error } = await supabase
          .from("conversations")
          .insert({
            buyer_id: userId,
            seller_user_id: sellerProfile?.user_id ?? null,
            brand_slug: brandSlug,
            brand_name: target.brandName,
            product_key: productKey,
            product_name: target.productName,
            product_image: target.productImage ?? null,
          })
          .select("id")
          .single();

        if (error) {
          toast({ title: "Couldn't start chat", description: error.message, variant: "destructive" });
          setLoading(false);
          return;
        }
        convId = created.id;
      }

      if (cancelled) return;
      setConversationId(convId);

      // 3. load messages
      const { data: msgs } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (!cancelled) setMessages(msgs ?? []);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [open, userId, brandSlug, productKey, target.brandName, target.productName, target.productImage]);

  // Realtime subscription
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((prev) =>
            prev.some((m) => m.id === (payload.new as Message).id) ? prev : [...prev, payload.new as Message],
          );
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !conversationId || !userId) return;
    setSending(true);
    const { error } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, sender_id: userId, content: text });
    if (error) {
      toast({ title: "Send failed", description: error.message, variant: "destructive" });
    } else {
      setInput("");
    }
    setSending(false);
  };

  // Not signed in state
  if (open && !userId) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="flex flex-col gap-6 sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-serif">Chat with {target.brandName}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in to start a conversation with the brand about customisation.
            </p>
            <Button onClick={() => { onOpenChange(false); navigate("/auth"); }} className="rounded-full">
              Sign in to chat
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-4 text-left">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              {target.productImage && <AvatarImage src={target.productImage} alt={target.brandName} />}
              <AvatarFallback>{target.brandName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <SheetTitle className="font-serif text-base">{target.brandName}</SheetTitle>
              <p className="truncate text-xs text-muted-foreground">About: {target.productName}</p>
            </div>
          </div>
        </SheetHeader>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Start the conversation</p>
              <p className="max-w-xs">
                Ask about colour swaps, size tweaks, monograms, or anything you'd like customised.
              </p>
            </div>
          ) : (
            messages.map((m) => {
              const mine = m.sender_id === userId;
              return (
                <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      mine
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-background text-foreground border border-border"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.content}</p>
                    <p className={`mt-1 text-[10px] ${mine ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {new Date(m.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Composer */}
        <form onSubmit={send} className="flex items-center gap-2 border-t border-border bg-background p-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message…"
            disabled={sending || !conversationId}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={sending || !input.trim() || !conversationId} className="rounded-full">
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default BrandChatDrawer;
