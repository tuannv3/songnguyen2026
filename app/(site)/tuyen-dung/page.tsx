import type { Metadata } from "next";
import { CareersContent } from "@/components/sections/careers-content";
import { getJobPostings, getCareersPageContent } from "@/lib/cms/careers";

export const metadata: Metadata = {
  title: "Tuyển dụng",
  description: "Cơ hội nghề nghiệp tại Song Nguyên Essential Oils — cùng lan tỏa giá trị tinh dầu thiên nhiên Việt Nam.",
};

export default async function CareersPage() {
  const [jobs, content] = await Promise.all([getJobPostings(), getCareersPageContent()]);
  return <CareersContent jobs={jobs} content={content} />;
}
