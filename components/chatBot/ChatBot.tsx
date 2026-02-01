"use client";
import React, { useEffect } from "react";

const EpsillaChatWidget = () => {
  useEffect(() => {
    // Initialize Epsilla Chat Widget
    // @ts-expect-error - Window property not defined in TypeScript
    window.AppUrl =
      "chatbot/9431a203-5101-40b5-9eca-5820f6d6ef1d-347160099/ba370d34-5438-4c74-93fb-61e7f5bf8511?mode=embed";
    // @ts-expect-error - Window property not defined in TypeScript
    window.themeColor = "#2ecc40";

    // Create script element
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://script.epsilla.com/epsilla.js";

    // Add script to document head
    document.head.appendChild(script);

    // @ts-expect-error - Window property not defined in TypeScript
    // Initialize Epsilla function
    window.Epsilla =
      // @ts-expect-error - Window property not defined in TypeScript
      window.Epsilla ||
      function (...args: unknown[]) {
        // @ts-expect-error - Window property not defined in TypeScript
        (window.Epsilla.q = window.Epsilla.q || []).push(args);
      };

    // Clean up function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Clean up global variables

      // @ts-expect-error - Window property not defined in TypeScript
      delete window.Epsilla;
      // @ts-expect-error - Window property not defined in TypeScript
      delete window.AppUrl;
      // @ts-expect-error - Window property not defined in TypeScript
      delete window.themeColor;
    };
  }, []);

  return <></>;
};

export default EpsillaChatWidget;
