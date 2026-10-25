import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/content";
import { localizeArticle } from "@/data/articles-i18n";
import { isLocale } from "@/i18n/locales";
import JournalArticleView from "../../../(fr)/journal/[slug]/JournalArticleView";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  const translated = localizeArticle(a, locale);
  return pageMetadata(locale, `/journal/${a.slug}/`, { title: translated.title, description: translated.excerpt });
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return <JournalArticleView a={localizeArticle(a, locale)} locale={locale} />;
}
