"use client";
import Html5QrcodePlugin from "@/components/barCode/Scanner";
import React from "react";

const ScanPage = () => {
  //@ts-expect-error : Type mismatch
  const onNewScanResult = (decodedText, decodedResult) => {
    // Print the scanned data to the console
    console.log("Scanned Data:", decodedText);
    console.log("Full Scan Result:", decodedResult);
  };
  return (
    <div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
};

export default ScanPage;
