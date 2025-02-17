import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, type Appointment, type InsertAppointment } from "@shared/schema";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function ModifyAppointment() {
  const [searchDni, setSearchDni] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: appointments, isLoading: isSearching } = useQuery<Appointment[]>({
    queryKey: [`/api/appointments/search/${searchDni}`],
    enabled: searchDni.length >= 8,
    retry: false,
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudieron cargar los turnos",
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      observations: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      if (!selectedAppointment) return;
      const res = await apiRequest("PATCH", `/api/appointments/${selectedAppointment.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Turno actualizado",
        description: "Los cambios han sido guardados exitosamente",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/appointments/search/${searchDni}`] });
      setSelectedAppointment(null);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el turno",
        variant: "destructive",
      });
    },
  });

  const handleSelectAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    const formData = {
      ...appointment,
      appointmentDate: new Date(appointment.appointmentDate).toISOString().split("T")[0],
      observations: appointment.observations || "",
    };
    form.reset(formData as InsertAppointment);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Buscar Turno para Modificar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
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

          {isSearching ? (
            <div className="text-center py-4">Buscando turnos...</div>
          ) : appointments?.length ? (
            <div className="mt-4 space-y-2">
              {appointments
                .filter((apt) => apt.status === "active")
                .map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-accent"
                    onClick={() => handleSelectAppointment(appointment)}
                  >
                    <div className="font-medium">
                      {appointment.name} {appointment.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Fecha: {new Date(appointment.appointmentDate).toLocaleDateString()} - 
                      Hora: {appointment.appointmentTime}
                    </div>
                  </div>
                ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      {selectedAppointment && (
        <Card>
          <CardHeader>
            <CardTitle>Modificar Turno</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => updateMutation.mutate(data))}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Apellido</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horario</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione horario" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[
                              "10:00",
                              "10:30",
                              "11:00",
                              "11:30",
                              "12:00",
                              "12:30",
                            ].map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observaciones</FormLabel>
                      <FormControl>
                        <Textarea {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending
                      ? "Actualizando..."
                      : "Actualizar Turno"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setSelectedAppointment(null);
                      form.reset();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}