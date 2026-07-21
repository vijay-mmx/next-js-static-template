// components/shared/universal-force-refresh-fix.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UniversalForceRefreshFix() {
    const router = useRouter();

    useEffect(() => {
        // Global click handler for ALL navigation
        const handleClick = (event: MouseEvent) => {
            // console.log("handleClick");
            const target = event.target as HTMLElement;

            // Intercept ALL navigation elements
            const linkElement = target.closest('a[href]');
            const buttonWithHref = target.closest('button[data-href]');
            const forceRefreshElement = target.closest('[data-force-refresh]');

            const isNavigation = linkElement || buttonWithHref || forceRefreshElement;

            if (isNavigation && linkElement) {
                const href = linkElement.getAttribute('href') || '';

                // Skip external links and anchors
                if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:')) {
                    event.preventDefault();
                    console.log('🔄 Universal navigation forcing refresh to:', href);
                    window.location.href = href;
                }
            }
        };

        // Also intercept router.push globally
        const originalPush = router.push;
        router.push = (href: string, options?: any) => {
            if (typeof href === 'string' && !href.startsWith('http')) {
                console.log('🔄 Router.push intercepted, forcing refresh:', href);
                window.location.href = href;
                return;
            }
            return originalPush(href, options);
        };

        // Use capture phase to intercept before other handlers
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
            // Restore original router.push if component unmounts
            router.push = originalPush;
        };
    }, [router]);

    return null;
}