import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, QrCode, Send, Check, AlertCircle } from 'lucide-react';
import { givingOptions, faqs, hero } from './data';

const Giving = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      try {
        // In a real app, you would handle the payment processing here
        console.log('Donation submitted:', {
          amount: amount === 'other' ? customAmount : amount,
          frequency,
        });
        setIsSuccess(true);
      } catch (err) {
        setError('An error occurred while processing your donation. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  const handleNewDonation = () => {
    setIsSuccess(false);
    setAmount('');
    setCustomAmount('');
    setFrequency('one-time');
  };

  const presetAmounts = [50, 100, 250, 500, 1000];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-6">
              <Banknote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
              {/* Tabs */}
              <div className="flex border-b border-border">
                <button
                  onClick={() => setActiveTab('one-time')}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'one-time'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  One-time Gift
                </button>
                <button
                  onClick={() => setActiveTab('recurring')}
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === 'recurring'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Recurring Giving
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Thank You for Your Generosity!</h3>
                    <p className="text-muted-foreground mb-6">
                      Your donation has been received. A confirmation has been sent to your email.
                    </p>
                    <button
                      onClick={handleNewDonation}
                      className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Make Another Donation
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Select an amount</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                          {presetAmounts.map((amt) => (
                            <button
                              key={amt}
                              type="button"
                              onClick={() => {
                                setAmount(amt.toString());
                                setCustomAmount('');
                              }}
                              className={`py-3 px-4 rounded-md border ${
                                amount === amt.toString()
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              ${amt.toLocaleString()}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => setAmount('other')}
                            className={`py-3 px-4 rounded-md border ${
                              amount === 'other'
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            Other
                          </button>
                        </div>

                        {amount === 'other' && (
                          <div className="mb-4">
                            <label htmlFor="custom-amount" className="sr-only">
                              Enter custom amount
                            </label>
                            <div className="relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-muted-foreground">$</span>
                              </div>
                              <input
                                type="number"
                                id="custom-amount"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                className="focus:ring-primary focus:border-primary block w-full pl-7 pr-12 py-3 border border-border rounded-md"
                                placeholder="0.00"
                                min="1"
                                step="0.01"
                                required
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {activeTab === 'recurring' && (
                        <div>
                          <h3 className="text-lg font-medium mb-4">Frequency</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                              { id: 'weekly', label: 'Weekly' },
                              { id: 'bi-weekly', label: 'Bi-weekly' },
                              { id: 'monthly', label: 'Monthly' },
                              { id: 'quarterly', label: 'Quarterly' },
                            ].map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setFrequency(item.id)}
                                className={`py-3 px-4 rounded-md border text-sm ${
                                  frequency === item.id
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border hover:border-primary/50'
                                }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || (!amount && !customAmount)}
                          className="w-full flex justify-center items-center px-6 py-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            'Processing...'
                          ) : (
                            <>
                              <CreditCard className="w-5 h-5 mr-2" />
                              {activeTab === 'one-time' ? 'Donate Now' : 'Set Up Recurring Gift'}
                            </>
                          )}
                        </button>
                      </div>

                      {error && (
                        <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-start">
                          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          All donations are secure and encrypted.
                        </p>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Giving Methods */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Other Ways to Give</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {givingOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{option.title}</h3>
                  <p className="text-muted-foreground mb-4">{option.description}</p>
                  <button className="text-primary hover:text-primary/80 text-sm font-medium">
                    Learn more →
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="border-b border-border pb-4"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Giving;
