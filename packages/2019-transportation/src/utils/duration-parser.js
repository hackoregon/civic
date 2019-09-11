/**
 * A quick and dirty parser to take `hh:mm:ss` strings
 * and turn them into an integer of seconds. It's gonna be
 * brittle and assume the full hours:minutes:seconds format.
 *
 * @param durationString
 */
export default function durationStringToSeconds(durationString) {
  const durations = durationString.split(":");
  const hours = parseInt(durations[0], 10);
  const minutes = parseInt(durations[1], 10);
  const seconds = parseInt(durations[2], 10);

  return seconds + minutes * 60 + hours * 60 * 60;
}
