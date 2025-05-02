import React, { useEffect, useState } from "react";
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
import { getCategoryTotals, getMonthlyTotals } from "../services/expenses";
import { useAuth } from "../contexts/AuthContext";

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

const Dashboard = ({}: DashboardProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [totalSpending, setTotalSpending] = useState(0);
  const [biggestCategory, setBiggestCategory] = useState({
    name: "",
    amount: 0,
  });
  const [monthlyComparison, setMonthlyComparison] = useState({
    currentMonth: 0,
    previousMonth: 0,
    percentageChange: 0,
  });
  const [categoryData, setCategoryData] = useState<
    Array<{ name: string; value: number; color: string }>
  >([]);
  const [trendData, setTrendData] = useState<
    Array<{ date: string; amount: number }>
  >([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        // Fetch category data
        const categories = await getCategoryTotals();
        setCategoryData(categories);

        // Calculate total spending
        const total = categories.reduce(
          (sum, category) => sum + category.value,
          0,
        );
        setTotalSpending(total);

        // Find biggest category
        if (categories.length > 0) {
          const biggest = categories.reduce((prev, current) =>
            prev.value > current.value ? prev : current,
          );
          setBiggestCategory({ name: biggest.name, amount: biggest.value });
        }

        // Fetch monthly trend data
        const monthlyData = await getMonthlyTotals(5);
        setTrendData(monthlyData);

        // Calculate monthly comparison
        if (monthlyData.length >= 2) {
          const currentMonth = monthlyData[monthlyData.length - 1].amount;
          const previousMonth = monthlyData[monthlyData.length - 2].amount;
          const percentageChange =
            previousMonth > 0
              ? ((currentMonth - previousMonth) / previousMonth) * 100
              : 0;

          setMonthlyComparison({
            currentMonth,
            previousMonth,
            percentageChange,
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);
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
          <CardContent className="h-[350px]">
            <ExpenseChart
              type="bar"
              data={categoryData}
              title="Category Breakdown"
            />
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
          <CardContent className="h-[350px]">
            <ExpenseChart
              type="line"
              data={trendData}
              title="Spending Trends"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
