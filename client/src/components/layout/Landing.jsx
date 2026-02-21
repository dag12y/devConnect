import {Link} from 'react-router-dom'

export default function Landing() {
  return (
    <section >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className='text-4xl font-bold mb-4'>Developer Connector</h1>
          <p className="text-lg mb-8">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</Link>
            <Link to="/login" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
