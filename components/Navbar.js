import Link from 'next/link';

const Navbar = () => {

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg">Logo</div>
        <div>
          <Link href="/" className="px-3 py-2 rounded hover:bg-gray-700">
            Home
          </Link>
          <Link href="/features" className="px-3 py-2 rounded hover:bg-gray-700">
            Feature
          </Link>
          <Link href="/sign-up" className="px-3 py-2 rounded bg-blue-200 hover:bg-blue-300">
            Sign Up
          </Link>
          <Link href="/sign-in" className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
