'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CourseCard from "../../components/CourseCard"
import CourseModal from "../../components/CourseModal"

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
          });
          const response2 = await fetch('/api/listofenrolled')

          if (!response.ok || !response2.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          const { enrolledIds } = await response2.json();

          const filteredResults = data.items?.filter(item => !enrolledIds.includes(item.id.videoId)) ?? [];

          setResults(filteredResults);

        } catch (error) {
          console.error('Error fetching search results:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query]);
  const fetchDetails = async (videoId) => {
    try {
        const response = await fetch('/api/search/detail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ videoId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSelectedCourse(data);
    } catch (error) {
        console.error('Error fetching video details:', error);
    }
};

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading search results...</p>;
  }

  if (!results.length) {
    return <p className="text-center text-lg font-semibold">No results found for "{query}".</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-indigo-600">Search Results for: {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((course) => (
          <CourseCard key={course.id.videoId} course={course} onMoreInfo={() => fetchDetails(course.id.videoId)} />
        ))}
      </div>
      {selectedCourse && <CourseModal modalData={selectedCourse} onClose={() => setSelectedCourse(null)} />}
    </div>
  )
}

