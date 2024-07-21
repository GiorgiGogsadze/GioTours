import { useQuery } from "@tanstack/react-query";
import {
  getAccountWithId,
  getAccountWithUserName,
} from "../DBService/apiAccounts";

export function useAccount({ userId, userName }) {
  const {
    data: account,
    isPending: isLoadingAccount,
    error: accountError,
  } = useQuery({
    queryKey: ["account", userId || userName],
    queryFn: () =>
      userId ? getAccountWithId(userId) : getAccountWithUserName(userName),
    retry: false,
  });

  return { account, isLoadingAccount, accountError };
}
