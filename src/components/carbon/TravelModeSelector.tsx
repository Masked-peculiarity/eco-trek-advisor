import { Car, Train, Plane, Bus } from 'lucide-react';

export type TravelMode = 'car' | 'train' | 'plane' | 'bus';

interface TravelModeSelectorProps {
  selectedMode: TravelMode;
  onModeSelect: (mode: TravelMode) => void;
}

const TravelModeSelector = ({ selectedMode, onModeSelect }: TravelModeSelectorProps) => {
  const modes = [
    { id: 'car' as TravelMode, label: 'Car', icon: Car, emoji: '🚗', co2: 0.21 },
    { id: 'train' as TravelMode, label: 'Train', icon: Train, emoji: '🚂', co2: 0.041 },
    { id: 'plane' as TravelMode, label: 'Plane', icon: Plane, emoji: '✈️', co2: 0.255 },
    { id: 'bus' as TravelMode, label: 'Bus', icon: Bus, emoji: '🚌', co2: 0.089 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isSelected = selectedMode === mode.id;
        
        return (
          <button
            key={mode.id}
            onClick={() => onModeSelect(mode.id)}
            className={`travel-mode-btn ${isSelected ? 'active' : ''}`}
          >
            <div className="text-3xl mb-2">{mode.emoji}</div>
            <Icon className={`h-6 w-6 mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
              {mode.label}
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              {mode.co2} kg CO₂/km
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TravelModeSelector;