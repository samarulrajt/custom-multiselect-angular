Usage

Add it to your parent component

` 
form: FormGroup;
objectOptions = [
  { id: 1, name: 'Extra cheese' },
  { id: 2, name: 'Mushroom' },
  { id: 3, name: 'Onion' },
];
constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      toppings: [[], Validators.required]
})  
`
`submit() {
    console.log('Selected users:', this.form.value);
  }`


Add it to your parent component template

`<form [formGroup]="form" (ngSubmit)="submit()">`

just string[]

`<app-custom-multiselect
    formControlName="toppings"
    [options]="['honey', 'milk']"
    placeholder="Toppings">
  </app-custom-multiselect>`

if array of objects

`<app-custom-multiselect
    formControlName="toppings"
    [options]="objectOptions"
    optionLabel="name"
    optionValue="id"
    placeholder="Toppings">
</app-custom-multiselect>`
`<button type="submit" [disabled]="form.invalid">Submit</button>`
`</form>`
`

Happy Coding!
