export function sortDistance(resp0, resp1) {
  const time0 = resp0.distance;
  const time1 = resp1.distance;
  return time0 - time1;
}
