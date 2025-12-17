"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";
import { safeFetch } from "@/lib/fetchUtils";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  featured: boolean;
  visible: boolean;
  registrations: number;
  maxCapacity: number;
  category: string;
  fullDescription?: string;
  agenda?: string[];
  speakers?: Array<{ name: string; role: string }>;
  highlights?: string[];
}

export default function EventDetailPage() {
  const params = useParams();
  const eventId = params?.id;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        const result = await safeFetch(`/api/events/${eventId}`);

        if (result.success && result.data) {
          setEvent(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch event");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  // Dummy data for events
  const dummyEvents: { [key: string]: Event } = {
    "1": {
      id: 1,
      title: "Annual Charity Marathon",
      date: "December 28, 2024",
      time: "6:00 AM - 12:00 PM",
      location: "City Central Park",
      image: "/images/events/marathon.jpg",
      description:
        "Join us for our annual charity marathon raising funds for education initiatives.",
      featured: true,
      visible: true,
      registrations: 245,
      maxCapacity: 500,
      category: "Sports & Wellness",
      fullDescription: `This is our most anticipated annual event! The Charity Marathon brings together hundreds of runners, joggers, and walkers in a celebration of health and community spirit. All proceeds from this event go directly to our education initiative, providing scholarships and learning resources to underprivileged students.

Whether you're an experienced marathoner or just looking for a morning walk, there's a place for everyone in this event. We'll have hydration stations, medical support, and cheerleaders along the entire route to keep you motivated.

Last year's marathon saw over 300 participants and raised over $50,000 for education programs. This year, we're aiming even bigger!`,
      agenda: [
        "5:30 AM - Registration & Breakfast",
        "6:00 AM - Opening Ceremony",
        "6:30 AM - Marathon Starts (42 KM)",
        "8:00 AM - Half Marathon Starts (21 KM)",
        "9:00 AM - Fun Run Starts (5 KM)",
        "12:00 PM - Award Ceremony & Closing",
      ],
      speakers: [
        { name: "John Smith", role: "Event Director" },
        { name: "Sarah Johnson", role: "Marathon Coach" },
        { name: "Dr. Rajesh Patel", role: "Chief Medical Officer" },
      ],
      highlights: [
        "Professional timing and tracking",
        "Medical support throughout",
        "Hydration & refreshment stations",
        "Post-race celebration & awards",
        "Free participation kit for all registrants",
      ],
    },
    "2": {
      id: 2,
      title: "Youth Leadership Summit",
      date: "January 10, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "Convention Center Hall A",
      image: "/images/events/summit.jpg",
      description:
        "A comprehensive program designed to develop leadership skills in young professionals.",
      featured: true,
      visible: true,
      registrations: 180,
      maxCapacity: 300,
      category: "Educational",
      fullDescription: `The Youth Leadership Summit is an intensive one-day program designed to equip young leaders with essential skills for success in their careers and personal lives. Through a combination of keynote speeches, interactive workshops, and networking sessions, participants will gain insights from industry leaders and experienced mentors.

This summit covers topics including:
- Effective communication and public speaking
- Decision-making and problem-solving
- Team leadership and collaboration
- Personal branding and professional development
- Innovation and entrepreneurship

Whether you're a student, recent graduate, or young professional, this summit will provide you with tools and knowledge to accelerate your growth.`,
      agenda: [
        "10:00 AM - Registration & Welcome Breakfast",
        '10:30 AM - Keynote: "Leading with Purpose"',
        "11:15 AM - Workshop Session 1",
        "12:30 PM - Lunch & Networking",
        "1:30 PM - Workshop Session 2",
        "2:45 PM - Coffee Break",
        "3:00 PM - Panel Discussion: Industry Leaders",
        "4:00 PM - Closing Remarks & Certificates",
        "5:00 PM - Networking Reception",
      ],
      speakers: [
        { name: "Dr. Maria Garcia", role: "CEO, Tech Innovation Inc" },
        { name: "Marcus Chen", role: "Leadership Coach" },
        { name: "Lisa Thompson", role: "HR Director, Global Corp" },
      ],
      highlights: [
        "8 hours of intensive training",
        "Networking with 200+ young leaders",
        "Certificate of completion",
        "Resource kit and materials",
        "Follow-up mentorship opportunity",
      ],
    },
    "3": {
      id: 3,
      title: "Community Cleaning Drive",
      date: "January 15, 2025",
      time: "8:00 AM - 2:00 PM",
      location: "River Bend Area",
      image: "/images/events/cleanup.jpg",
      description:
        "Help us clean and beautify our local environment. No experience necessary!",
      featured: false,
      visible: true,
      registrations: 120,
      maxCapacity: 200,
      category: "Environmental",
      fullDescription: `Join us for a community-wide cleaning and beautification drive along the River Bend area. We'll be removing litter, planting trees, and restoring the natural beauty of our local environment. This is a perfect opportunity to connect with your community while making a tangible environmental impact.

All supplies will be provided, and volunteers of all ages are welcome. Whether you have experience in environmental work or are simply passionate about keeping our community clean, there's a role for you.

Together, we can make a difference for our environment and set an example for sustainable living in our community.`,
      agenda: [
        "8:00 AM - Check-in & Safety Briefing",
        "8:30 AM - Cleaning Teams Deployment",
        "10:30 AM - Morning Break & Refreshments",
        "11:00 AM - Continue Cleaning Activities",
        "1:00 PM - Tree Planting & Final Cleanup",
        "2:00 PM - Celebration & Award Recognition",
      ],
      speakers: [
        {
          name: "Environmental Officer James",
          role: "City Environmental Department",
        },
        { name: "Professor Green", role: "Environmental Expert" },
      ],
      highlights: [
        "All supplies provided",
        "Free refreshments & lunch",
        "Volunteer recognition certificates",
        "Group photo & social media feature",
        "Environmental impact report",
      ],
    },
  };

  const displayEvent = event || (eventId && dummyEvents[eventId as string]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !displayEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The event you are looking for does not exist."}
            </p>
            <Link
              href="/events"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const spotsAvailable = displayEvent.maxCapacity - displayEvent.registrations;
  const percentageFilled =
    (displayEvent.registrations / displayEvent.maxCapacity) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Link>

        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl mb-8">
          <Image
            src={displayEvent.image}
            alt={displayEvent.title}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {displayEvent.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {displayEvent.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Event
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {displayEvent.fullDescription || displayEvent.description}
              </p>
            </div>

            {/* Agenda */}
            {displayEvent.agenda && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Event Agenda
                </h2>
                <div className="space-y-3">
                  {displayEvent.agenda.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 pb-3 border-b border-gray-200 last:border-0"
                    >
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights */}
            {displayEvent.highlights && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Event Highlights
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayEvent.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <p className="text-gray-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers */}
            {displayEvent.speakers && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Featured Speakers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {displayEvent.speakers.map((speaker, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-4 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                        {speaker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <h3 className="font-semibold text-gray-800">
                        {speaker.name}
                      </h3>
                      <p className="text-gray-600 text-sm">{speaker.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Event Details Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Event Details</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-blue-100 text-sm">Date</p>
                      <p className="font-semibold">{displayEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-blue-100 text-sm">Time</p>
                      <p className="font-semibold">{displayEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-blue-100 text-sm">Location</p>
                      <p className="font-semibold">{displayEvent.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Capacity Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 font-medium">Capacity</span>
                  <span className="text-gray-600">
                    {displayEvent.registrations}/{displayEvent.maxCapacity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
                    style={{ width: `${percentageFilled}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {spotsAvailable > 0
                    ? `${spotsAvailable} spots available`
                    : "Event is full"}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="p-6 space-y-3">
                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                    isRegistered
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
                  disabled={spotsAvailable <= 0 && !isRegistered}
                >
                  {isRegistered ? "✓ Registered" : "Register Now"}
                </button>

                <button className="w-full py-3 px-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
