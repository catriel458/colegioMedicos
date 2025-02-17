import { appointments, type Appointment, type InsertAppointment } from "@shared/schema";

export interface IStorage {
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointment(id: number): Promise<Appointment | undefined>;
  getAppointmentsByDni(dni: string): Promise<Appointment[]>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
  cancelAppointment(id: number): Promise<boolean>;
  getAllAppointments(): Promise<Appointment[]>;
}

export class MemStorage implements IStorage {
  private appointments: Map<number, Appointment>;
  private currentId: number;

  constructor() {
    this.appointments = new Map();
    this.currentId = 1;
  }

  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const id = this.currentId++;
    const appointment: Appointment = {
      ...insertAppointment,
      id,
      createdAt: new Date(),
      status: "active"
    };
    this.appointments.set(id, appointment);
    return appointment;
  }

  async getAppointment(id: number): Promise<Appointment | undefined> {
    return this.appointments.get(id);
  }

  async getAppointmentsByDni(dni: string): Promise<Appointment[]> {
    return Array.from(this.appointments.values()).filter(
      (appointment) => appointment.dni === dni
    );
  }

  async updateAppointment(
    id: number,
    appointmentUpdate: Partial<InsertAppointment>
  ): Promise<Appointment | undefined> {
    const existing = this.appointments.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...appointmentUpdate };
    this.appointments.set(id, updated);
    return updated;
  }

  async cancelAppointment(id: number): Promise<boolean> {
    const appointment = this.appointments.get(id);
    if (!appointment) return false;

    appointment.status = "cancelled";
    this.appointments.set(id, appointment);
    return true;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return Array.from(this.appointments.values());
  }
}

export const storage = new MemStorage();
