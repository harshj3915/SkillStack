import Image from "next/image";
import AddCourseButton from "./AddCourseButton";

export default function CourseModal({ modalData, onClose }) {
  const video = modalData.items[0];

  const formatDuration = (duration) => {
    const match = duration.match(/P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    let days = parseInt(match[1] || 0);
    let hours = parseInt(match[2] || 0);
    let minutes = parseInt(match[3] || 0);
    let seconds = parseInt(match[4] || 0);

    hours += days * 24;

    if (seconds > 0) minutes++;
    if (hours > 0 && minutes > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} min`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      return `${minutes} min`;
    }
  };

  const formatNumber = (num) => {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1) + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1) + "k";
    }
    return num;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full flex flex-col max-h-[90vh]">
        <div className="relative h-64">
          <Image
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="p-6 flex flex-col overflow-y-auto flex-grow">
          <h2 className="text-2xl font-bold mb-2">{video.snippet.title}</h2>
          <p className="text-gray-600 mb-2">By {video.snippet.channelTitle}</p>
          <p className="text-gray-500 text-sm mb-4">
            Published on {new Date(video.snippet.publishedAt).toDateString()}
          </p>


          <div className="flex flex-wrap gap-4 mb-4">
            <span className="text-gray-700">Duration: {formatDuration(video.contentDetails.duration)}</span>
            <span className="text-gray-700">Views: {formatNumber(video.statistics.viewCount)}</span>
            <span className="text-gray-700">Likes: {formatNumber(video.statistics.likeCount)}</span>
            <span className="text-gray-700">Comments: {formatNumber(video.statistics.commentCount)}</span>
          </div>


          <p className="text-gray-700 mb-6 flex-grow whitespace-pre-line">
            {video.snippet.description}
          </p>
        </div>

        <div className="p-6 flex justify-between mt-auto">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Close
          </button>
          <AddCourseButton videoId={video.id} />
        </div>
      </div>
    </div>
  );
}
