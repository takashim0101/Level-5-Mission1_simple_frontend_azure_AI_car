# AI Car Type Predictor - Frontend

This is the frontend application for the AI Car Type Predictor, a simple React application that allows users to upload car images and get predictions on the car's type using an Azure Custom Vision model.

## Project Overview

This React application acts as a client for a Node.js backend. It handles:

- **Image Selection**: Users can choose an image file from their local machine.
- **Image Upload**: The selected image is sent to the backend server.
- **Prediction Request**: Once uploaded, the frontend requests the backend to perform a prediction using the Azure Custom Vision API.
- **Result Display**: Prediction results (car type and probability) and the uploaded image are displayed to the user.
- **Error Handling**: Basic loading states and error messages are provided for a better user experience.

## Features

- **User-Friendly Interface**: Simple form for image selection and submission.
- **Real-time Feedback**: Shows "Processing..." while waiting for predictions.
- **Image Preview**: Displays the uploaded image along with its classification results.
- **Error Reporting**: Informs the user if an error occurs during the upload or prediction process.

## Setup and Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: (LTS version recommended)
- npm (comes with Node.js)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <your-frontend-repo-url>
   cd Mission1_turners-ai-azure_prototype_frontend_simple

2. **Install Dependencies:**:

   ```bash
   npm install
   npm run dev

How to Use
1. Start both your Backend and Frontend servers.
2. Open your web browser and navigate to the frontend URL (e.g., http://localhost:3000).
3. Click on "Choose File" and select an image of a car from your computer.
4. Click "Ask AI to Predict".
5. The application will display the prediction results (car type and probability) below the button, along with the image.