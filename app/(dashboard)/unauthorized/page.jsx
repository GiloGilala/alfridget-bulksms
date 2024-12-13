import Head from "next/head";

function Unauthorized() {
  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <Head>
        <title>Unauthorized Access</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-600 mb-8">
        You do not have permission to access this page.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Contact Support
        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;
