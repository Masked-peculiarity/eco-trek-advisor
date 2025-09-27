import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Calculator, 
  CloudSun, 
  NotebookPen, 
  Leaf, 
  User,
  ArrowRight,
  Globe,
  TreePine,
  Mountain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-journey.jpg';

const Home = () => {
  const features = [
    {
      title: 'Plan Journey',
      description: 'Create sustainable travel itineraries with smart route optimization',
      icon: MapPin,
      link: '/planner',
      gradient: 'bg-gradient-forest'
    },
    {
      title: 'Budget Planner',
      description: 'Track expenses and manage your travel budget efficiently',
      icon: Calculator,
      link: '/budget',
      gradient: 'bg-gradient-earth'
    },
    {
      title: 'Weather Guide',
      description: 'Get weather recommendations for your destinations',
      icon: CloudSun,
      link: '/weather',
      gradient: 'bg-gradient-sky'
    },
    {
      title: 'Carbon Tracker',
      description: 'Monitor and reduce your travel carbon footprint',
      icon: Leaf,
      link: '/carbon',
      gradient: 'bg-gradient-nature'
    },
    {
      title: 'Travel Notes',
      description: 'Keep offline notes and memories from your journeys',
      icon: NotebookPen,
      link: '/notes',
      gradient: 'bg-gradient-forest'
    },
    {
      title: 'Dashboard',
      description: 'View your travel statistics and achievements',
      icon: User,
      link: '/dashboard',
      gradient: 'bg-gradient-earth'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="hero-section min-h-[80vh] flex items-center justify-center text-white relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="animate-fade-in">
              <Mountain className="h-16 w-16 mx-auto mb-6 text-white" />
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Journey Planner
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                Plan sustainable adventures, track your carbon footprint, and explore the world responsibly
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto">
                  <Link to="/planner" className="flex items-center gap-2">
                    Start Planning
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto">
                  <Link to="/login">
                    Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 animate-pulse">
            <Globe className="h-8 w-8 text-white/20" />
          </div>
          <div className="absolute bottom-32 right-16 animate-pulse delay-1000">
            <TreePine className="h-12 w-12 text-white/20" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              Everything You Need for Sustainable Travel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From planning to tracking, we've got all your eco-friendly travel needs covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  to={feature.link}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`feature-card ${feature.gradient} h-full`}>
                    <Icon className="h-8 w-8 mb-4 text-white" />
                    <h3 className="text-xl font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-white group-hover:translate-x-2 transition-transform">
                      <span className="text-sm font-medium">Explore</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-nature text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of eco-conscious travelers making a positive impact on our planet
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto">
            <Link to="/planner" className="flex items-center gap-2">
              Begin Your Adventure
              <Mountain className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;