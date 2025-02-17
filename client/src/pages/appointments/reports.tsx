import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import type { Appointment } from "@shared/schema";
import { format } from "date-fns";

export default function Reports() {
  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments"],
  });

  const downloadCSV = () => {
    if (!appointments) return;

    const headers = [
      "ID",
      "Nombre",
      "Apellido",
      "DNI",
      "Teléfono",
      "Distrito",
      "Fecha",
      "Hora",
      "Trámite",
      "Profesión",
      "Observaciones",
      "Estado",
    ];

    const csvContent = appointments.map((apt) => [
      apt.id,
      apt.name,
      apt.lastName,
      apt.dni,
      apt.phone,
      apt.district,
      format(new Date(apt.appointmentDate), "dd/MM/yyyy"),
      apt.appointmentTime,
      apt.procedure,
      apt.profession,
      apt.observations || "",
      apt.status,
    ]);

    const csv = [
      headers.join(","),
      ...csvContent.map((row) =>
        row.map((cell) => `"${cell}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `turnos_${format(new Date(), "dd-MM-yyyy")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Reportes de Turnos</CardTitle>
        <Button onClick={downloadCSV} disabled={!appointments?.length}>
          <Download className="mr-2 h-4 w-4" />
          Exportar CSV
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-4">Cargando turnos...</div>
        ) : appointments?.length ? (
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>DNI</TableHead>
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
                    <TableCell>{appointment.dni}</TableCell>
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
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <FileText className="h-12 w-12 mb-4" />
            <p>No hay turnos registrados</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
