"use client";

import { getProjects } from "@/sanity/sanity-utils";
import { useEffect, useState } from "react";
import PageWrapper from "@/components/pageWrapper";

export default function About() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1>Hello from about page</h1>
    </div>
  );
}
