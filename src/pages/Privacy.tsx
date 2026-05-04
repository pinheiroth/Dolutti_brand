import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";

const sections = [
  { t: "1. Informações que Coletamos", c: "Coletamos dados de cadastro (nome, email, telefone, endereço), informações de pagamento processadas por parceiros certificados e dados de navegação para melhorar sua experiência." },
  { t: "2. Como Usamos suas Informações", c: "Usamos seus dados para processar pedidos, enviar comunicações sobre suas compras, oferecer suporte e — com seu consentimento — enviar novidades e ofertas." },
  { t: "3. Compartilhamento", c: "Não vendemos seus dados. Compartilhamos apenas com parceiros essenciais à operação (transportadoras, processadores de pagamento), sob acordos de confidencialidade." },
  { t: "4. Cookies", c: "Utilizamos cookies para personalizar conteúdo, analisar tráfego e lembrar suas preferências. Você pode gerenciar cookies nas configurações do seu navegador." },
  { t: "5. Segurança", c: "Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição." },
  { t: "6. Seus Direitos (LGPD)", c: "Você pode solicitar acesso, correção, exclusão ou portabilidade dos seus dados pessoais. Basta entrar em contato pelo email contato@dolutti.com.br." },
  { t: "7. Retenção", c: "Mantemos seus dados pelo tempo necessário ao cumprimento das finalidades descritas e às obrigações legais aplicáveis." },
  { t: "8. Alterações", c: "Esta política pode ser atualizada. Recomendamos consulta periódica para se manter informado sobre como protegemos seus dados." },
];

const Privacy = () => (
  <Layout>
    <div className="container-custom py-8">
      <BreadcrumbNav items={[{ label: "Política de Privacidade" }]} />
      <div className="max-w-3xl mx-auto py-12">
        <span className="eyebrow">Legal</span>
        <h1 className="font-display text-4xl md:text-5xl font-medium mt-4 mb-3">Política de Privacidade</h1>
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

export default Privacy;
