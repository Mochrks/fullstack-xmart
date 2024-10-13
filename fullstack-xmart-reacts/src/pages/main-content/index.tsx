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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import QRCode from "react-qr-code";
import { motion, AnimatePresence } from "framer-motion";
import { getCustomers, getCustomerById } from "../../service/customerService";
import { OctagonAlert } from 'lucide-react';

function MainContent() {
  const [showScanner, setShowScanner] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [progress, setProgress] = useState(60);
  const [allCustomers, setAllCustomers] = useState([]);
  const [getClient, setClient] = useState(null);
  const [result, setResult] = useState("No result");
  const qrCodeScannerRef = useRef(null);
  const scannerInstance = useRef(null);
  const navigate = useNavigate();

  // Fetch all customers 
  const fetchAllCustomers = async () => {
    try {
      const response = await getCustomers();
      setAllCustomers(response.data);
      console.log("All customers fetched:", response.data);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  //fetch a customer by QR code
  const fetchCustomerByQRCode = async (qrcode) => {
    try {
      const response = await getCustomerById(qrcode);
      setClient(response.data);
      console.log("Customer fetched by QR code:", response.data);
    } catch (error) {
      console.error("Error fetching customer by QR code:", error);
    }
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  useEffect(() => {
    if (result && result !== "No result") {
      console.log("QR code scan result:", result);
      fetchCustomerByQRCode(result);
    }
  }, [result]);

  const toggleScanner = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowScanner(!showScanner);
      setShowLoading(false);
    }, 2000);
  };

  const onScanSuccess = (decodedText) => {
    setResult(decodedText);
    toggleScanner();
  };

  // const onScanError = (errorMessage) => {
  //   console.error("QR scan error:", errorMessage);
  // };

  useEffect(() => {
    if (qrCodeScannerRef.current && !scannerInstance.current) {
      scannerInstance.current = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scannerInstance.current.render(onScanSuccess);

      return () => {
        // Clear the scanner only when the component is unmounted
        scannerInstance.current.clear().catch((error) => {
          console.error("Failed to clear scanner. ", error);
        });
        scannerInstance.current = null;
      };
    }
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

  const handleTryScan = () => {
    window.location.reload();
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
                    {getClient ? (
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
                    ) : (
                      <div className="flex items-center">
                        <div className="flex-none">
                          <OctagonAlert className="w-14 h-14 text-red-500" />
                        </div>
                        <div className="flex-grow ml-4">
                          <p className="text-red-500 text-lg font-bold">
                            Data not found
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {getClient ? (<Button onClick={handleStartShopping}>
                        Start Shopping
                      </Button>) : (
                        <Button onClick={handleTryScan}>
                          Scan Again
                        </Button>
                      )}
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
