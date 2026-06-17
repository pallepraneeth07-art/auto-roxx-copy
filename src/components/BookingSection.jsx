import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Car, User, Phone, MessageSquare, CheckCircle2, Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SectionHeading from './SectionHeading';
import { toast } from 'sonner';

const SERVICES = [
  'PPF Coating', 'Graphene Coating', 'Ceramic Coating', 'Denting & Painting',
  'Car Accessories', 'Underbody Work', 'Mechanic Work', 'Car Detailing', 'Car Wash',
];

const TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: '', customer_name: '', phone: '', vehicle_model: '',
    preferred_date: '', preferred_time: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const createBooking = useMutation({
    mutationFn: (data) => base44.entities.Booking.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Booking submitted successfully!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking.mutate(form);
  };

  const update = (field, value) => setForm({ ...form, [field]: value });

  const canProceedStep1 = form.service;
  const canProceedStep2 = form.customer_name && form.phone && form.vehicle_model;

  // Progress bar percent
  const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

  if (submitted) {
    return (
      <section id="booking" className="py-20 md:py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 rounded-2xl bg-secondary border border-primary/20"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl tracking-wider text-white mb-2">BOOKING CONFIRMED</h3>
            <p className="text-muted-foreground text-sm mb-4">
              We'll contact you shortly to confirm your appointment.
            </p>
            <Button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ service: '', customer_name: '', phone: '', vehicle_model: '', preferred_date: '', preferred_time: '', message: '' }); }}
              variant="outline"
              className="border-white/10 text-white rounded-full"
            >
              Book Another Service
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Book a Service"
          title="SCHEDULE YOUR SERVICE"
          subtitle="Select your service, choose a time, and we'll handle the rest"
        />

        {/* Progress Bar (RPM gauge style) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {['Service', 'Details', 'Schedule'].map((label, i) => (
              <span
                key={label}
                className={`text-xs font-display tracking-wider ${
                  step > i ? 'text-primary' : step === i + 1 ? 'text-white' : 'text-muted-foreground'
                }`}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-3"
            >
              <p className="text-sm text-muted-foreground mb-4">Select the service you need:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => update('service', s)}
                    className={`p-4 text-left text-sm font-medium rounded-xl border transition-all duration-300 ${
                      form.service === s
                        ? 'bg-primary/10 border-primary/50 text-white glow-red'
                        : 'bg-secondary border-white/5 text-muted-foreground hover:border-white/20'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-display tracking-wider disabled:opacity-30"
                >
                  CONTINUE
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personal Details */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Full Name *" value={form.customer_name} onChange={(e) => update('customer_name', e.target.value)} className="pl-10 bg-secondary border-white/10 text-white" required />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Phone Number *" value={form.phone} onChange={(e) => update('phone', e.target.value)} className="pl-10 bg-secondary border-white/10 text-white" required />
              </div>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Vehicle Model *" value={form.vehicle_model} onChange={(e) => update('vehicle_model', e.target.value)} className="pl-10 bg-secondary border-white/10 text-white" required />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(1)} className="border-white/10 text-white rounded-full flex-1">
                  Back
                </Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!canProceedStep2} className="bg-primary hover:bg-primary/90 text-white rounded-full font-display tracking-wider flex-1 disabled:opacity-30">
                  CONTINUE
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input type="date" value={form.preferred_date} onChange={(e) => update('preferred_date', e.target.value)} className="pl-10 bg-secondary border-white/10 text-white" />
              </div>
              <Select value={form.preferred_time} onValueChange={(v) => update('preferred_time', v)}>
                <SelectTrigger className="bg-secondary border-white/10 text-white">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <SelectValue placeholder="Preferred Time" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {TIMES.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Any additional notes..."
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="bg-secondary border-white/10 text-white min-h-[80px]"
              />
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="border-white/10 text-white rounded-full flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={createBooking.isPending} className="bg-primary hover:bg-primary/90 text-white rounded-full font-display tracking-wider flex-1 glow-red">
                  <Send className="w-4 h-4 mr-2" />
                  {createBooking.isPending ? 'SUBMITTING...' : 'CONFIRM BOOKING'}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </div>
    </section>
  );
}