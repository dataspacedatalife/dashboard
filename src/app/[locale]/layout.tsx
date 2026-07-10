import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = hasLocale(routing.locales, locale)
    ? (locale as Locale)
    : routing.defaultLocale;

  const t = await getTranslations({
    locale: safeLocale,
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <main className="flex-1">
            {children}
          </main>

          <footer className="footer-section">
            <div className="footer-container">
              

              <div className="footer-logos">
                <div className="footer-logo-card">
                  <img src="/funding/financiado_union_europea.png" alt="Financiado por la Unión Europea" />
                </div>

                <div className="footer-logo-card">
                  <img src="/funding/ministerio_tranformacion_digital.jpg" alt="Ministerio para la transformación digital y de la función pública" />
                </div>

                <div className="footer-logo-card">
                  <img src="/funding/logo_prtr.png" alt="Plan de Recuperación, Transformación y Resiliencia" />
                </div>

                <div className="footer-logo-card">
                  <img src="/funding/logo_cesga.png" alt="CESGA" />
                </div>

                <div className="footer-logo-card">
                  <img src="/funding/logo_xacobeo.png" alt="Xacobeo 2027" />
                </div>
              </div>

              <div className="footer-bottom">
                © 2026 OneHealth DataSpace
              </div>

            </div>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}