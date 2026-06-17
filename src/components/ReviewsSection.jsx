import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Send } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import SectionHeading from './SectionHeading';
import { toast } from 'sonner';

function StarRating({ rating, onRate, interactive = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? 'button' : undefined}
          onClick={() => interactive && onRate?.(star)}
          className={interactive ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-4 h-4 transition-colors ${
              star <= rating ? 'fill-primary text-primary' : 'text-white/20'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-5 rounded-2xl bg-secondary/50 border border-white/5"
    >
      <Quote className="w-6 h-6 text-primary/30 mb-3" />
      <p className="text-sm text-secondary-foreground/80 leading-relaxed mb-4">
        "{review.review_text}"
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-sm text-white">{review.customer_name}</p>
          {review.vehicle && (
            <p className="text-xs text-muted-foreground mt-0.5">{review.vehicle}</p>
          )}
        </div>
        <StarRating rating={review.rating} />
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ customer_name: '', rating: 5, review_text: '', vehicle: '', service_used: '' });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => base44.entities.Review.list('-created_date', 20),
  });

  const createReview = useMutation({
    mutationFn: (data) => base44.entities.Review.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      setForm({ customer_name: '', rating: 5, review_text: '', vehicle: '', service_used: '' });
      setShowForm(false);
      toast.success('Thank you for your review!');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.customer_name || !form.review_text) return;
    createReview.mutate(form);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-secondary/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Customer Testimonials"
          title="WHAT OUR CLIENTS SAY"
          subtitle="Real feedback from our valued customers"
        />

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {reviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
          {reviews.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Be the first to leave a review!
            </div>
          )}
        </div>

        {/* Add Review Toggle */}
        <div className="text-center">
          {!showForm ? (
            <Button
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90 text-white font-display tracking-wider rounded-full px-8 glow-red"
            >
              LEAVE A REVIEW
            </Button>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto p-6 rounded-2xl bg-secondary border border-white/10 text-left"
            >
              <h3 className="font-display font-bold text-sm tracking-wider text-white mb-4">SHARE YOUR EXPERIENCE</h3>
              <div className="space-y-4">
                <Input
                  placeholder="Your Name *"
                  value={form.customer_name}
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                  className="bg-background border-white/10 text-white placeholder:text-muted-foreground"
                  required
                />
                <Input
                  placeholder="Your Vehicle (optional)"
                  value={form.vehicle}
                  onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                  className="bg-background border-white/10 text-white placeholder:text-muted-foreground"
                />
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Your Rating</p>
                  <StarRating rating={form.rating} onRate={(r) => setForm({ ...form, rating: r })} interactive />
                </div>
                <Textarea
                  placeholder="Tell us about your experience *"
                  value={form.review_text}
                  onChange={(e) => setForm({ ...form, review_text: e.target.value })}
                  className="bg-background border-white/10 text-white placeholder:text-muted-foreground min-h-[100px]"
                  required
                />
                <div className="flex gap-3">
                  <Button type="submit" disabled={createReview.isPending} className="bg-primary hover:bg-primary/90 text-white flex-1 rounded-full">
                    <Send className="w-4 h-4 mr-2" />
                    {createReview.isPending ? 'Submitting...' : 'Submit Review'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)} className="border-white/10 text-white rounded-full">
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}