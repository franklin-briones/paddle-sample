import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg">Logo</div>
        <div>
          <Link href="#">
            <a className="px-3 py-2 rounded hover:bg-gray-700">Home</a>
          </Link>
          <Link href="#">
            <a className="px-3 py-2 rounded hover:bg-gray-700">Features</a>
          </Link>
          <Link href="/login">
            <a className="px-3 py-2 rounded bg-blue-500 hover:bg-blue-600">Login</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
