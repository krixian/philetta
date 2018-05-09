import { RefType } from "./ref-type.enum";

export interface Ref {
    uri: string;
    name: string;
    type: RefType;
}
