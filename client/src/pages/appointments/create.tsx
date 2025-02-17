import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertAppointmentSchema, type InsertAppointment } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, Info } from "lucide-react";

export default function CreateAppointment() {
  const { toast } = useToast();
  const form = useForm<InsertAppointment>({
    resolver: zodResolver(insertAppointmentSchema),
    defaultValues: {
      observations: "",
    },
    mode: "onChange", // Validar mientras el usuario escribe
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertAppointment) => {
      const res = await apiRequest("POST", "/api/appointments", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "¡Turno creado exitosamente!",
        description: "Su turno ha sido registrado correctamente en el sistema.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error al crear el turno",
        description: "Por favor, verifique los datos ingresados e intente nuevamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertAppointment) => {
    // Verificar el número total de errores
    const errorCount = Object.keys(form.formState.errors).length;
    if (errorCount > 0) {
      toast({
        title: `${errorCount} ${errorCount === 1 ? 'error encontrado' : 'errores encontrados'}`,
        description: "Por favor, corrija los errores marcados en rojo antes de continuar.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Solicitar Turno</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertTitle>Información Importante</AlertTitle>
          <AlertDescription>
            Complete todos los campos obligatorios marcados con *. Los turnos están disponibles
            solo para los próximos 30 días y en horarios específicos.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ingrese su nombre" 
                        {...field}
                        className={form.formState.errors.name ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Solo letras y espacios permitidos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ingrese su apellido" 
                        {...field}
                        className={form.formState.errors.lastName ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Solo letras y espacios permitidos
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DNI *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="11111111" 
                        {...field}
                        className={form.formState.errors.dni ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      7-8 dígitos, solo números
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teléfono *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="21122222" 
                        {...field}
                        className={form.formState.errors.phone ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      8-15 dígitos, solo números
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distrito *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={form.formState.errors.district ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccione distrito" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                        <SelectItem key={n} value={`distrito${n}`}>
                          Distrito {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Seleccione su distrito correspondiente
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="appointmentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha *</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field}
                        className={form.formState.errors.appointmentDate ? "border-red-500" : ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Seleccione una fecha dentro de los próximos 30 días
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Horario *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className={form.formState.errors.appointmentTime ? "border-red-500" : ""}>
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
                    <FormDescription>
                      Horarios disponibles de 10:00 a 12:30
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="procedure"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trámite *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={form.formState.errors.procedure ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccione trámite" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Certicado médico",
                        "Certicado de ética",
                        "Certificado laboral",
                        "Programa de residencia",
                        "Certificado de credencial médico",
                        "Título de especialista",
                      ].map((proc) => (
                        <SelectItem key={proc} value={proc}>
                          {proc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Seleccione el tipo de trámite que desea realizar
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profesión *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={form.formState.errors.profession ? "border-red-500" : ""}>
                        <SelectValue placeholder="Seleccione profesión" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        "Médico Argentino",
                        "Médico Extranjero",
                        "Particular",
                      ].map((prof) => (
                        <SelectItem key={prof} value={prof}>
                          {prof}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Indique su situación profesional
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ingrese observaciones adicionales (opcional)"
                      className={form.formState.errors.observations ? "border-red-500" : ""}
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Máximo 500 caracteres
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Alert className="mb-4" variant="default">
              <Check className="h-4 w-4" />
              <AlertTitle>Antes de enviar</AlertTitle>
              <AlertDescription>
                Verifique que todos los campos obligatorios (*) estén completos y que la información sea correcta.
              </AlertDescription>
            </Alert>

            <Button
              type="submit"
              className="w-full"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? "Creando..." : "Crear Turno"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}