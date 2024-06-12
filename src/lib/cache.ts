import { unstable_cache as nextCache } from "next/cache";
import { cache as reactCache } from "react";

type Callback = (...args: any[]) => Promise<any>;

//cache helpes in loading data quicked because data is already loaded, otherwise it will pull data after a certain interval, in my case I want it to reload every 24hrs.
//helper function to wrap both reach and next caches for ease of use, also don't have to do both imports all the time.
// cache helps in updating the products whenever changes occur on admin side.
export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; type?: string[] } = {}
) {
  return nextCache(reactCache(cb), keyParts, options);
}
