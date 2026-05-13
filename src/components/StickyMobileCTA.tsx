"use client";

import Link from "next/link";

export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-[#112040] bg-[#0a1628] px-4 py-3 md:hidden">
      <Link
        href="/submit-yacht"
        className="btn-outline-gold flex-1 py-3 text-xs"
      >
        Submit Confidentially
      </Link>
      <Link
        href="/access"
        className="btn-gold flex-1 py-3 text-xs"
      >
        Apply for Access
      </Link>
    </div>
  );
}
