import alineaLogo from "@/assets/logos/alinea.png";
import mekLogo from "@/assets/logos/mek.png";
import rwbLogo from "@/assets/logos/rwb.png";
import climateActionCanadaLogo from "@/assets/logos/climate-action-canada.png";
import climateActionAfricaLogo from "@/assets/logos/climate-action-africa.png";
import econolerLogo from "@/assets/logos/econoler.jpg";

interface PartnerLogosProps {
  variant?: "full" | "compact" | "certificate";
}

const partners = [
  { name: "Rwanda Water Resources Board", logo: rwbLogo, role: "Client" },
  { name: "Alinea International", logo: alineaLogo, role: "Lead Consultant" },
  { name: "MEK Earth & Environmental", logo: mekLogo, role: "Consulting Partner" },
  { name: "Climate Action Africa", logo: climateActionAfricaLogo, role: "Sponsor" },
  { name: "Climate Action Canada", logo: climateActionCanadaLogo, role: "Sponsor" },
  { name: "Econoler", logo: econolerLogo, role: "Sponsor" },
];

const PartnerLogos = ({ variant = "full" }: PartnerLogosProps) => {
  if (variant === "compact") {
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-center gap-5 flex-wrap opacity-70">
          {partners.map((p) => (
            <img
              key={p.name}
              src={p.logo}
              alt={p.name}
              className="h-8 md:h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              title={`${p.name} — ${p.role}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-6 px-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center mb-4">
        Partners & Sponsors
      </p>
      <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
        {partners.map((p) => (
          <div key={p.name} className="flex flex-col items-center gap-1.5 group">
            <div className="bg-background rounded-xl p-2.5 shadow-sm border border-border/50 group-hover:shadow-md transition-shadow">
              <img
                src={p.logo}
                alt={p.name}
                className="h-10 md:h-12 object-contain"
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{p.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerLogos;
