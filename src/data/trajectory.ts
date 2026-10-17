import { cv } from "@/data/cv";

export type TrajectoryItem = {
  date: string;
  label: string;
  title: string;
  description: string;
};

export function getTrajectory(locale: "tr" | "en"): TrajectoryItem[] {
  const experience = cv.experience.map((item) => ({
    date: locale === "en" ? item.periodEn : item.period,
    label: item.kind === "competition" ? "Competition" : item.kind === "sprint" ? "Sprint" : "Project",
    title: locale === "en" ? item.titleEn : item.title,
    description: locale === "en" ? item.summaryEn : item.summary,
  }));

  const education = cv.education.map((item) => ({
    date: item.period,
    label: locale === "en" ? "Education" : "Eğitim",
    title: item.institution,
    description: item.program ?? item.detail ?? "",
  }));

  return [...experience, ...education];
}
