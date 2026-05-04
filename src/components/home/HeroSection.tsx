import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import heroBag from "@/assets/hero-bag.jpg";
import bag2 from "@/assets/bolsa_dominique.jpg";
import bag3 from "@/assets/bolsa_marina.jpg";

const products = [
  {
    image: heroBag,
    name: "Tote Milano",
    price: "R$ 1.290",
  },
  {
    image: bag2,
    name: "Dominique",
    price: "R$ 1.490",
  },
  {
    image: bag3,
    name: "Marina",
    price: "R$ 990",
  },
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + products.length) % products.length);
  };

  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[88vh] py-16 lg:py-24">

        {/* TEXT */}
        <div className="relative z-10 max-w-xl animate-fade-in">
          <span className="eyebrow mb-6">Coleção Outono · 2026</span>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mt-4">
            Couro que conta
            <span className="block italic font-medium text-accent mt-2">
              a sua história.
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground mt-6 leading-relaxed max-w-md">
            Bolsas artesanais em couro legítimo, curtido ao vegetal e costuradas à mão.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-10">
            <Button variant="primary" size="xl" asChild>
              <Link to="/produtos">Ver Coleção</Link>
            </Button>
            <Button variant="minimal" size="xl" asChild>
              <Link to="/sobre">Nossa História</Link>
            </Button>
          </div>
        </div>

        {/* IMAGE CAROUSEL */}
        <div className="relative w-full max-w-lg mx-auto animate-fade-in" style={{ perspective: 1000 }}>

          {/* glow */}
          <div className="absolute -inset-6 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-sm blur-2xl" />

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-product">

            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={products[index].image}
                alt={products[index].name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -50) paginate(1);
                  if (info.offset.x > 50) paginate(-1);
                }}
              />
            </AnimatePresence>

          </div>

          {/* CARD */}
          <motion.div
            key={index + "card"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-background border border-border px-5 py-4 shadow-medium hidden sm:block"
          >
            <div className="text-xs tracking-widest uppercase text-muted-foreground">
              Destaque
            </div>
            <div className="font-display text-lg font-medium mt-1">
              {products[index].name}
            </div>
            <div className="text-sm text-accent mt-0.5">
              {products[index].price}
            </div>
          </motion.div>

          {/* CONTROLS */}
          <div className="absolute bottom-4 right-4 flex gap-2 z-10">
            <button
              onClick={() => paginate(-1)}
              className="bg-white/80 backdrop-blur px-3 py-1 text-sm rounded"
            >
              ←
            </button>
            <button
              onClick={() => paginate(1)}
              className="bg-white/80 backdrop-blur px-3 py-1 text-sm rounded"
            >
              →
            </button>
          </div>

          {/* DOTS */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};