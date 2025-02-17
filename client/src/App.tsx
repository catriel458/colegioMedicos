import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import CreateAppointment from "@/pages/appointments/create";
import SearchAppointment from "@/pages/appointments/search";
import ModifyAppointment from "@/pages/appointments/modify";
import CancelAppointment from "@/pages/appointments/cancel";
import Reports from "@/pages/appointments/reports";
import AdminDashboard from "@/pages/admin/dashboard";
import Navbar from "@/components/layout/navbar";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={CreateAppointment} />
          <Route path="/search" component={SearchAppointment} />
          <Route path="/modify" component={ModifyAppointment} />
          <Route path="/cancel" component={CancelAppointment} />
          <Route path="/reports" component={Reports} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;