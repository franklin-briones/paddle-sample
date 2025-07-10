import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-3 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg"><Link href="/">Logo</Link></div>
        <div>
        <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Sign In
          </Link>
          {/* <Link href="/sign-up" className="px-3 py-2 rounded bg-blue-200 hover:bg-blue-300">
            Sign Up
          </Link>
          <Link href="/sign-in" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600">
            Sign In
          </Link> */}
          <Link href="/management" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600">Management Dashboard</Link>
        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
