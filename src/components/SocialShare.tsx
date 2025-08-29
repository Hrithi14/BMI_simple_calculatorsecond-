import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link, Check } from 'lucide-react';
import { BMIResult } from '../App';

interface SocialShareProps {
  result: BMIResult | null;
}

const SocialShare: React.FC<SocialShareProps> = ({ result }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const shareText = `I just calculated my BMI: ${result.bmi} (${result.category}). Check yours with this comprehensive BMI calculator!`;
  const shareUrl = window.location.href;

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank'
    );
    setShowDropdown(false);
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      '_blank'
    );
    setShowDropdown(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label="Share results"
      >
        <Share2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          <div className="py-1">
            <button
              onClick={handleTwitterShare}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Twitter className="h-4 w-4 mr-3 text-blue-500" />
              Share on Twitter
            </button>
            
            <button
              onClick={handleFacebookShare}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Facebook className="h-4 w-4 mr-3 text-blue-600" />
              Share on Facebook
            </button>
            
            <button
              onClick={handleCopyLink}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {copied ? (
                <Check className="h-4 w-4 mr-3 text-green-500" />
              ) : (
                <Link className="h-4 w-4 mr-3 text-gray-500" />
              )}
              {copied ? 'Link copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;