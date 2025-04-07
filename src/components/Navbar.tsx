
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="font-bold text-2xl">
          Project<span className="text-primary">Hub</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </a>
          <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
            Projects
          </a>
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          <Button>Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b py-4">
          <div className="container flex flex-col space-y-4">
            <a href="#" className="px-4 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Home
            </a>
            <a href="#projects" className="px-4 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Projects
            </a>
            <a href="#about" className="px-4 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              About
            </a>
            <a href="#contact" className="px-4 py-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Contact
            </a>
            <Button className="m-4">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
