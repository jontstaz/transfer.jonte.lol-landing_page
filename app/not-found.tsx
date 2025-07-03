"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Home, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleGoBack = () => {
    if (isClient && window.history.length > 1) {
      window.history.back()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transfer
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="mb-8">
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 bg-clip-text leading-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                  <Search className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              File Not Found
            </h2>
            <p className="text-xl text-gray-400 mb-6 max-w-lg mx-auto">
              The file you're looking for might have been moved, deleted, or the link might be incorrect.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-lg mx-auto">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Upload New File</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Share a new file securely
                </p>
                <Link href="/upload">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 w-full">
                    Upload
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Go Home</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Return to the main page
                </p>
                <Link href="/">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full">
                    Home
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Common Reasons */}
          <Card className="bg-gray-800/50 border-gray-700 max-w-lg mx-auto">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 text-center">Common Reasons</h3>
              <ul className="text-sm text-gray-400 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  The file has expired (files are deleted after 7 days)
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  The download limit has been reached
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  The file was manually deleted by the uploader
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  There's a typo in the URL
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Back Button - Only show on client side */}
          {isClient && (
            <div className="mt-8">
              <Button 
                variant="ghost" 
                onClick={handleGoBack}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 