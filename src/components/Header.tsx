import { Button } from "@/components/ui/button";
import { Car, Settings, Plus, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <Car className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              DigitalRent
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                location.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Carros Disponíveis
            </Link>
            <Link 
              to="/admin" 
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                location.pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Administração
            </Link>
          </nav>
          
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-muted-foreground hidden md:inline">
                Olá, {user.name}
              </span>
            )}
            {location.pathname === "/admin" ? (
              <Button variant="premium" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Carro
              </Button>
            ) : (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={logout} title="Sair">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};