import React from 'react';
import { Link } from 'react-router-dom';
import image2 from '../images/Image2.jpg';

const HomePage = () => {
  return (
    <div className="font-sans text-gray-800 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-center py-6 mb-12">
        <div className="text-2xl font-bold text-indigo-900 mb-4 sm:mb-0">Hux Contacts</div>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Features</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">Pricing</Link>
          <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign In</Link>
          <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300">Get Started</Link>
        </nav>
      </header>

      <main>
        <section className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900 mb-4">Simplify Your Contact Management</h1>
            <h2 className="text-xl sm:text-2xl mb-6">Effortlessly organize, access, and update your contacts with our secure and intuitive platform.</h2>
            <div className="space-x-4">
              <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-300">Get Started</Link>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded border border-indigo-600 hover:bg-indigo-50 transition duration-300">Book a Demo</button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={image2} alt="App interface preview" className="w-full rounded-lg shadow-lg" />
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-red-500 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
            <p>Keep your contacts safe with advanced encryption</p>
          </div>
          <div className="bg-orange-400 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Easy Organization</h3>
            <p>Categorize and sort contacts effortlessly</p>
          </div>
          <div className="bg-yellow-400 p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-2">Seamless Access</h3>
            <p>View and edit contacts from any device</p>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Trusted by professionals worldwide</h2>
          <div className="flex flex-wrap justify-around">
            <span className="m-4">Logo 1</span>
            <span className="m-4">Logo 2</span>
            <span className="m-4">Logo 3</span>
            <span className="m-4">Logo 4</span>
          </div>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-6">Ready to streamline your contact management?</h2>
          <Link to="/signup" className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition duration-300">Start Free Trial</Link>
        </section>
      </main>

      <footer className="text-center border-t border-gray-200 py-6">
        <p>&copy; 2024 Hux Contacts. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;