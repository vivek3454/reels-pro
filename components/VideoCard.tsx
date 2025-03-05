import { IVideo } from "@/models/Video";
import { IKVideo } from "imagekitio-next";

export default function VideoCard({ video }: { video: IVideo }) {
    const { height = 0, width = 0, quality = 0 } = video?.transformation || {};

    return (
        <div className="card bg-base-100 shadow hover:shadow-lg rounded-none transition-all duration-300">
            <div className="relative p-3">
                <div
                    className="rounded-xl relative w-full"
                >
                    <IKVideo
                        path={video.videoUrl}
                        transformation={[
                            {
                                height: height.toString(),
                                width: width.toString(),
                                quality: quality.toString(),
                            },
                        ]}
                        controls={true}
                        preload="auto"
                        className=" w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 rounded-xl" /> */}
            </div>
            <div className="p-3">
                <h2 className="text-xl font-bold">{video.title}</h2>
                <p className="mt-1">{video.description}</p>
            </div>
        </div>
    );
}
