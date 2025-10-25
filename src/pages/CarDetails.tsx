import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { EditCarDialog } from "@/components/EditCarDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Car as CarIcon, 
  Users, 
  Fuel, 
  Settings, 
  MapPin, 
  Phone, 
  Mail,
  Edit,
  Trash2,
  Calendar,
  DollarSign
} from "lucide-react";
import { useCars } from "@/hooks/useCars";
import { useEffect, useState } from "react";
import type { Car } from "@/types/car";

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { cars, loading, deleteCar } = useCars();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (id && cars.length > 0) {
      const foundCar = cars.find(c => String(c.id) === id);
      setCar(foundCar || null);
    }
  }, [id, cars]);

  const handleDeleteCar = async () => {
    if (car && confirm('Tem certeza que deseja remover este carro?')) {
      const success = await deleteCar(car.id);
      if (success) {
        navigate('/admin');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-lg text-muted-foreground">Carregando detalhes do carro...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 text-center py-16">
            <CardContent>
              <CarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <CardTitle className="text-2xl mb-2">Carro não encontrado</CardTitle>
              <p className="text-muted-foreground mb-6">
                O carro que você está procurando não foi encontrado no estoque.
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Catálogo
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button variant="premium">
                    Ir para Administração
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header with navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <p className="text-muted-foreground">Detalhes do veículo</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <EditCarDialog car={car} />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteCar}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image and Status */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={car.available ? "default" : "secondary"} className="backdrop-blur-sm">
                      {car.available ? "Disponível" : "Indisponível"}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="backdrop-blur-sm bg-background/20">
                      {car.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CarIcon className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="premium"
                  disabled={!car.available}
                >
                  <CarIcon className="w-4 h-4 mr-2" />
                  {car.available ? "Alugar Agora" : "Indisponível"}
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Price and Basic Info */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Informações de Preço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">
                    R$ {car.price}
                  </div>
                  <p className="text-muted-foreground">por dia</p>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Preço já inclui seguro básico</p>
                  <p>• Combustível por conta do locatário</p>
                  <p>• Quilometragem livre</p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Especificações Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{car.seats} pessoas</p>
                      <p className="text-sm text-muted-foreground">Capacidade</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                    <Settings className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{car.transmission}</p>
                      <p className="text-sm text-muted-foreground">Transmissão</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                    <Fuel className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{car.fuel}</p>
                      <p className="text-sm text-muted-foreground">Combustível</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30">
                    <CarIcon className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{car.category}</p>
                      <p className="text-sm text-muted-foreground">Categoria</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timestamps (if available) */}
            {(car.createdAt || car.updatedAt) && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Informações do Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {car.createdAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Adicionado em:</span>
                      <span>{new Date(car.createdAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                  {car.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Última atualização:</span>
                      <span>{new Date(car.updatedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID do sistema:</span>
                    <span className="font-mono text-sm">{car.id}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Related Actions */}
        <div className="mt-8 pt-8 border-t border-border/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver Todos os Carros
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Painel Administrativo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;