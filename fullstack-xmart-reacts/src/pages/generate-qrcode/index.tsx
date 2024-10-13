import React, { useState } from "react";
import QRCode from "react-qr-code";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

const GenerateQRCode = () => {
    const [inputValue, setInputValue] = useState("");
    const [showQRCode, setShowQRCode] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    const handleGenerate = () => {
        if (inputValue.trim() === "") {
            setAlertVisible(true);
        } else {
            setShowQRCode(true);
            setAlertVisible(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8"
        >
            <div className="flex flex-col items-center justify-center h-screen">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center">
                            Generate QR Code
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Input
                                type="text"
                                placeholder="Enter ID , QRcode or RFID"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full"
                            />
                            <Button
                                onClick={handleGenerate}
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                            >
                                Generate QR Code
                            </Button>

                            {alertVisible && (
                                <Alert className="mt-4 bg-red-100 border-red-500 text-red-700">
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>Please enter a valid ID, QRcode or RFID</AlertDescription>
                                </Alert>
                            )}

                            {showQRCode && inputValue && (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 120 }}
                                    className="flex justify-center mt-20 p-10"
                                >
                                    <QRCode value={inputValue} size={256} />
                                </motion.div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
};

export default GenerateQRCode;
