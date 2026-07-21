// NOT USED
// components/shared/gsap-cleanup.tsx
"use client";

import { useEffect } from 'react';

export default function GSAPCleanup() {
  useEffect(() => {
    // Clean up any orphaned ScrollTrigger instances
    const cleanup = () => {
        try {
            if (typeof window !== 'undefined' && (window as any).gsap) {
                const ScrollTrigger = (window as any).ScrollTrigger;
                if (ScrollTrigger) {
                    // Kill orphaned triggers
                    ScrollTrigger.getAll().forEach((trigger: any) => {
                        if (trigger.trigger && !document.contains(trigger.trigger)) {
                            console.log('🧹 Cleaning orphaned ScrollTrigger');
                            trigger.kill();
                        }
                    });
                }
            }
        } catch (error) {
            console.warn('GSAP cleanup error:', error);
        }
    };

    cleanup();

    // Cleanup on route changes
    const handleRouteChange = () => {
      setTimeout(cleanup, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return null;
}





// "use client";

// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// export default function GSAPCleanup() {
//     const pathname = usePathname();

//     useEffect(() => {
//         const cleanup = () => {
//             console.log("cleaup-called");
//             try {
//                 if (
//                     typeof window !== "undefined" &&
//                     (window as any).ScrollTrigger
//                 ) {
//                     const ScrollTrigger = (window as any).ScrollTrigger;

//                     ScrollTrigger.getAll().forEach((trigger: any) => {
//                         if (
//                             trigger.trigger &&
//                             !document.contains(trigger.trigger)
//                         ) {
//                             console.log("🧹 Cleaning orphaned ScrollTrigger");
//                             trigger.kill(true);
//                         }
//                     });
//                 }
//             } catch (error) {
//                 console.warn("GSAP cleanup error:", error);
//             }
//         };

//         // run after every route change
//         const timeout = setTimeout(cleanup, 50);

//         return () => clearTimeout(timeout);
//     }, [pathname]);

//     return null;
// }
