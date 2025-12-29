import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://osgqezjinqqqdrhdknrb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZ3FlemppbnFxcWRyaGRrbnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyMzI5OTUsImV4cCI6MjA4MTgwODk5NX0.GQ8HEApbjHWwHm-tz4IgbAeDbh1k4Du6zQDpB9MIMMk";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
