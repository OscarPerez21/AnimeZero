import React from 'react';

interface CategoryButtonProps {
  category: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <button className="btn-default w-[200px] h-[40px]">
      {category}
    </button>
  );
};

export default CategoryButton;