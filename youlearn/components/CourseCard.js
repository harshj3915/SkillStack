import Image from "next/image";

export default function CourseCard({ course, onMoreInfo, children }) {
  const { title, thumbnails, channelTitle, description, publishedAt } = course.snippet;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full">
      <Image
        src={thumbnails.medium.url}
        alt={title}
        width={400}
        height={225}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-xl font-semibold mb-2 text-indigo-600">{title}</h2>
        <p className="text-gray-600 mb-2">By {channelTitle}</p>
        <p className="text-gray-500 text-sm mb-4">Published on {new Date(publishedAt).toDateString()}</p>
        <p className="text-gray-700 mb-4 flex-grow">{description}</p>
        <div className="mt-auto">
          {onMoreInfo && (
            <button
              onClick={onMoreInfo}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors w-full mb-2"
            >
              More Info
            </button>
          )}

          {children}
        </div>
      </div>
    </div>
  );
}
