import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Send, Clock } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import SectionHeading from './SectionHeading';
import { toast } from 'sonner';

const POSITION = [17.5063, 78.3623]; // Miyapur, Hyderabad approx

const SERVICES_LIST = [
  'PPF Coating', 'Graphene Coating', 'Ceramic Coating', 'Denting & Painting',
  'Car Accessories', 'Underbody Work', 'Mechanic Work', 'Car Detailing', 'Car Wash', 'Other',
];

function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-xs tracking-wider text-muted-foreground uppercase mb-1">Phone</p>
          <a href="tel:8143448598" className="text-white font-medium hover:text-primary transition-colors">
            814 344 8598
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-xs tracking-wider text-muted-foreground uppercase mb-1">Address</p>
          <p className="text-white text-sm leading-relaxed">
            Sy No. 141 Part, Bachupally,<br />
            Pragati Nagar Road, Main Road,<br />
            Miyapur, Hyderabad,<br />
            Telangana – 500118
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
          <Clock className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-xs tracking-wider text-muted-foreground uppercase mb-1">Working Hours</p>
          <p className="text-white text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
          <p className="text-muted-foreground text-sm">Sunday: 10:00 AM – 5:00 PM</p>
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', vehicle_model: '', service_required: '', message: '' });

  const sendMessage = useMutation({
    mutationFn: (data) => base44.entities.ContactMessage.create(data),
    onSuccess: () => {
      toast.success('Message sent! We\'ll get back to you shortly.');
      setForm({ name: '', phone: '', vehicle_model: '', service_required: '', message: '' });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    sendMessage.mutate(form);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Get in Touch"
          title="CONTACT THE PIT CREW"
          subtitle="Reach out for inquiries, bookings, or any questions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Info + Map */}
          <div className="space-y-8">
            <ContactInfo />
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-64 md:h-72">
              <MapContainer center={POSITION} zoom={15} scrollWheelZoom={false} className="h-full w-full" style={{ background: '#1A1A1C' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                <Marker position={POSITION}>
                  <Popup>
                    <strong>Auto Roxx</strong><br />
                    Miyapur, Hyderabad
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-secondary border border-white/5 space-y-4"
          >
            <h3 className="font-display font-bold text-sm tracking-wider text-white mb-2">SEND US A MESSAGE</h3>
            <Input
              placeholder="Your Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-background border-white/10 text-white"
              required
            />
            <Input
              placeholder="Phone Number *"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="bg-background border-white/10 text-white"
              required
            />
            <Input
              placeholder="Vehicle Model"
              value={form.vehicle_model}
              onChange={(e) => setForm({ ...form, vehicle_model: e.target.value })}
              className="bg-background border-white/10 text-white"
            />
            <Select value={form.service_required} onValueChange={(v) => setForm({ ...form, service_required: v })}>
              <SelectTrigger className="bg-background border-white/10 text-white">
                <SelectValue placeholder="Service Required" />
              </SelectTrigger>
              <SelectContent>
                {SERVICES_LIST.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-background border-white/10 text-white min-h-[120px]"
            />
            <Button
              type="submit"
              disabled={sendMessage.isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-display tracking-wider glow-red"
            >
              <Send className="w-4 h-4 mr-2" />
              {sendMessage.isPending ? 'SENDING...' : 'SEND MESSAGE'}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}