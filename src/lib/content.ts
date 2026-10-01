import fs from "node:fs";
import path from "node:path";
import * as React from "react";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import MDXComponents from "@/components/mdx/MDXComponents";
import { projectFrontmatter } from "@/lib/schemas";

const PROJECTS_ROOT = path.join(process.cwd(), "src", "content", "projects");

export const mdxOptions: any = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [
        rehypePrettyCode,
        {
          theme: {
            dark: "github-dark-dimmed",
            light: "github-light",
          },
          keepBackground: false,
        },
      ],
    ],
  },
};

export function renderMdx(source: string) {
  return React.createElement(MDXRemote, {
    source,
    components: MDXComponents,
    options: mdxOptions,
  });
}

function getProjectFiles(locale: "tr" | "en") {
  const localeDir = path.join(PROJECTS_ROOT, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  return fs
    .readdirSync(localeDir)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => a.localeCompare(b));
}

function parseProject(locale: "tr" | "en", fileName: string) {
  const filePath = path.join(PROJECTS_ROOT, locale, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const frontmatter = projectFrontmatter.parse(data);

  return {
    ...frontmatter,
    locale,
    content,
  };
}

export function getAllProjects(locale: "tr" | "en") {
  return getProjectFiles(locale)
    .map((fileName) => parseProject(locale, fileName))
    .sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(locale: "tr" | "en", slug: string) {
  const project = getAllProjects(locale).find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Project not found for locale ${locale} and slug ${slug}`);
  }

  return project;
}

export function getFeaturedProjects(locale: "tr" | "en") {
  return getAllProjects(locale)
    .filter((project) => project.featured)
    .sort((a, b) => a.order - b.order);
}
