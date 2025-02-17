import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Search } from "lucide-react";
import type { Appointment } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function SearchAppointment() {
  const [searchDni, setSearchDni] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const { toast } = useToast();

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: [`/api/appointments/search/${searchDni}`],
    enabled: searchInitiated && searchDni.length >= 8,
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron cargar los turnos",
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    if (searchDni.length >= 8) {
      setSearchInitiated(true);
    } else {
      toast({
        title: "DNI inválido",
        description: "El DNI debe tener al menos 8 caracteres",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar Turno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Ingrese DNI"
            value={searchDni}
            onChange={(e) => {
              setSearchDni(e.target.value);
              setSearchInitiated(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={searchDni.length < 8 || isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Buscando turnos...</div>
        ) : appointments?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Trámite</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    {format(new Date(appointment.appointmentDate), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{appointment.appointmentTime}</TableCell>
                  <TableCell>
                    {appointment.name} {appointment.lastName}
                  </TableCell>
                  <TableCell>{appointment.procedure}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status === "active" ? "Activo" : "Cancelado"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : searchInitiated ? (
          <div className="text-center py-4 text-muted-foreground">
            No se encontraron turnos para el DNI ingresado
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}