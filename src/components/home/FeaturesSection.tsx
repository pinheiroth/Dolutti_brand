import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "Em compras acima de R$ 499",
  },
  {
    icon: RefreshCw,
    title: "Troca Fácil",
    description: "30 dias para trocar ou devolver",
  },
  {
    icon: Shield,
    title: "Couro Legítimo",
    description: "Garantia de 1 ano em todas as bolsas",
  },
  {
    icon: Headphones,
    title: "Suporte",
    description: "Atendimento de segunda a sábado",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-16 border-y border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-8 w-8 mx-auto text-accent mb-4" strokeWidth={1.5} />
              <h3 className="font-medium text-sm">{feature.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
