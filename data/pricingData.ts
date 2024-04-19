export type Plan = {
  name: string;
  features: string[];
  paddle_priceID: string;
  annual_paddle_id: string;
  monthly_paddle_id: string;
  priceMonthly: string;
  priceAnnual: string;
};

const pricingData: Plan[] = [
  // ... your pricing plans
  {
    name: "Basic Plan",
    features: [
      "Access to basic app features",
      "5 GB of storage",
      "Support for up to 2 users",
      "Community support",
    ],
    annual_paddle_id: 'pri_01hvvs3zpaskmnweendk9m7834',
    monthly_paddle_id: 'pri_01he66dd0f63f2dnvyz04mt7mf',
    paddle_priceID: 'pri_01hpmr2v605g74e6aqbv00x7f9',
    priceMonthly: "$10",
    priceAnnual: "$100" // 2 months free
  },
  {
    name: "Premium Plan",
    features: [
      "Access to all app features",
      "50 GB of storage",
      "Support for up to 10 users",
      "Priority email support",
    ],
    annual_paddle_id: 'pri_01h2xgz6xra8c679r3j6qmty72',
    monthly_paddle_id: 'pri_01h2xgxv0x96p98fm38m22evy2',
    paddle_priceID: 'pri_01hpmr11wfz39vj2ee1bt2jtt3',
    priceMonthly: "$30",
    priceAnnual: "$300" // 2 months free
  },
  {
    name: "Enterprise Plan",
    features: [
      "All Premium features plus",
      "150 GB of storage",
      "Unlimited users",
      "Phone and email support",
      "Early access to new features",
    ],
    annual_paddle_id: 'pri_01h9192raakw7jmgzhh6p76bwf',
    monthly_paddle_id: 'pri_01ha79g3njc861z12cead8tse4',
    paddle_priceID: 'pri_01he66dd0f63f2dnvyz04mt7mf',
    priceMonthly: "$50",
    priceAnnual: "$500" // 2 months free
  }
];

export default pricingData;
