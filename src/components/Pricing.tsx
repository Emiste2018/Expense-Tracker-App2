import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <div className="bg-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include a 14-day
            free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="border border-gray-200 rounded-lg p-8 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Basic</h2>
              <p className="text-gray-600 mb-4">
                Perfect for individuals just starting out
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Track up to 50 expenses per month</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Basic expense categories</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Monthly summary reports</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/signup">Start Free</Link>
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="border-2 border-blue-600 rounded-lg p-8 flex flex-col h-full relative bg-blue-50">
            <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              Popular
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Pro</h2>
              <p className="text-gray-600 mb-4">
                For individuals who want more insights
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Unlimited expense tracking</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Custom categories and tags</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Advanced reporting and analytics</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Budget alerts and notifications</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>CSV/PDF export</span>
              </li>
            </ul>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>

          {/* Business Plan */}
          <div className="border border-gray-200 rounded-lg p-8 flex flex-col h-full">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Business</h2>
              <p className="text-gray-600 mb-4">
                For teams and small businesses
              </p>
              <div className="flex items-end mb-4">
                <span className="text-4xl font-bold">$24.99</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Everything in Pro plan</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Multi-user access (up to 5 users)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Role-based permissions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Expense approval workflows</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Accounting software integration</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Priority support</span>
              </li>
            </ul>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                How does the free trial work?
              </h3>
              <p className="text-gray-600">
                All paid plans include a 14-day free trial. No credit card
                required until you decide to continue.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not
                satisfied with our service.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Do you offer custom plans?
              </h3>
              <p className="text-gray-600">
                Yes, for larger organizations we offer custom enterprise plans.
                Contact our sales team for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
