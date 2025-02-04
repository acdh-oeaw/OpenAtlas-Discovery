<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-vue-next";

const t = useTranslations();

const props = defineProps<{
	id: number;
	noTableSidebar: boolean;
}>();

const { data } = useGetEntity(
	computed(() => {
		return { entityId: props.id };
	}),
);

const entity = computed(() => {
	return data.value?.features[0];
});

const openState = ref(false);

onMounted(() => {
	openState.value = true;
});

watch(
	() => {
		return props.id;
	},
	() => {
		openState.value = true;
	},
	{ immediate: true, deep: true },
);
const handledRelations = ref<Array<RelationType>>([]);

const updateHandledRelations = (relations: Array<RelationType>) => {
	handledRelations.value = [...relations];
};
</script>

<template>
	<div v-if="entity != null && props.id != null">
		<details
			:class="
				props.noTableSidebar
					? 'group grid h-full z-10 mb-2 mr-2 translate-x-[-25vw] transition-transform duration-300 open:translate-x-0 absolute w-1/4'
					: 'group grid h-full z-10 mb-2 mr-2 translate-x-[-25vw] transition-transform duration-300 open:translate-x-0'
			"
			:open="openState"
		>
			<div
				class="relative h-full max-h-full overflow-y-auto rounded-lg border bg-card px-6 py-4 text-card-foreground shadow"
			>
				<EntityPrimaryDetails :entity="entity" @handled-relations="updateHandledRelations" />

				<slot name="custom-details" />
				<!-- <component v-if="hasCustomDetails" v-bind:is="entityDetailsDict" bind:entity-data /> -->

				<EntityDetails
					v-if="entity.relations && entity.relations?.length > 0"
					:handled-relations="handledRelations"
					:relations="entity.relations"
					class="rounded-md border px-4 py-3 text-sm"
				/>
			</div>
			<summary
				class="absolute left-full top-1/2 block -translate-x-2 rounded-md bg-[hsl(var(--card))] py-2 pl-1 shadow-md"
				style="top: calc(50% - 40px)"
			>
				<ChevronLeftIcon class="ml-auto hidden size-8 group-open:block" />
				<ChevronRightIcon class="ml-auto size-8 group-open:hidden" />
				<span class="sr-only">{{
					t("EntityPage.sidebar.toggle", { title: entity.properties.title })
				}}</span>
			</summary>
		</details>
	</div>
</template>
