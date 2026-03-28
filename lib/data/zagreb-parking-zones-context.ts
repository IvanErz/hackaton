import {
  ZAGREB_PARKING_ZONES,
  type ParkingMajorZone,
  type ParkingZoneBlock,
  type ParkingZoneSection,
} from "./zagreb-parking-zones";

function formatBulletLines(lines: readonly string[]): string {
  return lines.map((line) => `- ${line}`).join("\n");
}

function formatBlock(block: ParkingZoneBlock, headingLevel: number): string {
  const hashes = "#".repeat(headingLevel);
  const nameSuffix = block.name ? ` — ${block.name}` : "";
  const body = formatBulletLines(block.lines);
  return `${hashes} Block ${block.id}${nameSuffix}\n\n${body}`;
}

function formatSection(section: ParkingZoneSection): string {
  const header =
    section.title !== undefined
      ? `### ${section.code} — ${section.title}`
      : `### ${section.code}`;
  const chunks: string[] = [header];
  if (section.lines !== undefined && section.lines.length > 0) {
    chunks.push(formatBulletLines(section.lines));
  }
  if (section.blocks !== undefined) {
    for (const b of section.blocks) {
      chunks.push(formatBlock(b, 4));
    }
  }
  return chunks.join("\n\n");
}

function formatMajorZone(zone: ParkingMajorZone): string {
  const zoneHeader = zone.label
    ? `## ${zone.label} (${zone.code})`
    : `## Zone ${zone.code}`;
  const parts: string[] = [zoneHeader, ""];

  if (zone.coverageLines !== undefined && zone.coverageLines.length > 0) {
    parts.push("### Coverage", "", formatBulletLines(zone.coverageLines), "");
  }

  if (zone.sections !== undefined) {
    for (const sec of zone.sections) {
      parts.push(formatSection(sec), "");
    }
  }

  if (zone.blocks !== undefined) {
    for (const b of zone.blocks) {
      parts.push(formatBlock(b, 4), "");
    }
  }

  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
}

function buildParkingZonesContextMarkdown(
  zones: readonly ParkingMajorZone[],
): string {
  const preamble = [
    "# Zagreb public parking zones (structured excerpt)",
    "",
    "Source: City of Zagreb parking zone ordinance excerpt (Croatian), as provided for the ParkSpot project. Not geometry — streets and boundary descriptions as in the legal wording.",
    "",
  ].join("\n");

  const body = zones.map(formatMajorZone).join("\n\n");
  return `${preamble}\n${body}\n`;
}

export const ZAGREB_PARKING_ZONES_CONTEXT_MARKDOWN =
  buildParkingZonesContextMarkdown(ZAGREB_PARKING_ZONES);
