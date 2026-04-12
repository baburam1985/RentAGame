import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// Mock next/image to a plain <img> React element so RTL tests don't need Next.js internals
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) =>
    React.createElement("img", { src, alt }),
}));
