import { Layout } from "@/components/layout/Layout";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { Award, Leaf, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import craftImg from "@/assets/craft.jpg";

const values = [
  { icon: Leaf, title: "Curtimento responsável", text: "Couros selecionados de curtumes certificados, com processos de baixo impacto." },
  { icon: Award, title: "Trabalho artesanal", text: "Cada bolsa é cortada e costurada à mão por mestres com décadas de ofício." },
  { icon: Heart, title: "Design atemporal", text: "Peças longe das tendências passageiras — feitas para envelhecer com beleza." },
  { icon: Sparkles, title: "Acabamento premium", text: "Forros nobres, ferragens em latão e detalhes que se notam ao tocar." },
];

const About = () => (
  <Layout>
    <div className="container-custom py-8">
      <BreadcrumbNav items={[{ label: "Sobre Nós" }]} />

      {/* Intro */}
      <section className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-20">
        <div>
          <span className="eyebrow">Nossa história</span>
          <h1 className="font-display text-4xl md:text-5xl font-medium mt-4 leading-tight">
            Bolsas que envelhecem
            <span className="block italic text-accent">com beleza.</span>
          </h1>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            A Dolutti nasceu do amor pelo couro legítimo e pelo trabalho feito com tempo. Acreditamos em peças que ganham caráter ao serem usadas — companheiras de uma vida inteira, longe do descartável.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Cada bolsa passa pelas mãos de mestres artesãos, é montada com couros curtidos ao vegetal e finalizada com costuras à mão. Não fazemos coleções enormes — fazemos peças que duram.
          </p>
        </div>
        <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-product">
          <img src={craftImg} alt="Artesão costurando bolsa de couro" loading="lazy" className="w-full h-full object-cover" width={1280} height={1280} />
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-t border-border">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="eyebrow">O que defendemos</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium mt-4">Nossos valores</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v) => (
            <div key={v.title} className="text-center">
              <v.icon className="h-7 w-7 mx-auto text-accent mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-lg font-medium">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-border text-center">
        <h2 className="font-display text-3xl md:text-4xl font-medium">Conheça a coleção</h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">
          Descubra bolsas pensadas para acompanhar você por toda a vida.
        </p>
        <Button variant="primary" size="xl" className="mt-8" asChild>
          <Link to="/produtos">Ver bolsas</Link>
        </Button>
      </section>
    </div>
  </Layout>
);

export default About;
