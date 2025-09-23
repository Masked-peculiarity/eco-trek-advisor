import { useState } from 'react';
import { Plus, Trash2, Calculator, PiggyBank, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Expense {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
}

const Budget = () => {
  const [totalBudget, setTotalBudget] = useState(2000);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, category: 'Transport', description: 'Flight tickets', amount: 450, date: '2024-01-15' },
    { id: 2, category: 'Accommodation', description: 'Hotel booking', amount: 600, date: '2024-01-16' },
    { id: 3, category: 'Food', description: 'Restaurant dinner', amount: 85, date: '2024-01-17' },
    { id: 4, category: 'Activities', description: 'Museum tickets', amount: 25, date: '2024-01-17' }
  ]);

  const [newExpense, setNewExpense] = useState({
    category: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { name: 'Transport', icon: '🚗', color: 'text-blue-600' },
    { name: 'Accommodation', icon: '🏨', color: 'text-purple-600' },
    { name: 'Food', icon: '🍽️', color: 'text-orange-600' },
    { name: 'Activities', icon: '🎯', color: 'text-green-600' },
    { name: 'Shopping', icon: '🛍️', color: 'text-pink-600' },
    { name: 'Other', icon: '💳', color: 'text-gray-600' }
  ];

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercentage = (totalSpent / totalBudget) * 100;

  const categoryTotals = categories.map(category => ({
    ...category,
    total: expenses
      .filter(expense => expense.category === category.name)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  const addExpense = () => {
    if (newExpense.category && newExpense.description && newExpense.amount) {
      const expense: Expense = {
        id: Date.now(),
        category: newExpense.category,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date
      };
      setExpenses([...expenses, expense]);
      setNewExpense({
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Budget Planner</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your travel expenses and stay within budget with smart spending insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Budget Overview */}
          <div className="lg:col-span-2">
            {/* Budget Summary */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">€{totalBudget}</div>
                    <div className="text-sm text-muted-foreground">Total Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-destructive mb-1">€{totalSpent}</div>
                    <div className="text-sm text-muted-foreground">Spent</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-1 ${remaining >= 0 ? 'text-primary' : 'text-destructive'}`}>
                      €{remaining}
                    </div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Budget Progress</span>
                    <span>{spentPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="eco-progress">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        spentPercentage > 90 ? 'bg-destructive' : 
                        spentPercentage > 75 ? 'bg-yellow-500' : 'bg-primary'
                      }`}
                      style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Budget Setter */}
                <div className="flex items-center gap-4">
                  <Label htmlFor="budget">Total Budget:</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseFloat(e.target.value) || 0)}
                    className="max-w-32"
                  />
                  <span className="text-muted-foreground">EUR</span>
                </div>
              </CardContent>
            </Card>

            {/* Expense List */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-primary" />
                  Recent Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {expenses.map((expense) => {
                    const category = categories.find(c => c.name === expense.category);
                    return (
                      <div key={expense.id} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{category?.icon}</span>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {expense.category} • {expense.date}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-destructive">€{expense.amount}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExpense(expense.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Add Expense */}
            <Card className="nature-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Add Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.name} value={category.name}>
                          {category.icon} {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    placeholder="What did you spend on?"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="amount">Amount (EUR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>

                <Button onClick={addExpense} className="w-full bg-gradient-earth text-white hover:opacity-90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="nature-card">
              <CardHeader>
                <CardTitle>📊 Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryTotals.map((category) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </div>
                      <span className={`font-medium ${category.total > 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        €{category.total}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;