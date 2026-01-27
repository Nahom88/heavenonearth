import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

// Admin Imports
import AdminLogin from "./pages/Admin/Login";
import AdminLayout from "./pages/Admin/Layout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminMinistries from "./pages/Admin/Ministries";
import AdminEvents from "./pages/Admin/Events";
import AdminGallery from "./pages/Admin/Gallery";
import AdminTestimonials from "./pages/Admin/Testimonials";
import AdminPartnerships from "./pages/Admin/Partnerships";
import AdminPrayerRequests from "./pages/Admin/PrayerRequests";

const queryClient = new QueryClient();

const PublicLayout = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="ministries" element={<AdminMinistries />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="prayers" element={<AdminPrayerRequests />} />
            <Route path="partnerships" element={<AdminPartnerships />} />
          </Route>

          {/* Public Routes */}
          <Route element={<PublicLayout />}>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
