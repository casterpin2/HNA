import { FormArray, FormControl, FormGroup } from "@angular/forms";

const markDirty = (form: FormGroup) => {
    markGroupDirty(form);
}
const markGroupDirty = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(key => {
        switch (formGroup?.get(key)?.constructor?.name) {
            case "FormGroup":
                markGroupDirty(formGroup.get(key) as FormGroup);
                break;
            case "FormArray":
                markArrayDirty(formGroup.get(key) as FormArray);
                break;
            case "FormControl":
                markControlDirty(formGroup.get(key) as FormControl);
                break;
        }
    });
}
const markArrayDirty = (formArray: FormArray) => {
    formArray.controls.forEach(control => {
        switch (control.constructor.name) {
            case "FormGroup":
                markGroupDirty(control as FormGroup);
                break;
            case "FormArray":
                markArrayDirty(control as FormArray);
                break;
            case "FormControl":
                markControlDirty(control as FormControl);
                break;
        }
    });
}
const markControlDirty = (formControl: FormControl) => {
    formControl.markAsDirty();
    formControl.updateValueAndValidity();
}

export const FormHelper = { markDirty, markArrayDirty, markControlDirty, markGroupDirty }