"use client"
import Navbar from '../components/Navbar';

const Management = () => {
    return (<>
        <Navbar />
        <div className="container mx-auto p-4">
            <h1 className="text-xl font-bold mb-4">Management Dashboard</h1>
            <h1 className="text-xl font-bold mb-4">Subscription Management</h1>
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 m-2"
                    onClick={() => alert('Update Payment Details clicked')}
                >
                    Update Payment Details
                </button>
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 m-2"
                    onClick={() => alert('Pause clicked')}
                >
                    Pause
                </button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 m-2"
                    onClick={() => alert('Cancel Plan clicked')}
                >
                    Cancel Plan
                </button>
            </div>
        </div>
    </>
    );
};

export default Management;
