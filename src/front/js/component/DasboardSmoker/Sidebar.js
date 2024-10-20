import React, { useState } from 'react';
import { LayoutDashboard, Users, FileQuestion, MessageSquare, Lightbulb, Menu, X } from 'lucide-react';
import logoblanco from '../../../img/logos/logoblanco.png';
import logonegro from '../../../img/logos/logonegro.png';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/Dashboard-Smoker' },
  { name: 'Lista de Coaches', icon: Users, path: '/Dashboard-Smoker/coaches' },
  { name: 'Solicitudes', icon: FileQuestion, path: '/Dashboard-Smoker/solicitudes' },
  { name: 'Mensajes', icon: MessageSquare, path: '/Dashboard-Smoker/mensajes' },
  { name: 'Consejos', icon: Lightbulb, path: '/Dashboard-Smoker/consejos' },
];

export default function Sidebar({ active, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (item) => {
    navigate(item.path); // Navega a la ruta especificada
    setIsMobileMenuOpen(false); // Cierra el menú móvil al navegar
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-800 text-white"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <nav className={`w-64 fixed h-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-30 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-2">
          <div className="flex items-center justify-center mb-5">
            <img
              src={isDarkMode ? logoblanco : logonegro}
              alt={isDarkMode ? "logo blanco" : "logo negro"}
              className="h-30 w-32 mb-5"
            />
          </div>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ease-in-out ${
                    active === item.name
                      ? 'bg-purple-600 text-white'
                      : isDarkMode
                      ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                  onClick={() => handleNavigation(item)} // Llama a handleNavigation al hacer clic
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
