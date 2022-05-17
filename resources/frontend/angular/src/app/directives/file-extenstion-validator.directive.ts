import { Directive, Injectable } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

let validExt = ['jpg', 'png', 'jpeg'];

@Directive({
  selector: '[appFileExtenstionValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FileExtenstionValidatorDirective,
    multi: true,
  }]
})
@Injectable({
  providedIn: 'root'
})
export class FileExtenstionValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    let forbidden = true;
    let error: ValidationErrors | null = null;

    if (control.value) {
      let givenExt = control.value.split('.').pop();

      validExt.forEach(ext => {
        if (ext === givenExt) {
          forbidden = false;
          return;
        }
      });

      error = forbidden ? { 'invalidExt': true } : null;
    }

    return error;
  }
}
