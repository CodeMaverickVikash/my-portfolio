import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  isDarkModeEnabled: boolean;
  onToggleDarkMode: () => void;
}

/**
 * Main Layout Component
 * Wraps all pages with Navbar and Footer
 */
const MainLayout = ({ children, isDarkModeEnabled, onToggleDarkMode }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onToggle={onToggleDarkMode} isDarkModeEnabled={isDarkModeEnabled} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

