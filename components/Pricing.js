import { useState } from 'react';
import plans from '../data/pricingData'; // Adjust the path as necessary depending on your project structure

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);


  return (
    <div>
      <div className="flex justify-center space-x-4 mb-4">
        <button onClick={() => setIsAnnual(false)} className={`px-4 py-2 ${!isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Monthly</button>
        <button onClick={() => setIsAnnual(true)} className={`px-4 py-2 ${isAnnual ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Annual</button>
      </div>
      <div className="grid grid-cols-3 gap-4 text-black">
        {plans.map(plan => (
          <div key={plan.name} className="bg-gray-300 p-4 shadow rounded">
            <h2 className="text-lg font-bold">{plan.name}</h2>
            <ul className="mt-2 mb-4">
              {plan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <div className="text-lg font-bold">
              {isAnnual ? plan.priceAnnual : plan.priceMonthly}
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
