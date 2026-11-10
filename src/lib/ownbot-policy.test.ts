import { describe, expect, it, vi } from "vitest";
import { analyticsEnabled, initAnalytics, setAnalyticsEnabled } from "./analytics";
import { PRODUCT_NAME } from "./brand";

describe("OwnBot personal edition", () => {
  it("does not initialize analytics even after an inherited opt-in", async () => {
    const request = vi.spyOn(globalThis, "fetch");
    setAnalyticsEnabled(true);
    await initAnalytics();
    expect(analyticsEnabled()).toBe(false);
    expect(request).not.toHaveBeenCalled();
    request.mockRestore();
  });

  it("identifies the app independently", () => {
    expect(PRODUCT_NAME).toBe("OwnBot");
  });
});
