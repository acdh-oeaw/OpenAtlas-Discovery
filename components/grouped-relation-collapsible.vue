<script lang="ts" setup>
import { groupByToMap } from "@acdh-oeaw/lib";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useFilterRelations } from "@/composables/use-filter-relations";

const { getUnprefixedId } = useIdPrefix();

/** @param relations should be an  */
const props = defineProps<{
	title: string;
	relations: EntityFeature["relations"];
	relationType: RelationType;
	systemClass?: string;
	showOnMap: boolean;
}>();
type Relations = Array<NonNullable<EntityFeature["relations"]>[0]>;

const filteredRelations = ref<Relations>([]);

watch(
	() => {
		return props.relations;
	},
	(relations) => {
		filteredRelations.value = useFilterRelations(relations, {
			relationType: props.relationType,
			systemClass: props.systemClass,
		});
	},
	{ immediate: true },
);

computed(() => {
	return props.relations.reduce(
		(acc: Array<NonNullable<EntityFeature["relations"]>[0]>, relation) => {
			const { crmCode, inverse } =
				extractRelationTypeFromRelationString(relation.relationType) ?? {};

			if (
				crmCode !== props.relationType.crmCode ||
				inverse !== Boolean(props.relationType.inverse)
			) {
				return acc;
			}
			if (!relation.relationTo) {
				return acc;
			}

			return [
				...acc,
				{
					...relation,
					id: useToNumber(getUnprefixedId(relation.relationTo)).value,
				},
			];
		},
		[],
	);
});

const groupedByType = computed(() => {
	return groupByToMap(filteredRelations.value, (rel): string | null | undefined => {
		return rel.types ? rel.types[0]?.label : null;
	});
});
</script>

<template>
	<div v-if="filteredRelations?.length" class="w-full rounded-md border px-4 py-3 text-sm">
		<div class="flex items-center justify-between space-x-4">
			<Accordion type="single" collapsible class="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger class="grid grid-cols-[auto_1fr] place-items-end">
						<h4 class="text-sm font-semibold">
							{{ title }}
							{{ filteredRelations?.length ? `(${filteredRelations.length})` : "" }}
						</h4>
					</AccordionTrigger>
					<AccordionContent>
						<template v-for="[type, rels] in groupedByType" :key="type">
							<RelationCollapsible
								class="mb-8"
								:title="type ?? ''"
								:relations="rels"
								:show-icon="props.showOnMap"
							/>
						</template>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	</div>
</template>
