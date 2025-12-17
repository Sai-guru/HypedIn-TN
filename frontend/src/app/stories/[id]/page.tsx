"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Share2, Calendar, User, Tag } from "lucide-react";
import { safeFetch } from "@/lib/fetchUtils";

interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  year: string;
  content?: string;
  author?: string;
  date?: string;
  impact?: string;
  quotes?: string;
}

export default function StoryDetailPage() {
  const params = useParams();
  const storyId = params?.id;
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        setLoading(true);
        const result = await safeFetch(`/api/stories/${storyId}`);

        if (result.success && result.data) {
          setStory(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch story");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load story");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  // Dummy transformation stories data
  const dummyStories: { [key: string]: Story } = {
    "sarahs-story": {
      id: "sarahs-story",
      title: "Sarah's Story",
      description:
        "From being unable to attend school to becoming the first college graduate in her village, Sarah's journey exemplifies the transformative power of education.",
      image: "/images/impact/story1.jpg",
      category: "Education",
      year: "2023",
      author: "Foundation Team",
      date: "December 15, 2024",
      content: `Sarah was born in a small village where education was considered a luxury. Her parents worked as daily laborers and could barely afford two meals a day. Despite the hardships, Sarah had dreams of becoming a teacher.

When Sarah was 10 years old, she learned about our education program through a community leader. Our team identified her potential and provided her with a full scholarship. More importantly, we connected her with a mentor, Ms. Priya, who became instrumental in her success.

Over the next 8 years, Sarah not only excelled academically but also became a role model for her younger siblings and other children in the village. She scored exceptionally high marks in her board exams and was admitted to a prestigious college on merit.

Today, at 22, Sarah is in her final year of college, pursuing her dream of becoming a teacher. She has also become a volunteer mentor for our program, helping other underprivileged children realize their dreams.`,
      impact: `Before our intervention:
• Sarah was out of school
• No access to quality education
• Limited career prospects

After our support:
• College degree holder (in progress)
• Mentoring 5 younger students
• Inspiring her entire community
• Planning to open a community school

Sarah's story is not just about one individual's success, but about the ripple effect it creates. She's now inspiring her siblings to pursue education, and other families in her village are also sending their children to school.`,
      quotes: `"When I was selected for this program, I felt like I had been given wings. Education has completely transformed my life and my family's future. I promise to give back to my community." - Sarah`,
    },
    "akachi-village": {
      id: "akachi-village",
      title: "Akachi Village - Transformation Through Water",
      description:
        "A village transformed by access to clean water. Disease rates have plummeted, while school attendance and economic activity have dramatically increased.",
      image: "/images/impact/story2.jpg",
      category: "Clean Water",
      year: "2023",
      author: "Foundation Team",
      date: "December 10, 2024",
      content: `Akachi Village, located in a remote region, has historically suffered from severe water scarcity. The nearest water source was 5 kilometers away, and it was contaminated with agricultural runoff and industrial waste.

Children in the village spent hours every day fetching water, leaving no time for school. Women bore the heaviest burden, often walking long distances at dawn and dusk to collect water. Waterborne diseases like cholera and typhoid were common, claiming lives every monsoon season.

When our team visited Akachi Village in 2018, we found a community on the brink of despair. After extensive surveys and community consultations, we decided to implement a comprehensive water solution:

1. Constructed 3 community wells with advanced filtration systems
2. Installed a rainwater harvesting infrastructure
3. Built water storage tanks to ensure availability during dry seasons
4. Conducted hygiene and sanitation awareness programs
5. Trained community members in water system maintenance

The transformation has been remarkable. Over the past 5 years:
• Disease rates have dropped by 70%
• School attendance increased from 40% to 95%
• Children now spend 4+ hours daily in school instead of fetching water
• Women have time for income-generating activities
• Agricultural productivity has increased dramatically

The village now has a water management committee comprising local representatives who ensure sustainable use and maintenance of the systems.`,
      impact: `Impact on Akachi Village:
• 5,000+ people with access to clean water
• 12 schools with improved attendance
• 60+ new businesses started by women
• 100+ children now in school
• Disease rates reduced by 70%
• Economic activity increased by 300%

The success of Akachi Village has inspired neighboring communities to request similar initiatives. We're now planning to expand this model to 10 more villages in the region.`,
      quotes: `"Our children no longer drink contaminated water, and they spend their time in school, not on water collection. The well has given us hope for a better future." - Village elder Kofi`,
    },
    "coastal-health-initiative": {
      id: "coastal-health-initiative",
      title: "Coastal Health Initiative - Healthcare for All",
      description:
        "Our mobile clinics have brought essential healthcare to 12 coastal communities, reducing treatable illness rates by 60% in just two years.",
      image: "/images/impact/story3.jpg",
      category: "Healthcare",
      year: "2023",
      author: "Foundation Team",
      date: "December 5, 2024",
      content: `The coastal communities we serve were historically underserved by healthcare infrastructure. With no clinics within 20 kilometers and limited transport options, people suffered from preventable diseases. Infant and maternal mortality rates were among the highest in the region.

In 2021, we launched the Coastal Health Initiative with three mobile medical units. These clinics visit communities on a fixed schedule, providing:
• Free health check-ups
• Vaccination programs for children
• Maternal and child health services
• Disease screening and prevention
• Health education and awareness

The mobile clinics are staffed by trained healthcare professionals and supported by a network of community health workers who conduct door-to-door awareness campaigns.

Results in just 2 years:
• 15,000+ people screened
• 5,000+ vaccinations administered
• 1,000+ pregnant women received prenatal care
• Infant mortality reduced by 50%
• Maternal complications reduced by 55%
• Treatable disease rates reduced by 60%

Beyond medical services, we've also trained local community members as health workers, creating sustainable healthcare infrastructure in these communities.`,
      impact: `Coastal Health Initiative Impact:
• 12 communities reached
• 20,000+ lives impacted
• 5,000+ children vaccinated
• 2,000+ pregnant women supported
• 100+ local health workers trained
• 60% reduction in treatable disease rates

The initiative has proven that healthcare is not a luxury but a fundamental right. We're now planning to expand to 20 more coastal communities and also exploring permanent clinic establishments.`,
      quotes: `"Before the mobile clinic came to our community, we had to travel hours to get basic healthcare. Now our children are healthy and vaccinated. This initiative has given us peace of mind." - Community health worker Maria`,
    },
    "tech-skills-initiative": {
      id: "tech-skills-initiative",
      title: "Tech Skills Initiative - Digital Empowerment",
      description:
        "Training underprivileged youth in technology skills, opening doors to lucrative career opportunities.",
      image: "/images/impact/story4.jpg",
      category: "Technology",
      year: "2024",
      author: "Foundation Team",
      date: "November 30, 2024",
      content: `In today's digital age, technology skills are essential for economic advancement. Yet many underprivileged youth lack access to quality tech education. The Tech Skills Initiative aims to bridge this gap.

We established computer labs in community centers and partnered with tech companies to provide training in:
• Basic computer literacy
• Web development
• Mobile app development
• Data analytics
• Digital marketing

Since 2022, we have:
• Trained 500+ young people
• Set up 5 community tech labs
• Partnered with 15 tech companies
• Facilitated 80+ internships
• Helped 60+ participants secure tech jobs

The program has transformed lives. Participants who were previously unemployed or underemployed are now earning good incomes and contributing to the tech industry.`,
      impact: `Tech Skills Initiative Results:
• 500+ youth trained
• 80+ internship placements
• 60+ permanent job placements
• Average salary increase: 300%
• 5 community tech labs
• 15 corporate partnerships

Graduates are now not just working for tech companies but also starting their own ventures, creating more opportunities for others.`,
      quotes: `"This program gave me the skills I needed to escape poverty. I now work as a junior developer and earn more than my parents ever did. I'm grateful and committed to mentoring others." - Akhil, Program Graduate`,
    },
  };

  const displayStory = story || (storyId && dummyStories[storyId as string]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !displayStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#stories"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Link>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Story Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              {error || "The story you are looking for does not exist."}
            </p>
            <Link
              href="/#stories"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Back to Stories
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
          href="/#stories"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Stories
        </Link>

        {/* Hero Section */}
        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl mb-8">
          <Image
            src={displayStory.image}
            alt={displayStory.title}
            fill
            style={{ objectFit: "cover" }}
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {displayStory.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {displayStory.title}
            </h1>
          </div>
        </div>

        {/* Meta Information */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-wrap gap-6">
          {displayStory.author && (
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>{displayStory.author}</span>
            </div>
          )}
          {displayStory.date && (
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{displayStory.date}</span>
            </div>
          )}
          {displayStory.year && (
            <div className="flex items-center gap-2 text-gray-600">
              <Tag className="w-4 h-4" />
              <span>{displayStory.year}</span>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Story Content */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">
                {displayStory.content || displayStory.description}
              </p>

              {/* Highlight Quote */}
              {displayStory.quotes && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 p-6 rounded my-8 italic text-gray-700">
                  "{displayStory.quotes}"
                </div>
              )}
            </div>

            {/* Impact Section */}
            {displayStory.impact && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Our Impact Through This Story
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {displayStory.impact}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Share Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Share This Story
              </h3>
              <button className="w-full py-3 px-4 rounded-lg font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 mb-3">
                <Share2 className="w-4 h-4" />
                Share Story
              </button>

              <div className="flex gap-2 justify-center pt-4 border-t border-gray-200">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  f
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  in
                </a>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white mt-6">
              <h3 className="text-lg font-bold mb-3">Make a Difference</h3>
              <p className="text-blue-100 text-sm mb-4">
                Help us create more stories like this by supporting our
                programs.
              </p>
              <Link
                href="/donate"
                className="block w-full py-3 px-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Inspired by These Stories?
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            These are just a few of the countless transformations happening
            because of supporters like you. Together, we can create more success
            stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Support Our Mission
            </Link>
            <Link
              href="/get-involved"
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
