import { redirect } from "next/navigation";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default function Home() {
  redirect(`/journal/${format(new Date(), "yyyy-MM-dd")}`);
}
