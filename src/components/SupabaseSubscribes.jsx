import { useQueryClient } from "@tanstack/react-query";
import supabase from "../DBService/supabase";
import { useCurUser } from "../hooks/useCurUser";

export default function SupabaseSubscribes() {
  const { curUser } = useCurUser();
  const queryClient = useQueryClient();
  if (curUser) {
    supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
          filter: `user_id=eq.${curUser.id}`,
        },
        (payload) => {
          queryClient.invalidateQueries({
            queryKey: ["booking", payload.new.user_id, payload.new.tour_id],
          });
        }
      )
      .subscribe();
  }
  return <div></div>;
}
