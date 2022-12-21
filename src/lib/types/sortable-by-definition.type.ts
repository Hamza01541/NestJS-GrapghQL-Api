import { SortByDirection } from "../enums/sort-by-direction";

export interface SortableByDefinitionType {
  [k: string | symbol]: SortByDirection;
}
