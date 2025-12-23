import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from '@/components/ScrollToTop';
import Index from "./pages/Index";
import Process from "./pages/Process";
import Prestations from "./pages/Prestations";
import Modules from "./pages/Modules";
import Accompagnement from "./pages/Accompagnement";
import Composition from "./pages/Composition";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
	<ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/process" element={<Process />} />
          <Route path="/prestations" element={<Prestations />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/accompagnement" element={<Accompagnement />} />
          <Route path="/composition" element={<Composition />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
