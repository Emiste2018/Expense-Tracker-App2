import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Features() {
  return (
    <div className="bg-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ExpenseTracker provides powerful tools to help you manage your
            finances and gain insights into your spending habits.
          </p>
        </div>

        {/* Feature Sections */}
        <div className="space-y-24">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4">Expense Tracking</h2>
              <p className="text-gray-600 mb-6">
                Easily log and categorize your expenses to keep track of where
                your money goes. Add receipts, notes, and tags to stay
                organized.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Quick expense entry with customizable categories</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Receipt scanning and storage</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Recurring expense management</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center order-1 md:order-2">
              <div className="text-center text-gray-500">
                [Expense Tracking Illustration]
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                [Budget Management Illustration]
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Budget Management</h2>
              <p className="text-gray-600 mb-6">
                Set monthly budgets for different categories and get alerts when
                you're close to limits. Stay on top of your financial goals.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Customizable budget categories</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Real-time budget tracking</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Smart alerts and notifications</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4">Insightful Reports</h2>
              <p className="text-gray-600 mb-6">
                Visualize your spending patterns with interactive charts and
                detailed reports. Gain insights to make better financial
                decisions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Interactive data visualization</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Customizable date ranges</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>Export options (PDF, CSV)</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center order-1 md:order-2">
              <div className="text-center text-gray-500">
                [Reports Illustration]
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to take control of your finances?
          </h2>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
