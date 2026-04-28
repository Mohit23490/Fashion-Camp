import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const PaypalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID ,
      currency: "USD",
    locale: "en_US"  
    }}> {/* sandbox test ID */}
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          if (!amount) amount = "5.00"; // default amount to avoid undefined
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;