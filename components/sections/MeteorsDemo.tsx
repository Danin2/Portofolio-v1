import React from "react";
import { Meteors } from "@/components/ui/meteors";

export default function MeteorsDemo() {
    return (
        <div className="flex items-center justify-center py-20">
            <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 h-full w-full scale-[0.80] transform rounded-full bg-[var(--accent-primary)]/10 blur-3xl" />
                <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-bg-tertiary bg-bg-secondary px-4 py-8 shadow-xl">
                    <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full border border-text-muted">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-2 w-2 text-text-secondary"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                            />
                        </svg>
                    </div>

                    <h1 className="relative z-50 mb-4 text-xl font-bold text-white">
                        Meteors because they&apos;re cool
                    </h1>

                    <p className="relative z-50 mb-4 text-base font-normal text-text-secondary">
                        I architect high-performance systems with the precision of a celestial event.
                        Frontend development is where logic meets performance.
                    </p>

                    <button className="rounded-lg border border-bg-tertiary px-4 py-1 text-text-secondary hover:text-white transition-colors">
                        Explore
                    </button>

                    {/* Meteor effect */}
                    <Meteors number={20} />
                </div>
            </div>
        </div>
    );
}
