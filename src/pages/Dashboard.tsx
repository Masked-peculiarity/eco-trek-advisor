import { useState } from 'react';
import { User, MapPin, Calculator, Leaf, Trophy, TrendingUp, Calendar, Route } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [userStats] = useState({
    totalTrips: 12,
    countriesVisited: 8,
    totalDistance: 15420,
    carbonSaved: 156.3,
    totalBudget: 8450,
    totalSpent: 7230,
    ecoScore: 78,
    nextTrip: 'Barcelona, Spain'
  });

  const [recentTrips] = useState([
    { id: 1, destination: 'Paris, France', date: '2024-01-15', mode: 'train', emissions: 45.2, status: 'completed' },
    { id: 2, destination: 'Amsterdam, Netherlands', date: '2024-02-08', mode: 'bus', emissions: 32.1, status: 'completed' },
    { id: 3, destination: 'Barcelona, Spain', date: '2024-03-15', mode: 'train', emissions: 38.7, status: 'planned' },
    { id: 4, destination: 'Swiss Alps', date: '2024-04-20', mode: 'car', emissions: 95.4, status: 'planned' }
  ]);

  const [achievements] = useState([
    { id: 1, title: 'Eco Warrior', description: 'Completed 5 trips with minimal carbon footprint', icon: '🌱', earned: true },
    { id: 2, title: 'Budget Master', description: 'Stayed under budget for 3 consecutive trips', icon: '💰', earned: true },
    { id: 3, title: 'Explorer', description: 'Visited 5 different countries', icon: '🗺️', earned: true },
    { id: 4, title: 'Train Enthusiast', description: 'Take 10 train journeys', icon: '🚂', earned: false, progress: 7 },
    { id: 5, title: 'Carbon Neutral', description: 'Offset 100kg of CO₂ emissions', icon: '🌍', earned: false, progress: 67 }
  ]);

  const budgetPercentage = (userStats.totalSpent / userStats.totalBudget) * 100;
  const nextAchievement = achievements.find(a => !a.earned);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Travel Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your journey statistics, achievements, and sustainable travel progress
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="nature-card">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-primary mb-1">{userStats.totalTrips}</div>
              <div className="text-sm text-muted-foreground">Total Trips</div>
            </CardContent>
          </Card>

          <Card className="nature-card">
            <CardContent className="p-6 text-center">
              <Route className="h-8 w-8 mx-auto mb-3 text-accent" />
              <div className="text-3xl font-bold text-accent mb-1">{userStats.totalDistance.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">km Traveled</div>
            </CardContent>
          </Card>

          <Card className="nature-card">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold text-green-600 mb-1">{userStats.carbonSaved}</div>
              <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
            </CardContent>
          </Card>

          <Card className="nature-card">
            <CardContent className="p-6 text-center">
              <Calculator className="h-8 w-8 mx-auto mb-3 text-secondary" />
              <div className="text-3xl font-bold text-secondary mb-1">€{userStats.totalSpent}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2">
            {/* Eco Score */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Sustainability Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Eco Score</span>
                      <span className="text-primary font-bold">{userStats.ecoScore}/100</span>
                    </div>
                    <Progress value={userStats.ecoScore} className="h-3" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Great job! You're making sustainable travel choices.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                      <div className="text-green-700 dark:text-green-400 font-semibold">Carbon Savings</div>
                      <div className="text-2xl font-bold text-green-600">{userStats.carbonSaved} kg</div>
                      <div className="text-sm text-green-600/80">vs. average traveler</div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="text-blue-700 dark:text-blue-400 font-semibold">Countries Visited</div>
                      <div className="text-2xl font-bold text-blue-600">{userStats.countriesVisited}</div>
                      <div className="text-sm text-blue-600/80">diverse experiences</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Trips */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Recent & Upcoming Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrips.map(trip => (
                    <div key={trip.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          trip.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div>
                          <div className="font-medium">{trip.destination}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {trip.mode} • {trip.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{trip.emissions} kg CO₂</div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          trip.status === 'completed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {trip.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Budget Overview */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary">€{userStats.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">of €{userStats.totalBudget} total</div>
                </div>
                
                <Progress value={budgetPercentage} className="mb-3" />
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">
                    €{userStats.totalBudget - userStats.totalSpent} remaining
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {budgetPercentage.toFixed(1)}% of budget used
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Achievement */}
            {nextAchievement && (
              <Card className="nature-card mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Next Achievement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl mb-3">{nextAchievement.icon}</div>
                    <div className="font-semibold mb-2">{nextAchievement.title}</div>
                    <div className="text-sm text-muted-foreground mb-4">{nextAchievement.description}</div>
                    
                    {nextAchievement.progress && (
                      <div>
                        <Progress value={nextAchievement.progress} className="mb-2" />
                        <div className="text-sm text-muted-foreground">
                          {nextAchievement.progress}% complete
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.filter(a => a.earned).map(achievement => (
                    <div key={achievement.id} className="flex items-center gap-3 p-2 rounded-lg bg-primary/5">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{achievement.title}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View All Achievements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;