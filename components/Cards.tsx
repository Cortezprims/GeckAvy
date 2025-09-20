import React from 'react';
import { useGeckAvy } from '../hooks/useGeckAvy';
import VirtualCard from './VirtualCard';
import Icon from './Icon';
import { ICONS } from '../constants';

const Cards: React.FC = () => {
    const { cards, addCard } = useGeckAvy();

    const handleAddCard = () => {
        const alias = prompt("Enter an alias for your new card:", "New Card");
        if(alias) {
            addCard(alias);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-brand-text-primary">My Cards</h1>
                <button 
                    onClick={handleAddCard}
                    className="flex items-center space-x-2 bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-blue/90 transition-colors"
                >
                    <Icon path={ICONS.plus} className="w-5 h-5"/>
                    <span>Add New Card</span>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {cards.map(card => (
                    <VirtualCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Cards;