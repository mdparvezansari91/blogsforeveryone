import { useEffect, useState } from 'react';

interface CategoryFilterProps {
  onCategorySelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // State for selected category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories'); // Adjust the path as necessary
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onCategorySelect(category); // Call the passed function on category selection
  };

  return (
    <div>
      <h2>Blog Categories</h2>
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
      >
        <option value="">Select a category</option>
        {categories.length > 0 ? (
          categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))
        ) : (
          <option value="" disabled>No categories available</option>
        )}
      </select>
    </div>
  );
};

export default CategoryFilter;