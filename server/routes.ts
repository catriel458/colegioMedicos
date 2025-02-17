import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppointmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/appointments", async (req, res) => {
    try {
      const appointment = insertAppointmentSchema.parse(req.body);
      const created = await storage.createAppointment(appointment);
      res.json(created);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.get("/api/appointments/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid appointment ID" });
      return;
    }
    const appointment = await storage.getAppointment(id);
    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json(appointment);
  });

  app.get("/api/appointments/search/:dni", async (req, res) => {
    try {
      const appointments = await storage.getAppointmentsByDni(req.params.dni);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error searching appointments" });
    }
  });

  app.patch("/api/appointments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid appointment ID" });
        return;
      }
      const update = insertAppointmentSchema.partial().parse(req.body);
      const updated = await storage.updateAppointment(id, update);
      if (!updated) {
        res.status(404).json({ message: "Appointment not found" });
        return;
      }
      res.json(updated);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid appointment ID" });
      return;
    }
    const success = await storage.cancelAppointment(id);
    if (!success) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json({ message: "Appointment cancelled" });
  });

  app.get("/api/appointments", async (_req, res) => {
    try {
      const appointments = await storage.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}