import { CreditCard, Bank, QrCode, Mail, Home, Gift } from 'lucide-react';

export const hero = {
  title: 'Giving',
  subtitle: 'Your generosity helps us continue our mission and make a difference in lives',
};

export const givingOptions = [
  {
    title: 'Bank Transfer',
    description: 'Make a direct deposit or transfer to our bank account.',
    icon: <Bank className="w-6 h-6" />,
  },
  {
    title: 'Mobile Money',
    description: 'Send your donation via mobile money to our dedicated number.',
    icon: <QrCode className="w-6 h-6" />,
  },
  {
    title: 'Check',
    description: 'Mail a check to our church office address.',
    icon: <Mail className="w-6 h-6" />,
  },
  {
    title: 'In-Person',
    description: 'Drop off your donation at our church office during business hours.',
    icon: <Home className="w-6 h-6" />,
  },
  {
    title: 'Stocks & Securities',
    description: 'Donate stocks, bonds, or mutual funds.',
    icon: <CreditCard className="w-6 h-6" />,
  },
  {
    title: 'Planned Giving',
    description: 'Include us in your will or estate plans.',
    icon: <Gift className="w-6 h-6" />,
  },
];

export const faqs = [
  {
    question: 'Is my donation tax-deductible?',
    answer: 'Yes, all donations to our church are tax-deductible to the fullest extent allowed by law. You will receive a receipt for your records.',
  },
  {
    question: 'How do I update my recurring donation?',
    answer: 'You can update or cancel your recurring donation at any time by contacting our finance department at giving@kingdomchurch.org.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards, bank transfers, mobile money, checks, and cash. Online giving is processed through our secure payment gateway.',
  },
  {
    question: 'How is my donation used?',
    answer: 'Your donations support our various ministries, community outreach programs, missions, and operational expenses. We strive for transparency in all our financial matters.',
  },
  {
    question: 'Do you accept international donations?',
    answer: 'Yes, we accept international donations through our online giving platform. Additional processing fees may apply for international transactions.',
  },
  {
    question: 'Can I designate my gift to a specific ministry?',
    answer: 'Yes, you can designate your gift to specific ministries or funds during the donation process. If you have specific instructions, please include them in the notes section.',
  },
];
