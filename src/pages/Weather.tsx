import { useState } from 'react';
import { Search, MapPin, Thermometer, Cloud, Wind, Droplets, Sun, CloudRain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData] = useState({
    current: {
      location: 'Paris, France',
      temperature: 22,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      uvIndex: 6
    },
    forecast: [
      { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: '⛅' },
      { day: 'Tomorrow', high: 26, low: 20, condition: 'Sunny', icon: '☀️' },
      { day: 'Wednesday', high: 23, low: 17, condition: 'Light Rain', icon: '🌦️' },
      { day: 'Thursday', high: 25, low: 19, condition: 'Sunny', icon: '☀️' },
      { day: 'Friday', high: 21, low: 15, condition: 'Cloudy', icon: '☁️' }
    ]
  });

  const [recommendations] = useState([
    {
      title: 'Perfect Weather for Outdoor Activities',
      description: 'Great conditions for hiking, cycling, or exploring the city on foot.',
      icon: '🚶‍♂️',
      type: 'activity'
    },
    {
      title: 'Pack Light Layers',
      description: 'Temperature varies throughout the day. Bring a light jacket for evenings.',
      icon: '🧥',
      type: 'clothing'
    },
    {
      title: 'Don\'t Forget Sunscreen',
      description: 'UV index is moderate. Apply SPF 30+ if spending time outdoors.',
      icon: '☀️',
      type: 'health'
    },
    {
      title: 'Rain Expected Wednesday',
      description: 'Plan indoor activities or bring an umbrella for Wednesday.',
      icon: '☔',
      type: 'planning'
    }
  ]);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Weather Recommendations</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get detailed weather forecasts and travel recommendations for your destinations
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter destination (city, country)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-sky text-white hover:opacity-90">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-primary" />
                  Current Weather - {weatherData.current.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-2">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-xl text-muted-foreground">
                      {weatherData.current.condition}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Droplets className="h-6 w-6 mx-auto mb-2 text-accent" />
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                      <div className="text-sm text-muted-foreground">Humidity</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Wind className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                      <div className="text-sm text-muted-foreground">Wind</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg col-span-2">
                      <Sun className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                      <div className="font-semibold">UV Index {weatherData.current.uvIndex}</div>
                      <div className="text-sm text-muted-foreground">Moderate</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 5-Day Forecast */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-primary" />
                  5-Day Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{day.icon}</span>
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">{day.condition}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {day.high}° / {day.low}°
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommendations Sidebar */}
          <div>
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="text-lg">🌟 Travel Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{rec.icon}</span>
                        <div>
                          <div className="font-medium text-foreground mb-1">{rec.title}</div>
                          <div className="text-sm text-muted-foreground">{rec.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Tips */}
            <Card className="nature-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">💡 Weather Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex gap-2">
                    <span className="text-primary">🌡️</span>
                    <span>Check weather 3 days before travel</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">📱</span>
                    <span>Download weather apps for offline access</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">🎒</span>
                    <span>Pack for unexpected weather changes</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-primary">🌦️</span>
                    <span>Have backup indoor activities ready</span>
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

export default Weather;