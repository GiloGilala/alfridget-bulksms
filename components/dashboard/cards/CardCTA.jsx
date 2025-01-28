import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { PaymentCart } from "@/lib/payment/PaymentCart";

export const CardCTA = ({
  className,
  title,
  description,
  buttonText,
  handleButtonClick,
  modalButton,
  items,
  paymentType,
}) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        {modalButton ? (
          <PaymentCart items={items} paymentType={paymentType} />
        ) : (
          <Button onClick={handleButtonClick}>{buttonText}</Button>
        )}
      </CardFooter>
    </Card>
  );
};
