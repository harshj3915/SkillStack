import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  Learn Effectively with SkillStack
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  Connect with YouTube courses and ensure a proper learning environment. Track your progress and never
                  miss a beat.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Link href="/search?query=NextJs" className="btn-secondary">
                  Start Learning
                </Link>
                <Link href="#features" className="btn-primary">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                alt="Students learning online"
                width={600}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>


      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose SkillStack?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-indigo-600"
                >
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
                  <path d="M12 2a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Global Access</h3>
              <p className="text-gray-500 mt-2">Access top-quality YouTube courses from anywhere in the world.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-indigo-600"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Structured Learning</h3>
              <p className="text-gray-500 mt-2">
                Our platform ensures you follow the course structure without skipping important content.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-indigo-600"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  <path d="m15 5 3 3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="text-gray-500 mt-2">
                Keep track of your learning progress across all your enrolled courses.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="User 1"
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover"
              />
              <p className="text-gray-500 mb-4">
                "SkillStack has transformed the way I approach online learning. The structured approach keeps me focused
                and motivated."
              </p>
              <h4 className="font-bold">Sarah J.</h4>
              <p className="text-sm text-gray-500">Web Developer</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="User 2"
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover"
              />
              <p className="text-gray-500 mb-4">
                "I love how SkillStack combines YouTube's vast content with a structured learning environment. It's the
                best of both worlds!"
              </p>
              <h4 className="font-bold">Michael T.</h4>
              <p className="text-sm text-gray-500">Data Scientist</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="User 3"
                width={80}
                height={80}
                className="rounded-full mb-4 object-cover"
              />
              <p className="text-gray-500 mb-4">
                "The progress tracking feature is a game-changer. It keeps me accountable and helps me stay on track
                with my learning goals."
              </p>
              <h4 className="font-bold">Emily R.</h4>
              <p className="text-sm text-gray-500">UX Designer</p>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto mb-8">
            Join SkillStack today and unlock a world of structured, effective learning from YouTube's best educational
            content.
          </p>
          <Link href="/search?query=NextJs" className="btn-secondary inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </main>
  )
}

