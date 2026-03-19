import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { InfoIcon } from "lucide-react";
import { Suspense } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import VideoPlayer from "@/components/dashboard/video-player";


export default function DashboardPage() {
    return(<VideoPlayer src="/videos/video-bonito.mp4"/>);
}
