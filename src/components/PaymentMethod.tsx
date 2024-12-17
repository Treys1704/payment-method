import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { AddCard } from './AddCard'
import { CardDisplay } from './CardDisplay'
import { CardForm } from './CardForm'
import { CardData, CardState } from '../types'

const initialCards: CardData[] = [
  {
    id: '1',
    lastFourDigits: '3822',
    expiryMonth: '07',
    expiryYear: '27',
    cardType: 'visa',
    nameOnCard: 'Kumail Nanji',
    cardNumber: '5344 3422 7930 3822',
    cvv: '123',
  },
  {
    id: '2',
    lastFourDigits: '9977',
    expiryMonth: '09',
    expiryYear: '29',
    cardType: 'mastercard',
    nameOnCard: 'Jane Smith',
    cardNumber: '4520 1234 5678 9977',
    cvv: '456',
  },
]

export default function PaymentMethod() {
  const [cards, setCards] = useState(initialCards)
  const [state, setState] = useState<CardState>({
    isEditing: false,
    isAdding: false,
    selectedCard: null,
  })
  const [,setAddCardData] = useState<Partial<CardData>>({});

  const handleEdit = (cardId: string) => {
    setState({ isEditing: true, isAdding: false, selectedCard: cardId })
  }

  const handleSave = (cardId: string, data: Partial<CardData>) => {
    setCards((prev) =>
      prev.map((card) => (card.id === cardId ? { ...card, ...data } : card))
    )
    setState({ isEditing: false, isAdding: false, selectedCard: null })
  }

  const handleAddCard = (data: Partial<CardData>) => {
    const newCard: CardData = {
      id: String(Date.now()),
      lastFourDigits: data.cardNumber?.slice(-4) || '0000',
      expiryMonth: data.expiryMonth || '12',
      expiryYear: data.expiryYear || '99',
      cardType: 'mastercard',
      nameOnCard: data.nameOnCard || '',
      cardNumber: data.cardNumber || '',
      ...data,
    }
    setCards((prev) => [...prev, newCard])
    setState({ isEditing: false, isAdding: false, selectedCard: null })
    setAddCardData({}) // Reset add card data
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-black text-white p-6 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Payment method</h2>
            <p className="text-gray-400">Change how you pay for your plan.</p>
          </div>
          {state.isAdding ? (
            <button
              onClick={() => setState({ isEditing: false, isAdding: false, selectedCard: null })}
              className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={() => setState({ isEditing: false, isAdding: true, selectedCard: null })}
              className="px-4 py-2 text-sm bg-white text-black rounded hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <span>+</span> Add card
            </button>
          )}
        </div>
      </div>
      <div className={`bg-black rounded-b-lg p-6 ${state.isAdding ? 'bg-black' : 'bg-white border border-gray-200'}`}>
        <AnimatePresence mode="wait">
          {state.isAdding ? (
            <AddCard 
              onSave={(data) => {
                handleAddCard(data)
                setState({ isEditing: false, isAdding: false, selectedCard: null })
              }} 
            />
          ) : (
            <motion.div className="space-y-4">
              {cards.map((card) =>
                state.isEditing && state.selectedCard === card.id ? (
                  <CardForm
                    key={card.id}
                    card={card}
                    onSave={(data) => handleSave(card.id, data)}
                    onCancel={() =>
                      setState({ isEditing: false, isAdding: false, selectedCard: null })
                    }
                  />
                ) : (
                  <CardDisplay
                    key={card.id}
                    card={card}
                    onEdit={() => handleEdit(card.id)}
                  />
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

