
import React, { useState, useEffect, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Plus, Minus, Trash2, BellIcon, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sidebar } from './Sidebar'
import { ArrowsPointingInIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { getProductById } from '@/service/productService'
import { Badge } from '../ui/badge'
import { addTransaction } from '@/service/transactionService'


type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

export default function Dashboard() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [qrValue, setQrValue] = useState('')
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const [showDetail, setShowDetail] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {

    const storedCustomerData = localStorage.getItem('customerData');
    if (storedCustomerData) {
      setCustomerInfo(JSON.parse(storedCustomerData));
    }
  }, []);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner(
      'reader',
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    )
    scannerRef.current.render(onScanSuccess, onScanFailure)

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear()
      }
    }
  }, [])

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
    setQrValue(JSON.stringify(cart))
  }, [cart])

  const onScanSuccess = async (decodedText: string) => {
    try {
      const response = await getProductById(decodedText);
      const product = response.data;

      if (product) {
        addToCart(
          product.rfid,
          product.namaBarang,
          product.hargaSatuan
        );
      } else {
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error fetching product details');
    }
  }

  const onScanFailure = (error: any) => {
    console.warn(`Code scan error = ${error}`)
  }

  const addToCart = (id: string, name: string, price: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { id, name, price, quantity: 1 }]
      }
    })
  }


  const updateQuantity = (id: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter((item) => item.quantity > 0)
    )
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const handleProcess = () => {
    setIsLoading(true);
    const orderData = cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));


    const orderSummary = {
      total,
      tax: total * 0.1,
      grandTotal: total * 1.1,
      items: orderData
    };

    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    setTimeout(() => {
      setIsLoading(false);
      setShowDetail(true);
    }, 5000);
  }

  const handleSaveTransactions = async () => {
    try {

      const qrcodeUser = localStorage.getItem('qrcodeUser');

      if (!qrcodeUser) {
        throw new Error('QR Code user not found');
      }

      for (const item of cart) {
        const transactionData = {
          qrcode: qrcodeUser,
          rfid: item.id,
          hargaSatuan: item.price,
          jumlah: item.quantity,
          waktu: new Date().toISOString()
        };

        await addTransaction(transactionData);
      }
      setIsAlert(true);
      setShowDetail(false);
      setCart([]);
    } catch (error) {
      console.error("Error saving transactions:", error);
    }
  };

  return (
    <div className="bg-neutral-100">
      <div className="flex flex-row w-full h-full mx-auto gap-5 p-5 ">
        {/* Sidebar */}
        <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] ">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full h-full items-center justify-center mx-auto">
          <div className="flex flex-row w-full h-full gap-3 p-5 m-1 rounded-xl shadow-blue-gray-900/5 bg-slate-700 ">
            <a href="#">
              <MagnifyingGlassIcon className="text-white w-5 h-5" />
            </a>
            <a href="#">
              <ArrowsPointingInIcon className="text-white w-5 h-5" />
            </a>
            <a href="#">
              <BellIcon className="text-white w-5 h-5" />
            </a>
          </div>
          <div className="flex flex-row w-full h-full items-center justify-center mx-auto mt-14">
            <div className="container mx-auto p-4 space-y-8 ">
              <Card className='shadow-md'>
                <CardHeader>
                  <CardTitle>Barcode Scanner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div id="reader" className="w-full max-w-md mx-auto"></div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className='shadow-md'>
                  <CardHeader>
                    <CardTitle>Cart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {cart.length === 0 ? (
                      <p>Your cart is empty. Start scanning items!</p>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-gray-500">Rp {item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, -1)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) - item.quantity)}
                                className="w-16 text-center"
                              />
                              <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>


                {/* order summary */}
                <Card className='shadow-md'>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>Rp, {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%)</span>
                        <span>Rp, {(total * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>Rp, {(total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" onClick={handleProcess}>Proceed to Checkout</Button>
                  </CardContent>
                </Card>
              </div>


              {/* Detail transaction */}
              {isLoading && (
                <div className="flex flex-row w-full h-full items-center justify-center mx-auto mt-14">
                  <div className="rounded-2xl p-5 bg-white shadow-xl">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                      <p className="text-lg font-semibold">Processing transaction...</p>
                    </div>
                  </div>
                </div>
              )}

              {!isLoading && showDetail && (
                <div className="flex flex-row w-full  h-full items-center justify-center mx-auto mt-14">
                  <div className=" rounded-2xl p-5 overflow-auto bg-white shadow-xl ">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                      <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                        Detail Transaction
                      </h1>
                    </div>

                    <div className="flex flex-row flex-wrap w-full gap-5 ">
                      <div>
                        <div className="flex items-center justify-center mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-gray-200 mt-6">
                          <div className="flex-grow ml-4 ">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                              Customer : {customerInfo?.nama || 'Loading...'}
                            </h4>
                            <p>{customerInfo?.qrcode || 'Loading...'}</p>
                            <p>
                              Wallet : <Badge>{customerInfo?.wallet || 'Loading...'}</Badge>
                            </p>
                          </div>
                          <div className="flex-grow text-right">
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                              Total Payment : Rp {(total * 1.1).toLocaleString('id-ID', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </h4>
                          </div>
                        </div>
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                          <div className="bg-white">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Rfid</TableHead>
                                  <TableHead>Name Product</TableHead>
                                  <TableHead>Price</TableHead>
                                  <TableHead>Qty</TableHead>
                                  <TableHead className="text-right">Date</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {cart.map((item, index) => (
                                  <TableRow
                                    key={item.id}
                                    className={index % 2 === 0 ? "bg-blue-100" : ""}
                                  >
                                    <TableCell className="font-medium">
                                      {item.id}
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>Rp. {item.price.toLocaleString()}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-right">
                                      {new Date().toLocaleDateString()}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                            <div className="flex item-center justify-center pt-10">
                              <Button onClick={() => {
                                handleSaveTransactions();
                                setShowDetail(false);
                                setCart([]);
                              }}>
                                Save transaction
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* alert */}
            {isAlert &&
              <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
                <div className="bg-green-50 text-green-800 border-l-4 border-green-400 p-4 rounded-md shadow-lg max-w-sm w-full flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-green-400 mr-3" />
                    <p className="font-medium">Save Transaction successfully</p>
                  </div>
                  <button
                    onClick={() => setIsAlert(false)}
                    className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded-full p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}