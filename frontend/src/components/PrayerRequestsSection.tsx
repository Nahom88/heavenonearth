'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const prayerVerses = [
  {
    reference: 'Philippians 4:6-7',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'
  },
  {
    reference: '1 Thessalonians 5:16-18',
    text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.'
  },
  {
    reference: 'James 5:16',
    text: 'Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective.'
  },
  {
    reference: 'Matthew 6:9-13',
    text: 'This, then, is how you should pray: "Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven..."'
  }
];

export default function PrayerVersesSection() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Bible Verses About Prayer</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {prayerVerses.map((verse, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">"{verse.text}"</p>
              <p className="text-right font-medium text-primary">— {verse.reference}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/prayer">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Submit a Prayer Request
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
