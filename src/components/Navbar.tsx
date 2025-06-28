import Link from "next/link";
import { Mountain, FileText, Camera, Book, BarChart3, Users, HelpCircle, MapPin } from "lucide-react";

export default function Navbar() {
  const navItems = [
    { href: "/", label: "Beranda", icon: Mountain },
    { href: "/profil", label: "Profil", icon: Mountain },
    { href: "/berita", label: "Berita", icon: FileText },
    { href: "/adat-istiadat", label: "Adat Istiadat", icon: Book },
    { href: "/galeri", label: "Galeri", icon: Camera },
    { href: "/statistik", label: "Statistik", icon: BarChart3 },
    { href: "/wali-nagari", label: "Wali Nagari", icon: Users },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
    { href: "/peta", label: "Peta", icon: MapPin },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Mountain className="w-8 h-8 text-green-600" />
            <span className="font-bold text-xl text-gray-900">Website Nagari</span>
          </Link>
          
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/admin"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
