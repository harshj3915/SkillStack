import Image from "next/image";

export default function CourseCard({ course, children }) {
  console.log(course);

  const { title, thumbnails, channelTitle, description, publishedAt } = course.details.snippet;
  const { duration } = course.details.contentDetails;
  const { viewCount, likeCount } = course.details.statistics;

  function isoDurationToHMS(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "Unknown";

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds ? seconds + "s" : ""}`;
  }

  function isoDurationToSeconds(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
  }

  const totalSeconds = isoDurationToSeconds(duration);
  const progressPercentage = totalSeconds ? Math.round((course.atTime / totalSeconds) * 100) : 0;

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
        <p className="text-gray-600 mb-1">By <span className="font-medium">{channelTitle}</span></p>
        <p className="text-gray-500 text-sm mb-2">Published on {new Date(publishedAt).toDateString()}</p>

        {}
        {totalSeconds > 0 && (
          <div className="mb-3">
            <p className="text-gray-700 text-sm">Duration: {isoDurationToHMS(duration)}</p>
            <p className="text-gray-700 text-sm">Progress: {Math.floor(course.atTime / 60)} min watched</p>
            <div className="bg-gray-200 rounded-full h-2 mt-1">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
            </div>
          </div>
        )}

        {}
        <div className="text-gray-700 text-sm flex justify-between mb-4">
          <p>👍 {likeCount.toLocaleString()} Likes</p>
          <p>👀 {viewCount.toLocaleString()} Views</p>
        </div>

        {}
        <p className="text-gray-700 flex-grow max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-1 whitespace-pre-line">
          {description}
        </p>

        {}
        <div className="mt-auto">{children}</div>
      </div>
    </div>
  );
}
