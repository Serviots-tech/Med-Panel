import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PageNotFoundPage = () => {
    const navigate = useNavigate();
    const [secondsRemaining, setSecondsRemaining] = useState(10);

    useEffect(() => {
        // Create an interval to count down the seconds remaining
        const intervalId = setInterval(() => {
            setSecondsRemaining((prevSeconds) => {
                // When there is only 1 second left, clear the interval and redirect to login
                if (prevSeconds === 1) {
                    clearInterval(intervalId);
                    navigate("/");
                }
                // Decrement the remaining seconds
                return prevSeconds - 1;
            });
        }, 1000); // The interval runs every 1000ms (1 second)

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="mb-4">
                    <h1 className="text-6xl font-bold text-red-500">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Back to Home Page
                </button>
                <p className="mt-4 text-gray-600">
                    You will be automatically redirected to the home page in {secondsRemaining} {secondsRemaining === 1 ? "second" : "seconds"}.
                </p>
            </div>
        </div>
    );
};

export default PageNotFoundPage;
