<script setup lang="ts">
import { TRUE } from "openapi-typescript";

const t = useTranslations();

const _props = defineProps<{ entity: EntityFeature }>();

const collapsibleRelations: Array<{
	relationType: RelationType;
	systemClass?: string;
	title: string;
	fullWidth: boolean;
	showOnMap: boolean;
}> = [
	{
		relationType: {
			crmCode: "P46",
		},
		systemClass: "feature",
		title: t("Relations.Features"),
		fullWidth: true,
		showOnMap: true,
	},
	{
		relationType: {
			crmCode: "P46",
		},
		systemClass: "artifact",
		title: t("Relations.Artifacts"),
		fullWidth: false,
		showOnMap: false,
	},
	{
		relationType: {
			crmCode: "P46",
		},
		systemClass: "human_remains",
		title: t("Relations.HumanRemains"),
		fullWidth: false,
		showOnMap: false,
	},
	{
		relationType: {
			crmCode: "P67",
			inverse: true,
		},
		systemClass: "source",
		title: t("Relations.Sources"),
		fullWidth: true,
		showOnMap: false,
	},
];

const emit = defineEmits({
	handledRelations(payload: Array<RelationType>) {
		return payload;
	},
});

const handledRelations: Array<RelationType> = [
	{
		crmCode: "P46",
	},
];

onMounted(() => {
	emit("handledRelations", handledRelations);
});
</script>

<template>
	<div class="flex w-full flex-col gap-4">
		<GroupedRelationCollapsible
			v-for="rel in collapsibleRelations.filter((a) => a.fullWidth === true)"
			:key="rel.relationType.crmCode + rel.relationType.inverse"
			:title="rel.title"
			:relations="entity.relations"
			:system-class="rel.systemClass"
			:relation-type="rel.relationType"
			:show-on-map="rel.showOnMap"
		/>
	</div>
	<div class="flex w-full gap-4">
		<GroupedRelationCollapsible
			v-for="rel in collapsibleRelations.filter((a) => a.fullWidth === false)"
			:key="rel.relationType.crmCode + rel.relationType.inverse"
			:title="rel.title"
			:relations="entity.relations"
			:system-class="rel.systemClass"
			:relation-type="rel.relationType"
			:show-on-map="rel.showOnMap"
		/>
	</div>
</template>
