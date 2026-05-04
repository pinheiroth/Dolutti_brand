import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const groups = [
  {
    title: "Pedidos & Entrega",
    items: [
      { q: "Qual o prazo de entrega?", a: "O prazo varia de 3 a 10 dias úteis, dependendo da região. Despachamos em até 48h úteis após a confirmação do pagamento." },
      { q: "O frete é grátis?", a: "Sim! Para compras acima de R$ 499 o frete é grátis para todo o Brasil." },
      { q: "Como acompanho meu pedido?", a: "Após o envio, você receberá o código de rastreio por email. Também é possível acompanhar pela área Minha Conta." },
    ],
  },
  {
    title: "Pagamento",
    items: [
      { q: "Quais formas de pagamento são aceitas?", a: "Cartão de crédito (até 10x sem juros), PIX (5% de desconto) e boleto bancário." },
      { q: "É seguro comprar no site?", a: "Sim. Todos os pagamentos são processados em ambiente criptografado, seguindo padrões internacionais." },
    ],
  },
  {
    title: "Couro & Cuidados",
    items: [
      { q: "Vocês usam couro legítimo?", a: "Sim, 100% das nossas bolsas são feitas em couro bovino legítimo, curtido ao vegetal por curtumes selecionados." },
      { q: "Como cuidar da minha bolsa?", a: "Evite umidade prolongada, exposição direta ao sol e produtos químicos. Limpe com pano seco e use hidratante de couro a cada 6 meses." },
      { q: "O couro escurece com o tempo?", a: "Sim, é uma característica natural e desejada do couro vegetal — desenvolve uma pátina única que conta a história da peça." },
    ],
  },
  {
    title: "Trocas & Garantia",
    items: [
      { q: "Como faço para trocar ou devolver?", a: "Você tem até 30 dias para solicitar troca ou devolução. Entre em contato pelo email contato@dolutti.com.br." },
      { q: "Existe garantia?", a: "Sim. Todas as bolsas Dolutti têm 1 ano de garantia contra defeitos de fabricação." },
    ],
  },
];

const FAQ = () => (
  <Layout>
    <div className="container-custom py-8">
      <BreadcrumbNav items={[{ label: "FAQ" }]} />
      <div className="max-w-3xl mx-auto py-12">
        <div className="text-center mb-14">
          <span className="eyebrow">Ajuda</span>
          <h1 className="font-display text-4xl md:text-5xl font-medium mt-4">Perguntas Frequentes</h1>
          <p className="text-muted-foreground mt-4">Tudo o que você precisa saber antes e depois da compra.</p>
        </div>

        <div className="space-y-12">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="font-display text-2xl font-medium mb-4 pb-3 border-b border-border">{group.title}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {group.items.map((faq, i) => (
                  <AccordionItem key={i} value={`${group.title}-${i}`} className="border-b border-border last:border-b-0">
                    <AccordionTrigger className="text-left hover:text-accent hover:no-underline">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-secondary/50 rounded-sm text-center">
          <h3 className="font-display text-xl font-medium">Não encontrou sua resposta?</h3>
          <p className="text-muted-foreground mt-2 mb-4 text-sm">Nossa equipe está pronta para ajudar.</p>
          <a href="/contato" className="text-accent font-medium hover:underline text-sm">Fale conosco →</a>
        </div>
      </div>
    </div>
  </Layout>
);

export default FAQ;
