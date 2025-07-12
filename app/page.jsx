// "use client";

import React from "react";
import Link from "next/link";
import { FaBroadcastTower, FaMapMarkedAlt, FaUsers } from "react-icons/fa";

const Page = () => {
  return (
    <main className="min-h-[94vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-5xl p-6 md:p-10 space-y-10 border border-base-100">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Raintor Frontend Assessment
          </h1>
          <p className="mt-2 text-base md:text-lg">
            This project demonstrates real-time location sharing and infinite
            scrolling user feed using modern frontend technologies like Next.js,
            React Query, SignalR, and Leaflet.
          </p>
        </div>

        {/* Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User A */}
          <div className="bg-blue-50 p-6 rounded-md shadow hover:shadow-lg transition">
            <FaBroadcastTower className="text-4xl text-blue-600 mb-3" />
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              User A – Location Sender
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              This page simulates live GPS location updates and sends them via a
              SignalR WebSocket connection. The `SendLatLon` method is used to
              broadcast the latitude and longitude along with your email (as
              username).
              <br />
              <br />
              📌 <strong>Tech Used:</strong> SignalR, useEffect, setInterval
              <br />✅ <strong>How to use:</strong> Open this page in one
              browser tab to start sending simulated location every few seconds.
            </p>
            <Link
              href="/pages/user_a"
              className="text-blue-700 font-medium hover:underline"
            >
              Go to User A
            </Link>
          </div>

          {/* User B */}
          <div className="bg-green-50 p-6 rounded-md shadow hover:shadow-lg transition">
            <FaMapMarkedAlt className="text-4xl text-green-600 mb-3" />
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              User B – Location Receiver
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              This page listens to live location broadcasts sent by User A via
              SignalR. It receives data using the `ReceiveLatLon` method and
              shows the user’s location on an interactive map (Leaflet).
              <br />
              <br />
              📌 <strong>Tech Used:</strong> SignalR, Leaflet.js, React Map
              integration
              <br />✅ <strong>How to use:</strong> Open this page in a second
              tab or device while User A is active. You'll see real-time
              location updates on the map.
            </p>
            <Link
              target="_blank"
              href="/pages/user_b"
              className="text-green-700 font-medium hover:underline"
            >
              Go to User B
            </Link>
          </div>

          {/* Users Feed */}
          <div className="bg-yellow-50 p-6 rounded-md shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl text-yellow-600 mb-3" />
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">
              Users Feed – Infinite Scroll
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              This page fetches user data from the API and shows a scrollable
              list of user cards. As you scroll down, more users are loaded
              automatically using infinite scroll powered by React Query.
              <br />
              <br />
              📌 <strong>Tech Used:</strong> React Query v5,
              IntersectionObserver, Axios
              <br />✅ <strong>How to use:</strong> Scroll to the bottom of the
              page and more users will load automatically.
            </p>
            <Link
              href="/pages/users"
              className="text-yellow-700 font-medium hover:underline"
            >
              Go to Users Feed
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
