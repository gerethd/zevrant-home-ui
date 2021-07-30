import {Directive} from '@angular/core';
import {AbstractControl, ValidatorFn} from "@angular/forms";

@Directive({
    selector: '[appRegexValidator]'
})
export class RegexValidatorDirective {

    constructor() {
    }

}

export function regexValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = nameRe.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}
