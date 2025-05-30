"use client"

import { Music2, CalendarDays, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Song {
  ytid: string;
  title: string;
  artist: string;
  date: string;
  plid: number;
}

interface Cd {
  id: number;
  timestamp: string;
  songs: Song[];
}

interface CdData {
  cdNum: number;
  cds: Cd[];
  errors: any[];
}

async function getCdData(): Promise<CdData> {
  const res = await fetch(
    "https://private.cdn.lukeithink.com/view/cd_data.json",
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch CD data");
  }
  return res.json();
}

export default function HomePage() {
  const [data, setData] = useState<CdData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCdData()
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-trueBlack text-gray-100 p-4 sm:p-6 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sunsetOrange">
          CD Tracklist Viewer
        </h1>
        <p className="text-lg text-gray-300 mt-2">
          Not sure what to tell you, but this is a CD tracklist viewer.
        </p>
      </header>

      <main className="space-y-12">
        {data.cds.map((cd, cdIndex) => (
          <section key={cd.id} aria-labelledby={`cd-title-${cd.id}`}>
            <h2
              id={`cd-title-${cd.id}`}
              className="text-3xl font-semibold text-sunsetOrange border-b-2 border-sunsetOrange pb-2 mb-8"
            >
              CD Collection #{cdIndex + 1}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cd.songs.map((song) => (
                <article
                  key={song.ytid}
                  className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-sunsetOrange/50 hover:scale-[1.02]"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={`https://www.youtube.com/embed/${song.ytid}`}
                      title={song.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-sunsetOrange mb-2 flex items-center">
                      <Music2 size={24} className="mr-2 text-sunsetOrange/80" />
                      {song.title}
                    </h3>
                    <p className="text-gray-300 mb-1 flex items-center">
                      <UserCircle size={20} className="mr-2 text-gray-400" />
                      Artist: {song.artist}
                    </p>
                    <p className="text-gray-400 text-sm flex items-center">
                      <CalendarDays size={18} className="mr-2 text-gray-500" />
                      Released: {song.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <footer className="mt-16 pt-8 border-t border-gray-700 text-center text-gray-500">
        <p>Why are you still reading this?</p>
      </footer>
    </div>
  );
}
