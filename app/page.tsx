"use client";

import VideoCard from "@/components/VideoCard";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        console.log("videos: ", data);

        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl font-bold">Uploaded videos</h1>
        <button onClick={() => router.push("/upload")} className="btn btn-primary text-white">Upload Video</button>
      </div>

      <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos?.length > 0 && videos.map((video) => (
          <VideoCard key={video._id?.toString()} video={video} />
        ))}

        {videos.length === 0 && (
          <div className="col-span-full text-center py-1">
            <p className="text-base-content/70">No videos found</p>
          </div>
        )}
      </div>
    </section>
  );
}
