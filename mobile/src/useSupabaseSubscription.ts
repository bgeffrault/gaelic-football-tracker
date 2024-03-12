import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { useEffect } from "react";
import { useSupabaseClientContext } from "./providers/useSupabaseClient";

export function useSubscription<Data = unknown>(
  config: Record<string, unknown>,
  callback: (payload: RealtimePostgresChangesPayload<Data>) => void,
) {
  const supabaseClient = useSupabaseClientContext();

  useEffect(() => {
    const subscription = supabaseClient
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          ...config,
        },
        callback,
      )
      .subscribe((status) => {
        const ERROR_STATES: `${REALTIME_SUBSCRIBE_STATES}`[] = [
          REALTIME_SUBSCRIBE_STATES.TIMED_OUT,
          REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR,
        ];
        if (ERROR_STATES.includes(status)) {
          // eslint-disable-next-line no-console
          console.error("status", status);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabaseClient]);
}
