import { DestinyEntity } from "../types/DestinyEntity.ts";

export const getUniqueDestinyEntities = <T extends DestinyEntity>(
  entities: T[],
  entity: T,
): T[] => {
  return entities.find((e) => e.hash === entity.hash)
    ? entities
    : [...entities, entity];
};
