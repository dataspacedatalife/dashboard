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
import { useLocale, useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

type CapabilityKey =
  | "SHARE"
  | "COMPUTE"
  | "ANALYZE"
  | "STORE"
  | "DELIVER"
  | "ANONYMIX"
  | "CLEVER";

type CapabilityDefinition = {
  key: CapabilityKey;
  url?: string;
  accent: string;
  Icon: LucideIcon;
  iconSrc?: string;
  position?: "center" | "top" | "right" | "bottom" | "left";
};

type Capability = CapabilityDefinition & {
  title: string;
  description: string;
  detail: string;
  serviceName?: string;
};

const capabilityDefinitions: CapabilityDefinition[] = [
  {
    key: "SHARE",
    url: "https://dl-cesga.srv.cesga.es",
    accent: "#0b5fd3",
    Icon: Share2,
    iconSrc: "/share-icon.ico",
    position: "center",
  },
  {
    key: "COMPUTE",
    url: "https://hpc.dataspace.cesga.es",
    accent: "#1557c0",
    Icon: Cpu,
    position: "top",
  },
  {
    key: "ANALYZE",
    url: "https://bigdata.dataspace.cesga.es",
    accent: "#057b86",
    Icon: Search,
    position: "right",
  },
  {
    key: "STORE",
    url: "https://storage.dataspace.cesga.es",
    accent: "#6e3fb2",
    Icon: Database,
    position: "bottom",
  },
  {
    key: "DELIVER",
    url: "https://cloud.dataspace.cesga.es",
    accent: "#2f8d24",
    Icon: CloudUpload,
    position: "left",
  },
  {
    key: "ANONYMIX",
    url: "https://anonymix.srv.cesga.es",
    accent: "#087f8c",
    Icon: ShieldCheck,
  },
  {
    key: "CLEVER",
    url: "https://clever.srv.cesga.es",
    accent: "#0f766e",
    Icon: BrainCircuit,
  },
];

const lifecycleMenuOrder: CapabilityKey[] = [
  "SHARE",
  "STORE",
  "ANALYZE",
  "COMPUTE",
  "DELIVER",
];
const toolMenuOrder: CapabilityKey[] = ["ANONYMIX", "CLEVER"];
const languageLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  gl: "GL",
};

