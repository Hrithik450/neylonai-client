"use client";

import React from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { ArrowDownRight, BadgeCheck, Cpu, Play } from "lucide-react";

import HeroImage from "@/assets/images/hero_background_3.jpg";
import IphoneFrameImage from "@/assets/images/iphone-frame.png";

import { WidgetHome } from "../widget/widget-tabs/widget-home";

import { cn } from "@/lib/utils";
import { guminertBold, guminertMedium, guminertRegular } from "@/assets/fonts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useWidgetToggleStore } from "@/store/widget-store";

export function Hero2() {
  const { setIsOpen } = useWidgetToggleStore();

  return (
    <section
      id="home"
      className={cn(
        guminertRegular.className,
        "py-4 px-3 md:px-5 h-max md:h-310 xl:h-290 overflow-hidden",
      )}
    >
      <div className="relative rounded-2xl overflow-hidden px-3 md:px-6 pt-26 md:pt-34">
        <div className="absolute inset-0">
          <Image
            src={HeroImage}
            alt="hero-image"
            className="w-full h-full rotate-180"
          />
        </div>

        <div className="relative flex justify-start md:justify-center items-center">
          <div className="flex justify-center items-center gap-2 rounded-full p-1 px-2 border border-gray-400/90 shadow-xs">
            <BadgeCheck className="text-gray-600 bg-[#C0EB5D] rounded-full p-0.5 w-5 h-5 md:w-auto md:h-auto" />
            <span className="pr-1 text-sm md:text-base">
              Affordable & Reliable
            </span>
          </div>
        </div>

        <h1
          className={cn(
            guminertMedium.className,
            "relative text-[1.5rem] md:text-5xl lg:text-6xl xl:text-7xl max-w-7xl 2xl:max-w-360 text-left md:text-center mx-auto my-4 leading-tight md:leading-16 lg:leading-18 xl:leading-20 bg-linear-to-r from-[#050c0a] via-[#0d3129] to-[#007a63] bg-clip-text text-transparent",
          )}
        >
          Capture{" "}
          <span className={cn(guminertBold.className, "text-[#0E3228]")}>
            Leads
          </span>
          , Answer{" "}
          <span className={cn(guminertBold.className, "text-[#0E3228]")}>
            Questions
          </span>
          , And Resolve{" "}
          <span className={cn(guminertBold.className, "text-[#0E3228]")}>
            Support Requests
          </span>
          .
        </h1>

        <p className="relative text-left md:text-center text-sm md:text-lg max-w-2xl mx-auto text-gray-500">
          We build ai agents that help customers instantly, capture more
          qualified leads, and keep conversations moving 24/7 without growing
          your support team.
        </p>

        <div className="relative flex items-center justify-start md:justify-center gap-3 md:gap-4 mt-6">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex items-center gap-2 bg-[#0E3228] text-white text-sm md:text-lg border border-gray-400 rounded-full p-2.5 px-4 md:px-8 cursor-pointer group overflow-hidden"
          >
            Start Free
            <ArrowDownRight className="-rotate-90 group-hover:-rotate-45 transition-all duration-300 ease-in-out text-white w-4 h-4 md:w-6 md:h-6" />
          </button>

          <button className="bg-[#E9E9E7] text-sm md:text-lg border border-gray-400 rounded-full p-2.5 px-4 md:px-8 cursor-pointer group">
            <ScrollLink
              to="features"
              smooth={true}
              duration={300}
              offset={0}
              className="flex items-center gap-2"
            >
              <Play className="group-hover:-rotate-15 transition-all duration-300 ease-in-out w-4 h-4 md:w-6 md:h-6" />
              See Features
            </ScrollLink>
          </button>
        </div>

        <div className="relative max-w-360 mx-auto mt-10 max-md:mt-48 max-md:mb-26">
          <div className="relative max-w-xs md:max-w-md mx-auto h-full flex-center">
            {/* Iphone Frame */}
            <div className="relative w-full h-full z-20">
              <Image
                className="bg-transparent w-full h-full object-cover"
                src={IphoneFrameImage}
                alt="iphone-frame"
              />
            </div>

            {/* Frame Content */}
            <div className="absolute w-full h-full z-10">
              <div className="px-3 md:px-6 pt-12 md:pt-16 bg-[linear-gradient(to_bottom,rgb(230,250,217)_0%,rgb(255,255,255)_100%)] pointer-events-none w-[95%] aspect-789/1650 mx-auto object-cover rounded-[2.75rem] lg:rounded-[3rem] xl:rounded-[3.70rem] 2xl:rounded-[4.5rem] overflow-hidden">
                <WidgetHome />
              </div>
            </div>
          </div>

          {/* Supporting Card-1 */}
          <div className="absolute -top-40 md:top-10 lg:top-15 -right-2.5 lg:right-0 2xl:right-30 z-50">
            <div className="relative flex flex-col xl:flex-row items-center gap-0 xl:gap-4 p-4 lg:p-3 border border-gray-400 rounded-3xl h-auto md:h-60 xl:h-65 max-w-60 md:max-w-sm xl:max-w-lg w-full shadow-md hover:rotate-2 transition-all duration-150 ease-in-out bg-[linear-gradient(to_bottom,rgb(240,237,255)_0%,rgb(255,255,255)_100%)]">
              <div className="md:px-2 py-4 md:py-2 bg-transparent rounded-xl flex flex-col h-full gap-2 justify-center items-center group">
                <Cpu className="w-15 h-15 group-hover:scale-110 group-hover:rotate-5 transition-all duration-150 ease-in-out" />
                <h1 className="text-4xl font-semibold">4-10 Hrs</h1>
                <p className="text-md text-center">Average Setup Time</p>
              </div>

              <div className="flex-1 flex flex-col gap-2 justify-around items-start">
                <h3 className="text-sm md:text-base xl:text-xl max-w-67.5 max-xl:text-center font-semibold">
                  Get Your AI Agent Live In Hours, Not Weeks.
                </h3>

                <p className="max-xl:hidden text-sm md:text-base text-gray-500">
                  Train on your website, configure your business information,
                  and start answering customer questions the same day.
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Card-2 */}
          <div className="absolute -bottom-20 md:bottom-80 lg:bottom-90 -left-2.5 lg:left-0 2xl:left-15 z-50">
            <div className="relative border border-gray-400 rounded-3xl overflow-hidden h-60 md:h-65 max-w-sm md:max-w-lg w-60 md:w-[20rem] xl:w-md shadow-md hover:rotate-2 transition-all duration-150 ease-in-out">
              <Card className="absolute inset-0 w-full h-full bg-[linear-gradient(to_bottom,rgb(250,244,215)_0%,rgb(255,255,255)_100%)] py-4 lg:py-4 xl:py-8 px-2 gap-0">
                <CardHeader className="pb-1 md:pb-2 px-0">
                  <CardTitle className="text-center text-[0.9rem] md:text-lg xl:text-xl font-bold text-black/80">
                    Multiple Business Outcomes.
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex items-center justify-center px-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 md:gap-y-3 md:gap-x-4 w-full max-w-sm">
                    {[
                      "Lead Capture",
                      "Customer Support",
                      "FAQ Automation",
                      "Support Requests",
                      "Website Engagement",
                      "Appointment Booking",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm md:text-base font-medium"
                      >
                        <span className="text-green-600">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
