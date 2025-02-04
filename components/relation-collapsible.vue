<script lang="ts" setup>
const props = defineProps<{
	title: string;
	relations: Array<NonNullable<EntityFeature["relations"]>[0]>;
	showIcon: boolean;
}>();

const sortedRelations = computed(() => {
	function hasCenter(geometry: EntityFeature["relations"][0]["geometry"]) {
		if (geometry.type === "GeometryCollection") {
			return Boolean(
				geometry.geometries.find((g) => {
					return g.shapeType === "centerpoint";
				}),
			);
		}
		if (geometry.type === "Point") return geometry.shapeType === "centerpoint";
		return false;
	}
	return props.relations.toSorted((b, a) => {
		return Number(hasCenter(a.geometry)) - Number(hasCenter(b.geometry));
	});
});
const { getUnprefixedId } = useIdPrefix();
</script>

<template v-if="relations?.length">
	<div class="space-x-4 px-4"></div>
	<RelationListEntry
		v-for="relation in relations"
		:key="getUnprefixedId(relation.relationTo ? relation.relationTo : '')"
		:relation="relation"
		:type="title"
		:show-icon="showIcon"
	/>
</template>
