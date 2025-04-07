
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Project<span className="text-blue-400">Hub</span></h3>
            <p className="text-slate-400 mb-4 max-w-md">
              Creating innovative solutions for tomorrow's challenges. We build products that make a difference.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#projects" className="text-slate-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ProjectHub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
