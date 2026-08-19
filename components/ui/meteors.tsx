"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
import { useEffect, useState } from "react";

export const Meteors = ({
    number,
    className,
}: {
    number?: number;
    className?: string;
}) => {
    const meteors = new Array(number || 20).fill(true);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 pointer-events-none"
        >
            {meteors.map((el, idx) => {
                return (
                    <span
                        key={"meteor" + idx}
                        className={cn(
                            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
                            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-slate-500/40 before:content-['']",
                            className,
                        )}
                        style={{
                            top: "0px",
                            left: Math.floor(Math.random() * 100) + "%",
                            animationDelay: Math.random() * 5 + "s",
                            animationDuration: Math.floor(Math.random() * (10 - 5) + 5) + "s",
                        }}
                    ></span>
                );
            })}
        </motion.div>
    );
};