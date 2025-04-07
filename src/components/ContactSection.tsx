
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions about our projects or interested in working with us? Reach out and we'll get back to you soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg">Email Us</h3>
                <p className="text-muted-foreground">hello@yourproject.com</p>
                <p className="text-sm text-muted-foreground mt-1">We'll respond within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg">Call Us</h3>
                <p className="text-muted-foreground">(123) 456-7890</p>
                <p className="text-sm text-muted-foreground mt-1">Monday-Friday, 9am-5pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-medium text-lg">Visit Us</h3>
                <p className="text-muted-foreground">123 Project Street</p>
                <p className="text-muted-foreground">City, State 12345</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={5} />
            </div>

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
