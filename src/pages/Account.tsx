import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, MapPin, Heart, LogOut, Settings, ChevronRight, Edit2, Plus, Trash2, Check } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Processando", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregue", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile, addresses, addAddress, removeAddress, setDefaultAddress, orders } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({ name: "", email: "", phone: "" });
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    isDefault: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  if (!isAuthenticated || !user) return null;

  const handleSaveProfile = () => {
    updateProfile(profileData);
    setIsEditing(false);
    toast({ title: "Perfil atualizado com sucesso!" });
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.zipCode) {
      toast({ title: "Erro", description: "Preencha os campos obrigatórios.", variant: "destructive" });
      return;
    }
    addAddress(newAddress);
    setNewAddress({ name: "", street: "", number: "", complement: "", neighborhood: "", city: "", state: "", zipCode: "", isDefault: false });
    setIsAddressDialogOpen(false);
    toast({ title: "Endereço adicionado!" });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    toast({ title: "Você saiu da sua conta." });
  };

  const tabs = [
    { id: "profile", label: "Meu Perfil", icon: User },
    { id: "orders", label: "Meus Pedidos", icon: Package },
    { id: "addresses", label: "Endereços", icon: MapPin },
    { id: "wishlist", label: "Favoritos", icon: Heart },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  return (
    <Layout>
      <div className="container-custom py-8">
        <BreadcrumbNav items={[{ label: "Minha Conta" }]} />

        <div className="grid lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-sm p-6 border border-border">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-medium">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors",
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-card rounded-sm p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-medium">Meu Perfil</h2>
                  <Button
                    variant="minimal"
                    size="sm"
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  >
                    {isEditing ? <><Check className="h-4 w-4 mr-2" /> Salvar</> : <><Edit2 className="h-4 w-4 mr-2" /> Editar</>}
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Nome completo</Label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-medium mb-6">Meus Pedidos</h2>
                
                {orders.length === 0 ? (
                  <div className="bg-card rounded-sm p-12 border border-border text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-display text-xl mb-2">Nenhum pedido ainda</h3>
                    <p className="text-muted-foreground mb-6">Você ainda não fez nenhum pedido.</p>
                    <Button variant="primary" asChild>
                      <Link to="/produtos">Explorar Produtos</Link>
                    </Button>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="bg-card rounded-sm border border-border overflow-hidden">
                      <div className="p-4 flex flex-wrap items-center justify-between gap-4 bg-secondary/50">
                        <div className="flex items-center gap-6">
                          <div>
                            <p className="text-xs text-muted-foreground">Pedido</p>
                            <p className="font-medium">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Data</p>
                            <p className="font-medium">{new Date(order.date).toLocaleDateString("pt-BR")}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="font-medium">{formatPrice(order.total)}</p>
                          </div>
                        </div>
                        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusLabels[order.status].color)}>
                          {statusLabels[order.status].label}
                        </span>
                      </div>
                      <div className="p-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{formatPrice(item.price)}</p>
                          </div>
                        ))}
                        {order.trackingCode && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                              Código de rastreio: <span className="font-medium text-foreground">{order.trackingCode}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl font-medium">Meus Endereços</h2>
                  <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="primary" size="sm">
                        <Plus className="h-4 w-4 mr-2" /> Adicionar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Novo Endereço</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Nome do endereço</Label>
                            <Input placeholder="Casa, Trabalho..." value={newAddress.name} onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>CEP *</Label>
                            <Input placeholder="00000-000" value={newAddress.zipCode} onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2 space-y-2">
                            <Label>Rua *</Label>
                            <Input value={newAddress.street} onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Número</Label>
                            <Input value={newAddress.number} onChange={(e) => setNewAddress({ ...newAddress, number: e.target.value })} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Complemento</Label>
                          <Input placeholder="Apto, Bloco..." value={newAddress.complement} onChange={(e) => setNewAddress({ ...newAddress, complement: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Bairro</Label>
                            <Input value={newAddress.neighborhood} onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Cidade *</Label>
                            <Input value={newAddress.city} onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Estado</Label>
                            <Input placeholder="SP" maxLength={2} value={newAddress.state} onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })} />
                          </div>
                        </div>
                        <Button onClick={handleAddAddress} className="mt-4">Salvar Endereço</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-card rounded-sm p-12 border border-border text-center">
                    <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-display text-xl mb-2">Nenhum endereço cadastrado</h3>
                    <p className="text-muted-foreground">Adicione um endereço para facilitar suas compras.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div key={address.id} className={cn("bg-card rounded-sm p-4 border transition-colors", address.isDefault ? "border-primary" : "border-border")}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{address.name || "Endereço"}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Padrão</span>
                            )}
                          </div>
                          <button onClick={() => removeAddress(address.id)} className="text-muted-foreground hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}, {address.number}
                          {address.complement && ` - ${address.complement}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.neighborhood && `${address.neighborhood}, `}{address.city} - {address.state}
                        </p>
                        <p className="text-sm text-muted-foreground">CEP: {address.zipCode}</p>
                        {!address.isDefault && (
                          <button onClick={() => setDefaultAddress(address.id)} className="text-sm text-accent hover:underline mt-2">
                            Definir como padrão
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-medium mb-6">Meus Favoritos</h2>
                
                {wishlistItems.length === 0 ? (
                  <div className="bg-card rounded-sm p-12 border border-border text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-display text-xl mb-2">Lista de desejos vazia</h3>
                    <p className="text-muted-foreground mb-6">Salve seus produtos favoritos para comprar depois.</p>
                    <Button variant="primary" asChild>
                      <Link to="/produtos">Explorar Produtos</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlistItems.map((product) => (
                      <Link key={product.id} to={`/produto/${product.id}`} className="bg-card rounded-sm border border-border overflow-hidden group">
                        <div className="aspect-square overflow-hidden">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-accent font-display text-lg">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-card rounded-sm p-6 border border-border">
                <h2 className="font-display text-2xl font-medium mb-6">Configurações</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <h3 className="font-medium">Notificações por email</h3>
                      <p className="text-sm text-muted-foreground">Receba atualizações sobre pedidos e promoções</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-border">
                    <div>
                      <h3 className="font-medium">Newsletter</h3>
                      <p className="text-sm text-muted-foreground">Receba novidades e ofertas exclusivas</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-5 w-5" />
                  </div>
                  <div className="pt-4">
                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair da conta
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
