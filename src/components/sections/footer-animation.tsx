"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: "Product",
    links: ["Intake", "Plan", "Build", "Reviews", "Monitor", "Pricing", "Security"],
  },
  {
    title: "Features",
    links: ["Asks", "Agents", "Customer Requests", "Insights", "Mobile", "Integrations", "Changelog"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Blog", "Method", "Quality", "Brand"],
  },
  {
    title: "Resources",
    links: ["Switch", "Download", "Documentation", "Developers", "Status", "Enterprise", "Startups"],
  },
  {
    title: "Connect",
    links: ["Contact us", "Community", "X (Twitter)", "GitHub", "YouTube"],
  },
];

export function FooterAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !headingRef.current) return;

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef}>
      <div className="flex min-h-[1101px] flex-col items-center justify-center">
        <h2
          ref={headingRef}
          className="max-w-[592px] text-center text-[34.18px] font-medium leading-[1.2] tracking-[-1.03px]"
        >
          Built for the future. Available today.
        </h2>
        <div className="mt-4 flex gap-4">
          <Link
            href="#"
            className="rounded border border-accent-dark/50 bg-accent px-3 py-1 text-sm text-accent-text transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="#"
            className="rounded border border-[#363636] bg-[#262626] px-3 py-1 text-sm text-accent-surface transition-opacity hover:opacity-90"
          >
            Contact Sales
          </Link>
        </div>
      </div>

      <footer className="bg-surface-elevated pt-36">
        <div className="border-t border-border-default px-6 pb-24 pt-16">
          <div className="mx-auto flex max-w-[1216px] items-start justify-between">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              flux
            </Link>

            <div className="flex w-[1008px] flex-col gap-16">
              <div className="flex gap-8">
                {footerColumns.map((col) => (
                  <div
                    key={col.title}
                    className="flex flex-1 flex-col gap-8"
                  >
                    <span className="text-sm font-semibold leading-[1.8] tracking-[-0.14px] text-accent-surface">
                      {col.title}
                    </span>
                    <div className="flex flex-col gap-4">
                      {col.links.map((link) => (
                        <Link
                          key={link}
                          href="#"
                          className="text-sm leading-[1.8] tracking-[-0.14px] text-text-dim transition-colors hover:text-text-primary"
                        >
                          {link}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-6 text-sm leading-[1.8] tracking-[-0.14px] text-text-dim">
                <Link href="#" className="hover:text-text-primary transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-text-primary transition-colors">Terms</Link>
                <Link href="#" className="hover:text-text-primary transition-colors">DPA</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
