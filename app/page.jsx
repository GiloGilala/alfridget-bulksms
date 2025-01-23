import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  PlayCircle,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  PhoneCallIcon,
  MoveRightIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="min-h-screen  px-5 sm:px-10 container mx-auto max-w-[1200px]">
      {/* Navigation */}

      <Navbar />
      <Hero />
      <WhatWeDo />
      <HowItWorks />

      {/* Pain Points Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px]">
            <Image
              src="https://www.dropbox.com/scl/fi/3zq7bjhm8u0r0ir67om6z/problem.png?rlkey=votdtz6y2qme5fl827bhqlf82&st=qn02orm4&raw=1"
              alt="Frustrated content creator illustration"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Retakes, Over and Over...
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold">
              Are You Tired of
            </h3>
            <div className="space-y-6 border-l-4 border-[#E57B63] pl-6">
              <div>
                <p className="font-bold">Wasting time</p>
                <p className="text-gray-600">
                  on repeated re-shoots and re-takes?
                </p>
              </div>
              <div>
                <p className="font-bold">Struggling to remember</p>
                <p className="text-gray-600">your script and stay on track?</p>
              </div>
              <div>
                <p className="font-bold">Feeling anxious</p>
                <p className="text-gray-600">
                  and uncertain in front of the camera?
                </p>
              </div>
              <div>
                <p className="font-bold">Losing confidence</p>
                <p className="text-gray-600">
                  as the words get jumbled and the takes don't end?
                </p>
              </div>
              <div>
                <p className="font-bold">Wishing you could just get it right</p>
                <p className="text-gray-600">and move on?</p>
              </div>
            </div>
            <p className="text-xl font-medium">Sound familiar?</p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Introducing
              <br />
              The AI Powered Teleprompter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Say goodbye to awkward pauses, stumbling over words, and
              time-consuming re-takes. Our AI Powered Teleprompter is here to
              revolutionize the way you create video content, helping you
              deliver confident, smooth, and engaging performances every time.
            </p>
            <p className="text-xl font-medium">
              Here is how it works <span className="text-2xl">👇</span>
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#E57B63]">
            <Image
              src="https://www.dropbox.com/scl/fi/utzqoknpbgn4fm6ykhkhz/video.png?rlkey=udkuuvt8wfmjyjdfg92tylhcw&st=kvejt3jx&raw=1"
              alt="AI Teleprompter demonstration video thumbnail"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                variant="ghost"
                className="text-white hover:text-white hover:bg-white/20"
              >
                <PlayCircle className="w-20 h-20" />
                <span className="sr-only">Play video</span>
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium">
              1:20min video
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Why Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl">
              We've worked closely with a community of content creators to
              develop a solution that meets their needs and exceeds their
              expectations. Our AI Powered Teleprompter has been shaped by the
              feedback and insights of professionals who understand the
              challenges of creating high-quality video content.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden bg-[#E57B63]">
                  <Image
                    src="https://www.dropbox.com/scl/fi/iudaw1bnz4z4yr6imskwh/influencer.png?rlkey=sfkljgd88a65z8y28gty5fmuc&st=h8ffmwjh&raw=1"
                    alt="Influencer illustration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Influencers</h3>
                  <p className="text-gray-600">
                    With millions of followers across social media, they know
                    what it takes to create engaging content that resonates with
                    their audience.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden bg-[#E57B63]">
                  <Image
                    src="https://www.dropbox.com/scl/fi/ta7ow2ge4ype34y3cnq43/business-owner.png?rlkey=v78kxm8c2ukwbwi8boc1um3d4&st=4ts4kjq8&raw=1"
                    alt="Business owner illustration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Business Owner</h3>
                  <p className="text-gray-600">
                    With a deep understanding of marketing and branding, they've
                    helped us develop a solution that meets the needs of
                    businesses and organizations.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative rounded-t-lg overflow-hidden bg-[#E57B63]">
                  <Image
                    src="https://www.dropbox.com/scl/fi/yucrp1cxol0zyxt0j09wr/educator.png?rlkey=k7w4dajto0c1un3vmkowxso5t&st=r3h4qqgi&raw=1"
                    alt="Educator illustration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold">Educator</h3>
                  <p className="text-gray-600">
                    With a focus on online learning, they've shared their
                    expertise on creating effective educational content that
                    engages students and promotes learning.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              What You Get
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl">
              With these two features working together, you'll be able to
              deliver polished performances, refine your public speaking skills,
              and create high-quality video content that resonates with your
              audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-emerald-400" />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Save 50% More Time</h3>
                <p className="text-gray-600">
                  Our AI technology adjusts the teleprompter speed to match your
                  unique speaking pace, eliminating awkward pauses and ensuring
                  a seamless delivery.
                </p>
                <p className="text-gray-600 mt-4">
                  Waiting until you are ready
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-emerald-400" />
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Give A Speech Like Steve Jobs
                </h3>
                <p className="text-gray-600">
                  Our advanced algorithm analyzes your tone, pitch, and volume,
                  providing personalized feedback to help you improve your
                  on-camera presence and engage your audience more effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Plans and Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to revolutionize your video content and deliver confident,
              smooth, and engaging performances every time? Subscribe today and
              experience the power of the AI Powered Teleprompter for yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Basic</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">$19</span>
                    <span className="text-gray-600 ml-1">/ month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>AI-powered teleprompting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>Basic analytics</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Reduce My Retakes
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-[#E57B63]">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Pro</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-600 ml-1">/ month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>AI-powered teleprompting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#E57B63] hover:bg-[#E57B63]/90">
                  Reduce My Retakes
                </Button>
              </CardContent>
            </Card>

            <Card className="relative">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold">Pro</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">$149</span>
                    <span className="text-gray-600 ml-1">/ month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>AI-powered teleprompting</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-[#E57B63] rounded-full mr-2" />
                    <span>1:1 Coach (1 hour)</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Reduce My Retakes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
        <div className="bg-[#E57B63] rounded-2xl overflow-hidden">
          <div className="container mx-auto max-w-[1200px] px-4 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                  Ready to get Started?
                </h2>
                <p className="text-xl text-white/90">
                  Sign up for the AI Powered Teleprompter today and start
                  creating high-quality, engaging videos that drive results.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-white/90"
                >
                  Get Started and Reduce My Retakes
                </Button>
              </div>
              <div className="relative h-[400px]">
                <Image
                  src="https://www.dropbox.com/scl/fi/ba80i7nu7lotbiu7whff7/newsletter.png?rlkey=itxzv0o91o2o36rzb1wnkyens&st=iphfwy63&raw=1"
                  alt="Content creator with tablet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              src="/placeholder.svg"
              width="550"
              height="550"
              alt="Hero"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Leading Provider of Industrial Equipment
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Trusted supplier of high-quality machinery, motors, pumps, and
                  electrical components for industrial applications.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
              <GaugeIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Machinery</h3>
              <p className="text-gray-500 dark:text-gray-400">
                High-performance industrial machinery for diverse applications.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
              <BoltIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Electric Motors</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Reliable and energy-efficient electric motors for industrial
                use.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
              <DropletIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Pumping Equipment</h3>
              <p className="text-gray-500 dark:text-gray-400">
                High-quality pumps for industrial and commercial applications.
              </p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-gray-100 p-6 text-center dark:bg-gray-800">
              <PlugIcon className="h-10 w-10 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Electrical Components</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Comprehensive range of electrical and control materials.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                Trusted by Industry Leaders
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Awards, Certifications, and Partnerships
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Our commitment to quality and innovation is recognized by
                leading industry organizations and partners.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              <img
                src="/placeholder.svg"
                width="140"
                height="70"
                alt="Logo"
                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              />
              <img
                src="/placeholder.svg"
                width="140"
                height="70"
                alt="Logo"
                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              />
              <img
                src="/placeholder.svg"
                width="140"
                height="70"
                alt="Logo"
                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              />
              <img
                src="/placeholder.svg"
                width="140"
                height="70"
                alt="Logo"
                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              />
              <img
                src="/placeholder.svg"
                width="140"
                height="70"
                alt="Logo"
                className="aspect-[2/1] overflow-hidden rounded-lg object-contain object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Get in Touch
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Have a question about our products or services? Fill out the
                  form below and our team will be in touch.
                </p>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={4} required />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </div>
            <img
              src="/placeholder.svg"
              width="600"
              height="400"
              alt="Contact"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover sm:w-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t w-full">
        <div className="container mx-auto max-w-[1200px] py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://www.dropbox.com/scl/fi/z46u29l8ebthk2la0i8eu/logo.png?rlkey=euopxjffbafhg1ebd95a1o7mc&st=8wohkarn&raw=1"
                  alt="AI Teleprompter Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">
                  Want to receive our Newsletter?
                </h3>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-xs"
                  />
                  <Button className="bg-[#E57B63] hover:bg-[#E57B63]/90">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <nav className="space-y-4">
                <Link
                  href="/about"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  About us
                </Link>
                <Link
                  href="/how-it-works"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  How it works
                </Link>
                <Link
                  href="/pricing"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  Pricing
                </Link>
                <Link
                  href="/faqs"
                  className="block text-gray-600 hover:text-gray-900"
                >
                  FAQs
                </Link>
              </nav>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Twitter className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Linkedin className="h-6 w-6" />
                  </Link>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    <Youtube className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>© All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BoltIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function DropletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

function GaugeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  );
}

function PlugIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </svg>
  );
}

const Navbar = () => {
  // Array of navigation links
  const navLinks = [
    { href: "/features", text: "Features" },
    { href: "/pricing", text: "Pricing" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" },
  ];

  // Array of authentication buttons
  const authButtons = [
    { href: "/login", text: "Login", variant: "ghost" },
    {
      href: "/signup",
      text: "Sign Up",
      className: "bg-primary hover:bg-primaryHover text-white",
    },
  ];

  return (
    <nav className="w-full py-4">
      <div className="container mx-auto max-w-[1200px] flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/regel.jpeg"
            alt="regel.png Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-xl font-semibold text-secondary">
            Regel Technology
          </span>
        </Link>

        {/* Navigation Links and Auth Buttons */}
        <div className="flex items-center gap-8">
          {/* Map over navLinks */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-secondary hover:text-secondaryHover transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* Map over authButtons */}
          <div className="flex items-center gap-4">
            {authButtons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant}
                className={button.className}
                asChild
              >
                <Link href={button.href}>{button.text}</Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  // Reusable content for the hero section
  const heroContent = {
    title: "This is the start of something!",
    description:
      "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.",
    buttons: [
      {
        text: "Jump on a call",
        icon: <PhoneCallIcon className="w-4 h-4" />,
        variant: "default",
      },
      {
        text: "Sign up here",
        icon: <MoveRightIcon className="w-4 h-4" />,
        variant: "outline",
      },
    ],
    image: {
      src: "/home/sms1.png",
      alt: "Section 2 Image",
      width: 700,
      height: 500,
    },
    companyLogos: [1, 2, 3, 4, 5, 6, 7], // Replace with actual image paths
  };

  return (
    <div className="w-full container mx-auto max-w-[1200px]">
      {/* First Section */}
      <section className="w-full py-10 space-y-2 ">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-8 items-center">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-4">
              <div>
                <Badge variant="outline">We&apos;re live!</Badge>
              </div>
              <div className="gap-4">
                <h1 className="text-7xl tracking-tighter text-left font-regular">
                  We are your communication solution partner on a global scale.
                </h1>
                <p className="text-2xl leading-relaxed tracking-tight text-muted-foreground  text-left">
                  Connect with your customers through SMS, OTP and explore
                  unlimited possibilities across the globe.{" "}
                </p>
              </div>
            </div>

            {/* Two Columns Section */}
            <div className="flex-col gap-4 col-span-2 space-y-4">
              <div className="flex justify-between space-x-2">
                {/* Left Column */}
                <div className="flex gap-4 flex-col">
                  <h1 className="text-4xl  tracking-tighter text-left font-regular">
                    1B +
                  </h1>
                  <p className="text-xl leading-relaxed tracking-tight text-muted-foreground  text-left">
                    Over 1 billion sms transactions processed successfully.
                  </p>
                </div>

                {/* Right Column */}
                <div className="flex gap-4 flex-col">
                  <h1 className="text-4xl  tracking-tighter text-left font-regular">
                    100+ Networks
                  </h1>
                  <p className="text-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                    Deliver to over 100 mobile networks globally.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-row gap-4">
                {heroContent.buttons.map((button, index) => (
                  <Button
                    key={index}
                    size="xl"
                    className="gap-4"
                    variant={button.variant}
                  >
                    {button.text} {button.icon}
                  </Button>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex gap-4 col-span-2 items-center justify-center">
              <div className="bg-background rounded-md aspect-square flex ">
                <Image
                  src={heroContent.image.src}
                  alt={heroContent.image.alt}
                  width={heroContent.image.width}
                  height={heroContent.image.height}
                  className="rounded-md object-cover"
                />
              </div>
            </div>

            {/* Company Logos */}
            <div className="flex gap-4 col-span-4">
              {heroContent.companyLogos.map((index) => (
                <div
                  key={index}
                  className="bg-muted rounded-md  flex items-center justify-center"
                >
                  <Image
                    src={`/regel.jpeg`} // Replace with actual image paths
                    alt={`Regel ${index}`}
                    width={150}
                    height={150}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const WhatWeDo = () => {
  // Reusable content for the "What We Do" section
  const whatWeDoContent = {
    badge: "What We Do",
    title: "An all-in-one communication solution, for people who want more.",
    description:
      "Connect with your customers through SMS, OTP and explore unlimited possibilities across the globe.",
    stats: [
      {
        value: "Bulk SMS",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms2.png",
          alt: "SMS Transactions",
          width: 350,
          height: 350,
        },
      },
      {
        value: "OTP & Notifications",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms3.png",
          alt: "SMS Transactions",
          width: 350,
          height: 350,
        },
      },
      {
        value: "Global E-sim",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms4.png",
          alt: "SMS Transactions",
          width: 350,
          height: 350,
        },
      },
    ],
  };

  return (
    <div className="w-full container mx-auto max-w-[1200px]">
      {/* First Section */}
      <section className="w-full py-10 space-y-2">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3">
              <div>
                <Badge variant="outline">{whatWeDoContent.badge}</Badge>
              </div>
              <div className="gap-4">
                <h1 className="text-6xl tracking-tighter text-left font-regular">
                  {whatWeDoContent.title}
                </h1>
                {/* <p className="text-2xl leading-relaxed tracking-tight text-muted-foreground text-left">
                  {whatWeDoContent.description}
                </p> */}
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-col gap-4 col-span-3 space-y-4">
              <div className="flex justify-between space-x-2">
                {/* Map over stats */}
                {whatWeDoContent.stats.map((stat, index) => (
                  <div key={index} className="flex gap-4 flex-col">
                    <h1 className="text-3xl font-bold tracking-tighter text-left font-regular">
                      {stat.value}
                    </h1>
                    <p className="text-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                      {stat.description}
                    </p>
                    <Image
                      src={stat.image.src}
                      alt={stat.image.alt}
                      width={stat.image.width}
                      height={stat.image.height}
                      className="rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const HowItWorks = () => {
  // Reusable content for the "What We Do" section
  const whatWeDoContent = {
    badge: "We're live!",
    title: "We are your communication solution partner on a global scale.",
    description:
      "Connect with your customers through SMS, OTP and explore unlimited possibilities across the globe.",
    stats: [
      {
        value: "Create a free account",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms6.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Request for custom sender ID",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms5.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Fund your wallet with payment",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms7.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Send message & view instant reports",
        description: "Over 1 billion SMS transactions processed successfully.",
        image: {
          src: "/home/sms8.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
    ],
  };

  return (
    <div className="w-full container mx-auto max-w-[1200px]">
      {/* First Section */}
      <section className="w-full py-10 space-y-2">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3">
              <div className="gap-4">
                <h1 className="text-2xl tracking-tighter font-extrabold text-center">
                  How It Works
                </h1>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-col gap-4 col-span-3 space-y-4">
              <div className="flex justify-between space-x-2">
                {/* Map over stats */}
                {whatWeDoContent.stats.map((stat, index) => (
                  <div key={index} className="flex gap-4 flex-col">
                    <Image
                      src={stat.image.src}
                      alt={stat.image.alt}
                      width={stat.image.width}
                      height={stat.image.height}
                      className="rounded-md object-cover"
                    />
                    <h1 className="text-3xl font-bold tracking-tighter text-left font-regular">
                      {stat.value}
                    </h1>
                    <p className="text-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
