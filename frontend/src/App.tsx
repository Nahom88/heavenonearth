import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@/i18n';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Ministries from "./pages/Ministries";
import Prayer from "./pages/Prayer";
import Partnership from "./pages/Partnership";
import Giving from "./pages/Giving";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/ministries" element={<Ministries />} />
              <Route path="/prayer" element={<Prayer />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/giving" element={<Giving />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
