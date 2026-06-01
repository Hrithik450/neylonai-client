import { SessionUser } from "@/store/session-store";

export interface SessionResponse {
  success: boolean;
  user: SessionUser | null;
  error: string | null;
}
