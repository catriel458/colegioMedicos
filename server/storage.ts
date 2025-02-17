import { appointments, type Appointment, type InsertAppointment } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointmentsByDni(dni: string): Promise<Appointment[]>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  cancelAppointment(id: number): Promise<boolean>;
  getAllAppointments(): Promise<Appointment[]>;
}

export class DatabaseStorage implements IStorage {
  async createAppointment(appointment: InsertAppointment): Promise<Appointment> {
    const [created] = await db.insert(appointments).values(appointment).returning();
    return created;
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
    return appointment;
  }

  async getAppointmentsByDni(dni: string): Promise<Appointment[]> {
    try {
      const results = await db.select().from(appointments).where(eq(appointments.dni, dni));
      console.log(`Found ${results.length} appointments in database for DNI: ${dni}`);
      return results;
    } catch (error) {
      console.error("Database error in getAppointmentsByDni:", error);
      throw error;
    }
  }

  async updateAppointment(
    id: number,
    appointmentUpdate: Partial<InsertAppointment>
  ): Promise<Appointment | undefined> {
    const [updated] = await db
      .update(appointments)
      .set(appointmentUpdate)
      .where(eq(appointments.id, id))
      .returning();
    return updated;
  }

  async cancelAppointment(id: number): Promise<boolean> {
    const [cancelled] = await db
      .update(appointments)
      .set({ status: "cancelled" })
      .where(eq(appointments.id, id))
      .returning();
    return !!cancelled;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await db.select().from(appointments);
  }
}

export const storage = new DatabaseStorage();