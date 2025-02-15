"use client"

import { useSession,signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddCourseButton = ({ videoId }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const addCourse = async () => {
        if (!session) {

            signIn("google")
            return;
        }

        try {
            const res = await fetch("/api/addcourse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ videoId }),
            });

            if (res.ok) {
                window.location.reload();
                alert("Video added to your course successfully!");
                
            } else {
                alert("Failed to add the video.");
            }
        } catch (error) {
            console.error("Error adding course:", error);
            alert("An error occurred.");
        }
    };

    return (
        <button
            onClick={addCourse}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
            {session ? "Add to Course" : "Login to Add"}
        </button>
    );
};

export default AddCourseButton;
