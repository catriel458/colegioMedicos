import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Stethoscope, GraduationCap, Scale } from "lucide-react";

const images = [
  {
    url: "https://media.0221.com.ar/p/206450e6b3541a062424e60bd546b039/adjuntos/357/imagenes/100/040/0100040246/1400x0/smart/colegio-medicos.jpg",
    alt: "Colegio de Médicos",
  },
  {
    url: "https://www.expomedhub.com/img/blog/m%C3%A9dicos-especialistas-24.06.2020%20m%C3%A9dicos%20especialistas.jpg",
    alt: "Médicos Especialistas",
  },
  {
    url: "https://infocielo.com/wp-content/uploads/2024/12/medicosjpg-1.jpg",
    alt: "Profesionales Médicos",
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative max-w-4xl mx-auto">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </section>

      <section className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Colegio de Médicos de la Provincia de Buenos Aires
        </h1>

        <Card className="bg-primary/5 hover:bg-primary/10 transition-colors">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              El Colegio de Médicos de la Provincia de Buenos Aires es la institución fundamental 
              que regula y supervisa el ejercicio profesional de la medicina en nuestra provincia. 
              Como entidad rectora, gestionamos las matrículas profesionales, certificamos y 
              recertificamos las especialidades médicas, y establecemos los valores de la hora 
              médica colegial. Nuestra misión es garantizar la excelencia en la práctica médica, 
              velando por el cumplimiento de los estándares éticos y profesionales más elevados 
              en el sistema de salud bonaerense.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Stethoscope className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Matrículas Profesionales</h3>
              <p className="text-muted-foreground">
                Gestionamos y regulamos las matrículas médicas, garantizando la legitimidad del ejercicio profesional.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <GraduationCap className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Especialidades Médicas</h3>
              <p className="text-muted-foreground">
                Certificamos y supervisamos las especialidades médicas, asegurando la más alta calidad en la atención especializada.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Scale className="h-12 w-12 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Regulación Profesional</h3>
              <p className="text-muted-foreground">
                Establecemos y actualizamos los estándares profesionales y éticos de la práctica médica.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}