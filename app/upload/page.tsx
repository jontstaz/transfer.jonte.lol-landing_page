"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Terminal, Copy, Check, ArrowLeft, FileText, Image, Video, Music, Archive } from "lucide-react"
import Link from "next/link"

interface UploadFile {
  file: File
  progress: number
  url?: string
  status: 'uploading' | 'completed' | 'error'
}

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [copied, setCopied] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (files: File[]) => {
    const newUploads = files.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }))
    
    setUploadFiles(prev => [...prev, ...newUploads])
    
    // Simulate upload progress
    newUploads.forEach((upload, index) => {
      simulateUpload(uploadFiles.length + index, upload.file)
    })
  }

  const simulateUpload = (index: number, file: File) => {
    const interval = setInterval(() => {
      setUploadFiles(prev => {
        const updated = [...prev]
        if (updated[index]) {
          updated[index].progress += Math.random() * 20
          if (updated[index].progress >= 100) {
            updated[index].progress = 100
            updated[index].status = 'completed'
            updated[index].url = `https://transfer.jonte.lol/download?token=${generateToken()}&filename=${encodeURIComponent(file.name)}`
            clearInterval(interval)
          }
        }
        return updated
      })
    }, 200)
  }

  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15)
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 2000)
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return Image
    if (['mp4', 'avi', 'mov', 'webm'].includes(ext || '')) return Video
    if (['mp3', 'wav', 'flac', 'ogg'].includes(ext || '')) return Music
    if (['zip', 'tar', 'gz', 'rar'].includes(ext || '')) return Archive
    return FileText
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Upload Your Files
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Secure, fast file sharing with end-to-end encryption. Files up to 10GB supported.
          </p>
        </div>

        <Tabs defaultValue="web" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 border-gray-700">
            <TabsTrigger value="web" className="data-[state=active]:bg-gray-700">
              Web Upload
            </TabsTrigger>
            <TabsTrigger value="cli" className="data-[state=active]:bg-gray-700">
              Command Line
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="web" className="mt-8">
            {/* Upload Area */}
            <Card className="bg-gray-800/50 border-gray-700 mb-8">
              <CardContent className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-500/10' 
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Upload files up to 10GB • Automatically encrypted • No registration required
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload Progress */}
            {uploadFiles.length > 0 && (
              <Card className="bg-gray-800/50 border-gray-700 mb-8">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Progress
                  </h3>
                  <div className="space-y-4">
                    {uploadFiles.map((upload, index) => {
                      const IconComponent = getFileIcon(upload.file.name)
                      return (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
                          <IconComponent className="w-8 h-8 text-blue-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm font-medium truncate">{upload.file.name}</p>
                              <Badge variant={upload.status === 'completed' ? 'default' : 'secondary'}>
                                {upload.status === 'completed' ? 'Complete' : 'Uploading'}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Progress value={upload.progress} className="flex-1 h-2" />
                              <span className="text-xs text-gray-400 min-w-0">
                                {Math.round(upload.progress)}%
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatFileSize(upload.file.size)}
                            </p>
                            {upload.url && upload.status === 'completed' && (
                              <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-gray-400 mb-1">Download URL:</p>
                                    <p className="text-sm font-mono text-blue-400 truncate">{upload.url}</p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => copyToClipboard(upload.url!)}
                                    className="ml-2 flex-shrink-0"
                                  >
                                    {copied === upload.url ? (
                                      <Check className="w-4 h-4 text-green-400" />
                                    ) : (
                                      <Copy className="w-4 h-4" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cli" className="mt-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Terminal className="w-5 h-5 mr-2" />
                  <h3 className="text-lg font-semibold">Command Line Usage</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Basic Upload with cURL</h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-gray-400"># Upload a file</div>
                      <div className="text-blue-400">$ curl --upload-file ./hello.txt https://transfer.jonte.lol/hello.txt</div>
                      <div className="text-green-400">https://transfer.jonte.lol/abc123/hello.txt</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Shell Function (Add to ~/.bashrc or ~/.zshrc)</h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <div className="text-gray-400"># Add this function to your shell config</div>
                      <div className="text-blue-400 whitespace-pre-wrap break-all">
{`transfer(){ if [ $# -eq 0 ];then echo "No arguments specified.\\nUsage:\\n  transfer <file|directory>\\n  ... | transfer <file_name>">&2;return 1;fi;if tty -s;then file="$1";file_name=$(basename "$file");if [ ! -e "$file" ];then echo "$file: No such file or directory">&2;return 1;fi;if [ -d "$file" ];then file_name="$file_name.zip" ,;(cd "$file"&&zip -r -q - .)|curl --progress-bar --upload-file "-" "https://transfer.jonte.lol/$file_name"|tee /dev/null,;else cat "$file"|curl --progress-bar --upload-file "-" "https://transfer.jonte.lol/$file_name"|tee /dev/null;fi;else file_name=$1;curl --progress-bar --upload-file "-" "https://transfer.jonte.lol/$file_name"|tee /dev/null;fi;}`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Advanced Options</h4>
                    <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                      <div className="text-gray-400"># Set download limits and expiry</div>
                      <div className="text-blue-400">$ curl -H "Max-Downloads: 1" -H "Max-Days: 5" --upload-file ./hello.txt https://transfer.jonte.lol/hello.txt</div>
                      <br />
                      <div className="text-gray-400"># Multiple files</div>
                      <div className="text-blue-400">$ curl -F filedata=@/tmp/hello.txt -F filedata=@/tmp/world.txt https://transfer.jonte.lol/</div>
                      <br />
                      <div className="text-gray-400"># Encrypt before upload</div>
                      <div className="text-blue-400">$ cat secret.txt | gpg -ac -o- | curl -X PUT --upload-file "-" https://transfer.jonte.lol/secret.txt</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 