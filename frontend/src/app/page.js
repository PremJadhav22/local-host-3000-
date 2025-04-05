import { Button } from "@/components/ui/button";
import { ArrowRight, Coins, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white from-off-white to-lavender-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800 leading-tight">
              Share Your Story. <span className="text-lavender-600">Heal Together.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              A safe, anonymous space to share your mental health journey, support others, and grow together in a
              decentralized community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-8 py-6 text-lg rounded-2xl">
                Connect Wallet to Begin
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="px-8 py-6 text-lg rounded-2xl border-lavender-300 hover:bg-gray-900 cursor-pointer text-lavender-700 hover:bg-lavender-100"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Abstract illustration of people supporting each other"
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-20 bg-off-white rounded-3xl my-10">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            number={1}
            title="Write"
            description="Share your story anonymously in a safe, supportive environment."
            icon={<MessageCircle className="h-12 w-12 text-blue-500" />}
          />
          <StepCard
            number={2}
            title="Support Others"
            description="Respond to stories with empathy and understanding to help others heal."
            icon={<Heart className="h-12 w-12 text-lavender-600 stroke-black" />}
          />
          <StepCard
            number={3}
            title="Earn Tokens"
            description="Receive MST tokens for meaningful contributions to the community."
            icon={<Coins className="h-12 w-12 text-amber-500" />}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-800">Community Voices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            quote="MindSafe gave me a space to express myself without judgment. The support I received was life-changing."
            author="Anonymous User"
          />
          <TestimonialCard
            quote="Being able to help others while maintaining privacy has been incredibly rewarding for my own healing journey."
            author="Community Member"
          />
          <TestimonialCard
            quote="The reflection prompts helped me process emotions I didn't even know I was holding onto."
            author="MST Token Holder"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 mb-10">
        <div className="bg-gradient-to-r from-lavender-100 to-blue-100 rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Join our community of supportive individuals sharing and healing together.
          </p>
          <Link href="/home">
            <Button className="bg-black hover:bg-gray-900 cursor-pointer text-white px-8 py-6 text-lg rounded-2xl">
              Explore Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-300 hover:shadow-md bg-white">
      <div className="bg-lavender-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
        <span className="text-black font-bold text-xl">{number}</span>
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-lavender-100">
      <p className="text-slate-600 italic mb-4 leading-relaxed">{quote}</p>
      <p className="text-right font-medium text-slate-700">— {author}</p>
    </div>
  )
}
