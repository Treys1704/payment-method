import { motion } from "framer-motion";
import { CardData } from "../types";
import { useState } from "react";

interface AddCardProps {
  onSave: (data: Partial<CardData>) => void;
}

export function AddCard({ onSave }: AddCardProps) {
  const [formData, setFormData] = useState({
    nameOnCard: "TRESOR MANOCK",
    cardNumber: "5774 3482 1240 9001",
    expiryMonth: "09",
    expiryYear: "29",
  });

  // Supprimez ce useEffect
  // useEffect(() => {
  //   onSave(formData)
  // }, [formData, onSave])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.join(" ");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg p-8 shadow-lg relative aspect-[1.9/1]">
        <div className="absolute right-8 top-8">
          <img
            src="/images/card-flux.jpg"
            alt="Card chip"
            width={60}
            height={45}
          />
        </div>

        <h3 className="text-2xl font-medium mb-24">Credit Card</h3>

        <div className="mt-auto flex justify-between gap-4 w-[87%]">
          <input
            type="text"
            name="nameOnCard"
            value={formData.nameOnCard}
            onChange={handleInputChange}
            className="text-xl text-gray-700 uppercase bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-700"
            placeholder="NAME ON CARD"
          />

          <div className="flex items-center gap-1">
          <div className="flex gap-1">
              <input
                type="text"
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleInputChange}
                className="w-8 text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-700"
                placeholder="MM"
                maxLength={2}
              />
              <span>/</span>
              <input
                type="text"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleInputChange}
                className="w-8 text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-700"
                placeholder="YY"
                maxLength={2}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value);
              setFormData((prev) => ({ ...prev, cardNumber: formatted }));
            }}
            className="text-2xl bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-700 w-3/4"
            placeholder="CARD NUMBER"
            maxLength={19}
          />
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <input
                type="text"
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleInputChange}
                className="w-8 text-center bg-transparent border-b border-gray-300 focus:outline-none focus:border-gray-700"
                placeholder="YY"
                maxLength={3}
              />
            </div>
            <img
              src="/images/mastercard.jpg"
              alt="Mastercard"
              width={60}
              height={40}
            />
          </div>
        </div>

        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition-colors mr-4"
          >
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}
