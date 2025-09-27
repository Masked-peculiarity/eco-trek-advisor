import { useState } from 'react';
import { MapPin, Navigation, Search, Mountain, Trees, MapIcon, Clock, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Map = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const savedLocations = [
    { id: 1, name: 'Starting Point', type: 'departure', icon: '🏠', coordinates: '40.7128, -74.0060' },
    { id: 2, name: 'Scenic Overlook', type: 'waypoint', icon: '🌄', coordinates: '40.7614, -73.9776' },
    { id: 3, name: 'Restaurant Stop', type: 'food', icon: '🍽️', coordinates: '40.7614, -73.9776' },
    { id: 4, name: 'Final Destination', type: 'arrival', icon: '🏁', coordinates: '40.7831, -73.9712' }
  ];

  const routeInfo = {
    totalDistance: '127 miles',
    estimatedTime: '2h 45m',
    waypoints: '4 stops',
    fuelCost: '~$25'
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Interactive Map</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore your route and discover points of interest along the way
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Map Area */}
          <div className="lg:col-span-3">
            {/* Journey Route Header */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Journey Route
                  </CardTitle>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      Directions
                    </Button>
                    <Button className="bg-gradient-forest text-white hover:opacity-90 flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      Optimize Route
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Map Container */}
            <Card className="nature-card">
              <CardContent className="p-0">
                <div className="relative bg-gradient-subtle rounded-lg overflow-hidden" style={{ height: '500px' }}>
                  {/* Map Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/10">
                    <div className="text-center mb-8">
                      <MapIcon className="h-24 w-24 text-primary/30 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground mb-6">
                        Map integration coming soon - will show your journey route and points of interest
                      </p>
                      <Button className="bg-gradient-forest text-white hover:opacity-90">
                        <Trees className="h-4 w-4 mr-2" />
                        Load Map View
                      </Button>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Search Locations */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="text-lg">Search Locations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search places..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                  Find Location
                </Button>
              </CardContent>
            </Card>

            {/* Saved Locations */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5 text-primary" />
                  Saved Locations
                </CardTitle>
                <p className="text-sm text-muted-foreground">Your marked points of interest</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedLocations.map((location) => (
                    <div key={location.id} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all">
                      <span className="text-xl">{location.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground">{location.name}</div>
                        <div className="text-sm text-primary capitalize">{location.type}</div>
                        <div className="text-xs text-muted-foreground">{location.coordinates}</div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full mt-4 border-dashed border-primary/50 text-primary hover:bg-primary/10">
                    + Add New Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Route Info */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="text-lg">Route Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Distance</span>
                    <span className="font-semibold text-foreground">{routeInfo.totalDistance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Estimated Time
                    </span>
                    <span className="font-semibold text-foreground">{routeInfo.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Waypoints</span>
                    <span className="font-semibold text-foreground">{routeInfo.waypoints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Fuel Cost
                    </span>
                    <span className="font-semibold text-primary">{routeInfo.fuelCost}</span>
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

export default Map;