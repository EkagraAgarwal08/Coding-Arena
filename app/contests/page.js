"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Activity, Calendar, Clock } from "lucide-react";

export default function UpcomingContests() {
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}upcomingcontests`);
        const data = await res.json();

        if (res.ok) {
          setContests(data);
        } else {
          console.error("Failed to fetch contests");
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  return (
    <div className="min-h-screen p-10 bg-white flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 drop-shadow-lg">
        🚀 Upcoming Contests
      </h1>

      <div className="max-w-3xl w-full space-y-8">
        {contests.map((contest, index) => (
          <Card
            key={index}
            className="relative border border-gray-200 bg-white shadow-xl rounded-3xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <CardContent>
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-400" /> {contest.name}
              </h2>

              <p className="text-gray-700 mt-3 flex items-center gap-3">
                <Users className="w-6 h-6 text-gray-500" />
                <span className="font-semibold">Author:</span> {contest.author}
                <span className="text-blue-500 font-semibold">({contest.rating})</span>
              </p>

              <p className="text-gray-600 mt-2 flex items-center gap-3">
                <Activity className="w-6 h-6 text-green-500" />
                <span className="font-semibold">Aim:</span> {contest.aim}
              </p>

              <div className="mt-4 text-gray-700 flex flex-wrap gap-5">
                <p className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-900 shadow-md">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  {contest.startDate}
                </p>
                <p className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl text-gray-900 shadow-md">
                  <Clock className="w-6 h-6 text-green-400" />
                  {contest.startTime} - {contest.endTime}
                </p>
              </div>

              <Link href={contest.link}>
                <button className="mt-6 w-full py-3 bg-blue-500 text-white text-lg font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  🔍 View Contest
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

     
    </div>
  );
}
