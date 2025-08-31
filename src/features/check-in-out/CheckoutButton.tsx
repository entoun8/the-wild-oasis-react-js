import React from "react";
import Button from "../../ui/Button";

interface CheckoutButtonProps {
  bookingId: number | string;
}

function CheckoutButton({ bookingId }: CheckoutButtonProps): React.JSX.Element {
  return (
    <Button variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;