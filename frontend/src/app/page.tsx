'use client';

import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import PrayerRequestsSection from '@/components/PrayerRequestsSection';

export const metadata: Metadata = {
  title: 'Home - Heaven on Earth Kingdom Family Ministries',
  description: 'Welcome to Heaven on Earth Kingdom Family Ministries - A Place of Faith, Love, and Community in Addis Ababa, Ethiopia',
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Heaven on Earth Kingdom Family Ministries</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto italic">
            "Your kingdom come, your will be done, on earth as it is in heaven."
            <span className="block mt-2">— Matthew 6:10</span>
          </p>
          <div className="mt-8 space-x-4">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg">
              Join Our Family
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Welcome to Our Church</h2>
          <p className="text-xl text-center text-muted-foreground mb-8">A Place of Faith, Love, and Community</p>
          <p className="text-lg text-center max-w-3xl mx-auto mb-8">
            We are a family of believers dedicated to spreading the Gospel of Jesus Christ, nurturing spiritual growth, and serving our community in Addis Ababa and beyond. Join us as we seek to bring heaven to earth through prayer, worship, and love.
          </p>
          <div className="text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Discover Our Story
            </Button>
          </div>
        </div>
      </section>

      {/* Prayer Requests Section */}
      <PrayerRequestsSection />

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Testimonies of Faith</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Stories of God's Faithfulness in Our Lives
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🙌</div>
              <h3 className="text-xl font-semibold mb-2">Healing Testimony</h3>
              <p className="text-muted-foreground mb-4 italic">"After years of chronic pain, I experienced complete healing during one of the prayer meetings. God is truly a miracle worker!"</p>
              <p className="text-right text-sm text-gray-500">— Sarah M.</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">Healing</span>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✝️</div>
              <h3 className="text-xl font-semibold mb-2">New Life in Christ</h3>
              <p className="text-muted-foreground mb-4 italic">"I was lost in addiction, but through this ministry, I found hope and a new life in Christ. Forever grateful!"</p>
              <p className="text-right text-sm text-gray-500">— John D.</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Salvation</span>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">God's Provision</h3>
              <p className="text-muted-foreground mb-4 italic">"When I lost my job, I thought all was lost. But God provided in ways I never imagined through the support of this community."</p>
              <p className="text-right text-sm text-gray-500">— Amina K.</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">Provision</span>
            </div>
          </div>
        </div>
      </section>

      {/* How You Can Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">How You Can Help</h2>
          <p className="text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Join us in our mission to spread love and faith in our community
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🙏</div>
              <h3 className="text-xl font-semibold mb-2">Pray With Us</h3>
              <p className="text-muted-foreground">Join our prayer community and intercede for the needs of others.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
              <p className="text-muted-foreground">Share your time and talents to serve our community.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-2">Give</h3>
              <p className="text-muted-foreground">Support our ministry and outreach programs financially.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
              Get Involved Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
