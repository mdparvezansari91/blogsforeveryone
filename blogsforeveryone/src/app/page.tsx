import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blogging Platform</h1>
        <p className="text-lg text-gray-600">Share your thoughts, ideas, and stories with the world!</p>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2 className="text-2xl font-semibold mb-4">Recent Blog Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {/* Example Blog Post Card */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
              <Image
                className="rounded-t-lg"
                src="/example-image.jpg" // Replace with your blog post image
                alt="Blog Post Image"
                width={300}
                height={200}
              />
              <h3 className="text-lg font-bold mt-2">Blog Post Title {index + 1}</h3>
              <p className="text-gray-700 mt-1">A short description of the blog post goes here. This is a brief overview of what the post is about.</p>
              <Link href={`/blog/${index + 1}`} className="text-blue-500 mt-2 inline-block">Read More</Link>
            </div>
          ))}
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/uploadblogs"
          >
            Start Writing
          </Link>
          <Link
            className="rounded-full border border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-200 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/categories"
          >
            Explore Categories
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/about"
        >
          About Us
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/contact"
        >
          Contact
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </footer>
    </div>
  );
}