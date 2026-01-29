'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrayerRequestsSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Prayer Requests</h2>
        <p className="text-xl text-muted-foreground mb-4">
          "The prayer of a righteous person is powerful and effective." — James 5:16
        </p>
        <p className="text-lg max-w-3xl mx-auto mb-8">
          We believe in the power of prayer. Share your prayer requests with us, and our prayer team will intercede for you.
        </p>
        <Link href="/prayer">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
            Submit a Prayer Request
          </Button>
        </Link>
      </div>
    </section>
  );
}
