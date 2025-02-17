import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Globe, Code, Database, Layout } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Code,
      title: "Frontend Moderno",
      description: "Desarrollado con React, TypeScript y TanStack Query para una experiencia de usuario fluida y responsive."
    },
    {
      icon: Database,
      title: "Backend Robusto",
      description: "API RESTful construida con Express y PostgreSQL, utilizando Drizzle ORM para un manejo eficiente de datos."
    },
    {
      icon: Layout,
      title: "Diseño Intuitivo",
      description: "Interfaz de usuario moderna y accesible construida con Tailwind CSS y componentes de Radix UI."
    }
  ];

  return (
    <div className="space-y-8">
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Acerca del Proyecto
        </h1>

        <Card className="bg-primary/5 hover:bg-primary/10 transition-colors">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Este proyecto es una demostración técnica de un sistema de gestión de turnos médicos,
              desarrollado como parte de mi portafolio personal. Implementa un conjunto completo
              de funcionalidades CRUD con una arquitectura moderna y prácticas de desarrollo
              profesionales.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <feature.icon className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a
            href="https://github.com/tuusuario/proyecto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
          >
            <Github className="h-5 w-5" />
            Ver en GitHub
          </a>
          <a
            href="https://tuportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/90"
          >
            <Globe className="h-5 w-5" />
            Portafolio
          </a>
        </div>
      </section>
    </div>
  );
}
