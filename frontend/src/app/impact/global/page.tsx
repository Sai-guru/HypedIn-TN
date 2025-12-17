"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Globe,
  MapPin,
  Users,
  Heart,
  TrendingUp,
  Award,
  ArrowLeft,
} from "lucide-react";
import { safeFetch } from "@/lib/fetchUtils";

interface GlobalStats {
  countries: number;
  projects: number;
  communities: number;
  livesImpacted: number;
  volunteers: number;
  volunteers_trained: number;
}

interface RegionalData {
  region: string;
  countries: string[];
  projects: number;
  beneficiaries: number;
  highlights: string[];
}

export default function GlobalImpactPage() {
  const [globalData, setGlobalData] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setLoading(true);
        const result = await safeFetch("/api/impact/global");

        if (result.success && result.data) {
          setGlobalData(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch global data");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load global data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGlobalData();
  }, []);

  // Dummy global data
  const defaultGlobalData: GlobalStats = {
    countries: 25,
    projects: 350,
    communities: 120,
    livesImpacted: 1200000,
    volunteers: 5000,
    volunteers_trained: 2500,
  };

  const regionalBreakdown: RegionalData[] = [
    {
      region: "South Asia",
      countries: ["India", "Bangladesh", "Nepal", "Sri Lanka"],
      projects: 120,
      beneficiaries: 400000,
      highlights: [
        "Largest education initiative with 35 schools",
        "Clean water access for 50,000+ people",
        "Healthcare programs reaching 12 communities",
      ],
    },
    {
      region: "Southeast Asia",
      countries: ["Myanmar", "Thailand", "Vietnam", "Cambodia"],
      projects: 85,
      beneficiaries: 250000,
      highlights: [
        "Tech skills training for youth empowerment",
        "Women's economic programs in 20 villages",
        "Environmental conservation projects",
      ],
    },
    {
      region: "East Africa",
      countries: ["Kenya", "Uganda", "Tanzania", "Ethiopia"],
      projects: 95,
      beneficiaries: 280000,
      highlights: [
        "Largest healthcare initiative in the continent",
        "Sustainable farming programs",
        "Community health worker training",
      ],
    },
    {
      region: "West Africa",
      countries: ["Ghana", "Nigeria", "Senegal", "Burkina Faso"],
      projects: 50,
      beneficiaries: 180000,
      highlights: [
        "Educational infrastructure development",
        "Clean water initiatives",
        "Women's empowerment programs",
      ],
    },
  ];

  const displayData = globalData || defaultGlobalData;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/#impact"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Impact
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 p-4 bg-blue-100 rounded-full">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Global Impact
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Spanning across continents, our programs have touched millions of
            lives through education, healthcare, and sustainable development
            initiatives.
          </p>
        </div>

        {/* Global Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {displayData.countries}+
            </div>
            <p className="text-gray-600">Countries</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {displayData.projects}+
            </div>
            <p className="text-gray-600">Projects</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {displayData.communities}+
            </div>
            <p className="text-gray-600">Communities</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {(displayData.livesImpacted / 1000000).toFixed(1)}M+
            </div>
            <p className="text-gray-600">Lives Impacted</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {displayData.volunteers}+
            </div>
            <p className="text-gray-600">Volunteers</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {displayData.volunteers_trained}+
            </div>
            <p className="text-gray-600">Trained Leaders</p>
          </div>
        </div>

        {/* Regional Breakdown */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Regional Presence
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regionalBreakdown.map((region, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{region.region}</h3>
                  <p className="text-blue-100">
                    {region.countries.length} countries active
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600 text-sm">Projects</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {region.projects}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Beneficiaries</p>
                      <p className="text-2xl font-bold text-green-600">
                        {(region.beneficiaries / 1000).toFixed(0)}K+
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="font-semibold text-gray-800 mb-2">
                      Countries:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {region.countries.map((country, cidx) => (
                        <span
                          key={cidx}
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2">
                      {region.highlights.map((highlight, hidx) => (
                        <li
                          key={hidx}
                          className="flex gap-2 text-gray-700 text-sm"
                        >
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C6.5 6.253 3 9.24 3 13s3.5 6.747 9 6.747c5.5 0 9-3.24 9-6.747 0-3.76-3.5-6.747-9-6.747z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Education</h3>
              <p className="text-gray-600 text-sm">
                Building schools, training teachers, and providing scholarships
                to 50,000+ students.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Clean Water</h3>
              <p className="text-gray-600 text-sm">
                Providing access to clean water through wells and filtration
                systems for 100,000+ people.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Healthcare</h3>
              <p className="text-gray-600 text-sm">
                Mobile clinics, health awareness, and maternal care for 200,000+
                beneficiaries.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Livelihood</h3>
              <p className="text-gray-600 text-sm">
                Skills training and economic empowerment programs for 50,000+
                people.
              </p>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Global Achievements
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-gray-600">
                  School Attendance Rate in Project Areas
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  70%
                </div>
                <p className="text-gray-600">
                  Reduction in Waterborne Diseases
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">50%</div>
                <p className="text-gray-600">Decrease in Infant Mortality</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  80+
                </div>
                <p className="text-gray-600">Tech Jobs Created for Graduates</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">
                  300%
                </div>
                <p className="text-gray-600">Average Income Increase</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  42%
                </div>
                <p className="text-gray-600">Improvement in Literacy Rates</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Expand Our Global Reach</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            We're growing our impact every day. Help us reach more communities
            and transform more lives across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Support Our Programs
            </Link>
            <Link
              href="/get-involved"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Volunteer Globally
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
