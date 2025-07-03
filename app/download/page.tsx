"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Download, 
  Trash2, 
  QrCode, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Archive,
  Shield,
  ArrowLeft,
  Copy,
  Check,
  AlertTriangle
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

interface FileInfo {
  filename: string
  contentType: string
  contentLength: number
  uploadDate: string
  downloads: number
  maxDownloads?: number
  expiryDate?: string
  qrCode: string
}

export default function DownloadPage() {
  const searchParams = useSearchParams()
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null)
  const [deleteToken, setDeleteToken] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Extract token and filename from URL parameters or pathname
  const token = searchParams.get('token') || extractFromPath().token
  const filename = searchParams.get('filename') || extractFromPath().filename

  function extractFromPath() {
    if (typeof window === 'undefined') return { token: '', filename: '' }
    
    const path = window.location.pathname
    const hash = window.location.hash
    
    // Try to extract from hash first (for #/token/filename format)
    if (hash.includes('/')) {
      const parts = hash.substring(1).split('/')
      if (parts.length >= 2) {
        return { token: parts[0], filename: parts[1] }
      }
    }
    
    // Try to extract from pathname
    const pathParts = path.split('/').filter(Boolean)
    if (pathParts.length >= 3 && pathParts[0] === 'download') {
      return { token: pathParts[1], filename: pathParts[2] }
    }
    
    return { token: '', filename: '' }
  }

  useEffect(() => {
    if (!token || !filename) {
      setError("Invalid download link. Token and filename are required.")
      setIsLoading(false)
      return
    }

    // Simulate fetching file info
    const fetchFileInfo = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockFileInfo: FileInfo = {
          filename: decodeURIComponent(filename),
          contentType: getContentType(filename),
          contentLength: Math.floor(Math.random() * 50000000) + 1000000, // Random size between 1MB-50MB
          uploadDate: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Random date within last 7 days
          downloads: Math.floor(Math.random() * 10),
          maxDownloads: Math.random() > 0.5 ? Math.floor(Math.random() * 10) + 1 : undefined,
          expiryDate: new Date(Date.now() + Math.random() * 86400000 * 7).toISOString(), // Random expiry within next 7 days
          qrCode: generateQRCode() // Mock QR code
        }
        
        setFileInfo(mockFileInfo)
      } catch (err) {
        setError("Failed to load file information")
      } finally {
        setIsLoading(false)
      }
    }

    fetchFileInfo()
  }, [token, filename])

  const getContentType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'webp':
        return 'image/' + ext
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'webm':
        return 'video/' + ext
      case 'mp3':
      case 'wav':
      case 'flac':
      case 'ogg':
        return 'audio/' + ext
      case 'zip':
      case 'tar':
      case 'gz':
      case 'rar':
        return 'application/' + ext
      case 'pdf':
        return 'application/pdf'
      case 'txt':
        return 'text/plain'
      default:
        return 'application/octet-stream'
    }
  }

  const getFileIcon = (contentType: string) => {
    if (contentType.startsWith('image/')) return ImageIcon
    if (contentType.startsWith('video/')) return Video
    if (contentType.startsWith('audio/')) return Music
    if (contentType.includes('zip') || contentType.includes('tar') || contentType.includes('rar')) return Archive
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const generateQRCode = () => {
    // In a real app, this would generate an actual QR code
    return `data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="white"/>
        <rect x="20" y="20" width="20" height="20" fill="black"/>
        <rect x="60" y="20" width="20" height="20" fill="black"/>
        <rect x="100" y="20" width="20" height="20" fill="black"/>
        <rect x="140" y="20" width="20" height="20" fill="black"/>
        <rect x="20" y="60" width="20" height="20" fill="black"/>
        <rect x="140" y="60" width="20" height="20" fill="black"/>
        <rect x="20" y="100" width="20" height="20" fill="black"/>
        <rect x="60" y="100" width="20" height="20" fill="black"/>
        <rect x="100" y="100" width="20" height="20" fill="black"/>
        <rect x="140" y="100" width="20" height="20" fill="black"/>
        <rect x="20" y="140" width="20" height="20" fill="black"/>
        <rect x="60" y="140" width="20" height="20" fill="black"/>
        <rect x="100" y="140" width="20" height="20" fill="black"/>
        <rect x="140" y="140" width="20" height="20" fill="black"/>
        <text x="100" y="190" text-anchor="middle" fill="black" font-size="12">QR Code</text>
      </svg>
    `)}`
  }

  const copyToClipboard = async () => {
    const url = `${window.location.origin}/download?token=${token}&filename=${encodeURIComponent(filename)}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    // In a real app, this would trigger the actual download
    const downloadUrl = `${window.location.origin}/api/download/${token}/${filename}`
    window.open(downloadUrl, '_blank')
  }

  const handleDelete = async () => {
    // In a real app, this would make an API call to delete the file
    if (deleteToken.trim()) {
      alert('File deletion requested (demo)')
      setShowDeleteModal(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading file information...</p>
        </div>
      </div>
    )
  }

  if (error || !fileInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">File Not Found</h1>
          <p className="text-gray-400 mb-6">{error || "The requested file could not be found or has expired."}</p>
          <p className="text-sm text-gray-500 mb-6">
            Make sure you have the correct download link with token and filename parameters.
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const FileIconComponent = getFileIcon(fileInfo.contentType)
  const downloadUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/download?token=${token}&filename=${encodeURIComponent(filename)}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Transfer
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <FileIconComponent className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            {fileInfo.filename}
          </h1>
          <p className="text-gray-400">Ready for download</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* File Information */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileIconComponent className="w-5 h-5 mr-2" />
                File Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Type:</span>
                <Badge variant="secondary">{fileInfo.contentType}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Size:</span>
                <span className="font-mono">{formatFileSize(fileInfo.contentLength)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Uploaded:</span>
                <span className="text-sm">{formatDate(fileInfo.uploadDate)}</span>
              </div>
              {fileInfo.expiryDate && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Expires:</span>
                  <span className="text-sm text-orange-400">{formatDate(fileInfo.expiryDate)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Downloads:</span>
                <span>
                  {fileInfo.downloads}
                  {fileInfo.maxDownloads && ` / ${fileInfo.maxDownloads}`}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Download Actions */}
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Download Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download File
              </Button>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Share this link:</p>
                <div className="flex gap-2">
                  <Input 
                    value={downloadUrl}
                    readOnly
                    className="bg-gray-700 border-gray-600 text-sm font-mono"
                  />
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline"
                    className="flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <DialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    size="lg"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete File
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Delete File</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-gray-400">
                      Enter the deletion token to permanently delete this file. This action cannot be undone.
                    </p>
                    <Input
                      placeholder="Deletion token"
                      value={deleteToken}
                      onChange={(e) => setDeleteToken(e.target.value)}
                      className="bg-gray-700 border-gray-600"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button variant="destructive" onClick={handleDelete} className="flex-1">
                        Delete
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        {/* QR Code */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">QR Code</h3>
            </div>
            <div className="inline-block p-4 bg-white rounded-lg">
              <img 
                src={fileInfo.qrCode} 
                alt="QR Code for download"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-sm text-gray-400 mt-4">
              Scan with your phone to download
            </p>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-gray-800/50 border-gray-700 mt-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Security & Privacy</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• All files are encrypted during transfer</li>
                  <li>• Files are automatically deleted after download or expiry</li>
                  <li>• No personal information is stored</li>
                  <li>• Download links are unique and cannot be guessed</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 