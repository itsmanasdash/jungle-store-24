"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Define interface for props
interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number | { width: number; height: number };
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string, decodedResult: unknown) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: Html5QrcodePluginProps) => {
  // Create the config object with default values for required properties
  const config = {
    fps: props.fps || 10, // Default value for required fps property
  };

  // Add optional properties only if they exist in props
  if (props.qrbox !== undefined) {
    Object.assign(config, { qrbox: props.qrbox });
  }
  if (props.aspectRatio !== undefined) {
    Object.assign(config, { aspectRatio: props.aspectRatio });
  }
  if (props.disableFlip !== undefined) {
    Object.assign(config, { disableFlip: props.disableFlip });
  }

  return config;
};

const Html5QrcodePlugin = (props: Html5QrcodePluginProps) => {
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Success callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [props]);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
