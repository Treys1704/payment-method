export type CardData = {
  id: string;
  lastFourDigits: string;
  expiryMonth: string;
  expiryYear: string;
  cardType: "visa" | "mastercard";
  nameOnCard?: string;
  cardNumber?: string;
};

export type CardState = {
  isEditing: boolean;
  isAdding: boolean;
  selectedCard: string | null;
};
