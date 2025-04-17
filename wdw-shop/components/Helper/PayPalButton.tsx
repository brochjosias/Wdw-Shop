import React from "react";
import {
  FUNDING,
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

interface PayPalOrderDetails {
  id: string;
  status: string;
  payer: {
    email_address?: string;
    name?: {
      given_name?: string;
      surname?: string;
    };
  };
  create_time?: string;
  update_time?: string;
  // Add other fields you need from the PayPal response
}

interface PaypalButtonProps {
  amount: string;
  onSuccess: (details: PayPalOrderDetails) => void;
}

const PayPalButton = ({ amount, onSuccess }: PaypalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: "BRL",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => {
          if (!actions.order) {
            throw new Error("Failed to initialize PayPal order");
          }

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "BRL",
                  value: amount,
                },
              },
            ],
            intent: "CAPTURE",
          });
        }}
        onApprove={(data, actions) => {
          if (!actions.order) {
            throw new Error("Failed to capture PayPal order");
          }

          return actions.order.capture().then((details) => {
            // Type assertion with proper field mapping
            const successDetails: PayPalOrderDetails = {
              id: details.id || "",
              status: details.status || "",
              payer: {
                email_address: details.payer?.email_address,
                name: {
                  given_name: details.payer?.name?.given_name,
                  surname: details.payer?.name?.surname,
                },
              },
              create_time: details.create_time,
              update_time: details.update_time,
            };
            onSuccess(successDetails);
          });
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          // Handle error appropriately
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
