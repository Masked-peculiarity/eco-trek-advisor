import { Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { TravelMode } from './TravelModeSelector';

interface CarbonResultCardProps {
  mode: TravelMode;
  distance: number;
  emissions: number;
}

const CarbonResultCard = ({ mode, distance, emissions }: CarbonResultCardProps) => {
  const getEcoTips = (mode: TravelMode) => {
    const tips = {
      car: [
        'Consider carpooling to reduce emissions by up to 75%',
        'Electric vehicles produce 50% less CO₂',
        'Maintain proper tire pressure to improve fuel efficiency'
      ],
      train: [
        'Trains are one of the most eco-friendly transport options',
        'Book early for better prices and guaranteed seats',
        'Pack light snacks to avoid single-use packaging'
      ],
      plane: [
        'Consider direct flights - takeoffs use the most fuel',
        'Offset your carbon footprint through verified programs',
        'Pack light to reduce aircraft weight and fuel consumption'
      ],
      bus: [
        'Buses are very efficient for long-distance travel',
        'Choose modern bus operators with newer, cleaner vehicles',
        'Bring reusable water bottles and snacks'
      ]
    };
    return tips[mode] || [];
  };

  const getEcoRating = (emissions: number) => {
    if (emissions < 50) return { rating: 'Excellent', color: 'text-green-600', icon: CheckCircle };
    if (emissions < 100) return { rating: 'Good', color: 'text-green-500', icon: CheckCircle };
    if (emissions < 200) return { rating: 'Moderate', color: 'text-yellow-500', icon: AlertCircle };
    return { rating: 'High Impact', color: 'text-red-500', icon: AlertCircle };
  };

  const ecoRating = getEcoRating(emissions);
  const tips = getEcoTips(mode);
  const RatingIcon = ecoRating.icon;

  return (
    <div className="carbon-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Carbon Footprint
        </h3>
        <div className={`flex items-center gap-1 ${ecoRating.color}`}>
          <RatingIcon className="h-4 w-4" />
          <span className="text-sm font-medium">{ecoRating.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{emissions.toFixed(1)}</div>
          <div className="text-sm text-muted-foreground">kg CO₂</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{distance.toFixed(0)}</div>
          <div className="text-sm text-muted-foreground">km distance</div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3 text-primary">💡 Eco Tips</h4>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarbonResultCard;