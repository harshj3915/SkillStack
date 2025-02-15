"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image"
import DashboardCourseCard from "../../components/DashboardCourseCard"

export default function DashboardPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const { data: session, status } = useSession();
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  function isoDurationToSeconds(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    return hours * 3600 + minutes * 60 + seconds;
  }
  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google", { callbackUrl: "/dashboard" });
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then((res) => res.json())
        .then((data) => {
          setVideos(data.enrolledVideos || []);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching dashboard data:", error));
    }
  }, [status]);

  const handleRemoveCourse = async (videoId) => {
    try {
      const response = await fetch("/api/deletecourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id:videoId }),
      });

      if (response.ok) {
        window.location.reload(); // Reload the page on success
      } else {
        console.error("Failed to remove course");
      }
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  if (status === "loading" || loading) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-indigo-600">Hi {session?.user?.name}, Welcome to your dashboard!</h1>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-indigo-600">In Progress Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {videos.filter((video) => !video.isCompleted).length === 0 ? (
          <p className="text-gray-500 col-span-full">No in-progress courses</p>
        ) : (
          videos.filter((video) => !video.isCompleted).map((course) => (
            <DashboardCourseCard key={course.id} course={course}>
              <div className="mt-4">
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.round((course.atTime / isoDurationToSeconds(course.details.contentDetails.duration)) * 100)}%` }}></div>
                </div>
                <button onClick={() => router.push(`/course/${course.id}`)} className="w-full btn-primary">Continue Course</button>
                <button onClick={() => handleRemoveCourse(course.id)} className="w-full mt-2 btn-danger">Remove Course</button>

              </div>
            </DashboardCourseCard>
          ))
        )}
      </div>


      {videos.filter((video) => video.isCompleted).length > 0 && (
        <>
          <h2 className="text-xl font-semibold mb-4 text-indigo-600">Completed Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.filter((video) => video.isCompleted).map((course) => (
              <DashboardCourseCard key={course.id} course={course} >
                <div className="mt-4">
                  <button onClick={() => router.push(`/course/${course.id}`)} className="w-full btn-secondary">Review Course</button>
                </div>
              </DashboardCourseCard>
            ))}
          </div>
        </>
      )}

    </div>
  )
}

