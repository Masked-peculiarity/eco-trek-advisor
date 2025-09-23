import { Leaf } from 'lucide-react';

interface EcoScoreBarProps {
  emissions: number;
  maxEmissions?: number;
}

const EcoScoreBar = ({ emissions, maxEmissions = 500 }: EcoScoreBarProps) => {
  // Calculate eco score (higher emissions = lower score)
  const rawScore = Math.max(0, 100 - (emissions / maxEmissions) * 100);
  const ecoScore = Math.min(100, rawScore);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-green-400 to-green-500';
    if (score >= 40) return 'from-yellow-400 to-yellow-500';
    if (score >= 20) return 'from-orange-400 to-orange-500';
    return 'from-red-400 to-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Eco Champion';
    if (score >= 60) return 'Eco Friendly';
    if (score >= 40) return 'Moderate Impact';
    if (score >= 20) return 'High Impact';
    return 'Very High Impact';
  };

  return (
    <div className="bg-card rounded-xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Leaf className="h-5 w-5 text-primary" />
          Eco Score
        </h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{ecoScore.toFixed(0)}</div>
          <div className="text-xs text-muted-foreground">out of 100</div>
        </div>
      </div>

      <div className="eco-progress mb-3">
        <div 
          className={`eco-progress-fill bg-gradient-to-r ${getScoreColor(ecoScore)}`}
          style={{ width: `${ecoScore}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Sustainability Rating</span>
        <span className="font-medium text-primary">{getScoreLabel(ecoScore)}</span>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          💚 Lower emissions mean higher scores. Choose eco-friendly transport to boost your rating!
        </p>
      </div>
    </div>
  );
};

export default EcoScoreBar;