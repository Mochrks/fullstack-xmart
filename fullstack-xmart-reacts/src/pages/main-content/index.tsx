import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";

function MainContent() {
  const [showScanner, setShowScanner] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [progress, setProgress] = React.useState(2);
  const navigate = useNavigate();
  const [getClient, setClient] = useState(null);

  const toggleScanner = () => {
    setShowLoading(true);

    setTimeout(() => {
      setShowScanner(!showScanner);
      setShowLoading(false);
    }, 2000);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartShopping = () => {
    setShowLoading(true);
    setShowStart(true);

    setTimeout(() => {
      setShowScanner(!showScanner);
      setShowLoading(false);
      navigate("/shop");
    }, 2000);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers/{$qrcode}")
      .then((response) => {
        setClient(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item lists:", error);
      });
  }, []);

  const [result, setResult] = useState("No result");
  const qrCodeScannerRef = useRef(null);

  useEffect(() => {
    if (qrCodeScannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 20, qrbox: 200 },
        false
      );

      scanner.render(onScanSuccess, onScanError);

      return () => {
        scanner.clear().catch((error) => {
          console.error("Failed to clear scanner. ", error);
        });
      };
    }
  }, []);

  const onScanSuccess = (decodedText, decodedResult) => {
    if (decodedText === "{$qrcode}") {
      toggleScanner();
    } else {
      setResult(decodedText);
    }
  };

  const onScanError = (errorMessage) => {
    console.error(errorMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container"
    >
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AnimatePresence mode="wait">
            {showScanner ? (
              <motion.div
                key="scanner"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="container"
              >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl py-10">
                  Scan here to continue shopping
                </h1>
                <Card className="w-full shadow-lg" style={{ backgroundColor: "#fbfbfb" }}>
                  <CardHeader>
                    <CardTitle>Start Now!</CardTitle>
                    <CardDescription>
                      Please scan before shopping!!
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <QrCodeIcon className="w-14 h-14 text-black" />
                    </motion.div>
                    <div className="flex items-center justify-center ">
                      <div
                        id="qr-reader"
                        ref={qrCodeScannerRef}
                        style={{ width: "300px" }}
                      ></div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button>{result}</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="info"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="container"
              >
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                    <CardDescription>
                      Detail information customer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {getClient && (
                      <div className="flex items-center">
                        <div className="flex-none">
                          <QRCode
                            value={getClient.qrcode}
                            className="object-cover w-[150px] h-[150px] rounded-md"
                          />
                        </div>
                        <div className="flex-grow ml-4">
                          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            {getClient.nama}
                          </h4>
                          <p className="leading-7 [&:not(:first-child)]:mt-6">
                            {getClient.qrcode}
                          </p>
                          <Badge>{getClient.wallet}</Badge>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={handleStartShopping}>
                        Start Shopping
                      </Button>
                    </motion.div>
                  </CardFooter>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          {showLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Progress value={progress} className="w-[100%] h-[5px]" />
            </motion.div>
          )}

          {showStart && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="mt-2"
            >
              <Alert className="bg-gray-200">
                <AlertTitle>Scan Process</AlertTitle>
                <AlertDescription>
                  The QR code is currently being scanned to facilitate the
                  shopping process.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default MainContent;