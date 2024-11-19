import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose"; // Adjust the import path as needed
import Article from "@/models/Article"; // Adjust the import path as needed

export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const category = url.searchParams.get("category") || ""; // Extract category filter
    const country = url.searchParams.get("country") || ""; // Extract country filter

    const skip = (page - 1) * limit;

    console.log({ "filter provided": { category, country } });

    // Create a filter object based on provided parameters
    const filter: {category?:string; country?:string} = {};
    if (category) {
      filter.category = category; // Add category filter if provided
    }
    if (country) {
      filter.country = country; // Add country filter if provided
    }

    // Get distinct categories and countries from the articles
    const categories = await Article.distinct("category");
    const countries = await Article.distinct("country");

    // Format the response for filter options
    const filterOptions = categories.map((cat) => ({
      id: cat, // or use a unique identifier
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1), // Capitalize the first letter
    }));

    const countryOptions = countries.map((cnt) => ({
      id: cnt,
      value: cnt,
      label: cnt.charAt(0).toUpperCase() + cnt.slice(1),
    }));

    // Get total number of articles with the applied filter
    const totalArticles = await Article.countDocuments(filter); // Count with filter
    const articles = await Article.find(filter) // Find with filter
      .sort({ published_at: -1 }) // Sort by publishedAt in descending order (latest first)
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      articles,
      totalPages: Math.ceil(totalArticles / limit),
      filterOptions,
      countryOptions,
    });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}