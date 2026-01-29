import TestimonialForm from '@/components/TestimonialForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Your Testimony',
  description: 'Share your story of faith, healing, or how God has worked in your life.',
};

export default function SubmitTestimonialPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-4">Share Your Testimony</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your story has the power to inspire and encourage others. Share how God has worked in your life.
        </p>
      </div>
      
      <div className="bg-card rounded-xl shadow-md p-6 md:p-8">
        <TestimonialForm />
      </div>
    </main>
  );
}
