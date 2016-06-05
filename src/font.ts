export function fontFamily(fonts: string[]): string {
  return fonts.map((v) => v.includes(" ") ? `"${v}"` : v).join(", ");
}
