import React, { useState } from 'react'; // Import the React library and useState hook
import axios from 'axios'; // Import axios to send HTTP requests

function App() {
    const [file, setFile] = useState(null); // This will hold the selected image file
    const [results, setResults] = useState(null); // This will hold the prediction results from the server
    const [loading, setLoading] = useState(false); // This tells us if we are currently processing
    const [error, setError] = useState(null); // This will hold any error messages

    // This function runs when we select a file
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Get the first file that was selected
        setResults(null); // Clear any previous results
        setError(null); // Clear any previous errors
    };

    // This function runs when we click the "Submit" button
    const handleSubmit = async () => {
        if (!file) {
            alert("Please select an image file."); // Show an alert if no file is chosen
            return; // Stop the function here
        }

        setLoading(true); // Start loading process
        setError(null); // Clear any previous errors
        setResults(null); // Clear any previous results

        const formData = new FormData(); // Create a new form data object
        formData.append('file', file); // Add the selected file to the form data

        try {
            // 1. Upload the image to the server
            const uploadResponse = await axios.post('http://localhost:3002/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }, // Set the header for file uploads
            });

            // 2. Ask the server for a prediction using the uploaded image
            const predictionResponse = await axios.post('http://localhost:3002/predict', { images: uploadResponse.data.images });
            setResults(predictionResponse.data); // Save the prediction results
            console.log("Prediction data received from backend:", predictionResponse.data); // Log the results

        } catch (err) {
            console.error('Error fetching prediction:', err); // Log any errors
            setError('An error occurred during prediction. Please check the console for details.'); // Show an error message
        } finally {
            setLoading(false); // Stop loading process
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>AI Car Type Predictor</h1> {/* Title of the app */}

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
                {/* File input for selecting an image */}
                <input
                    type="file"
                    accept="image/*" // Only allow image files
                    onChange={handleFileChange} // Run this function when a file is selected
                    style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                {/* Button to submit the selected file */}
                <button
                    onClick={handleSubmit} // Run this function when the button is clicked
                    disabled={loading || !file} // Disable button if loading or no file selected
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    {loading ? 'Processing...' : 'Ask AI to Predict'} {/* Change button text while processing */}
                </button>
            </div>

            {/* Display error message if there is one */}
            {error && (
                <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>
            )}

            {/* Display prediction results if they exist */}
            {results && results.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '20px', color: '#555' }}>Prediction Results:</h2>
                    {results.map((result, index) => (
                        <div key={index} style={{ marginBottom: '25px', padding: '15px', border: '1px solid #eee', borderRadius: '6px', backgroundColor: '#f9f9f9' }}>
                            <h3 style={{ color: '#333', marginBottom: '10px' }}>Image Name: {result.path}</h3>
                            {result.error ? ( // If there's an error in the result
                                <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {result.error}</p>
                            ) : (
                                <div>
                                    {/* Display prediction details from the server */}
                                    {result.predictions && result.predictions.length > 0 ? (
                                        result.predictions.map((prediction, predIndex) => (
                                            <p key={predIndex}>
                                                <strong>{prediction.tagName}:</strong> {prediction.probability}% {/* Show prediction name and probability */}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No predictions available.</p> // Show this if no predictions were found
                                    )}
                                    {/* Show the uploaded image */}
                                    {result.path && (
                                        <div style={{ marginTop: '15px', textAlign: 'center' }}>
                                            <img
                                                src={`http://localhost:3002/uploads/${result.path}`} // Get image from the server
                                                alt={result.path}
                                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', border: '1px solid #ddd', borderRadius: '4px' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Initial message when no file is selected */}
            {!file && !results && !loading && !error && (
                <p style={{ textAlign: 'center', color: '#777' }}>Please select an image file to let the AI predict the car type.</p>
            )}
        </div>
    );
}

export default App; // Export the App component to use it in other parts of the application




