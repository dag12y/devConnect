import {Code} from 'lucide-react';
import {  Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/"><Code className="w-6 h-6 mr-2 inline-block" />DevConnector</Link>
      </h1>
      <ul className="flex gap-4">
        <li className="text-white hover:text-gray-300"><Link to="/">Developers</Link></li>
        <li className="text-white hover:text-gray-300"><Link to="/register">Register</Link></li>
        <li className="text-white hover:text-gray-300"><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
