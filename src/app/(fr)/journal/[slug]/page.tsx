import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/content";
import JournalArticleView from "./JournalArticleView";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return pageMetadata("fr", `/journal/${a.slug}/`, { title: a.title, description: a.excerpt });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return <JournalArticleView a={a} locale="fr" />;
}
