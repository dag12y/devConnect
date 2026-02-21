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
            <a href="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign Up</a>
            <a href="/login" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Login</a>
          </div>
        </div>
      </div>
    </section>
  )
}
