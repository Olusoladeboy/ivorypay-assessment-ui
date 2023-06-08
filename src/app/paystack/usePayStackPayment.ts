import { useEffect } from "react";
import { PaystackProps, callback } from "../../lib/react-paystack/libs/types";
import usePaystackScript from "../../lib/react-paystack/libs/paystack-script";
import { callPaystackPop } from "../../lib/react-paystack/libs/paystack-actions";

export default function usePayStackPayment(): (
  options: PaystackProps,
  callback?: () => void,
  onClose?: () => void
) => void {
  const [scriptLoaded, scriptError] = usePaystackScript();

  function initializePayment(
    options: PaystackProps,
    callback?: callback,
    onClose?: callback
  ): void {
    const {
      publicKey,
      firstname,
      lastname,
      phone,
      email,
      amount,
      reference,
      metadata = {},
      currency = "NGN",
      channels,
      label = "",
      plan = "",
      quantity = "",
      subaccount = "",
      transaction_charge = 0,
      bearer = "account",
      split,
      split_code,
    } = options;

    if (scriptError) {
      throw new Error("Unable to load paystack inline script");
    }

    if (scriptLoaded) {
      const paystackArgs: Record<string, any> = {
        callback: callback ? callback : () => null,
        onClose: onClose ? onClose : () => null,
        key: publicKey,
        ref: reference,
        email,
        firstname,
        lastname,
        phone,
        amount,
        currency,
        plan,
        quantity,
        "data-custom-button": options["data-custom-button"] || "",
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
      };
      callPaystackPop(paystackArgs);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error("Unable to load paystack inline script");
    }
  }, [scriptError]);

  return initializePayment;
}
