import {Code} from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <a href="#"><Code className="w-6 h-6 mr-2 inline-block" />DevConnector</a>
      </h1>
      <ul className="flex gap-4">
        <li className="text-white hover:text-gray-300"><a href="/">Developers</a></li>
        <li className="text-white hover:text-gray-300"><a href="/about">Register</a></li>
        <li className="text-white hover:text-gray-300"><a href="/contact">Login</a></li>
      </ul>
    </nav>
  );
}
