import { pgTable, text, serial, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  lastName: text("lastName").notNull(),
  dni: text("dni").notNull(),
  phone: text("phone").notNull(),
  district: text("district").notNull(),
  appointmentDate: date("appointmentDate").notNull(),
  appointmentTime: text("appointmentTime").notNull(),
  procedure: text("procedure").notNull(),
  profession: text("profession").notNull(),
  observations: text("observations"),
  createdAt: timestamp("createdAt").defaultNow(),
  status: text("status").default("active")
});

export const insertAppointmentSchema = createInsertSchema(appointments)
  .omit({ id: true, createdAt: true, status: true })
  .extend({
    dni: z.string().min(8).max(20),
    phone: z.string().min(8),
    district: z.enum([
      "distrito1", "distrito2", "distrito3", "distrito4", "distrito5",
      "distrito6", "distrito7", "distrito8", "distrito9", "distrito10"
    ]),
    appointmentTime: z.enum([
      "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"
    ]),
    procedure: z.enum([
      "Certicado médico", "Certicado de ética", "Certificado laboral",
      "Programa de residencia", "Certificado de credencial médico",
      "Título de especialista"
    ]),
    profession: z.enum([
      "Médico Argentino", "Médico Extranjero", "Particular"
    ])
  });

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;
