import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";

const sections = [
  { t: "1. Aceitação dos Termos", c: "Ao acessar e utilizar o site da Dolutti, você concorda com estes Termos de Uso. Caso não concorde, pedimos que não utilize o site." },
  { t: "2. Cadastro e Conta", c: "Você é responsável pelas informações fornecidas no cadastro e por manter a confidencialidade da sua conta e senha." },
  { t: "3. Produtos e Disponibilidade", c: "As imagens são meramente ilustrativas. Pequenas variações de tonalidade podem ocorrer por se tratar de couro natural — uma característica do material." },
  { t: "4. Preços e Pagamento", c: "Os preços estão em reais (R$) e podem ser alterados sem aviso prévio. A confirmação de pagamento é necessária para o envio do pedido." },
  { t: "5. Entrega", c: "Os prazos de entrega são estimativas e contam a partir da postagem. Atrasos por parte das transportadoras estão sujeitos às políticas dos parceiros." },
  { t: "6. Trocas e Devoluções", c: "Você tem até 30 dias após o recebimento para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor." },
  { t: "7. Garantia", c: "As bolsas Dolutti possuem 1 ano de garantia contra defeitos de fabricação. A garantia não cobre desgaste natural pelo uso." },
  { t: "8. Propriedade Intelectual", c: "Todo o conteúdo do site (textos, imagens, marca) é de propriedade da Dolutti e protegido por leis de direitos autorais." },
  { t: "9. Foro", c: "Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer questões relativas a estes termos." },
];

const Terms = () => (
  <Layout>
    <div className="container-custom py-8">
      <BreadcrumbNav items={[{ label: "Termos de Uso" }]} />
      <div className="max-w-3xl mx-auto py-12">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-4xl md:text-5xl font-medium mt-4 mb-3">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-12">Última atualização: Abril de 2026</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.t}>
              <h2 className="font-display text-xl font-medium mb-3">{s.t}</h2>
              <p className="text-muted-foreground leading-relaxed">{s.c}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default Terms;
