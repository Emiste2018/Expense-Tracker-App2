import { supabase } from "../lib/supabase";

export interface Expense {
  id: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
  user_id: string;
}

export interface ExpenseInput {
  amount: number;
  date: Date;
  category: string;
  description?: string;
}

export const fetchExpenses = async (): Promise<Expense[]> => {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses:", error);
    throw new Error(error.message);
  }

  // Convert date strings to Date objects
  return (data || []).map((expense) => ({
    ...expense,
    date: new Date(expense.date),
  }));
};

export const fetchExpensesByDateRange = async (
  startDate: Date,
  endDate: Date,
): Promise<Expense[]> => {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .gte("date", startDate.toISOString().split("T")[0])
    .lte("date", endDate.toISOString().split("T")[0])
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching expenses by date range:", error);
    throw new Error(error.message);
  }

  return (data || []).map((expense) => ({
    ...expense,
    date: new Date(expense.date),
  }));
};

export const addExpense = async (expense: ExpenseInput): Promise<Expense> => {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        ...expense,
        user_id: user.id,
        date: expense.date.toISOString().split("T")[0],
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error adding expense:", error);
    throw new Error(error.message);
  }

  return {
    ...data,
    date: new Date(data.date),
  };
};

export const updateExpense = async (
  id: string,
  expense: Partial<ExpenseInput>,
): Promise<Expense> => {
  const updates: any = { ...expense };

  // Format date if it exists
  if (updates.date) {
    updates.date = updates.date.toISOString().split("T")[0];
  }

  const { data, error } = await supabase
    .from("expenses")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating expense:", error);
    throw new Error(error.message);
  }

  return {
    ...data,
    date: new Date(data.date),
  };
};

export const deleteExpense = async (id: string): Promise<void> => {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) {
    console.error("Error deleting expense:", error);
    throw new Error(error.message);
  }
};

export const getCategoryTotals = async (
  startDate?: Date,
  endDate?: Date,
): Promise<{ name: string; value: number; color: string }[]> => {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  let query = supabase
    .from("expenses")
    .select("category, amount")
    .eq("user_id", user.id);

  if (startDate) {
    query = query.gte("date", startDate.toISOString().split("T")[0]);
  }

  if (endDate) {
    query = query.lte("date", endDate.toISOString().split("T")[0]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching category totals:", error);
    throw new Error(error.message);
  }

  // Define colors for categories
  const categoryColors: Record<string, string> = {
    Food: "#FF6384",
    Transport: "#36A2EB",
    Entertainment: "#FFCE56",
    Utilities: "#4BC0C0",
    Housing: "#9966FF",
    Healthcare: "#FF9F40",
    Education: "#8AC926",
    Shopping: "#1982C4",
    Other: "#6A4C93",
  };

  // Group by category and sum amounts
  const categoryTotals: Record<string, number> = {};
  data?.forEach((expense) => {
    const category = expense.category;
    categoryTotals[category] = (categoryTotals[category] || 0) + expense.amount;
  });

  // Convert to array format needed for charts
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: categoryColors[name] || "#F94144", // Default color if category not found
  }));
};

export const getMonthlyTotals = async (
  months: number = 5,
): Promise<{ date: string; amount: number }[]> => {
  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  // Calculate start date (X months ago from today)
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - months + 1);
  startDate.setDate(1); // First day of month

  const { data, error } = await supabase
    .from("expenses")
    .select("date, amount")
    .eq("user_id", user.id)
    .gte("date", startDate.toISOString().split("T")[0]);

  if (error) {
    console.error("Error fetching monthly totals:", error);
    throw new Error(error.message);
  }

  // Group by month and sum amounts
  const monthlyTotals: Record<string, number> = {};

  data?.forEach((expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const monthName = date.toLocaleString("default", { month: "short" });

    monthlyTotals[monthKey] = {
      amount: (monthlyTotals[monthKey]?.amount || 0) + expense.amount,
      name: monthName,
    };
  });

  // Convert to array and sort by date
  return Object.entries(monthlyTotals)
    .map(([key, { amount, name }]) => ({
      date: name,
      amount,
      key, // Keep the key for sorting
    }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ date, amount }) => ({ date, amount })); // Remove the key from final result
};
