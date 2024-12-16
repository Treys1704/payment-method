import { motion } from 'framer-motion'
import { CardData } from '../types'

interface CardDisplayProps {
  card: CardData
  onEdit: () => void
}

export function CardDisplay({ card, onEdit }: CardDisplayProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-between p-4 border-2 border-black rounded-lg bg-white"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-6 relative">
          <img
            src={card.cardType === 'visa' ? '/images/visa.webp' : '/images/mastercard.jpg'}
            alt={card.cardType}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm">
            {card.cardNumber}
          </span>
          <span className="text-xs text-gray-500">
            {card.expiryMonth}/{card.expiryYear}
          </span>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="px-4 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
      >
        Edit
      </button>
    </motion.div>
  )
}

