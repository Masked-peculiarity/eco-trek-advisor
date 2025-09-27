import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Search, Route, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const JourneyPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure: '',
    return: '',
    travelers: 1,
    tripType: 'round-trip'
  });

  const [suggestions] = useState([
    { id: 1, name: 'Paris, France', type: 'City', distance: '1,200 km', eco: 'Train Available' },
    { id: 2, name: 'Swiss Alps', type: 'Mountain', distance: '800 km', eco: 'EV Charging Stations' },
    { id: 3, name: 'Amsterdam, Netherlands', type: 'City', distance: '600 km', eco: 'Bike Friendly' },
    { id: 4, name: 'Barcelona, Spain', type: 'Coastal', distance: '1,500 km', eco: 'High-Speed Rail' }
  ]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFindRoutes = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Plan Your Journey</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create sustainable travel plans with smart route optimization and eco-friendly recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Planning Form */}
          <div className="lg:col-span-2">
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  Trip Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Trip Type */}
                <div className="flex gap-4">
                  {['round-trip', 'one-way'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('tripType', type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        formData.tripType === type
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {type === 'round-trip' ? 'Round Trip' : 'One Way'}
                    </button>
                  ))}
                </div>

                {/* From & To */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="from" className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4" />
                      From
                    </Label>
                    <Input
                      id="from"
                      placeholder="Departure city"
                      value={formData.from}
                      onChange={(e) => handleInputChange('from', e.target.value)}
                      className="w-full"
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
                      value={formData.to}
                      onChange={(e) => handleInputChange('to', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="departure" className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      Departure
                    </Label>
                    <Input
                      id="departure"
                      type="date"
                      value={formData.departure}
                      onChange={(e) => handleInputChange('departure', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  {formData.tripType === 'round-trip' && (
                    <div>
                      <Label htmlFor="return" className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4" />
                        Return
                      </Label>
                      <Input
                        id="return"
                        type="date"
                        value={formData.return}
                        onChange={(e) => handleInputChange('return', e.target.value)}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>

                {/* Travelers */}
                <div>
                  <Label htmlFor="travelers" className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4" />
                    Travelers
                  </Label>
                  <Input
                    id="travelers"
                    type="number"
                    min="1"
                    max="10"
                    value={formData.travelers}
                    onChange={(e) => handleInputChange('travelers', parseInt(e.target.value))}
                    className="w-full max-w-32"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleFindRoutes}
                    className="flex-1 bg-gradient-forest text-white hover:opacity-90"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Routes
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Sidebar */}
          <div>
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="text-lg">🌍 Popular Eco-Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((destination) => (
                    <button
                      key={destination.id}
                      onClick={() => handleInputChange('to', destination.name)}
                      className="w-full text-left p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="font-medium text-foreground">{destination.name}</div>
                      <div className="text-sm text-muted-foreground">{destination.type} • {destination.distance}</div>
                      <div className="text-xs text-primary mt-1">💚 {destination.eco}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="nature-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">💡 Travel Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <span className="text-primary">🚂</span>
                    <span>Trains emit 80% less CO₂ than flying</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">🏨</span>
                    <span>Book eco-certified accommodations</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">🎒</span>
                    <span>Pack light to reduce fuel consumption</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">📱</span>
                    <span>Download offline maps to save data</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyPlanner;