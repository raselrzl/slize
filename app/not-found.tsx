import { FC } from "react";
import { Home, Smile } from "lucide-react";
import Link from "next/link";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-orange-600 animate-pulse">
          404
        </h1>
        <h2 className="text-3xl text-gray-700 mt-6">
          Oops! This page could not be found.
        </h2>
        <p className="text-lg text-gray-500 mt-2">
          It looks like you’ve navigated to the wrong address. The page you’re looking for isn’t here.
        </p>
        <Smile className="w-32 h-32 text-primary mx-auto mt-8 animate-bounce" />

        <Link
          href="/"
          className="mt-8 text-lg text-primary hover:text-orange-600 underline flex items-center justify-center"
        >
          <Home className="mr-2" />
          Take me to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
