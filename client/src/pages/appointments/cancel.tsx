import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Search, Trash2 } from "lucide-react";
import type { Appointment } from "@shared/schema";

export default function CancelAppointment() {
  const [searchDni, setSearchDni] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery<Appointment[]>({
    queryKey: ["/api/appointments/search", searchDni],
    enabled: searchDni.length >= 8,
  });

  const cancelMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/appointments/${id}`);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Turno cancelado",
        description: "El turno ha sido cancelado exitosamente",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/appointments/search", searchDni] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo cancelar el turno",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cancelar Turno</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            placeholder="Ingrese DNI"
            value={searchDni}
            onChange={(e) => setSearchDni(e.target.value)}
          />
          <Button variant="secondary">
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-4">Buscando turnos...</div>
        ) : appointments?.length ? (
          <div className="space-y-4">
            {appointments
              .filter((apt) => apt.status === "active")
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-medium">
                      {appointment.name} {appointment.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fecha: {new Date(appointment.appointmentDate).toLocaleDateString()} - 
                      Hora: {appointment.appointmentTime}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Trámite: {appointment.procedure}
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          ¿Está seguro de cancelar este turno?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. El turno será cancelado
                          permanentemente.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => cancelMutation.mutate(appointment.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          {cancelMutation.isPending
                            ? "Cancelando..."
                            : "Si, cancelar turno"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
          </div>
        ) : searchDni.length >= 8 ? (
          <div className="text-center py-4 text-muted-foreground">
            No se encontraron turnos activos para el DNI ingresado
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
