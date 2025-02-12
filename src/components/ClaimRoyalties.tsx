import { useState } from 'react';
import { useAccount } from 'wagmi';
import { useWarpAdsContract } from '../app/hooks/useWarpAdsContract';
import { TransactionStatus } from '@/components/TransactionStatus';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Coins, ArrowUpRight } from 'lucide-react';
import { ClaimRoyaltiesProps } from '../app/types';

export const ClaimRoyalties = ({ fid, type, username }: ClaimRoyaltiesProps) => {
  const [claimableAmount, setClaimableAmount] = useState<number>(0.01);
  const { address } = useAccount();
  const { executeContract, isLoading, error, txHash } = useWarpAdsContract(address as `0x${string}`);

  const handleClaim = async () => {
    try {
      const functionName = type === 'author' ? 'claimAuthorRoyalties' : 'claimInfluencerRoyalties';
      const args = type === 'author'
        ? ['https://mint.farcaster.xyz/', fid]
        : [fid];

      await executeContract(functionName, args);
    } catch (err) {
      console.error('Failed to claim royalties:', err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-purple-50 dark:from-cyan-950 dark:via-black dark:to-purple-950" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/30 dark:bg-cyan-800/30 rounded-full blur-3xl -mr-32 -mt-32" />

        <div className="relative">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto p-3 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl w-fit">
              <Coins className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {type === 'author' ? 'Author' : 'Influencer'} Royalties
            </CardTitle>
            {username && (
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                Welcome back, <span className="text-cyan-600 dark:text-cyan-400">@{username}</span>
              </p>
            )}
          </CardHeader>

          <CardContent className="flex justify-between">
            <div className="w-1/3">
              <div className="p-6 mb-3 rounded-xl bg-gradient-to-br from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/50 dark:to-purple-900/50 border-2 border-cyan-200 dark:border-cyan-800">
                <div className="text-center space-y-1">
                  <p className="text-sm font-medium text-cyan-700 dark:text-cyan-300">
                    Available to Claim
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                      {claimableAmount} ETH
                    </span>
                  </div>
                </div>
              </div>

              {claimableAmount > 0 && (
                <button
                  onClick={handleClaim}
                  disabled={isLoading}
                  className="group relative w-full"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
                  <div className="relative w-full px-6 py-4 font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl hover:from-cyan-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing Claim
                      </>
                    ) : (
                      <>
                        Claim <ArrowUpRight className="w-5 h-5" />
                      </>
                    )}
                  </div>
                </button>
              )}

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                </div>
              )}

              {txHash && <TransactionStatus hash={txHash} />}
            </div>
            <div className="w-2/3 ml-5">
              <div className="space-y-6">
                <div>
                  <p className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                    What are royalties?
                  </p>
                  <p className="text-sm text-cyan-700/80 dark:text-cyan-300/80 leading-relaxed">
                    Royalties are earnings you receive when your content generates advertising revenue. As a content creator or influencer on Farcaster, you earn a share of the advertising fees whenever your content or promotional links are used to display ads.
                  </p>
                </div>

                <div>
                  <p className="text-lg font-semibold text-cyan-700 dark:text-cyan-300 mb-2">
                    How to claim royalties?
                  </p>
                  <p className="text-sm text-cyan-700/80 dark:text-cyan-300/80 leading-relaxed">
                    To claim your royalties, ensure you have a verified Farcaster account and have either created content with WarpAds or promoted content using your unique referral links. Once you have accumulated earnings, simply click the &quot;Claim Royalties&quot; button above and confirm the transaction in your wallet.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};