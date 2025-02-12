import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
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
  MessageCircle,
  Eye,
  Users,
  RefreshCw,
  UserPlus,
  BadgeCheck,
  ChevronsDownIcon,
  Computer,
  Mail,
  ChartBar,
  CreditCard,
  Globe,
  Phone,
  Award,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Carousel from "@/components/Carousel";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  return (
    <div className="min-h-screen  px-5 sm:px-10 bg-white">
      {/* Navigation */}

      <Navbar />
      <Hero />
      <WhatWeDo />
      <YourGlobal />
      <HowItWorks />
      <PricingSection />
      <Testimonial />
      <PersonalizedMessaging />
      <Faq />

      {/* Pain Points Section */}

      {/* <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
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
      </section>  */}

      {/* Why Us Section */}
      
      {/* <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
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
      </section> */}

      {/* What You Get Section About*/}
      {/* <section className="container mx-auto max-w-[1200px] px-4 py-24 md:py-32">
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
      </section> */}


      {/* <section className="w-full py-12 md:py-24 lg:py-32">
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
      </section> */}


      {/* <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-[1200px] py-12 md:py-16">
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
                <Button type="submit" className="w-full" size="xl">
                  Submit
                </Button>
              </form>
            </div>
            <img
              src="/regel.jpeg"
              alt="Regel Technology"
              width="600"
              height="400"
              className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-fill sm:w-full"
            />
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
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

///////////////////

const Navbar = () => {
  // Array of navigation links
  // const navLinks = [
  //   { href: "/features", text: "Features" },
  //   { href: "/pricing", text: "Pricing" },
  //   { href: "/about", text: "About" },
  //   { href: "/contact", text: "Contact" },
  // ];

  const navLinks = [
    { href: "#features", text: "Features" }, // Use #section-id
    { href: "#pricing", text: "Pricing" },
    { href: "#about", text: "About" },
    { href: "#contact", text: "Contact" },
  ];

  // Array of authentication buttons
  const authButtons = [
    { href: "/login", text: "Login", variant: "outline" },
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
          <span className="text-xl font-semibold ">Regel Technology</span>
        </Link>
        {/* Navigation Links and Auth Buttons */}
        <div className="flex items-center justify-between space-x-3">
          {/* Map over navLinks */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className=" hover:text-secondary transition-colors"
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
      width: 600,
      height: 400,
    },
    companyLogos: [
      { name: "Brand Logo 1", src: "/brands/brandlogo1.png" },
      { name: "Brand Logo 2", src: "/brands/brandlogo2.png" },
      { name: "Brand Logo 3", src: "/brands/brandlogo3.png" },
      { name: "Brand Logo 4", src: "/brands/brandlogo4.png" },
      { name: "Brand Logo 5", src: "/brands/brandlogo5.png" },
      { name: "Brand Logo 6", src: "/brands/brandlogo6.png" },
      { name: "Brand Logo 7", src: "/brands/brandlogo7.png" },
    ],
  };

  return (
    <div className="w-full container mx-auto max-w-[1200px] py-12 lg:py-16">
      {/* First Section */}
      <section className="w-full space-y-2">
        <div className="container mx-auto">
          <div className="grid grid-cols-4 gap-8 items-center">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-4">
              <div className="gap-4 space-y-3">
                <h1 className="text-6xl tracking-tighter text-left font-semibold">
                  We are your communication solution partner on a global scale.
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground text-left max-w-md">
                  Connect with your customers through SMS, OTP and explore
                  unlimited possibilities across the globe.
                </p>
              </div>
            </div>
            {/* Two Columns Section */}
            <div className="flex-col gap-4 col-span-2 space-y-6">
              <div className="flex justify-between space-x-2">
                {/* Left Column */}
                <div className="flex flex-col">
                  <h1 className="text-4xl tracking-tighter text-left font-regular">
                    1B +
                  </h1>
                  <p className="text-xl leading-relaxed tracking-tight text-muted-foreground text-left">
                    Over 1 billion sms transactions processed successfully.
                  </p>
                </div>
                {/* Right Column */}
                <div className="flex flex-col">
                  <h1 className="text-4xl tracking-tighter text-left font-regular">
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
            {/* Company Logos Carousel */}
            <div className="flex  col-span-4 mt-4 ">
              <Carousel
                items={heroContent.companyLogos}
                name="Trusted by these companies"
              />
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
    title:
      "An all-in-one communication solution, for businesses that want more.",
    description:
      "Connect with your customers through SMS, OTP, and explore unlimited possibilities across the globe.",
    stats: [
      {
        value: "Bulk SMS",
        description:
          "Send unlimited messages to your customers at the click of a button.",
        image: {
          src: "/home/sms2.png",
          alt: "Bulk SMS",
          width: 350,
          height: 350,
        },
      },
      {
        value: "OTP & Notifications",
        description:
          "Enable verification by sending secure one-time passcodes.",
        image: {
          src: "/home/sms3.png",
          alt: "OTP & Notifications",
          width: 350,
          height: 350,
        },
      },
      {
        value: "International Airtime & E-sim",
        description:
          "Recharge mobile phones and manage e-sim globally, hassle-free",
        image: {
          src: "/home/sms4.png",
          alt: "International Airtime & E-sim",
          width: 350,
          height: 350,
        },
      },
    ],
  };

  return (
    <div
      id="features"
      className="w-full container mx-auto max-w-[1200px] py-12 md:py-24 lg:py-32"
    >
      {/* First Section */}
      <section className="w-full  ">
        <div className="container mx-auto ">
          <div className="grid grid-cols-3 gap-8 items-center space-y-6">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3">
              <div>
                <Badge variant="outline">
                  <p className="text-lg font-regular ">
                    {whatWeDoContent.badge}
                  </p>
                </Badge>
              </div>
              <div className="gap-4 py-4">
                <h1 className="text-5xl tracking-tighter text-left font-regular max-w-xl font-bold bg-gradient-to-r from-primary to-black bg-clip-text text-transparent">
                  {whatWeDoContent.title}
                </h1>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex-col gap-4 col-span-3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Map over stats */}
                {whatWeDoContent.stats.map((stat, index) => (
                  <Card key={index} className="flex flex-col gap-4">
                    <CardContent className="p-6">
                      <Image
                        src={stat.image.src}
                        alt={stat.image.alt}
                        width={stat.image.width}
                        height={stat.image.height}
                        className="rounded-md object-cover"
                      />
                      <CardTitle className="text-3xl font-bold mt-4">
                        {stat.value}
                      </CardTitle>
                      <CardDescription className="text-lg mt-2">
                        {stat.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const YourGlobal = () => {
  // Reusable content for the "How It Works" section
  const howItWorksContent = {
    title1: "YOUR GLOBAL",
    title2: "TELECOMMUNICATION PARTNER.",
    description:
      "At regel, we’re on a mission to reposition how businesses and customers communicate. We strive to ensure that businesses provide the optimal customer satisfaction through our robust and innovative solution.",
    steps: [
      {
        value: "Mission",
        description:
          "To enable seamless  communication for  businesses globally.",
        icon: <MessageCircle size={45} className="text-primary  " />,
      },
      {
        value: "Vision",
        description:
          "To create a cross-border ecosystem that  enables millions of businesses  communicate with customers easily.",
        icon: <Eye size={45} className="text-primary " />,
      },
      {
        value: "Culture",
        description:
          "We deploy best practice  and redefine simplicity.",
        icon: <Users size={45} className="text-primary" />,
      },
      {
        value: "Retention",
        description:
          "We’re your partner to  deliver metrics that matter.",
        icon: <RefreshCw size={45} className="text-primary" />,
      },
      {
        value: "Customer Acquisition",
        description:
          "Drive retention with our  message scheduling feature.",
        icon: <UserPlus size={45} className="text-primary" />,
      },
    ],
  };

  return (
    <div
      id="about"
      className="w-full container mx-auto max-w-[1200px] py-12 md:py-24 lg:py-32"
    >
      {/* First Section */}
      <section className="w-full space-y-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 ">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3 space-y-4 text-center">
              <h1 className="text-6xl tracking-tighter font-extrabold text-left ">
                {howItWorksContent.title1}
              </h1>
              <h1 className="text-6xl tracking-tighter font-extrabold text-left bg-gradient-to-r from-blue-700 to-primary bg-clip-text text-transparent">
                {howItWorksContent.title2}
              </h1>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl  text-left">
                {howItWorksContent.description}
              </p>
            </div>

            {/* Steps Section */}
            <div className="flex-col gap-4 col-span-3 ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {/* Map over steps */}
                {howItWorksContent.steps.map((step, index) => (
                  <Card key={index} className="flex flex-col gap-4 pt-6 ">
                    <CardContent className="p-6 space-y-6">
                      {/* Render icon */}
                      {step.icon}
                      <CardTitle className="text-2xl font-bold mt-4 text-left">
                        {step.value}
                      </CardTitle>
                      <CardDescription className="text-lg mt-2 text-left">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PersonalizedMessaging = () => {
  // Reusable content for the "How It Works" section
  const personalizedContent = {
    title: "Create a unique & personalized messaging with a trusted global partner.",
    buttonText: "Sign up to get started today",
    steps: [
      {
      value: "User-Friendly Interface",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <Computer size={40}
      className="text-primary "
      
      />,
      },
      {
      value: "Personalized Messaging",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <Mail size={40} className="text-primary " />,
      },
      {
      value: "Real-Time Reports",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <ChartBar size={40} className="text-primary" />,
      },
      {
      value: "Pay-As-You-Go",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <CreditCard size={40} className="text-primary" />,
      },
      {
      value: "Network Reach",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <Globe size={40} className="text-primary" />,
      },
      {
      value: "Support",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.",
      icon: <Phone size={40} className="text-primary" />,
      },
      ],
  };

  return (
    <div
      id="about"
      className="w-full container mx-auto max-w-[1200px] py-12 md:py-24 lg:py-32"
    >
      {/* First Section */}
      <section className="w-full space-y-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 ">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3 space-y-4 text-center">
              <h1 className="text-6xl tracking-tighter font-extrabold text-center mb-8">
                {personalizedContent.title}
              </h1>
             
              <Button 
                    size="xl"
                    className="gap-4 bg-gradient-to-r from-[#2B5EA9] to-[#2BAF75]"
                    variant="default" 
                  >
                   {personalizedContent.buttonText}
        <MoveRightIcon className="w-6 h-6" />,
       
                  </Button>
              <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl  text-left">
                {personalizedContent.description}
              </p>
            </div>

            {/* Steps Section */}
            <div className="flex-col gap-4 col-span-3 ">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {/* Map over steps */}
                {personalizedContent.steps.map((step, index) => (
                  <Card key={index} className="flex flex-col gap-4 pt-6 bg-black">
                    <CardContent className="p-6 ">
                      {/* Render icon */}
                      {step.icon}
                      <CardTitle className="text-2xl font-bold mt-20 text-left text-white">
                        {step.value}
                      </CardTitle>
                      <CardDescription className="text-lg mt-4 text-left text-white">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
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
  // Reusable content for the "How It Works" section
  const howItWorksContent = {
    badge: "We're live!",
    title: "How It Works",
    description:
      "Connect with your customers through SMS, OTP, and explore unlimited possibilities across the globe.",
    steps: [
      {
        value: "Create a free account",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: {
          src: "/home/sms6.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Request for custom sender ID",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: {
          src: "/home/sms5.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Fund your wallet with payment",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: {
          src: "/home/sms7.png",
          alt: "SMS Transactions",
          width: 318,
          height: 318,
        },
      },
      {
        value: "Send message & view instant reports",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    <div
      id="how-it-works"
      className="w-full bg-gradient-to-b from-blue-300 via-blue-100 to-blue-300 py-12 md:py-24 lg:py-32"
    >
      {/* First Section */}
      <section className="container mx-auto max-w-[1200px]  ">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Hero Content */}
            <div className="gap-4 flex-col col-span-3">
              <div className="gap-4">
                <h1 className="text-2xl tracking-tighter font-extrabold text-center py-5 ">
                  {howItWorksContent.title}
                </h1>
              </div>
            </div>

            {/* Steps Section */}
            <div className="flex-col gap-4 col-span-3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Map over steps */}
                {howItWorksContent.steps.map((step, index) => (
                  <Card key={index} className="flex flex-col gap-4 bg-black">
                    <CardContent className="p-6">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        width={step.image.width}
                        height={step.image.height}
                        className="rounded-md object-cover"
                      />
                      <CardTitle className="text-2xl font-bold mt-8 text-white">
                        {step.value}
                      </CardTitle>
                      {/* <CardDescription className="text-md mt-3 text-white">
                        {step.description}
                      </CardDescription> */}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PricingSection = () => {
  const plans = {
    basic: {
      name: "Basic plan",
      price: "3",
      frequency: "/ SMS",
      features: [
        "Feature text goes here",
        "Feature text goes here",
        "Feature text goes here",
        "Feature text goes here",
       
      ],
      buttonVariant: "outline",
      isHighlighted: false,
    },
    custom: {
      value: "Pricing plan",
      description1:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
      description2:
        "Regel offers the best prices",
      image: {
        src: "/home/sms9.png",
        alt: "SMS Transactions",
        width: 318,
        height: 318,
      },
    },
  };

  return (
    <section
      id="pricing"
      className="container mx-auto max-w-[1200px] px-4 py-12 md:py-24 lg:py-32"
    >
      <div className="space-y-12">
       

        {/* Pricing Cards */}
        <div className="grid grid-cols-2 gap-8">
          <div className="md:col-span-1 col-span-2 gap-8">
            <Card className="flex flex-col gap-4 ">
              <CardContent className="p-6">
                <CardTitle className="text-4xl font-bold mt-8 text-black">
                  {plans.custom.value}
                </CardTitle>
                <CardDescription className="text-md mt-3 text-black">
                  {plans.custom.description1}
                </CardDescription>
                <Image
                  src={plans.custom.image.src}
                  alt={plans.custom.image.alt}
                  width={plans.custom.image.width}
                  height={plans.custom.image.height}
                  className="rounded-md object-cover"
                />
                <CardDescription className="text-md mt-3 text-black">
                  {plans.custom.description2}
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1 col-span-2 gap-8">
            <Card
              className={"relative border-2 border-primary-foreground  bg-black" }
            >
              <CardContent className="p-6 space-y-6">
                {/* Plan Title and Price */}
                <div>
                <Award
                        className="w-6 h-6 text-white mr-2 my-4 justify-self-end"
                       
                      />
                  <h3 className="text-xl font-bold text-white">{plans.basic.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold text-white">₦ {plans.basic.price}</span>
                    <span className=" ml-1 text-white">{plans.basic.frequency}</span>
                  </div>
                    <p className=" ml-1 text-white my-4">
                    or ₦200,000 yearly
                      </p>
                      <Separator className="  my-8"/>
                </div>

                {/* Plan Features */}
                <ul className="space-y-3">
                  {plans.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check
                        className="w-4 h-4 text-white mr-2"
                        strokeWidth={4}
                      />
                      <span className=" text-white ">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call-to-Action Button */}
                <Button
                  className={"w-full bg-gradient-to-r from-[#2B5EA9] to-[#2BAF75] text-white" }
                  variant={plans.basic.buttonVariant}
                  size="lg"
                >
                  Start Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection1 = () => {
  const plans = [
    {
      name: "Basic",
      price: "4.50 - 3.80",
      frequency: "/ SMS",
      features: [
        "Up to 1,000 SMS/month",
        "Basic delivery reports",
        "24/7 customer support",
      ],
      buttonVariant: "outline",
      isHighlighted: false,
    },
    {
      name: "Pro",
      price: "4.00 - 3.50",
      frequency: "/ SMS",
      features: [
        "Up to 10,000 SMS/month",
        "Advanced analytics & insights",
        "Custom sender ID",
        "Priority support",
      ],
      buttonVariant: "default",
      isHighlighted: true,
    },
    {
      name: "Enterprise",
      price: "3.80 - 3.00",
      frequency: "/ SMS",
      features: [
        "Unlimited SMS volume",
        "Advanced analytics & insights",
        "Custom sender ID",
        "Dedicated account manager",
        "Priority support",
      ],
      buttonVariant: "outline",
      isHighlighted: false,
    },
  ];
  return (
    <section
      id="pricing"
      className="container mx-auto max-w-[1200px] px-4 py-12 md:py-24 lg:py-32"
    >
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Plans and Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your communication and connect with customers
            effortlessly? Explore our flexible SMS plans and pricing designed to
            meet your business needs. Whether you're sending transactional
            messages, OTPs, or promotional campaigns, our reliable and scalable
            solutions ensure seamless delivery worldwide. Subscribe today and
            experience the power of global connectivity with transparent pricing
            and unmatched reliability.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${
                plan.isHighlighted ? "border-2 border-primary-foreground" : ""
              }`}
            >
              <CardContent className="p-6 space-y-6">
                {/* Plan Title and Price */}
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold">₦ {plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.frequency}</span>
                  </div>
                </div>

                {/* Plan Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <BadgeCheck
                        className="w-4 h-4 text-primary mr-2"
                        strokeWidth={2}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call-to-Action Button */}
                <Button
                  className={`w-full ${
                    plan.isHighlighted ? "bg-primary text-white" : ""
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  Start Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonial = () => {
  return (
    <section id="testimonial" className="bg-[#C3F3DE] relative pb-16">
      <div className="flex flex-wrap justify-center items-center container mx-auto max-w-[1200px] px-4 py-12 md:py-24 lg:py-32">
        {/* Left Column: Image */}
        <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
          <Image
            src="/regel.jpeg"
            alt="Testimonial image"
            className="rounded-md object-cover"
            width={600}
            height={600}
            priority
          />
        </div>

        {/* Right Column: Testimonial Content */}
        <div className="w-full md:w-1/2 px-4">
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <Star key={index} className="w-5 h-5 text-yellow-500" />
            ))}
          </div>

          <p className="text-gray-600 text-lg font-bold mb-4">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex."
          </p>

          {/* User Info & Image */}
          <div className="flex items-center gap-4">
            <div>
              <p className="text-lg font-bold">
                John Doe <br />
                <span className="text-gray-500 text-sm">CEO of Example Inc.</span>
              </p>
            </div>

            <Separator className="h-12 w-px bg-gray-600" />

            <Image
              src="/regel.jpeg"
              alt="John Doe"
              width={100}
              height={70}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation and Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-8">
        {/* Indicator (Bottom Left) */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === 0 ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>

        {/* Navigation Arrows (Bottom Right) */}
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black text-black hover:bg-gray-900 hover:text-white transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-black text-black hover:bg-gray-900 transition hover:text-white">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

const Faq = () => {
  const faqs = [
    {
      question: "How do I get started with sending SMS?",
      answer:
        "To get started, create a free account on our platform. Once registered, you can fund your wallet, request a custom sender ID, and start sending SMS messages instantly. Our intuitive dashboard makes it easy to manage your campaigns and track results.",
    },
    {
      question: "What types of messages can I send?",
      answer:
        "You can send a variety of messages, including transactional SMS (e.g., OTPs, alerts), promotional SMS (e.g., marketing campaigns), and bulk SMS. Our platform supports both text and Unicode messages, ensuring compatibility with all languages.",
    },
    {
      question: "How do I track the performance of my SMS campaigns?",
      answer:
        "Our platform provides real-time analytics and detailed reports for every SMS campaign. You can track delivery rates, open rates, and customer engagement metrics directly from your dashboard. Advanced analytics are available in our Pro and Enterprise plans.",
    },
    {
      question: "Is my data secure on your platform?",
      answer:
        "Yes, we prioritize data security. All messages and customer data are encrypted during transmission and storage. We also comply with global data protection regulations to ensure your information is safe and secure.",
    },
    {
      question: "What happens if my SMS fails to deliver?",
      answer:
        "If an SMS fails to deliver, our system automatically retries delivery for a set period. You can also view the status of each message in your dashboard. If delivery issues persist, our support team is available to assist you.",
    },
    {
      question: "Do you offer support for international SMS?",
      answer:
        "Yes, we support global SMS delivery to over 200 countries. Our platform ensures seamless connectivity and competitive pricing for international messaging. Check our coverage list for specific country details.",
    },
  ];

  return (
    <div id="faqs" className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Collapsible key={index}>
              <CollapsibleTrigger className="flex items-center justify-between w-full bg-muted rounded-md px-4 py-3 cursor-pointer">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground transition-transform duration-300 [&[data-state=open]]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-background rounded-b-md px-4 py-3 text-muted-foreground">
                <p>{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  // Array of navigation links
  const navLinks = [
    { href: "#about", text: "About us" },
    { href: "#how-it-works", text: "How it works" },
    { href: "#pricing", text: "Pricing" },
    { href: "#faqs", text: "FAQs" },
  ];

  // Array of social media links
  const socialLinks = [
    { href: "#", icon: <Facebook className="h-6 w-6" /> },
    { href: "#", icon: <Twitter className="h-6 w-6" /> },
    { href: "#", icon: <Linkedin className="h-6 w-6" /> },
    { href: "#", icon: <Youtube className="h-6 w-6" /> },
  ];

  return (
    <footer className="bg-white border-t w-full">
      <div className="container mx-auto max-w-[1200px] py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Logo and Description Section */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/regel.jpeg"
                alt="Regel Technology"
                width={50}
                height={50}
                className="rounded-full"
              />
              <span className="text-xl font-semibold">Regel Technology</span>
            </Link>
            <p className="block text-secondary-foreground max-w-md">
              Ready to revolutionize your video content and deliver confident,
              smooth, and engaging performances every time? Subscribe today and
              experience the power.
            </p>
          </div>

          {/* Navigation and Social Media Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Navigation Links */}
            <nav className="space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block text-gray-600 hover:text-gray-900"
                >
                  {link.text}
                </Link>
              ))}
            </nav>

            {/* Social Media Links */}
            <div className="space-y-4">
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex mt-12 pt-8 border-t text-center justify-between text-gray-600">
          <div>
            
          <p>© All rights reserved.</p>
          </div>
          <div className="flex space-x-2 ">
            
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

function ChevronDownIcon(props) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}




