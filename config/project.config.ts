import { log } from "@acdh-oeaw/lib";
import { ColorSpace, getLuminance, HSL, OKLCH, parse, sRGB, to as convert } from "colorjs.io/fn";
import { z } from "zod";

import projectConfig from "../project.config.json";

ColorSpace.register(sRGB);
ColorSpace.register(HSL);
ColorSpace.register(OKLCH);

const schema = z.object({
	colors: z
		.object({
			accent: z.string(),
			geojson: z.string(),
		})
		.transform((values) => {
			const color = parse(values.accent);
			const luminance = getLuminance(convert(color, OKLCH));
			const [h, s, l] = convert(color, HSL).coords;

			return {
				...values,
				accent: `hsl(${h}deg ${s}% ${l}%)`,
				accentContrast: luminance > 0.5 ? "hsl(0deg 0% 0%)" : "hsl(0deg 0% 100%)",
			};
		}),
	defaultFilters: z.array(z.number()),
	defaultLocale: z.enum(["de", "en"]),
	logos: z.object({
		light: z.string(),
		dark: z.string(),
		withTextLight: z.string(),
		withTextDark: z.string(),
	}),
	imprint: z.enum(["acdh-ch", "custom", "none"]),
	twitter: z.string().optional(),
});

const result = schema.safeParse(projectConfig);

if (!result.success) {
	const message = "Invalid project configuration.";
	log.error(message, result.error.flatten().fieldErrors);
	const error = new Error(message);
	delete error.stack;
	throw error;
}

export const project = result.data;