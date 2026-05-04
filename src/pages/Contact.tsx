import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast({ title: "Mensagem enviada!", description: "Responderemos em breve." });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <BreadcrumbNav items={[{ label: "Contato" }]} />
        <div className="max-w-6xl mx-auto py-12">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="eyebrow">Atendimento</span>
            <h1 className="font-display text-4xl md:text-5xl font-medium mt-4">Fale com a Dolutti</h1>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Estamos aqui para ajudar com pedidos, produtos e qualquer dúvida sobre nossas bolsas em couro.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              {[
                { icon: Mail, title: "Email", value: "contato@dolutti.com.br", sub: "Respondemos em até 24h úteis" },
                { icon: MessageCircle, title: "WhatsApp", value: "(11) 99999-9999", sub: "Atendimento direto" },
                { icon: Phone, title: "Telefone", value: "(11) 3000-0000", sub: "Seg–Sex, 9h às 18h" },
                { icon: MapPin, title: "Atelier", value: "Rua Augusta, 1234 — Jardins, SP", sub: "Visitas com agendamento" },
                { icon: Clock, title: "Horário", value: "Segunda a Sábado", sub: "9h às 18h (Sáb. até 14h)" },
              ].map((it) => (
                <div key={it.title} className="flex items-start gap-4 p-5 border border-border bg-card rounded-sm">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <it.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest text-muted-foreground">{it.title}</h3>
                    <p className="font-medium mt-1">{it.value}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{it.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 bg-card border border-border p-8 rounded-sm space-y-5">
              <h2 className="font-display text-2xl font-medium">Envie sua mensagem</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input required />
                </div>
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input type="email" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Assunto</Label>
                  <Input placeholder="Sobre o que deseja falar?" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Mensagem *</Label>
                <Textarea rows={6} required placeholder="Como podemos ajudar?" />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                <Send className="h-4 w-4 mr-2" />
                {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
