import { Plan } from '../../data/pricingData'; // Adjust the import path to where you've defined your Plan interface

interface SubscriptionManagementProps {
    currentPlanName: string;
    plans: Plan[];
}

const SubscriptionManagement = ({ currentPlanName, plans }: SubscriptionManagementProps) => {

    const currentPlanIndex = plans.findIndex(plan => plan.name === currentPlanName);
    const currentPlan = plans[currentPlanIndex];

    const canUpgrade = currentPlanIndex < plans.length - 1;
    const canDowngrade = currentPlanIndex > 0;
    const canPause = true; // Assuming you always allow pausing
    const canCancel = true; // Assuming you always allow cancelling


    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold">Subscription Management</h2>
            <p>Current Plan: {currentPlan.name}</p>
            <div>
                {canUpgrade && (
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 m-2">
                        Upgrade to {plans[currentPlanIndex + 1].name}
                    </button>
                )}
                {canDowngrade && (
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 m-2">
                        Downgrade to {plans[currentPlanIndex - 1].name}
                    </button>
                )}
            </div>
            <div>
                {canPause && (
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-2">
                        Pause Plan
                    </button>
                )}
                {canCancel && (
                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 m-2">
                        Cancel Plan
                    </button>
                )}
            </div>
        </div>
    );
};

export default SubscriptionManagement;
