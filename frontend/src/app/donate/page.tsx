"use client";

import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";

interface PaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const PRESET_AMOUNTS = [100, 500, 1000, 5000, 10000];

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const amount = customAmount ? parseInt(customAmount) : selectedAmount;

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || amount < 10) {
      setError("Minimum donation amount is ₹10");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      // Create order
      const orderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      const order = await orderResponse.json();

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "HypedIn - Support Education",
        description: `Donation of ₹${amount}`,
        order_id: order.id,
        handler: async (response: PaymentResponse) => {
          try {
            // Verify payment
            const verifyResponse = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/verify-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  amount,
                }),
              }
            );

            if (!verifyResponse.ok) {
              throw new Error("Payment verification failed");
            }

            const result = await verifyResponse.json();
            setSuccess(
              `Thank you! Your donation of ₹${amount} has been received successfully.`
            );
            setCustomAmount("");
            setSelectedAmount(500);

            // Optionally redirect after success
            setTimeout(() => {
              window.location.href = "/donate?success=true";
            }, 2000);
          } catch (err) {
            setError(
              err instanceof Error ? err.message : "Payment verification failed"
            );
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const razorpayWindow = window as any;
      const rzp = new razorpayWindow.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-red-500 fill-red-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Make a Difference
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Your donation helps us empower students and communities
          </p>
          <p className="text-gray-500">
            Support education, mentorship, and social initiatives
          </p>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 font-medium">{success}</p>
            </div>
          )}

          {/* Amount Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-4">
              Select Amount or Enter Custom
            </label>

            {/* Preset Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {PRESET_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                    setError("");
                  }}
                  className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                    selectedAmount === amt && !customAmount
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-6">
              <label className="block text-gray-600 text-sm mb-2">
                Custom Amount (₹)
              </label>
              <input
                type="number"
                min="10"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                  setError("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
            </div>

            {/* Display Selected Amount */}
            {amount && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700">
                  <span className="font-semibold">Donation Amount: </span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{amount}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Donate Button */}
          <button
            onClick={handlePayment}
            disabled={!amount || isLoading}
            className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
              !amount || isLoading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
            {isLoading ? "Processing..." : `Donate ₹${amount || 0}`}
          </button>

          {/* Info Text */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Secure payment powered by Razorpay
          </p>
        </div>

        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
            <p className="text-gray-600">Students Helped</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-600">Active Volunteers</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <p className="text-gray-600">Communities Served</p>
          </div>
        </div>
      </div>
    </div>
  );
}
