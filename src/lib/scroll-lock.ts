/**
 * Mobile-safe body scroll lock.
 *
 * Why: iOS Safari can "rubber-band" scroll the page behind modals/sheets/drawers.
 * We lock the body by switching it to `position: fixed` and restoring scroll on unlock.
 *
 * Supports nesting (multiple overlays open) via a simple reference counter.
 */

let lockCount = 0;
let lockedScrollY = 0;
let lockedScrollX = 0;
let lockedPaddingRight = "";

function getScrollbarWidth() {
  // On mobile it's usually 0, but on desktop this prevents layout shift.
  if (typeof window === "undefined") return 0;
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

export function lockBodyScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  lockCount += 1;
  if (lockCount !== 1) return () => unlockBodyScroll();

  lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
  lockedScrollX = window.scrollX || document.documentElement.scrollLeft || 0;

  const body = document.body;
  const scrollbarWidth = getScrollbarWidth();

  // Preserve any existing inline padding-right (rare but safer).
  lockedPaddingRight = body.style.paddingRight;

  body.style.position = "fixed";
  body.style.top = `-${lockedScrollY}px`;
  body.style.left = `-${lockedScrollX}px`;
  body.style.right = "0";
  body.style.width = "100%";
  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

  return () => unlockBodyScroll();
}

export function unlockBodyScroll() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount !== 0) return;

  const body = document.body;

  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  body.style.paddingRight = lockedPaddingRight;

  window.scrollTo({ top: lockedScrollY, left: lockedScrollX, behavior: "auto" });
}
