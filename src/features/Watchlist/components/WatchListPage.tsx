"use client";

import WatchList from "./WatchList";
import { useClose, useShow } from "@/Store/store";
import WatchListAdd from "./WatchListAdd";

export default function WatchListPage() {
  const { watchList } = useShow();
  const { isClose } = useClose();

  return <>{watchList.length > 0 || isClose ? <WatchList /> : <WatchListAdd />}</>;
}
