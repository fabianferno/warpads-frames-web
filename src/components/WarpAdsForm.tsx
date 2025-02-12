import React, { useEffect, useState } from 'react';
import { useProfile } from "@farcaster/auth-kit";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { Input } from "./ui/Input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Sparkles, Link as LinkIcon, Copy } from 'lucide-react';
import { useToast } from "./ui/use-toast";

const WarpAdsForm = ({ fid }: { fid: number }) => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [warpAdsUrl, setWarpAdsUrl] = useState<string | null>(null);
  const {
    isAuthenticated,
    profile: { username },
  } = useProfile();
  const account = useAccount();

  useEffect(() => {
    if (!account?.address) return;
    if (!url) return;
    // const encodedUrl = btoa(JSON.stringify({ url, address: account?.address }));
    setWarpAdsUrl(`https://warpads-backend.vercel.app?url=${url}`);
  }, [url]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-black/80">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/90 via-white/95 to-purple-50/90 dark:from-violet-950/90 dark:via-black/95 dark:to-purple-950/90" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/30 dark:bg-violet-800/30 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="relative z-10">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-900/50 rounded-xl">
                <Sparkles className="w-6 h-6 text-violet-500 dark:text-violet-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Generate WarpAds URL
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your URL to generate a WarpAds frame link
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-violet-700 dark:text-violet-300">
                  <LinkIcon className="w-5 h-5" />
                  <span>Target URL</span>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="h-12 text-lg border-2 border-violet-200 dark:border-violet-800 focus-visible:ring-violet-500 bg-white/50 dark:bg-black/50"
                      placeholder="Enter your target URL"
                    />
                  </div>
                </div>
              </div>
              {warpAdsUrl && username && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-500/20 dark:to-indigo-500/20"
                >
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    Hey @{username}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-3">
                    This is your WarpAds URL for the frame:
                  </p>
                  <div className="relative p-4 rounded-lg bg-white/50 dark:bg-black/50 border border-violet-500/20">
                    <p className="text-violet-600 dark:text-violet-400 break-all font-mono text-sm pr-10">
                      {warpAdsUrl}
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(warpAdsUrl);
                        toast({
                          title: "Copied to clipboard",
                          description: "The WarpAds URL has been copied to your clipboard",
                          duration: 3000,
                        });
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-violet-100 dark:hover:bg-violet-900/50 rounded-lg transition-colors"
                    >
                      <Copy className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="pt-4">
                <button className="group relative w-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
                  <div className="relative w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl hover:from-violet-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-violet-500/25 flex items-center justify-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Generate WarpAds URL
                  </div>
                </button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default WarpAdsForm;
