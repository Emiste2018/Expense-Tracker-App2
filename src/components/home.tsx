import React, { useState } from "react";
import { MoonIcon, SunIcon, PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import Dashboard from "./Dashboard";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Mock data for initial rendering
  const mockExpenses = [
    {
      id: "1",
      amount: 45.99,
      date: new Date("2023-05-15"),
      category: "Food",
      description: "Grocery shopping",
    },
    {
      id: "2",
      amount: 25.0,
      date: new Date("2023-05-14"),
      category: "Transport",
      description: "Uber ride",
    },
    {
      id: "3",
      amount: 120.5,
      date: new Date("2023-05-10"),
      category: "Entertainment",
      description: "Concert tickets",
    },
    {
      id: "4",
      amount: 35.75,
      date: new Date("2023-05-08"),
      category: "Food",
      description: "Restaurant dinner",
    },
    {
      id: "5",
      amount: 80.0,
      date: new Date("2023-05-05"),
      category: "Shopping",
      description: "New clothes",
    },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    // In a real app, you would apply the theme change to the document
  };

  const handleAddExpense = (expense) => {
    // In a real app, this would add the expense to the state or database
    console.log("Adding expense:", expense);
    setIsFormOpen(false);
  };

  const handleEditExpense = (expense) => {
    // In a real app, this would update the expense in the state or database
    console.log("Editing expense:", expense);
  };

  const handleDeleteExpense = (id) => {
    // In a real app, this would remove the expense from the state or database
    console.log("Deleting expense with ID:", id);
  };

  return (
    <div className={`min-h-screen bg-background ${darkMode ? "dark" : ""}`}>
      <header className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Expense Tracker
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 space-y-8">
        <Dashboard expenses={mockExpenses} />

        <ExpenseList
          expenses={mockExpenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </main>

      {/* Floating Action Button for adding new expense */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
            size="icon"
            aria-label="Add new expense"
          >
            <PlusIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <ExpenseForm onSubmit={handleAddExpense} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
