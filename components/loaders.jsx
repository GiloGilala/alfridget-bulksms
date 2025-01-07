export function Loading1() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin">
          <LoaderIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function LoaderIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  );
}

export function Loading2() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 h-12 w-12 dark:border-gray-600 dark:border-t-gray-50" />
    </div>
  );
}
