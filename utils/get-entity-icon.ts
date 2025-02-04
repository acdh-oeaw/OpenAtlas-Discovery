import {
	BoneIcon,
	CalendarFoldIcon,
	CodeSquareIcon,
	HammerIcon,
	MapPinIcon,
	ShapesIcon,
	TextIcon,
	UserIcon,
	UsersIcon,
} from "lucide-vue-next";

type Icon = typeof CalendarFoldIcon;

const icons: Record<string, Icon> = {
	acquisition: CalendarFoldIcon,
	activity: CalendarFoldIcon,
	// actor_appellation: null,
	administrative_unit: MapPinIcon,
	// appellation: null,
	artifact: HammerIcon,
	bibliography: TextIcon,
	edition: TextIcon,
	external_reference: TextIcon,
	event: CalendarFoldIcon,
	feature: ShapesIcon,
	file: TextIcon,
	find: MapPinIcon,
	group: UsersIcon,
	human_remains: BoneIcon,
	move: CalendarFoldIcon,
	object_location: MapPinIcon,
	person: UserIcon,
	place: MapPinIcon,
	// referenceSystem: null,
	source: TextIcon,
	stratigraphic_unit: MapPinIcon,
	source_translation: TextIcon,
	type: CodeSquareIcon,
};

export function getEntityIcon(systemClass: string): Icon | null {
	return icons[systemClass] ?? null;
}
