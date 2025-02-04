import type { components } from "@/lib/api-client/api";

type LinkedPlacesModel = components["schemas"]["LinkedPlacesModel"];

type LinkedPlacesModelFeature = LinkedPlacesModel["features"][number];

export interface LinkedPlaceFeature extends LinkedPlacesModelFeature {
	type: "Feature";
	geometry:
		| components["schemas"]["GeometryCollection"]
		| components["schemas"]["LineString"]
		| components["schemas"]["Point"]
		| components["schemas"]["Polygon"];
}

export interface LinkedPlace extends LinkedPlacesModel {
	type: "FeatureCollection";
	features: Array<LinkedPlaceFeature>;
}

export type NetworkEntity = components["schemas"]["NetworkVisualisationModel"]["results"];

export type GetLinkedEntitiesResponse = components["schemas"]["EntitiesOutputModel"]["results"];

export type RelationLinkedEntity = LinkedPlacesModel["features"][0];
export interface ExtendedEntities extends RelationLinkedEntity {
	relationType?: string;
	relationTo?: string;
	relationSystemClass: string;
	when?: {
		timespans?: [
			{
				end?: {
					comment?: string;
					earliest?: string;
					latest?: string;
				};
				start?: {
					comment?: string;
					earliest?: string;
					latest?: string;
				};
			},
		];
	};
}
