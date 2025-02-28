import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { addDays } from "date-fns";

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  lastName: text("lastName").notNull(),
  dni: text("dni").notNull(),
  phone: text("phone").notNull(),
  district: text("district").notNull(),
  appointmentDate: text("appointmentDate").notNull(), // SQLite no tiene tipo date nativo
  appointmentTime: text("appointmentTime").notNull(),
  procedure: text("procedure").notNull(),
  profession: text("profession").notNull(),
  observations: text("observations"),
  createdAt: text("createdAt").default(String(new Date().toISOString().split('T')[0])),
  status: text("status").default("active")
});

const today = new Date();
const maxDate = addDays(today, 30);

export const insertAppointmentSchema = createInsertSchema(appointments)
  .omit({ id: true, createdAt: true, status: true })
  .extend({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder los 50 caracteres")
      .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, "El nombre solo puede contener letras y espacios"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres")
      .max(50, "El apellido no puede exceder los 50 caracteres")
      .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, "El apellido solo puede contener letras y espacios"),
    dni: z.string()
      .min(7, "El DNI debe tener al menos 7 dígitos")
      .max(8, "El DNI no puede exceder los 8 dígitos")
      .regex(/^\d+$/, "El DNI solo puede contener números"),
    phone: z.string()
      .min(8, "El teléfono debe tener al menos 8 dígitos")
      .max(15, "El teléfono no puede exceder los 15 dígitos")
      .regex(/^\d+$/, "El teléfono solo puede contener números"),
    district: z.enum([
      "distrito1", "distrito2", "distrito3", "distrito4", "distrito5",
      "distrito6", "distrito7", "distrito8", "distrito9", "distrito10"
    ], {
      required_error: "Debe seleccionar un distrito",
      invalid_type_error: "Distrito inválido"
    }),
    appointmentDate: z.string().refine((date) => {
      const selectedDate = new Date(date);
      return selectedDate >= today && selectedDate <= maxDate;
    }, "La fecha debe estar entre hoy y los próximos 30 días"),
    appointmentTime: z.enum([
      "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
    ], {
      required_error: "Debe seleccionar un horario",
      invalid_type_error: "Horario inválido"
    }),
    procedure: z.enum([
      "Certicado médico", "Certicado de ética", "Certificado laboral",
      "Programa de residencia", "Certificado de credencial médico",
      "Título de especialista"
    ], {
      required_error: "Debe seleccionar un trámite",
      invalid_type_error: "Trámite inválido"
    }),
    profession: z.enum([
      "Médico Argentino", "Médico Extranjero", "Particular"
    ], {
      required_error: "Debe seleccionar una profesión",
      invalid_type_error: "Profesión inválida"
    }),
    observations: z.string().max(500, "Las observaciones no pueden exceder los 500 caracteres").optional()
  });

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;