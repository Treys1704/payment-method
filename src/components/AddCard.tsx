import { motion } from "framer-motion";
import { CardData } from "../types";
import { useState } from "react";
import { Check } from "lucide-react";

interface AddCardProps {
  onSave: (data: Partial<CardData>) => void;
}

export function AddCard({ onSave }: AddCardProps) {
  const [formData, setFormData] = useState({
    nameOnCard: "TRESOR MANOCK",
    cardNumber: "5774 3482 1240 9001",
    expiryMonth: "09",
    expiryYear: "29",
    cvv: "123",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const parts = []
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.slice(i, i + 4))
    }
    return parts.join(' ').trim().slice(0, 19)
  }

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
            onChange={handleInputChange}
            autoComplete="off"
            className="text-xl text-gray-700 uppercase bg-transparent border-gray-300 focus:outline-none focus:border-gray-700"
            placeholder="TRESOR MANOCK"
          />

          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <input
                type="text"
                name="expiryMonth"
                onChange={handleInputChange}
                className="w-8 text-center bg-transparent border-gray-300 focus:outline-none focus:border-gray-700"
                placeholder="MM"
                maxLength={2}
              />
              <span>/</span>
              <input
                type="text"
                name="expiryYear"
                onChange={handleInputChange}
                className="w-8 text-center bg-transparent border-gray-300 focus:outline-none focus:border-gray-700"
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
                const formatted = formatCardNumber(e.target.value)
                setFormData(prev => ({ ...prev, cardNumber: formatted }))
              }}
            className="text-2xl bg-transparent border-gray-300 focus:outline-none focus:border-gray-700 w-3/4"
            placeholder="0000 0000 0000 0000"
            maxLength={19}
          />
          <div className="flex items-center gap-4">
            <div className="flex mt-1 mr-3">
              <input
                type="password"
                name="cvv"
                onChange={handleInputChange}
                className="w-10 text-left bg-transparent focus:outline-none focus:border-gray-700"
                placeholder="CVV"
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
            className="px-4 py-2 text-sm bg-black flex items-center gap-2 text-white rounded hover:bg-gray-800 transition-colors mr-5"
          >
            <Check size={16}/>
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}
