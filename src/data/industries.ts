export type Industry = {
  name: string;
  summary: string;
  needs: string[];
  modes: string[];
};

// Sectors listed in the company profile. Requirements describe typical
// freight considerations for each sector, not claims about past work.
export const industries: Industry[] = [
  {
    name: "Textile",
    summary: "Yarn, fabric and home textiles moving from mills to buyers worldwide.",
    needs: ["Consolidated LCL and full-container exports", "Accurate commercial documentation", "Schedules aligned with buyer delivery windows"],
    modes: ["Ocean", "Road", "Customs"],
  },
  {
    name: "Apparel",
    summary: "Finished garments where shipment dates are tied to retail seasons.",
    needs: ["Air options for urgent or sample shipments", "Careful carton handling", "Visibility on shipment timing"],
    modes: ["Ocean", "Air", "Customs"],
  },
  {
    name: "Leather",
    summary: "Leather goods and finished products for international markets.",
    needs: ["Protection from moisture and damage", "Export documentation", "Reliable routing to destination markets"],
    modes: ["Ocean", "Air"],
  },
  {
    name: "Sports Goods",
    summary: "Balls, equipment and sportswear shipped to global brands and distributors.",
    needs: ["Mixed-size and seasonal volumes", "Coordination for order deadlines", "Air for priority orders"],
    modes: ["Ocean", "Air", "Road"],
  },
  {
    name: "Surgical",
    summary: "Surgical and medical instruments, often high value and time-sensitive.",
    needs: ["Careful handling of high-value cargo", "Compliant export documentation", "Fast air freight options"],
    modes: ["Air", "Customs"],
  },
  {
    name: "Chemicals",
    summary: "Industrial chemicals that require attention to regulation and handling.",
    needs: ["Regulatory and documentation compliance", "Appropriate carrier selection", "Coordinated customs procedures"],
    modes: ["Ocean", "Customs", "Warehousing"],
  },
  {
    name: "Machinery",
    summary: "Industrial machinery and equipment, from spare parts to complete plants.",
    needs: ["Crating, lashing and securing", "Heavy-lift and oversized planning", "Route feasibility checks"],
    modes: ["Ocean", "Project cargo", "Road"],
  },
  {
    name: "FMCG",
    summary: "Fast-moving consumer goods where steady, predictable flow matters.",
    needs: ["Regular, repeatable shipments", "Storage between arrival and distribution", "Onward road delivery"],
    modes: ["Ocean", "Warehousing", "Road"],
  },
];
