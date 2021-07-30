import {BehaviorSubject} from "rxjs";

export interface HasRole {

    hasRole(role: string): BehaviorSubject<boolean>;
}
