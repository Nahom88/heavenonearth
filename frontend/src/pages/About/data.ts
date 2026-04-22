import { MapPin, Clock, Users, Target, Eye, Shield, Heart, Flame, Scroll, Cross, Sparkles, MessageCircle, Home, Globe2, Church, Zap } from 'lucide-react';

const aboutData = {
  mission: {
    icon: Target,
  },
  vision: {
    icon: Eye,
  },
  stats: [
    {
      icon: MapPin,
      value: '3',
      key: 'locations',
    },
    {
      icon: Users,
      value: '500+',
      key: 'members',
    },
    {
      icon: Clock,
      value: '15+',
      key: 'yearsOfService',
    },
  ],
  beliefs: [
    { key: 'wordOfGod', icon: Scroll },
    { key: 'trinity', icon: Shield },
    { key: 'jesusChrist', icon: Cross },
    { key: 'salvationNewBirth', icon: Heart },
    { key: 'kingdomOfGod', icon: Globe2 },
    { key: 'holySpirit', icon: Flame },
    { key: 'prayerWorship', icon: MessageCircle },
    { key: 'familyCommunity', icon: Home },
    { key: 'loveTransformation', icon: Sparkles },
    { key: 'church', icon: Church },
    { key: 'greatCommission', icon: Globe2 },
    { key: 'livingHeavenOnEarth', icon: Zap },
  ],
  values: [
    { key: 'kingdomFirst' },
    { key: 'presenceFocused' },
    { key: 'spiritLedSubmission' },
    { key: 'transformationalLove' },
    { key: 'templeOfGod' },
    { key: 'supernaturalLifestyle' },
  ],
  team: [
    { key: 'pastorAbraham' },
    { key: 'sisterTigist' },
    { key: 'brotherDaniel' },
  ],
};

export default aboutData;