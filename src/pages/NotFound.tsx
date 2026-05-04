import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: rota não encontrada:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom py-24 md:py-32 text-center">
        <span className="eyebrow">Erro 404</span>
        <h1 className="font-display text-7xl md:text-8xl font-light mt-4 text-accent">404</h1>
        <h2 className="font-display text-3xl md:text-4xl font-medium mt-4">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto leading-relaxed">
          A página que você procura pode ter sido movida ou não existe mais.
          Que tal explorar nossas bolsas?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Button variant="primary" size="lg" asChild>
            <Link to="/">Voltar ao início</Link>
          </Button>
          <Button variant="minimal" size="lg" asChild>
            <Link to="/produtos">Ver bolsas</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
