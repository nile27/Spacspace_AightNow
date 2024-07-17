"use client";

import { useClose, useShow } from "@/Store/store";

import WatchListAdd from "./WatchListAdd";
import WatchList from "./Watchlist";

export default function WatchListPage() {
  const { isShow } = useShow();
  const { isClose } = useClose();

  return <>{isShow && isClose ? <WatchList /> : <WatchListAdd />}</>;
}
