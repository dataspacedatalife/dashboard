"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ServiceKey = "SHARE" | "COMPUTE" | "ANALYZE" | "STORE" | "DELIVER";

type Service = {
  key: ServiceKey;
  title: ServiceKey;
  subtitle: string;
  description: string;
  url: string;
  accent: string;
  position: "center" | "top" | "right" | "bottom" | "left";
  details: string[];
};

const services: Service[] = [
  {
    key: "SHARE",
    title: "SHARE",
    subtitle: "Secure, trusted, interoperable data sharing",
    description:
      "Coordinate trusted data exchange with access control and federation-ready data sharing workflows.",
    url: "https://xdatashare.srv.cesga.es",
    accent: "#0b5fd3",
    position: "center",
    details: [
      "Publish and request shared datasets through a trusted access point.",
      "Keep data ownership and access decisions close to the source.",
      "Support interoperable exchange across One Health partners.",
    ],
  },
  {
    key: "COMPUTE",
    title: "COMPUTE",
    subtitle: "Run scalable AI and computing workflows",
    description:
      "Move from shared data to reproducible HPC, AI, and workflow execution capacity.",
    url: "https://hpc.dataspace.cesga.es",
    accent: "#164ecf",
    position: "top",
    details: [
      "Access scalable compute capacity for data-intensive pipelines.",
      "Run AI and simulation workloads close to governed data.",
      "Coordinate technical execution across institutional environments.",
    ],
  },
  {
    key: "ANALYZE",
    title: "ANALYZE",
    subtitle: "Transform data into insights",
    description:
      "Turn operational data products into analysis outputs, models, dashboards, and decision support.",
    url: "https://bigdata.dataspace.cesga.es",
    accent: "#068c9c",
    position: "right",
    details: [
      "Explore data products with big data and analytics tooling.",
      "Create insight workflows for health, environment, and research teams.",
      "Prepare results for downstream services and applications.",
    ],
  },
  {
    key: "STORE",
    title: "STORE",
    subtitle: "Store data securely and at scale",
    description:
      "Preserve datasets, outputs, and operational artifacts in a secure storage layer built for scale.",
    url: "https://store.dataspace.cesga.es",
    accent: "#7434bf",
    position: "bottom",
    details: [
      "Keep source data and derived outputs in durable storage.",
      "Support project workspaces that can grow with usage.",
      "Maintain a reliable base for reuse and delivery.",
    ],
  },
  {
    key: "DELIVER",
    title: "DELIVER",
    subtitle: "Expose results as services and applications",
    description:
      "Package outcomes as services, cloud-hosted applications, and operational access points.",
    url: "https://cloud.srv.cesga.es",
    accent: "#2d9b19",
    position: "left",
    details: [
      "Deploy services and applications for teams and external users.",
      "Expose validated results through operational cloud environments.",
      "Close the lifecycle by making outputs usable in real workflows.",
    ],
  },
];

const outerServices = services.filter((service) => service.position !== "center");

export default function Home() {
  const [selectedKey, setSelectedKey] = useState<ServiceKey>("SHARE");

  const selectedService = useMemo(
    () => services.find((service) => service.key === selectedKey) ?? services[0],
    [selectedKey],
  );

  return (
    <main className="dashboard-shell">
      <section className="dashboard-hero" aria-labelledby="dashboard-title">
        <div className="brand-bar">
          <Image
            src="/logo.png"
            alt="OneHealth DataSpace logo"
            width={180}
            height={64}
            priority
            className="brand-logo"
          />
          <div className="brand-copy">
            <p className="eyebrow">OneHealth DataSpace</p>
            <h1 id="dashboard-title">Operational Dashboard</h1>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="lifecycle-section" aria-label="OHDS service lifecycle">
            <div className="lifecycle-flow" aria-hidden="true" />
            <div className="lifecycle-actions">
              <ServiceButton
                service={services[0]}
                selected={selectedKey === "SHARE"}
                onSelect={setSelectedKey}
              />

              {outerServices.map((service) => (
                <ServiceButton
                  key={service.key}
                  service={service}
                  selected={selectedKey === service.key}
                  onSelect={setSelectedKey}
                />
              ))}
            </div>
          </div>

          <aside className="detail-panel" aria-live="polite">
            <p className="panel-kicker">Selected service</p>
            <h2>{selectedService.title}</h2>
            <p className="panel-subtitle">{selectedService.subtitle}</p>
            <p>{selectedService.description}</p>
            <ul>
              {selectedService.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <a
              href={selectedService.url}
              target="_blank"
              rel="noreferrer"
              className="service-link"
              style={{ "--accent": selectedService.accent } as React.CSSProperties}
            >
              Open {selectedService.title} service
            </a>
          </aside>
        </div>

        <div className="slogan" aria-label="OneHealth DataSpace slogan">
          <p>MORE THAN DATA</p>
          <span>A complete operational lifecycle for One Health data.</span>
        </div>
      </section>
    </main>
  );
}

function ServiceButton({
  service,
  selected,
  onSelect,
}: {
  service: Service;
  selected: boolean;
  onSelect: (key: ServiceKey) => void;
}) {
  return (
    <button
      type="button"
      className={`service-node service-node-${service.position}`}
      aria-pressed={selected}
      onClick={() => onSelect(service.key)}
      style={{ "--accent": service.accent } as React.CSSProperties}
    >
      <span className="node-orb" aria-hidden="true">
        {service.position === "center" ? (
          <Image
            src="/logo.png"
            alt=""
            width={112}
            height={112}
            className="node-logo"
          />
        ) : (
          <span>{service.title.slice(0, 1)}</span>
        )}
      </span>
      <span className="node-copy">
        <strong>{service.title}</strong>
        <span>{service.subtitle}</span>
      </span>
    </button>
  );
}
