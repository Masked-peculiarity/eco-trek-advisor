import { useState } from 'react';
import { Leaf, Calculator, MapPin, Route } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TravelModeSelector, { TravelMode } from '@/components/carbon/TravelModeSelector';
import CarbonResultCard from '@/components/carbon/CarbonResultCard';
import EcoScoreBar from '@/components/carbon/EcoScoreBar';

const Carbon = () => {
  const [selectedMode, setSelectedMode] = useState<TravelMode>('car');
  const [distance, setDistance] = useState<number>(500);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  // CO₂ emissions per km for different transport modes
  const emissionFactors = {
    car: 0.21,
    train: 0.041,
    plane: 0.255,
    bus: 0.089
  };

  const totalEmissions = distance * emissionFactors[selectedMode];

  const [savedTrips] = useState([
    { id: 1, from: 'Berlin', to: 'Paris', mode: 'train', distance: 1054, emissions: 43.2 },
    { id: 2, from: 'Madrid', to: 'Barcelona', mode: 'car', distance: 620, emissions: 130.2 },
    { id: 3, from: 'London', to: 'Amsterdam', mode: 'plane', distance: 358, emissions: 91.3 }
  ]);

  const calculateRoute = () => {
    // In a real app, this would calculate the actual distance between locations
    console.log(`Calculating route from ${fromLocation} to ${toLocation}`);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Carbon Footprint Tracker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Calculate and monitor your travel carbon emissions to make more sustainable choices
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Carbon Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Route Input */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from" className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      From
                    </Label>
                    <Input
                      id="from"
                      placeholder="Origin city"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to" className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      To
                    </Label>
                    <Input
                      id="to"
                      placeholder="Destination city"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={calculateRoute}
                  variant="outline" 
                  className="w-full md:w-auto"
                >
                  <Route className="h-4 w-4 mr-2" />
                  Calculate Route Distance
                </Button>

                {/* Manual Distance Input */}
                <div>
                  <Label htmlFor="distance" className="flex items-center gap-2 mb-2">
                    <Route className="h-4 w-4" />
                    Distance (km)
                  </Label>
                  <Input
                    id="distance"
                    type="number"
                    placeholder="Enter distance in kilometers"
                    value={distance}
                    onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
                    className="max-w-xs"
                  />
                </div>

                {/* Travel Mode Selection */}
                <div>
                  <Label className="block mb-4 text-base font-medium">Select Travel Mode</Label>
                  <TravelModeSelector
                    selectedMode={selectedMode}
                    onModeSelect={setSelectedMode}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {distance > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <CarbonResultCard
                  mode={selectedMode}
                  distance={distance}
                  emissions={totalEmissions}
                />
                <EcoScoreBar emissions={totalEmissions} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {/* Comparison Chart */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle>📊 Mode Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                {distance > 0 && (
                  <div className="space-y-4">
                    {Object.entries(emissionFactors).map(([mode, factor]) => {
                      const emissions = distance * factor;
                      const percentage = (emissions / Math.max(...Object.values(emissionFactors).map(f => f * distance))) * 100;
                      
                      return (
                        <div key={mode} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize font-medium">{mode}</span>
                            <span className="text-muted-foreground">{emissions.toFixed(1)} kg CO₂</span>
                          </div>
                          <div className="eco-progress">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                mode === 'train' ? 'bg-green-500' :
                                mode === 'bus' ? 'bg-green-400' :
                                mode === 'car' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Saved Trips */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle>🗂️ Recent Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedTrips.map((trip) => (
                    <div key={trip.id} className="p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-sm">{trip.from} → {trip.to}</div>
                          <div className="text-xs text-muted-foreground capitalize">{trip.mode} • {trip.distance} km</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-destructive">{trip.emissions} kg CO₂</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Offset Options */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle>🌱 Carbon Offset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{totalEmissions.toFixed(1)} kg</div>
                    <div className="text-sm text-muted-foreground">CO₂ to offset</div>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Plant {Math.ceil(totalEmissions / 22)} trees</span>
                      <span className="text-primary">€{(totalEmissions * 0.02).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Renewable energy projects</span>
                      <span className="text-primary">€{(totalEmissions * 0.015).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forest conservation</span>
                      <span className="text-primary">€{(totalEmissions * 0.025).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-nature text-white hover:opacity-90 mt-4">
                    <Leaf className="h-4 w-4 mr-2" />
                    Offset This Trip
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carbon;