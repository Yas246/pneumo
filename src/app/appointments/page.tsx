"use client";

import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";
import { AppointmentList } from "@/components/appointments/AppointmentList";
import { Button } from "@/components/shared/Button";
import { Navbar } from "@/components/shared/Navbar";
import {
  CalendarIcon,
  ListBulletIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export default function AppointmentsPage() {
  const [view, setView] = useState<"calendar" | "list">("calendar");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Calendrier des rendez-vous
            </h1>
            <div className="flex items-center space-x-4">
              <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setView("calendar")}
                  className={`px-4 py-2 rounded-l-lg text-sm font-medium ${
                    view === "calendar"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <CalendarIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-4 py-2 rounded-r-lg text-sm font-medium ${
                    view === "list"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
              <Link href="/appointments/new">
                <Button>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Nouveau rendez-vous
                </Button>
              </Link>
            </div>
          </div>

          {view === "calendar" ? <AppointmentCalendar /> : <AppointmentList />}
        </div>
      </main>
    </div>
  );
}
