// components/MainContent.js
const MainContent = ({ userName }) => {
    return (
        <div className="flex-1 p-4">
            <h2>Welcome back, {userName}!</h2>
            <p>This is your dashboard, you can manage everything from here.</p>
            {/* Interactive widgets or data visualizations that reflect the user’s personal data */}
        </div>
    );
};
