import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, Fuel, Settings, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { apiService } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface CarCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  transmission: string;
  fuel: string;
  seats: number;
  available: boolean;
}

export const CarCard = ({ 
  id, 
  name, 
  image, 
  price, 
  category, 
  transmission, 
  fuel, 
  seats, 
  available 
}: CarCardProps) => {
  const { toast } = useToast();

  async function handleRentCar() {
    await apiService.get("/send-email")
    toast({
      title: "Sucesso!",
      description: "Carro alugado com sucesso.",
    });
  }

  return (
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-smooth hover:shadow-card">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-48 object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge variant={available ? "default" : "secondary"} className="backdrop-blur-sm">
              {available ? "Disponível" : "Indisponível"}
            </Badge>
          </div>
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="backdrop-blur-sm bg-background/20">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-smooth">
          {name}
        </CardTitle>
        
        <div className="grid grid-cols-3 gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{seats} pessoas</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{fuel}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">
              R$ {price}
            </span>
            <span className="text-muted-foreground ml-1">/dia</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-2">
        <div className="grid grid-cols-2 gap-2 w-full">
          <Link to={`/car/${id}`}>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Ver Detalhes
            </Button>
          </Link>
          <Button 
            size="sm"
            variant="premium"
            disabled={!available}
            className="w-full"
            onClick={handleRentCar}
          >
            <Car className="w-4 h-4 mr-2" />
            {available ? "Alugar" : "Indisponível"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};