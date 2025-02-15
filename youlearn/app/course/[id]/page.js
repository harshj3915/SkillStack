"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function CoursePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { id } = useParams();
    const [video, setVideo] = useState(null);
    const[atTime,setAtTime]=useState(null);
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState(null);
    const [progress, setProgress] = useState(0);
    const lastKnownTime = useRef(0);
    const maxTime = useRef(0);
    const [stateMaxTime, setStateMaxTime] = useState(0);

    const updateTimeout = useRef(Math.floor(Date.now() / 1000));

    const updateProgress = async (maxTime) => {  
        if (updateTimeout.current) {
            if (Math.floor(Date.now() / 1000) - updateTimeout.current > 5) {
                updateTimeout.current = Math.floor(Date.now() / 1000);
                try {
                    await fetch("/api/course", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id, maxTime }),
                    });
                } catch (error) {
                    console.error("Error updating progress:", error);
                }
            }
        }
    };
    
    
    
    

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
            alert("You need to be authenticated to view this page.");
            signIn("google", { callbackUrl: `/course/${id}` });
        }
    }, [status, id]);

    useEffect(() => {
        if (status === "authenticated") {
            fetch(`/api/course`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        router.push("/dashboard");
                    } else {

                        setAtTime(data.video.atTime);
                        setStateMaxTime(data.video.atTime);
                        setVideo(data.video);
                    }
                })
                .catch((error) => console.error("Error fetching course data:", error))
                .finally(() => setLoading(false));
        }
    }, [status, id, router]);

    useEffect(() => {
        if(video){
            setProgress(Math.round((stateMaxTime / isoDurationToSeconds(video.details.contentDetails.duration)) * 100))
            updateProgress(stateMaxTime);
        }
    }, [stateMaxTime]);

    useEffect(() => {
        if (video && !player) {
            const loadYouTubeAPI = () => {
                const tag = document.createElement("script");
                tag.src = "https://www.youtube.com/iframe_api";
                tag.async = true;
                document.body.appendChild(tag);

                window.onYouTubeIframeAPIReady = () => {
                    const newPlayer = new YT.Player("youtube-player", {
                        videoId: video.videoId,
                        playerVars: {
                            rel: 0,
                            disablekb: 0,
                            fs: 1,
                            iv_load_policy: 3,
                            showinfo: 0,
                            controls: 1,
                            autoplay: 0,
                        },
                        events: {
                            onReady: (event) => {
                                event.target.playVideo();
                                event.target.seekTo(atTime);
                                lastKnownTime.current = atTime+1;
                                maxTime.current = atTime+1;
                                enforcePlaybackRate(event.target);
                            },
                            onStateChange: (event) => {
                                if (event.data === YT.PlayerState.PLAYING) {
                                    monitorSeeking(event.target);
                                }
                            },
                            onPlaybackRateChange: (event) => {
                                enforcePlaybackRate(event.target);
                            },
                        },
                    });
                    setPlayer(newPlayer);
                };
            };

            if (!window.YT) {
                loadYouTubeAPI();
            } else {
                window.onYouTubeIframeAPIReady();
            }
        }
    }, [video]);

    const enforcePlaybackRate = (playerInstance) => {
        const currentRate = playerInstance.getPlaybackRate();
        if (currentRate < 0.5) {
            playerInstance.setPlaybackRate(0.5);
        } else if (currentRate > 2) {
            playerInstance.setPlaybackRate(2);
        }
    };

    const monitorSeeking = (playerInstance) => {
        const checkTime = () => {
            if (playerInstance.getPlayerState() === YT.PlayerState.PLAYING) {
                const currentTime = playerInstance.getCurrentTime();
                if (currentTime > lastKnownTime.current + 1 && maxTime.current+1 < currentTime) {
                    playerInstance.seekTo(maxTime.current);
                } else {
                    lastKnownTime.current = currentTime;
                    maxTime.current = Math.max(maxTime.current, currentTime);
                    setStateMaxTime(maxTime.current);
                }
            }
            requestAnimationFrame(checkTime);
        };
        checkTime();
    };

    if (loading || status === "loading") {
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    }

    if (!video) {
        return <p className="text-center mt-10 text-red-500">You are not enrolled in this course.</p>;
    }


    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{video.details.snippet.title}</h1>
            <p className="text-gray-600 mb-4">By {video.details.snippet.channelTitle}</p>
            <div className="relative w-full aspect-video">
                <div id="youtube-player" className="w-full h-full rounded-lg"></div>
            </div>
            <p className="mt-4">Progress: {progress}%</p>
            <p className={`text-sm font-bold ${video.isCompleted ? "text-green-600" : "text-orange-500"}`}>
                {video.isCompleted ? "Completed" : "In Progress"}
            </p>
        </div>
    );
}
