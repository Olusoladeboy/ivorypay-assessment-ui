This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Setting Up and Running the Application Locally

To run the application locally, follow these steps:

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version 20)
- npm
- Git

## Installation

1. Clone the repository to your local machine using the following command: git clone git@github.com:Olusoladeboy/ivorypay-assessment-ui.git
2. Navigate to the project directory: cd ivorypay-assessment-ui
3. Install the project dependencies: npm install

## Configuration

1. Create a `.env` file in the root of the project.

2. Add the following environment variables to the `.env` file: NEXT_PUBLIC_PAYSTACK_KEY=your-paystack-public-key

Replace `your-paystack-public-key` with your actual Paystack public key.

## Running the Application

1. Start the development server: npm run dev

2. Open your web browser and visit `http://localhost:4000` to access the application.

## Testing

To run the tests, use the following command: npx cypress open

## Deployment

Deployed via AWS EC2 alongside with the API service

## Documentation

# Checkout Component

The `Checkout` component is a React component that implements a checkout form and displays a table of transactions. It utilizes various libraries such as React, Ant Design (antd), axios, and react-paystack.

## Architecture Overview

The component follows a modular structure and leverages the capabilities of Ant Design for form handling, table display, and notifications. It integrates with external libraries such as axios for API communication and react-paystack for payment integration.

## Code Structure

The code is structured as follows:

- Import statements for required libraries and dependencies.
- Definition of types and interfaces used in the component.
- Definition of the `Checkout` component function.
- Declaration of component state variables using the `useState` hook.
- Definition of functions for form submission, notification display, and payment integration.
- Configuration objects for form layout and table columns.
- Implementation of the `getTransactions` function to fetch transaction data.
- Usage of the `useEffect` hook to fetch transaction data on component mount.
- Rendering of the checkout form using the Ant Design `Form` component.
- Rendering of the payment button using the custom `PaymentButton` component.
- Rendering of the transaction table using the Ant Design `Table` component.
- Usage of the `Skeleton` component for loading state display.

## Important Design Decisions

- State Management: The component uses the `useState` hook to manage the state of `transactions`, `loading`, and `formData`. It also utilizes the `Form.useForm` hook from Ant Design to manage the form state.
- Notification System: The `notification` component from Ant Design is used to display notifications. The `openNotificationWithIcon` function is defined to show notifications with different types.
- Payment Integration: The component integrates with the Paystack payment gateway using the `react-paystack` library. The `PaymentButton` component initializes the payment using the `usePaystackPayment` hook.
- API Communication: Functions from the `api.service` module are used to interact with the API. Functions such as `createTransaction` and `retrieveTransactions` are called within the component's lifecycle methods to perform API requests and update the state.
