"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Clock, MapPin, Users, Heart, ArrowLeft, Calendar } from "lucide-react";
import { safeFetch } from "@/lib/fetchUtils";

interface Activity {
  id: number;
  title: string;
  time: string;
  location: string;
  description: string;
  days: string[];
  visible: boolean;
  volunteers?: number;
  beneficiaries?: number;
  icon?: string;
  color?: string;
  fullDescription?: string;
  impact?: string;
  schedule?: string[];
}

export default function ActivityDetailPage() {
  const params = useParams();
  const activityId = params?.id;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activityId) return;

    const fetchActivity = async () => {
      try {
        setLoading(true);
        const result = await safeFetch(`/api/activities/${activityId}`);

        if (result.success && result.data) {
          setActivity(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch activity");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load activity"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  // Fallback/dummy data structure for activities
  const dummyActivities: { [key: string]: Activity } = {
    "1": {
      id: 1,
      title: "Community Meal Distribution",
      time: "9:00 AM - 1:00 PM",
      location: "City Central Park",
      description:
        "Join us for our weekly community meal distribution initiative where we provide nutritious meals to underprivileged families in our community.",
      days: ["Monday", "Wednesday", "Friday"],
      visible: true,
      volunteers: 45,
      beneficiaries: 300,
      icon: "🍽️",
      color: "green",
      fullDescription: `This is our flagship daily activity that helps tackle food insecurity in our community. Every day, our volunteers prepare and distribute over 500 meals to those in need. We partner with local restaurants and food donors to ensure quality meals that are both nutritious and respectful to our beneficiaries.

Our community meal distribution has been running successfully for over 5 years and has helped thousands of families get access to nutritious food. We believe that no one should go hungry, and through this program, we're making a real difference.`,
      impact: `Since starting this program:
- Over 150,000 meals distributed
- 500+ families assisted regularly
- 200+ volunteer hours contributed
- 45+ active volunteers`,
      schedule: [
        "Monday: 9:00 AM - 1:00 PM",
        "Wednesday: 9:00 AM - 1:00 PM",
        "Friday: 9:00 AM - 1:00 PM",
      ],
    },
    "2": {
      id: 2,
      title: "Youth Education Support",
      time: "3:00 PM - 6:00 PM",
      location: "Community Learning Center",
      description:
        "Provide tutoring and mentorship to young students, helping them succeed academically and personally.",
      days: ["Tuesday", "Thursday", "Saturday"],
      visible: true,
      volunteers: 30,
      beneficiaries: 150,
      icon: "📚",
      color: "blue",
      fullDescription: `Our Youth Education Support program is dedicated to bridging the educational gap for underprivileged children. We provide one-on-one and group tutoring sessions covering mathematics, English, science, and general knowledge.

Beyond academics, our volunteers also serve as mentors, providing guidance on life skills, confidence building, and career planning. We believe that education is the key to breaking the cycle of poverty, and this program is our commitment to that belief.`,
      impact: `Program achievements:
- 150+ students enrolled
- 95% pass rate improvement
- 30+ volunteer mentors
- 500+ hours of tutoring provided
- 50+ students advanced to higher education`,
      schedule: [
        "Tuesday: 3:00 PM - 6:00 PM",
        "Thursday: 3:00 PM - 6:00 PM",
        "Saturday: 10:00 AM - 1:00 PM",
      ],
    },
    "3": {
      id: 3,
      title: "Healthcare Outreach",
      time: "10:00 AM - 2:00 PM",
      location: "Medical Center",
      description:
        "Assist in healthcare clinics providing basic medical services and health awareness to communities.",
      days: ["Monday", "Wednesday"],
      visible: true,
      volunteers: 25,
      beneficiaries: 200,
      icon: "⚕️",
      color: "red",
      fullDescription: `Our Healthcare Outreach program brings basic medical services and health awareness to underserved communities. Working alongside healthcare professionals, our volunteers assist in providing check-ups, health screenings, and health education.

This program addresses the gap in healthcare access for marginalized populations and promotes preventive health practices. We conduct free health camps and awareness sessions on nutrition, hygiene, and disease prevention.`,
      impact: `Healthcare initiative results:
- 5,000+ people screened
- 1,000+ health awareness sessions
- 25+ healthcare professionals involved
- 200+ beneficiaries per session
- 100% improvement in health awareness scores`,
      schedule: ["Monday: 10:00 AM - 2:00 PM", "Wednesday: 10:00 AM - 2:00 PM"],
    },
  };

  const displayActivity =
    activity || (activityId && dummyActivities[activityId as string]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !displayActivity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#activities"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Activity Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The activity you are looking for does not exist."}
            </p>
            <Link
              href="/#activities"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Activities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#activities"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activities
        </Link>

        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-start gap-4 mb-4">
              {displayActivity.icon && (
                <span className="text-5xl">{displayActivity.icon}</span>
              )}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  {displayActivity.title}
                </h1>
                <p className="text-blue-100">{displayActivity.description}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Time</h3>
                <p className="text-gray-600">{displayActivity.time}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-gray-600">{displayActivity.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Volunteers</h3>
                <p className="text-gray-600">
                  {displayActivity.volunteers || 0} active volunteers
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-800">Beneficiaries</h3>
                <p className="text-gray-600">
                  {displayActivity.beneficiaries || 0} people helped
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            About This Activity
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {displayActivity.fullDescription || displayActivity.description}
          </p>
        </div>

        {/* Impact Section */}
        {displayActivity.impact && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line font-medium">
              {displayActivity.impact}
            </p>
          </div>
        )}

        {/* Schedule Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Activity Schedule
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(
              displayActivity.schedule ||
              displayActivity.days?.map(
                (day) => `${day}: ${displayActivity.time}`
              )
            )?.map((day, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              >
                <p className="text-gray-800 font-medium">{day}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our team of passionate volunteers and be part of this
            meaningful initiative. Every hour you volunteer creates a lasting
            impact on our community.
          </p>
          <Link
            href="/get-involved"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </div>
  );
}
