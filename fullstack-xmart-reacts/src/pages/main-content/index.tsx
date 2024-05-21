import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { QrCodeIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import QRCode from "react-qr-code";

function MainContent() {
  const [showScanner, setShowScanner] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showStart, setShowStart] = useState(false);
  const [progress, setProgress] = React.useState(2);
  const navigate = useNavigate();
  const [getClient, setClient] = useState(null);
  const [scanResult, setScanResult] = useState();
  const [customer, setCustomer] = useState();

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
      .get(
        "http://localhost:8080/api/customers/a2c90816-de95-44f5-8dec-ebe3e300d8a7"
      )
      .then((response) => {
        setClient(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching item lists:", error);
      });
  }, []);

  // const startScanner = () => {
  //   const scanner = new Html5QrcodeScanner(
  //     "reader",
  //     {
  //       qrbox: {
  //         width: 500,
  //         height: 500,
  //       },
  //       fps: 1,
  //       disableFlip: false,
  //       formatsToSupport: [
  //         Html5QrcodeSupportedFormats.QR_CODE,
  //         Html5QrcodeSupportedFormats.CODE_128,
  //       ],
  //     },
  //     false
  //   );
  //   scanner.render(
  //     async (result) => {
  //       const customerExist = await checkCustomer(result);
  //       if (customerExist) {
  //         setCustomer({
  //           nama: customerExist.nama,
  //           wallet: customerExist.wallet,
  //           qrCode: customerExist.qrCode,
  //         });
  //       } else {
  //         setCustomer();
  //       }
  //       setScanResult(result);
  //       scanner.clear();
  //     },
  //     (error) => {
  //       console.warn(error);
  //     }
  //   );
  // };

  // const checkCustomer = async (qrResult) => {
  //   const customerExist = await getCustomerById(qrResult);
  //   if (customerExist) {
  //     return customerExist.data;
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <>
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            {showScanner ? (
              <>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl py-10">
                  Scan here to continue shopping
                </h1>
                <Card
                  className="w-[450px]"
                  style={{ backgroundColor: "#fbfbfb" }}
                >
                  {showLoading ? (
                    <div className="flex  text-center items-center justify-center">
                      <img
                        src="../src/assets/img/barcode.gif"
                        alt="Qrcode"
                        className="object-cover w-[280px] h-[280px] rounded-md "
                      />
                    </div>
                  ) : (
                    <>
                      <CardHeader>
                        <CardTitle>Start Now!</CardTitle>
                        <CardDescription>
                          Please scan before shopping!!
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center ">
                          <QrCodeIcon className="w-14 h-14 text-black" />
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button onClick={toggleScanner}>Start Scanner</Button>
                      </CardFooter>
                    </>
                  )}
                </Card>
              </>
            ) : (
              <>
                <Card className="w-[450px]">
                  <CardHeader>
                    <CardTitle>Information</CardTitle>
                    <CardDescription>
                      Detail information customer"
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
                    <Button onClick={handleStartShopping}>
                      Start Shopping
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}
            {showLoading && (
              <div>
                <Progress value={progress} className="w-[100%] h-[5px]" />
              </div>
            )}

            {showStart && (
              <div className="mt-2">
                <Alert className="bg-gray-200">
                  <AlertTitle>Scan Process</AlertTitle>
                  <AlertDescription>
                    The QR code is currently being scanned to facilitate the
                    shopping process.
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
}

export default MainContent;
