import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/appointments/new", label: "Nuevo Turno", icon: Calendar },
    { href: "/appointments/search", label: "Buscar Turno" },
    { href: "/appointments/modify", label: "Modificar Turno" },
    { href: "/appointments/cancel", label: "Cancelar Turno" },
    { href: "/appointments/reports", label: "Reportes" },
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-bsm0cqPjCxz-brHBHjEhlIh4trv_E51aw&s"
              alt="Logo Colegio de Médicos"
              className="h-12 w-auto"
            />
            <nav className="flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}