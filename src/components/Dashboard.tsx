import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
} from "lucide-react";
import ExpenseChart from "./ExpenseChart";

interface DashboardProps {
  totalSpending?: number;
  biggestCategory?: {
    name: string;
    amount: number;
  };
  monthlyComparison?: {
    currentMonth: number;
    previousMonth: number;
    percentageChange: number;
  };
  categoryData?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  trendData?: Array<{
    date: string;
    amount: number;
  }>;
}

const Dashboard = ({
  totalSpending = 1250.75,
  biggestCategory = { name: "Food", amount: 450.25 },
  monthlyComparison = {
    currentMonth: 1250.75,
    previousMonth: 1100.5,
    percentageChange: 13.65,
  },
  categoryData = [
    { name: "Food", value: 450.25, color: "#FF6384" },
    { name: "Transport", value: 350.5, color: "#36A2EB" },
    { name: "Entertainment", value: 250.75, color: "#FFCE56" },
    { name: "Utilities", value: 120.25, color: "#4BC0C0" },
    { name: "Shopping", value: 80.0, color: "#9966FF" },
  ],
  trendData = [
    { date: "Jan", amount: 950.5 },
    { date: "Feb", amount: 1050.25 },
    { date: "Mar", amount: 980.75 },
    { date: "Apr", amount: 1100.5 },
    { date: "May", amount: 1250.75 },
  ],
}: DashboardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="w-full p-6 space-y-6 bg-background">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Spending Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Spending
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalSpending)}
            </div>
            <p className="text-xs text-muted-foreground">
              This month's expenses
            </p>
          </CardContent>
        </Card>

        {/* Biggest Expense Category Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Biggest Category
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{biggestCategory.name}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(biggestCategory.amount)}
            </p>
          </CardContent>
        </Card>

        {/* Monthly Comparison Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Comparison
            </CardTitle>
            {monthlyComparison.percentageChange > 0 ? (
              <ArrowUpIcon className="h-4 w-4 text-red-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {monthlyComparison.percentageChange > 0 ? "+" : ""}
              {monthlyComparison.percentageChange.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(monthlyComparison.currentMonth)} vs{" "}
              {formatCurrency(monthlyComparison.previousMonth)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Your spending by category this month
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ExpenseChart type="pie" data={categoryData} />
          </CardContent>
        </Card>

        {/* Spending Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Trends</CardTitle>
            <CardDescription>
              Your spending over the last 5 months
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ExpenseChart type="line" data={trendData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
