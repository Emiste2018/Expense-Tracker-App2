import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
}

interface ExpenseListProps {
  expenses?: Expense[];
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
}

const ExpenseList = ({
  expenses = [
    {
      id: "1",
      amount: 45.99,
      date: new Date(2023, 5, 15),
      category: "Food",
      description: "Grocery shopping",
    },
    {
      id: "2",
      amount: 25.0,
      date: new Date(2023, 5, 16),
      category: "Transport",
      description: "Uber ride",
    },
    {
      id: "3",
      amount: 120.5,
      date: new Date(2023, 5, 17),
      category: "Entertainment",
      description: "Movie tickets and dinner",
    },
    {
      id: "4",
      amount: 500.0,
      date: new Date(2023, 5, 18),
      category: "Bills",
      description: "Monthly rent",
    },
    {
      id: "5",
      amount: 35.25,
      date: new Date(2023, 5, 19),
      category: "Shopping",
      description: "New t-shirt",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
}: ExpenseListProps) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [minAmountFilter, setMinAmountFilter] = useState<string>("");
  const [maxAmountFilter, setMaxAmountFilter] = useState<string>("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Bills",
    "Shopping",
    "Other",
  ];

  const filteredExpenses = expenses.filter((expense) => {
    // Category filter
    if (categoryFilter !== "all" && expense.category !== categoryFilter)
      return false;

    // Date filter
    if (
      dateFilter &&
      format(expense.date, "yyyy-MM-dd") !== format(dateFilter, "yyyy-MM-dd")
    )
      return false;

    // Amount range filter
    const minAmount = minAmountFilter ? parseFloat(minAmountFilter) : 0;
    const maxAmount = maxAmountFilter ? parseFloat(maxAmountFilter) : Infinity;

    if (expense.amount < minAmount || expense.amount > maxAmount) return false;

    return true;
  });

  const resetFilters = () => {
    setCategoryFilter("all");
    setDateFilter(undefined);
    setMinAmountFilter("");
    setMaxAmountFilter("");
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-[200px]">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateFilter ? (
                    format(dateFilter, "PPP")
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Input
              type="number"
              placeholder="Min amount"
              value={minAmountFilter}
              onChange={(e) => setMinAmountFilter(e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <Input
              type="number"
              placeholder="Max amount"
              value={maxAmountFilter}
              onChange={(e) => setMaxAmountFilter(e.target.value)}
            />
          </div>

          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">
                      ${expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {format(expense.date, "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-block px-2 py-1 rounded-full text-xs font-medium",
                          expense.category === "Food" &&
                            "bg-green-100 text-green-800",
                          expense.category === "Transport" &&
                            "bg-blue-100 text-blue-800",
                          expense.category === "Entertainment" &&
                            "bg-purple-100 text-purple-800",
                          expense.category === "Bills" &&
                            "bg-red-100 text-red-800",
                          expense.category === "Shopping" &&
                            "bg-yellow-100 text-yellow-800",
                          expense.category === "Other" &&
                            "bg-gray-100 text-gray-800",
                        )}
                      >
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(expense)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Dialog
                          open={deleteConfirmId === expense.id}
                          onOpenChange={(open) => {
                            if (!open) setDeleteConfirmId(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteConfirmId(expense.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p>
                                Are you sure you want to delete this expense?
                              </p>
                              <p className="font-medium mt-2">
                                ${expense.amount.toFixed(2)} -{" "}
                                {expense.description}
                              </p>
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button
                                variant="outline"
                                onClick={() => setDeleteConfirmId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  onDelete(expense.id);
                                  setDeleteConfirmId(null);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No expenses found matching your filters
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseList;
