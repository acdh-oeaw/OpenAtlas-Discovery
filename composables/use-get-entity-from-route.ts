export const useGetEntityFromRoute = () => {
	const route = useRoute();

	const id = computed(() => {
		return Number(route.params.id as string);
	});

	const { data, isPending, isPlaceholderData } = useGetEntity(
		computed(() => {
			return { entityId: id.value };
		}),
	);

	const entity = computed(() => {
		return queryData.value?.entity?.features[0];
	});

	const isLoading = computed(() => {
		return isPending.value || isPlaceholderData.value;
	});

	return { entity, isLoading };
};
