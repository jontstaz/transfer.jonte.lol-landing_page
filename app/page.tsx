"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Database, Clock, Tag, Lock, Upload, Zap, Globe, ArrowRight, Copy, Check } from "lucide-react"
import { useState } from "react"

export default function TransferLanding() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

  const copyToClipboard = (text: string, command: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCommand(command)
    setTimeout(() => setCopiedCommand(null), 2000)
  }

  const features = [
    {
      icon: Terminal,
      title: "Made for use with shell",
      description: "Seamlessly integrate with your command line workflow",
    },
    {
      icon: Upload,
      title: "Share files with a URL",
      description: "Get instant shareable links for your uploads",
    },
    {
      icon: Database,
      title: "Unlimited upload",
      description: "No restrictions on file size or upload frequency",
    },
    {
      icon: Clock,
      title: "Files stored forever",
      description: "Your files remain accessible indefinitely",
    },
    {
      icon: Tag,
      title: "For free",
      description: "Complete file sharing solution at no cost",
    },
    {
      icon: Lock,
      title: "Encrypt your files",
      description: "End-to-end encryption for maximum security",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800/50 backdrop-blur-sm bg-gray-900/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                transfer.jonte.lol
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#examples" className="text-gray-300 hover:text-white transition-colors">
                Sample use cases
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Contact us
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20">
            <Zap className="w-3 h-3 mr-1" />
            Fast & Secure File Sharing
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
            Easy file sharing from the{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              command line
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Upload, share, and manage your files with simple commands. Secure, fast, and completely free.
          </p>

          {/* Terminal Demo */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50 flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-400 ml-4">terminal</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-4">
                  <div className="space-y-2">
                    <div className="text-blue-400"># Upload using cURL</div>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded p-3 group">
                      <span className="text-green-400">
                        $ curl --upload-file ./hello.txt https://transfer.jonte.lol/hello.txt
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() =>
                          copyToClipboard("curl --upload-file ./hello.txt https://transfer.jonte.lol/hello.txt", "curl")
                        }
                      >
                        {copiedCommand === "curl" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="text-gray-400">https://transfer.jonte.lol/aBcDeFgH/hello.txt</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-blue-400"># Using the shell function</div>
                    <div className="flex items-center justify-between bg-gray-800/50 rounded p-3 group">
                      <span className="text-green-400">$ transfer hello.txt</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => copyToClipboard("transfer hello.txt", "transfer")}
                      >
                        {copiedCommand === "transfer" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                    <div className="text-purple-400">################################################## 100.0%</div>
                    <div className="text-gray-400">https://transfer.jonte.lol/aBcDeFgH/hello.txt</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-blue-400"># Upload from web</div>
                    <div className="text-gray-300">
                      Drag your files here, or{" "}
                      <span className="text-blue-400 underline cursor-pointer">click to browse</span>.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                transfer.jonte.lol
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Built for developers, by developers. Simple, secure, and reliable file sharing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800/30 border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Preview your files in the browser!</h2>
            <p className="text-gray-400 text-lg">
              No downloads required. View images, documents, and more directly in your browser with our built-in file
              preview system.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Use Cases */}
      <section id="examples" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sample use cases</h2>
            <p className="text-gray-400 text-lg">Get started with these common scenarios</p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
                  <span className="text-sm text-gray-400">How to upload</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-blue-400"># Uploading is easy</div>
                  <div className="text-green-400">
                    $ curl --upload-file ./hello.txt https://transfer.jonte.lol/hello.txt
                  </div>
                  <div className="text-gray-400">https://transfer.jonte.lol/aBcDeFgH/hello.txt</div>
                  <div className="text-blue-400"># Download anywhere</div>
                  <div className="text-green-400">
                    $ curl https://transfer.jonte.lol/aBcDeFgH/hello.txt -o hello.txt
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="bg-gray-800/50 px-4 py-2 border-b border-gray-700/50">
                  <span className="text-sm text-gray-400">Add shell function to .bashrc or .zshrc</span>
                </div>
                <div className="p-6 font-mono text-sm space-y-2">
                  <div className="text-green-400">transfer() {"{"}</div>
                  <div className="text-gray-300 ml-4">
                    if [ $# -eq 0 ]; then echo "No arguments specified. Usage:\necho transfer /tmp/test.md\ncat
                    /tmp/test.md | transfer test.md"; return 1; fi
                  </div>
                  <div className="text-gray-300 ml-4">
                    tmpfile=$( mktemp -t transferXXX ); if tty -s; then basefile=$(basename "$1" | sed -e
                    's/[^a-zA-Z0-9._-]//g'); curl --progress-bar --upload-file "$1"
                    "https://transfer.jonte.lol/$basefile" &gt;&gt; $tmpfile; else curl --progress-bar --upload-file "-"
                    "https://transfer.jonte.lol/$1" &gt;&gt; $tmpfile ; fi; cat $tmpfile; rm -f $tmpfile;
                  </div>
                  <div className="text-green-400">{"}"}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
              More examples
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-8 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <Upload className="w-3 h-3 text-white" />
              </div>
              <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                transfer.jonte.lol
              </span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800/50 text-center text-sm text-gray-500">
            © 2024 transfer.jonte.lol. Made with ❤️ for developers.
          </div>
        </div>
      </footer>
    </div>
  )
}
