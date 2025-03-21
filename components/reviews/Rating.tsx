import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, i) => {
        const className = `w-3 h-3 ${
          isFilled ? "text-amber-400 dark:text-primary" : "text-gray-400"
        }`;
        return isFilled ? (
          <FaStar className={className} key={i} />
        ) : (
          <FaRegStar className={className} key={i} />
        );
      })}
    </div>
  );
};

export default Rating;
