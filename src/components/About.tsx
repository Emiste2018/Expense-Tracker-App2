import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-white py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About ExpenseTracker</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our mission is to help people take control of their finances and
            achieve their financial goals.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Story</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-600 mb-4">
              ExpenseTracker was founded in 2023 by a team of finance
              professionals and software engineers who were frustrated with the
              complexity of existing expense tracking solutions.
            </p>
            <p className="text-gray-600 mb-4">
              We set out to create a simple, intuitive platform that would help
              people understand their spending habits and make better financial
              decisions without requiring a degree in accounting.
            </p>
            <p className="text-gray-600">
              Today, thousands of users rely on ExpenseTracker to manage their
              personal and business finances, with new features being added
              regularly based on user feedback.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Jane Doe</h3>
              <p className="text-gray-500 mb-3">CEO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Former financial advisor with 10+ years of experience in
                personal finance management.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">John Smith</h3>
              <p className="text-gray-500 mb-3">CTO & Co-Founder</p>
              <p className="text-gray-600 text-sm">
                Software engineer with expertise in building secure and scalable
                financial applications.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Emily Chen</h3>
              <p className="text-gray-500 mb-3">Head of Product</p>
              <p className="text-gray-600 text-sm">
                Product designer focused on creating intuitive user experiences
                for financial tools.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Simplicity</h3>
              <p className="text-gray-600">
                We believe financial tools should be accessible to everyone,
                regardless of their financial literacy level.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-gray-600">
                We're committed to clear pricing, honest communication, and
                protecting your financial data.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
              <p className="text-gray-600">
                Our goal is to give you the tools and insights you need to take
                control of your financial future.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We're constantly improving our platform based on the latest
                financial best practices and user feedback.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Join us on our mission</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Start tracking your expenses today and take the first step toward
            financial freedom.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
