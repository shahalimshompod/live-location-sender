import React from "react";
import Link from "next/link";
import {
  FaBroadcastTower,
  FaMapMarkedAlt,
  FaUsers,
  FaTools,
  FaInfoCircle,
} from "react-icons/fa";

const Card = ({
  icon,
  title,
  description,
  techUsed,
  howToUse,
  color,
  href,
  target,
}) => (
  <div
    className={`bg-${color}-50 p-6 rounded-lg shadow hover:shadow-lg transition`}
  >
    <div className="mb-4">{icon}</div>
    <h2 className={`text-xl font-semibold text-${color}-700 mb-3`}>{title}</h2>
    <p className="text-sm text-gray-700 mb-4">{description}</p>

    <div className="space-y-2 text-sm text-gray-800">
      <div className="flex items-start gap-2">
        <FaTools className={`mt-1 text-${color}-600`} />
        <p>
          <span className="font-semibold">Tech Used:</span> {techUsed}
        </p>
      </div>
      <div className="flex items-start gap-2">
        <FaInfoCircle className={`mt-1 text-${color}-600`} />
        <p>
          <span className="font-semibold">How to use:</span> {howToUse}
        </p>
      </div>
    </div>

    <Link
      href={href}
      target={target}
      className={`text-${color}-700 font-medium hover:underline inline-block mt-4`}
    >
      Go to {title.split(" - ")[0]}
    </Link>
  </div>
);

const Page = () => {
  return (
    <main className="min-h-[94vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-6xl p-6 md:p-10 space-y-12 border border-base-100">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Raintor Frontend Assessment
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-600">
            This project demonstrates real-time location sharing and infinite
            scrolling user feed using modern frontend technologies like Next.js,
            React Query, SignalR, and Leaflet.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={<FaBroadcastTower className="text-4xl text-blue-600" />}
            title="User A - Location Sender"
            description="Simulates live GPS location updates and sends them via SignalR using the SendLatLon method."
            techUsed="SignalR, useEffect, setInterval"
            howToUse="Open this page in one browser tab to start sending simulated location every few seconds."
            color="blue"
            href="/pages/user_a"
          />

          <Card
            icon={<FaMapMarkedAlt className="text-4xl text-green-600" />}
            title="User B - Location Receiver"
            description="Receives data from User A using ReceiveLatLon method and displays real-time location on Leaflet map."
            techUsed="SignalR, Leaflet.js, React Map integration"
            howToUse="Open this page in a second tab or device while User A is active to view updates."
            color="green"
            href="/pages/user_b"
            target="_blank"
          />

          <Card
            icon={<FaUsers className="text-4xl text-yellow-600" />}
            title="Users Feed - Infinite Scroll"
            description="Fetches user data and loads more users as you scroll using React Query and IntersectionObserver."
            techUsed="React Query v5, IntersectionObserver, Axios"
            howToUse="Scroll to the bottom of the page to automatically load more users."
            color="yellow"
            href="/pages/users"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
