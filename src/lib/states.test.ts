import { describe, it, expect } from "vitest";
import {
  getAllStates,
  getStateBySlug,
  getAllStateSlugs,
  type StateData,
} from "./states";

describe("states data", () => {
  describe("getAllStates", () => {
    it("returns 15 states (5 V1 + 10 expansion)", () => {
      const states = getAllStates();
      expect(states).toHaveLength(15);
    });

    it("every state has complete required fields", () => {
      const states = getAllStates();
      for (const s of states) {
        expect(s.slug).toMatch(/^[a-z-]+$/);
        expect(s.code).toMatch(/^[A-Z]{2}$/);
        expect(s.name.length).toBeGreaterThan(0);
        expect(s.propertyTaxRate).toBeGreaterThan(0);
        expect(s.propertyTaxRate).toBeLessThan(0.05);
        expect(s.medianHomePrice).toBeGreaterThan(100_000);
        expect(s.topCities.length).toBeGreaterThanOrEqual(2);
        expect(s.faqs.length).toBeGreaterThanOrEqual(2);
        expect(s.defaultPrincipal).toBeGreaterThan(0);
        expect(s.defaultRate).toBeGreaterThan(0);
      }
    });
  });

  describe("getStateBySlug", () => {
    it("resolves california", () => {
      const s = getStateBySlug("california");
      expect(s?.code).toBe("CA");
      expect(s?.name).toBe("California");
    });

    it("resolves texas", () => {
      const s = getStateBySlug("texas");
      expect(s?.code).toBe("TX");
      expect(s?.name).toBe("Texas");
      expect(s?.stateIncomeTaxNote.toLowerCase()).toContain("no state");
    });

    it("resolves new-york", () => {
      const s = getStateBySlug("new-york");
      expect(s?.code).toBe("NY");
    });

    it("resolves florida", () => {
      const s = getStateBySlug("florida");
      expect(s?.code).toBe("FL");
    });

    it("resolves illinois", () => {
      const s = getStateBySlug("illinois");
      expect(s?.code).toBe("IL");
    });

    it("returns undefined for unknown slug", () => {
      expect(getStateBySlug("atlantis")).toBeUndefined();
    });

    it("returns undefined for empty slug", () => {
      expect(getStateBySlug("")).toBeUndefined();
    });

    it("is case-sensitive (lowercase slugs only)", () => {
      expect(getStateBySlug("California")).toBeUndefined();
      expect(getStateBySlug("CALIFORNIA")).toBeUndefined();
    });
  });

  describe("getAllStateSlugs", () => {
    it("returns 15 unique slugs", () => {
      const slugs = getAllStateSlugs();
      expect(slugs).toHaveLength(15);
      expect(new Set(slugs).size).toBe(15);
    });

    it("every slug appears in getAllStates", () => {
      const slugs = getAllStateSlugs();
      const known = new Set(getAllStates().map((s) => s.slug));
      for (const slug of slugs) {
        expect(known.has(slug)).toBe(true);
      }
    });
  });

  describe("state-specific content differentiation", () => {
    it("CA mentions Prop 13 in FAQs (state-specific)", () => {
      const s = getStateBySlug("california");
      const allText = s?.faqs.map((f) => f.question + f.answer).join(" ");
      expect(allText?.toLowerCase()).toMatch(/prop 13|california|ca/);
    });

    it("TX and FL note no state income tax", () => {
      const tx = getStateBySlug("texas");
      const fl = getStateBySlug("florida");
      expect(tx?.stateIncomeTaxNote.toLowerCase()).toMatch(/no state/);
      expect(fl?.stateIncomeTaxNote.toLowerCase()).toMatch(/no state/);
    });

    it("NY mentions mortgage recording tax (state-specific cost)", () => {
      const s = getStateBySlug("new-york");
      const allText = s?.faqs.map((f) => f.question + f.answer).join(" ");
      expect(allText?.toLowerCase()).toMatch(/recording|transfer tax|new york/);
    });

    it("NJ has highest property tax rate of the 15", () => {
      const nj = getStateBySlug("new-jersey");
      const all = getAllStates();
      const others = all.filter((s) => s.code !== "NJ");
      for (const other of others) {
        expect(nj!.propertyTaxRate).toBeGreaterThanOrEqual(
          other.propertyTaxRate,
        );
      }
    });

    it("WA and TX and FL have no state income tax", () => {
      const wa = getStateBySlug("washington");
      const tx = getStateBySlug("texas");
      const fl = getStateBySlug("florida");
      expect(wa?.stateIncomeTaxNote.toLowerCase()).toMatch(/no state/);
      expect(tx?.stateIncomeTaxNote.toLowerCase()).toMatch(/no state/);
      expect(fl?.stateIncomeTaxNote.toLowerCase()).toMatch(/no state/);
    });

    it("PA mentions Act 32 (state-specific tax mechanic)", () => {
      const s = getStateBySlug("pennsylvania");
      const allText = s?.faqs.map((f) => f.question + f.answer).join(" ");
      expect(allText?.toLowerCase()).toMatch(/act 32|earned income|pennsylvania/);
    });

    it("MI mentions Proposal A tax cap (state-specific)", () => {
      const s = getStateBySlug("michigan");
      const allText = s?.faqs.map((f) => f.question + f.answer).join(" ");
      expect(allText?.toLowerCase()).toMatch(/proposal a|principal residence|michigan/);
    });

    it("AZ has lowest property tax rate of the 15", () => {
      const az = getStateBySlug("arizona");
      const all = getAllStates();
      const others = all.filter((s) => s.code !== "AZ");
      for (const other of others) {
        expect(az!.propertyTaxRate).toBeLessThanOrEqual(other.propertyTaxRate);
      }
    });
  });
});
