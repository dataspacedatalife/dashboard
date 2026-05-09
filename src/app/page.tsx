"use client";

import Image from "next/image";
import {
  BrainCircuit,
  CloudUpload,
  Cpu,
  Database,
  ExternalLink,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Share2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type CapabilityKey =
  | "SHARE"
  | "COMPUTE"
  | "ANALYZE"
  | "STORE"
  | "DELIVER"
  | "ANONYMIX"
  | "CLEVER";

type Capability = {
  key: CapabilityKey;
  title: string;
  description: string;
  detail: string;
  url?: string;
  accent: string;
  Icon: LucideIcon;
  position?: "center" | "top" | "right" | "bottom" | "left";
};

const capabilities: Capability[] = [
  {
    key: "SHARE",
    title: "SHARE",
    description: "Connect data, people, and organizations",
    detail:
      "Use the sharing service as the trusted entry point for exchanging One Health data across partners.",
    url: "https://xdatashare.srv.cesga.es",
    accent: "#0b5fd3",
    Icon: Share2,
    position: "center",
  },
  {
    key: "COMPUTE",
    title: "COMPUTE",
    description: "Use advanced computing capabilities",
    detail:
      "Run scalable processing, AI, simulation, and workflow workloads close to governed data.",
    url: "https://hpc.dataspace.cesga.es",
    accent: "#1557c0",
    Icon: Cpu,
    position: "top",
  },
  {
    key: "ANALYZE",
    title: "ANALYZE",
    description: "Turn data into knowledge",
    detail:
      "Explore datasets, build models, and transform operational data into useful insight.",
    url: "https://bigdata.dataspace.cesga.es",
    accent: "#057b86",
    Icon: Search,
    position: "right",
  },
  {
    key: "STORE",
    title: "STORE",
    description: "Manage and protect data assets",
    detail:
      "Keep source data, derived outputs, and project assets in secure, durable storage.",
    url: "https://store.dataspace.cesga.es",
    accent: "#6e3fb2",
    Icon: Database,
    position: "bottom",
  },
  {
    key: "DELIVER",
    title: "DELIVER",
    description: "Expose results as services and applications",
    detail:
      "Publish validated outputs through cloud services, applications, and operational endpoints.",
    url: "https://cloud.srv.cesga.es",
    accent: "#2f8d24",
    Icon: CloudUpload,
    position: "left",
  },
  {
    key: "ANONYMIX",
    title: "Anonymix",
    description: "Prepare privacy-preserving datasets",
    detail:
      "Support controlled anonymization workflows before sensitive data is shared, analyzed, or delivered.",
    accent: "#087f8c",
    Icon: ShieldCheck,
  },
  {
    key: "CLEVER",
    title: "Clever",
    description: "Coordinate intelligent operational assistance",
    detail:
      "Provide guided support for finding services, understanding next steps, and coordinating lifecycle actions.",
    accent: "#0f766e",
    Icon: BrainCircuit,
  },
];

const lifecycleCapabilities = capabilities.filter(
  (capability) => capability.position,
);
const outerLifecycleCapabilities = lifecycleCapabilities.filter(
  (capability) => capability.position !== "center",
);

export default function Home() {
  const [selectedKey, setSelectedKey] = useState<CapabilityKey>("SHARE");
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const detailPanelRef = useRef<HTMLElement>(null);
  const selectedCapability =
    capabilities.find((capability) => capability.key === selectedKey) ??
    capabilities[0];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    function syncMenuState() {
      if (mediaQuery.matches) {
        setMenuCollapsed(true);
      }
    }

    syncMenuState();
    mediaQuery.addEventListener("change", syncMenuState);

    return () => {
      mediaQuery.removeEventListener("change", syncMenuState);
    };
  }, []);

  function handleSelect(key: CapabilityKey) {
    setSelectedKey(key);

    if (window.matchMedia("(max-width: 1040px)").matches) {
      requestAnimationFrame(() => {
        detailPanelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        detailPanelRef.current?.focus({ preventScroll: true });
      });
    }
  }

  return (
    <main className="dashboard-shell" data-menu-collapsed={menuCollapsed}>
      {!menuCollapsed ? (
        <button
          type="button"
          className="menu-backdrop"
          aria-label="Collapse menu"
          onClick={() => setMenuCollapsed(true)}
        />
      ) : null}

      <aside className="side-menu" aria-label="OneHealth DataSpace menu">
        <div className="side-menu-header">
          <Menu size={20} aria-hidden="true" />
          <span>Menu</span>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuCollapsed ? "Expand menu" : "Collapse menu"}
            aria-pressed={menuCollapsed}
            onClick={() => setMenuCollapsed((collapsed) => !collapsed)}
          >
            {menuCollapsed ? (
              <PanelLeftOpen size={19} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={19} aria-hidden="true" />
            )}
          </button>
        </div>

        <nav className="menu-options" aria-label="Capability options">
          {capabilities.map((capability) => {
            const Icon = capability.Icon;

            return (
              <button
                key={capability.key}
                type="button"
                className="menu-option"
                aria-pressed={selectedKey === capability.key}
                aria-label={capability.title}
                title={menuCollapsed ? capability.title : undefined}
                onClick={() => handleSelect(capability.key)}
                style={{ "--accent": capability.accent } as CSSProperties}
              >
                <span className="menu-option-icon" aria-hidden="true">
                  <Icon size={19} strokeWidth={2.25} />
                </span>
                <span className="menu-option-text">{capability.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="dashboard-page" aria-labelledby="dashboard-title">
        <header className="hero-header">
          <div className="brand-mark">
            <Image
              src="/logo.png"
              alt="OneHealth DataSpace logo"
              width={180}
              height={94}
              priority
              className="brand-logo"
            />
          </div>

          <div className="hero-copy">
            <h1 id="dashboard-title">
              <span>MORE THAN</span>
              <span>DATA</span>
            </h1>
            <p>A complete operational lifecycle for One Health data.</p>
          </div>
        </header>

        <div className="dashboard-grid">
          <section
            className="lifecycle-section"
            aria-label="Choose a OneHealth DataSpace lifecycle capability"
          >
            <div className="lifecycle-map" aria-label="OneHealth DataSpace lifecycle">
              <div className="cycle-ring" aria-hidden="true" />
              <ServiceButton
                service={lifecycleCapabilities[0]}
                selected={selectedKey === "SHARE"}
                onSelect={handleSelect}
              />
              {outerLifecycleCapabilities.map((service) => (
                <ServiceButton
                  key={service.key}
                  service={service}
                  selected={selectedKey === service.key}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </section>

          <aside
            ref={detailPanelRef}
            className="detail-panel"
            aria-labelledby="selected-service-title"
            aria-live="polite"
            tabIndex={-1}
            style={{ "--accent": selectedCapability.accent } as CSSProperties}
          >
            <div className="panel-status">
              <p className="eyebrow">Selected service</p>
              <span>{selectedCapability.url ? "Service" : "Local"}</span>
            </div>
            <h2 id="selected-service-title">{selectedCapability.title}</h2>
            <p className="panel-lead">{selectedCapability.description}</p>
            <p>{selectedCapability.detail}</p>
            {selectedCapability.url ? (
              <>
                <p className="panel-note">The service opens in a new browser tab.</p>
                <a
                  href={selectedCapability.url}
                  target="_blank"
                  rel="noreferrer"
                  className="service-link"
                  aria-label={`Open ${selectedCapability.title} service in a new tab`}
                >
                  Open {selectedCapability.title} Service
                  <ExternalLink size={16} strokeWidth={2.4} aria-hidden="true" />
                </a>
              </>
            ) : (
              <p className="panel-note">
                This option is shown locally in the dashboard.
              </p>
            )}
          </aside>
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
  service: Capability;
  selected: boolean;
  onSelect: (key: CapabilityKey) => void;
}) {
  const Icon = service.Icon;

  return (
    <button
      type="button"
      className={`service-node service-node-${service.position}`}
      aria-pressed={selected}
      aria-label={`${service.title}: ${service.description}`}
      onClick={() => onSelect(service.key)}
      style={{ "--accent": service.accent } as CSSProperties}
    >
      <span className="selected-badge" aria-hidden={!selected}>
        Selected
      </span>
      <span className="node-symbol" aria-hidden="true">
        <Icon size={30} strokeWidth={2.25} />
      </span>
      <span className="node-text">
        <strong>{service.title}</strong>
      </span>
      <span className="node-tooltip" role="tooltip">
        {service.description}
      </span>
    </button>
  );
}
