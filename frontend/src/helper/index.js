export function getUserNameInitials(userName) {
  const splittedUN = userName?.split(" ");
  if (!splittedUN) return "??";
  if (splittedUN?.length === 1 && splittedUN[0] === "") return "??";
  if (splittedUN?.length === 1)
    return Array.from(splittedUN[0])[0]?.toUpperCase();
  return (
    Array.from(splittedUN[0])[0]?.toUpperCase() +
    Array.from(splittedUN[splittedUN.length - 1])[0]?.toUpperCase()
  );
}
