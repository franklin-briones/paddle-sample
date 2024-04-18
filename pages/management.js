import ProfileManagement from '../components/ProfileManagement';
import SubscriptionManagement from '../components/SubscriptionManagement';
import PaymentMethod from '../components/PaymentMethod';

const Management = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Management Dashboard</h1>
      <ProfileManagement />
      <SubscriptionManagement />
      <PaymentMethod />
    </div>
  );
};

export default Management;
