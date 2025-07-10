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
    annual_paddle_id: 'pri_01jwh69gs7fck41hvvkzxwmzek',
    monthly_paddle_id: 'pri_01jwh6926xkeew7dzzqmfs5vvw',
    paddle_priceID: 'pri_01jwh6926xkeew7dzzqmfs5vvw',
    priceMonthly: "$29",
    priceAnnual: "$290" // 2 months free
  },
  {
    name: "Premium Plan",
    features: [
      "Access to all app features",
      "50 GB of storage",
      "Support for up to 10 users",
      "Priority email support",
    ],
    annual_paddle_id: 'pri_01jwh6bn2y3chzz6nn31zjyj93',
    monthly_paddle_id: 'pri_01jwh6ayh8ehm2rzxfpp8026qn',
    paddle_priceID: 'pri_01jwh6ayh8ehm2rzxfpp8026qn',
    priceMonthly: "$79",
    priceAnnual: "$790" // 2 months free
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
    annual_paddle_id: 'pri_01jwh6d6y60wj2k03vf1yvbvg7',
    monthly_paddle_id: 'pri_01jwh6cvrjfshn1azqnh69arz5',
    paddle_priceID: 'pri_01jwh6cvrjfshn1azqnh69arz5',
    priceMonthly: "$199",
    priceAnnual: "$190" // 2 months free
  }
];

export default pricingData;
