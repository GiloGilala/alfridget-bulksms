import Link from "next/link";

const Admin = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Admin</h1>
      <p className="text-lg mb-6">Manage your data with ease.</p>
      <ul>
        <li>
          <Link
            href="/admin/dashboard"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Go to Dashboard
          </Link>
        </li>
        <li className="mt-4">
          <Link
            href="/admin/settings"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Go to Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