export default function Home() {
  const t = useTranslations("dashboard");
  const locale = useLocale() as Locale;
  const [selectedKey, setSelectedKey] = useState<CapabilityKey | null>(null);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const detailPanelRef = useRef<HTMLElement>(null);
  const capabilities: Capability[] = capabilityDefinitions.map((capability) => {
    const translatedCapability: Capability = {
      ...capability,
      title: t(`capabilities.${capability.key}.title`),
      description: t(`capabilities.${capability.key}.description`),
      detail: t(`capabilities.${capability.key}.detail`),
    };

    if (capability.url) {
      translatedCapability.serviceName = t(
        `capabilities.${capability.key}.serviceName`,
      );
    }

    return translatedCapability;
  });
  const selectedCapability = capabilities.find(
    (capability) => capability.key === selectedKey,
  );
  const lifecycleCapabilities = capabilities.filter(
    (capability) => capability.position,
  );
  const outerLifecycleCapabilities = lifecycleCapabilities.filter(
    (capability) => capability.position !== "center",
  );
  const lifecycleMenuCapabilities = lifecycleMenuOrder
    .map((key) => capabilities.find((capability) => capability.key === key))
    .filter((capability): capability is Capability => Boolean(capability));
  const toolMenuCapabilities = toolMenuOrder
    .map((key) => capabilities.find((capability) => capability.key === key))
    .filter((capability): capability is Capability => Boolean(capability));

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
    const nextSelectedKey = selectedKey === key ? null : key;
    setSelectedKey(nextSelectedKey);

    if (nextSelectedKey && window.matchMedia("(max-width: 1040px)").matches) {
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
          aria-label={t("aria.collapseMenu")}
          onClick={() => setMenuCollapsed(true)}
        />
      ) : null}

      <aside className="side-menu" aria-label={t("aria.mainMenu")}>
        <div className="side-menu-brand" aria-label={t("brand")}>
          <Image
            src="/logo.png"
            alt={t("logoAlt")}
            width={150}
            height={78}
            priority
            className="side-menu-logo-full"
          />
          <Image
            src="/share-icon.ico"
            alt=""
            width={34}
            height={34}
            priority
            unoptimized
            className="side-menu-logo-mark"
          />
        </div>

        <div className="side-menu-header">
          <Menu size={20} aria-hidden="true" />
          <span>{t("menu.dashboard")}</span>
          <button
            type="button"
            className="menu-toggle"
            aria-label={
              menuCollapsed ? t("aria.expandMenu") : t("aria.collapseMenu")
            }
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

        <nav className="menu-options" aria-label={t("aria.capabilityOptions")}>
          <MenuGroup
            title={t("menu.lifecycle")}
            capabilities={lifecycleMenuCapabilities}
            selectedKey={selectedKey}
            menuCollapsed={menuCollapsed}
            onSelect={handleSelect}
          />
          <MenuGroup
            title={t("menu.tools")}
            capabilities={toolMenuCapabilities}
            selectedKey={selectedKey}
            menuCollapsed={menuCollapsed}
            onSelect={handleSelect}
          />
        </nav>

      </aside>

      <nav className="language-switcher" aria-label={t("aria.languageMenu")}>
        {routing.locales.map((availableLocale) => (
          <Link
            key={availableLocale}
            href="/"
            locale={availableLocale}
            aria-current={availableLocale === locale ? "page" : undefined}
            aria-label={t("aria.switchLanguage", {
              language: t(`languages.${availableLocale}`),
            })}
          >
            {languageLabels[availableLocale]}
          </Link>
        ))}
      </nav>

      <section className="dashboard-page" aria-labelledby="dashboard-title">
        <h1 id="dashboard-title" className="sr-only">
          {t("pageTitle")}
        </h1>

        <div className="dashboard-grid">
          <section
            className="lifecycle-section"
            aria-label={t("aria.lifecycleSection")}
          >
            <div
              className="lifecycle-map"
              aria-label={t("aria.lifecycleMap")}
              data-selected={selectedKey ?? undefined}
            >
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
            style={
              {
                "--accent": selectedCapability?.accent ?? "#057b86",
              } as CSSProperties
            }
          >
            {selectedCapability ? (
              <>
                <div className="panel-status">
                  <p className="eyebrow">{t("panel.selectedService")}</p>
                  <span>{t("panel.service")}</span>
                </div>
                <h2 id="selected-service-title">{selectedCapability.title}</h2>
                <p className="panel-lead">{selectedCapability.description}</p>
                <p>{selectedCapability.detail}</p>
                {selectedCapability.url ? (
                  <a
                    href={selectedCapability.url}
                    target="_blank"
                    rel="noreferrer"
                    className="service-link"
                    aria-label={t("aria.openService", {
                      service:
                        selectedCapability.serviceName ??
                        selectedCapability.title,
                    })}
                  >
                    {t("panel.openService", {
                      service:
                        selectedCapability.serviceName ??
                        selectedCapability.title,
                    })}
                    <ExternalLink
                      size={16}
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                  </a>
                ) : null}
              </>
            ) : (
              <div className="panel-empty-state">
                <p className="eyebrow">{t("brand")}</p>
                <h2 id="selected-service-title">
                  <span>{t("slogan.line1a")}</span>
                  <span>{t("slogan.line1b")}</span>
                </h2>
                <p className="panel-lead">{t("slogan.line2")}</p>
                <p>{t("panel.emptyPrompt")}</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}

function MenuGroup({
  title,
  capabilities,
  selectedKey,
  menuCollapsed,
  onSelect,
}: {
  title: string;
  capabilities: Capability[];
  selectedKey: CapabilityKey | null;
  menuCollapsed: boolean;
  onSelect: (key: CapabilityKey) => void;
}) {
  return (
    <div className="menu-group">
      <p className="menu-group-label">{title}</p>
      <div className="menu-group-options">
        {capabilities.map((capability) => {
          const Icon = capability.Icon;

          return (
            <button
              key={capability.key}
              type="button"
              className="menu-option"
              aria-pressed={selectedKey === capability.key}
              aria-label={capability.title}
              title={menuCollapsed ? `${title}: ${capability.title}` : undefined}
              onClick={() => onSelect(capability.key)}
              style={{ "--accent": capability.accent } as CSSProperties}
            >
              <span className="menu-option-icon" aria-hidden="true">
                <Icon size={19} strokeWidth={2.25} />
              </span>
              <span className="menu-option-text">{capability.title}</span>
            </button>
          );
        })}
      </div>
    </div>
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
      className={`service-node service-node-${service.position}${
        service.iconSrc ? " service-node-logo" : ""
      }`}
      aria-pressed={selected}
      aria-label={`${service.title}: ${service.description}`}
      onClick={() => onSelect(service.key)}
      style={{ "--accent": service.accent } as CSSProperties}
    >
      <span
        className={`node-symbol${service.iconSrc ? " node-symbol-logo" : ""}`}
        aria-hidden="true"
      >
        {service.iconSrc ? (
          <Image
            src={service.iconSrc}
            alt=""
            width={44}
            height={44}
            className="node-image-icon"
            unoptimized
          />
        ) : (
          <Icon size={30} strokeWidth={2.25} />
        )}
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
