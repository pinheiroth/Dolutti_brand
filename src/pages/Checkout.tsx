import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ChevronRight, CreditCard, Banknote, QrCode, Truck, ShieldCheck, Lock, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { isAuthenticated, addresses } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "pix" | "boleto">("credit");
  const [selectedAddress, setSelectedAddress] = useState(addresses.find(a => a.isDefault)?.id || addresses[0]?.id);
  
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
    installments: "1",
  });

  const shippingCost = totalPrice >= 499 ? 0 : 29.90;
  const total = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="font-display text-3xl mb-4">Seu carrinho está vazio</h1>
          <Button variant="primary" asChild>
            <Link to="/produtos">Continuar Comprando</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart();
    toast({ title: "Pedido realizado com sucesso!", description: "Você receberá um email com os detalhes." });
    navigate("/conta");
  };

  const steps = [
    { number: 1, label: "Endereço" },
    { number: 2, label: "Pagamento" },
    { number: 3, label: "Revisão" },
  ];

  return (
    <Layout>
      <div className="container-custom py-8">
        <BreadcrumbNav items={[{ label: "Carrinho", href: "/carrinho" }, { label: "Checkout" }]} />

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 my-8">
          {steps.map((s, index) => (
            <div key={s.number} className="flex items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  step >= s.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {step > s.number ? <Check className="h-5 w-5" /> : s.number}
              </div>
              <span className={cn(
                "ml-2 text-sm hidden sm:inline",
                step >= s.number ? "text-foreground" : "text-muted-foreground"
              )}>
                {s.label}
              </span>
              {index < steps.length - 1 && (
                <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="bg-card rounded-sm p-6 border border-border">
                <h2 className="font-display text-2xl font-medium mb-6">Endereço de Entrega</h2>

                {isAuthenticated && addresses.length > 0 ? (
                  <div className="space-y-4 mb-6">
                    <Label>Selecione um endereço salvo</Label>
                    <div className="grid gap-3">
                      {addresses.map((address) => (
                        <label
                          key={address.id}
                          className={cn(
                            "flex items-start gap-3 p-4 border rounded-sm cursor-pointer transition-colors",
                            selectedAddress === address.id ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground"
                          )}
                        >
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selectedAddress === address.id}
                            onChange={() => setSelectedAddress(address.id)}
                            className="mt-1"
                          />
                          <div>
                            <p className="font-medium">{address.name || "Endereço"}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.street}, {address.number} - {address.city}/{address.state}
                            </p>
                            <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    <Button variant="minimal" size="sm" asChild>
                      <Link to="/conta">Gerenciar endereços</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label>Nome completo *</Label>
                      <Input value={shippingData.name} onChange={(e) => setShippingData({ ...shippingData, name: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" value={shippingData.email} onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone *</Label>
                      <Input type="tel" value={shippingData.phone} onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>CEP *</Label>
                      <Input value={shippingData.zipCode} onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Rua *</Label>
                      <Input value={shippingData.street} onChange={(e) => setShippingData({ ...shippingData, street: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Número *</Label>
                      <Input value={shippingData.number} onChange={(e) => setShippingData({ ...shippingData, number: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Complemento</Label>
                      <Input value={shippingData.complement} onChange={(e) => setShippingData({ ...shippingData, complement: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Bairro *</Label>
                      <Input value={shippingData.neighborhood} onChange={(e) => setShippingData({ ...shippingData, neighborhood: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Cidade *</Label>
                      <Input value={shippingData.city} onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Estado *</Label>
                      <Input maxLength={2} value={shippingData.state} onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })} />
                    </div>
                  </div>
                )}

                <div className="flex justify-end mt-6">
                  <Button variant="primary" size="lg" onClick={() => setStep(2)}>
                    Continuar para Pagamento
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-card rounded-sm p-6 border border-border">
                <h2 className="font-display text-2xl font-medium mb-6">Forma de Pagamento</h2>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { id: "credit", label: "Cartão", icon: CreditCard },
                    { id: "pix", label: "PIX", icon: QrCode },
                    { id: "boleto", label: "Boleto", icon: Banknote },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 border rounded-sm transition-colors",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <method.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === "credit" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Número do cartão</Label>
                      <Input placeholder="0000 0000 0000 0000" value={cardData.number} onChange={(e) => setCardData({ ...cardData, number: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>Nome no cartão</Label>
                      <Input value={cardData.name} onChange={(e) => setCardData({ ...cardData, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Validade</Label>
                        <Input placeholder="MM/AA" value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>CVV</Label>
                        <Input placeholder="000" maxLength={4} value={cardData.cvv} onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Parcelas</Label>
                        <select
                          className="w-full h-10 px-3 border border-input rounded-sm bg-background"
                          value={cardData.installments}
                          onChange={(e) => setCardData({ ...cardData, installments: e.target.value })}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                            <option key={n} value={n}>
                              {n}x de {formatPrice(total / n)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="text-center py-8">
                    <QrCode className="h-32 w-32 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">O QR Code será gerado após a confirmação do pedido</p>
                    <p className="text-sm text-accent mt-2">5% de desconto no PIX</p>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="text-center py-8">
                    <Banknote className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">O boleto será gerado após a confirmação</p>
                    <p className="text-sm text-muted-foreground mt-2">Vencimento em 3 dias úteis</p>
                  </div>
                )}

                <div className="flex justify-between mt-6 pt-6 border-t border-border">
                  <Button variant="minimal" onClick={() => setStep(1)}>Voltar</Button>
                  <Button variant="primary" size="lg" onClick={() => setStep(3)}>
                    Revisar Pedido
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-card rounded-sm p-6 border border-border">
                <h2 className="font-display text-2xl font-medium mb-6">Revisar Pedido</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Truck className="h-4 w-4" /> Endereço de Entrega
                    </h3>
                    {selectedAddress && addresses.find(a => a.id === selectedAddress) ? (
                      <p className="text-sm text-muted-foreground">
                        {addresses.find(a => a.id === selectedAddress)?.street}, {addresses.find(a => a.id === selectedAddress)?.number} - {addresses.find(a => a.id === selectedAddress)?.city}/{addresses.find(a => a.id === selectedAddress)?.state}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {shippingData.street}, {shippingData.number} - {shippingData.city}/{shippingData.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Forma de Pagamento
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentMethod === "credit" && `Cartão de crédito em ${cardData.installments}x`}
                      {paymentMethod === "pix" && "PIX (5% de desconto)"}
                      {paymentMethod === "boleto" && "Boleto bancário"}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Produtos</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-sm" />
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                          </div>
                          <p className="font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6 pt-6 border-t border-border">
                  <Button variant="minimal" onClick={() => setStep(2)}>Voltar</Button>
                  <Button variant="primary" size="lg" onClick={handleSubmit} disabled={isProcessing}>
                    {isProcessing ? "Processando..." : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Finalizar Compra
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-sm p-6 border border-border sticky top-24">
              <h3 className="font-display text-lg font-medium mb-4">Resumo do Pedido</h3>

              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <span className="text-muted-foreground">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span>{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className={shippingCost === 0 ? "text-green-600" : ""}>
                    {shippingCost === 0 ? "Grátis" : formatPrice(shippingCost)}
                  </span>
                </div>
                {paymentMethod === "pix" && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto PIX (5%)</span>
                    <span>-{formatPrice(total * 0.05)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-border mt-4 pt-4">
                <div className="flex justify-between font-display text-xl">
                  <span>Total</span>
                  <span>{formatPrice(paymentMethod === "pix" ? total * 0.95 : total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Compra 100% segura</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="h-4 w-4" />
                  <span>Entrega garantida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
