import React, { useState } from 'react';
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Loader2, Sparkles, FileText, Tag, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { WARP_ADS_ABI, WARP_ADS_ADDRESS } from "@/lib/constants";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { baseSepolia } from "viem/chains";
import { useAccount } from "wagmi";
import { AdMetadata } from "../app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const WIDTH = 600;
const HEIGHT = 400;
const BOTTOM_HEIGHT = 100;
const ADD_SIZE = 64;
const FONT_SIZE = 16;

export default function BuyAd() {
  const [formData, setFormData] = useState<AdMetadata>({
    title: '',
    description: '',
    logoUrl: 'https://warpads.xyz/android-chrome-512x512.png',
  });
  const [labels, setLabels] = useState<string[]>([]);
  const [currentLabel, setCurrentLabel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const { address } = useAccount();

  const handleAddLabel = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentLabel.trim()) {
      setLabels([...labels, currentLabel.trim()]);
      setCurrentLabel('');
    }
  };

  const handleBuyAd = async () => {
    setIsLoading(true);
    setError(null);

    console.log(labels);
    console.log(formData);

    const ipfsHash = await uploadToIPFS();

    console.log(ipfsHash);

    try {
      const walletClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum!),
        account: address,
      });
      const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(
          `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        ),
      });
      const { request } = await publicClient.simulateContract({
        address: WARP_ADS_ADDRESS as `0x${string}`,
        abi: WARP_ADS_ABI,
        functionName: "createAd",
        args: [JSON.stringify({ title: formData.title, description: formData.description, ipfsHash: ipfsHash }), labels],
        value: BigInt(100000000),
        account: address as `0x${string}`,
      });

      console.log(request);

      const tx = await walletClient.writeContract(request);
      console.log(tx);
      setTxHash(tx);
      setShowPreview(false);
    } catch (err) {
      setError('Transaction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  async function uploadJSONToPinata(jsonData: any) {
    const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const headers = {
      "Content-Type": "application/json",
      pinata_api_key: "2fdfafd0931760b52f2c",
      pinata_secret_api_key:
        "be4da1450a4a5a8855fcddc13f9fac30e1a7e1b0b97a73feb34fff23fc4dde72",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      throw new Error(`IPFS pinning error: ${response.statusText}`);
    }

    return response.json();
  }

  const uploadToIPFS = async () => {
    try {
      const jsonData = {
        image: formData.logoUrl,
      }
      const res = await uploadJSONToPinata(jsonData);

      console.log(res);

      return res.IpfsHash;
    } catch (error) {
      console.log(error);
    }
  }

  const isFormValid = formData.title && formData.logoUrl;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Advertisement</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-[3/2] max-h-[400px]">
            <img
              src="https://picsum.photos/600/300"
              alt="Background"
              className="absolute top-0 left-0 w-full h-3/4 object-cover"
            />
            <div className="absolute bottom-0 left-0 flex items-center gap-3 bg-white w-full h-1/4 p-4">
              <img
                src={formData.logoUrl}
                alt="Ad Logo"
                className="w-12 h-12 rounded-full object-cover border border-white shadow-sm"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/64?text=Logo'
                }}
              />
              <div className="flex flex-1 min-w-0 items-center gap-2">
                <p className="text-sm leading-snug truncate">
                  <strong>{formData.title}</strong>
                </p>
                {formData.description && (
                  <p className="text-sm text-gray-600 truncate">
                    • {formData.description}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-4">
            <button
              onClick={() => setShowPreview(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Back
            </button>
            <button
              onClick={handleBuyAd}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Buy Ad
                </>
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-black/80">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/90 via-white/95 to-purple-50/90 dark:from-cyan-950/90 dark:via-black/95 dark:to-purple-950/90" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200/30 dark:bg-cyan-800/30 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-800/30 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="relative z-10">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl">
                <Sparkles className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                Create a Campaign
              </h2>
            </div>
            <p className="text-sm text-muted-foreground"></p>
          </CardHeader>

          <CardContent className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-light text-cyan-700 dark:text-cyan-300">
                  <FileText className="w-5 h-5" />
                  <span>And some info about the ad</span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1/3 space-y-2">
                      <Label htmlFor="title" className="text-base">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="h-12 text-lg border-2 border-cyan-200 dark:border-cyan-800 focus-visible:ring-cyan-500 bg-white/50 dark:bg-black/50"
                        placeholder="Enter your advertisement title"
                      />
                    </div>

                    <div className="w-2/3 space-y-2">
                      <Label htmlFor="description" className="text-base">
                        Description
                        <span className="ml-2 text-sm text-gray-500">(Optional)</span>
                      </Label>
                      <Input
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="h-12 text-lg border-2 border-cyan-200 dark:border-cyan-800 focus-visible:ring-cyan-500 bg-white/50 dark:bg-black/50"
                        placeholder="Describe your advertisement"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logoUrl" className="text-base">Logo URL</Label>
                  <Input
                    id="logoUrl"
                    value={formData.logoUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, logoUrl: e.target.value }))}
                    className="h-12 text-lg border-2 border-cyan-200 dark:border-cyan-800 focus-visible:ring-cyan-500 bg-white/50 dark:bg-black/50"
                    placeholder="Enter your logo URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="labels" className="text-base">
                    Labels
                    <span className="ml-2 text-sm text-gray-500">(Press Enter to add)</span>
                  </Label>
                  <Input
                    id="labels"
                    value={currentLabel}
                    onChange={(e) => setCurrentLabel(e.target.value)}
                    onKeyDown={handleAddLabel}
                    className="h-12 text-lg border-2 border-cyan-200 dark:border-cyan-800 focus-visible:ring-cyan-500 bg-white/50 dark:bg-black/50"
                    placeholder="Add labels for your advertisement"
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {labels.map((label, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1 text-sm bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-cyan-200 dark:bg-cyan-800" />

            <div className="pt-8">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!isFormValid}
                className="group relative w-full"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
                <div className="relative w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:from-cyan-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Preview Advertisement
                </div>
              </button>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 dark:bg-red-950 border-2">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {txHash && (
              <Alert className="bg-green-50 dark:bg-green-950 border-2">
                <AlertDescription className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Transaction submitted: {txHash}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </div>
      </Card>
    </div>
  );
}