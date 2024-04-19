"use client"
import PricingCard from './components/PricingCard';
import Navbar from "./components/Navbar";



const HomePage: React.FC = () =>  {
  return (
    <div className=''>
      <Navbar />
      <PricingCard />
      
    </div>
  );
};

export default HomePage;
