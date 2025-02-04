import { useQuery } from "@tanstack/vue-query";

import { useCreateEntity } from "@/composables/use-create-entity";
import { useCreateLinkedEntities } from "@/composables/use-create-linked-entities";
import type { operations } from "@/lib/api-client/api";
import type { ExtendedEntities, LinkedPlace } from "@/types/api";

export interface GetEntityParams
	extends NonNullable<operations["GetEntity"]["parameters"]["path"]> {}

export interface GetLinkedEntitiesParams
	extends NonNullable<operations["GetEntitiesLinkedToEntity"]["parameters"]["path"]> {}

export type GetEntityResponse = LinkedPlace;

export function useGetEntity(params: MaybeRef<GetEntityParams>) {
	const api = useApiClient();
	const createEntity = useCreateEntity();
	const createLinkedEntities = useCreateLinkedEntities();

	return useQuery({
		queryKey: ["entity", params] as const,
		async queryFn({ queryKey, signal }) {
			const [, params] = queryKey;
			const typedParams: GetEntityParams = params as GetEntityParams;
			const _typedParams: GetLinkedEntitiesParams = params as GetLinkedEntitiesParams;

			// Start both API calls concurrently using Promise.all
			const [entityResponse, linkedEntitiesResponse] = await Promise.all([
				api.GET("/entity/{entityId}", {
					params: {
						path: {
							...typedParams,
						},
						query: {
							format: "lpx",
							centroid: true,
						},
					},
					signal,
				}),
				api.GET("/entities_linked_to_entity/{entityId}", {
					params: {
						path: {
							..._typedParams,
						},
						query: {
							format: "lpx",
							centroid: true,
							show: ["types", "geometry"],
							limit: 0,
						},
					},
					signal,
				}),
			]);

			const entity = createEntity(entityResponse as GetEntityResponse);
			const linkedEntities = createLinkedEntities(
				linkedEntitiesResponse.results.filter((result): result is LinkedPlace => {
					return Array.isArray((result as LinkedPlace).features);
				}),
			);

			if (entity.features[0] != null) {
				const mergedRelations = entity.features[0].relations?.map((feature) => {
					return {
						...feature,
						...linkedEntities.find((entity) => {
							return entity["@id"] === feature.relationTo;
						}),
					};
				});
				entity.features[0].relations = mergedRelations;
			}
			console.log("Entity with relations:", entity.features);
			return entity;
		},
	});
}
