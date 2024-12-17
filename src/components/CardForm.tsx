import { motion } from 'framer-motion'
import { useState } from 'react'
import { CardData } from '../types'

interface CardFormProps {
  card?: CardData
  onSave: (data: Partial<CardData>) => void
  onCancel?: () => void
  isNewCard?: boolean
}

export function CardForm({ card, onSave, onCancel, isNewCard = false }: CardFormProps) {
  const [formData, setFormData] = useState({
    nameOnCard: card?.nameOnCard || '',
    cardNumber: card?.cardNumber || '',
    expiryMonth: card?.expiryMonth || '',
    expiryYear: card?.expiryYear || '',
    cvv: card?.cvv || '',
  })

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <motion.form
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit}
      className={`space-y-4 ${
        isNewCard ? 'text-white' : 'border border-gray-200 rounded-lg p-6'
      }`}
    >
      <div>
        <label className="block text-sm font-medium mb-1">Name on card</label>
        <input
          type="text"
          value={formData.nameOnCard}
          onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
          className={`w-full p-2 rounded ${isNewCard ? 'bg-transparent border border-white' : 'border border-gray-300'}`}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Card number</label>
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
          className={`w-full p-2 rounded ${isNewCard ? 'bg-transparent border border-white' : 'border border-gray-300'}`}
          required
          maxLength={19}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Expiry</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={formData.expiryMonth}
              onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
              placeholder="MM"
              className={`w-full p-2 rounded ${isNewCard ? 'bg-transparent border border-white' : 'border border-gray-300'}`}
              maxLength={2}
              required
            />
            <input
              type="text"
              value={formData.expiryYear}
              onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
              placeholder="YY"
              className={`w-full p-2 rounded ${isNewCard ? 'bg-transparent border border-white' : 'border border-gray-300'}`}
              maxLength={2}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVV</label>
          <input
            type="password"
            value={formData.cvv}
            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
            className={`w-full p-2 rounded ${isNewCard ? 'bg-transparent border border-white' : 'border border-gray-300'}`}
            maxLength={3}
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`px-4 py-2 text-sm rounded transition-colors ${
            isNewCard ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Save
        </button>
      </div>
    </motion.form>
  )
}

