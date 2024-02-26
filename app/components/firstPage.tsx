import Link from "next/link";

export default function FirstPage() {
  return (
    <div className="max-w-7xl mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 md:ml-24 pt-6 flex flex-col md:items-start md:text-left mb-40 items-center">
        <h1 className="mb-5 sm:text-6xl text-5xl items-center Avenir xl:w-2/2 text-gray-900">
          Welcome to Bulltien Board
        </h1>
        <p className="mb-4 xl:w-3/4 text-gray-600 text-lg">
          Let's post all kinds of things on the board!
        </p>
        <div className="flex justify-center">
          <Link
            href="/auth"
            className="inline-flex items-center px-5 py-3 mt-2 font-medium text-black transition duration-500 ease-in-out transform  border rounded-lg bg-gray-300"
          >
            <span className="justify-center">get started</span>
          </Link>
        </div>
      </div>
      <div className="xl:mr-44 sm:mr-0 sm:mb-28 mb-0 lg:mb-0 mr-48 md:pl-10"></div>
    </div>
  );
}
