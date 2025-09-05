import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-multiselect',
  templateUrl: './custom-multiselect.html',
  styleUrls: ['./custom-multiselect.css'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomMultiselectComponent),
      multi: true
    }
  ]
})
export class CustomMultiselectComponent implements ControlValueAccessor {
  @Input() options: any[] = []; // array of strings or objects
  @Input() placeholder: string = 'Select';
  @Input() optionLabel: string = ''; // e.g., 'name'
  @Input() optionValue: string = ''; // e.g., 'id'

  selected: any[] = [];
  dropdownOpen = false;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private elRef: ElementRef) {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.onTouched();
  }

  getLabel(option: any) {
    return this.optionLabel ? option[this.optionLabel] : option;
  }

  getValue(option: any) {
    return this.optionValue ? option[this.optionValue] : option;
  }

  onToggleOption(event: Event, option: any) {
    const value = this.getValue(option);
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selected.push(value);
    } else {
      this.selected = this.selected.filter(v => v !== value);
    }
    this.onChange(this.selected);
  }

  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selected = this.options.map(o => this.getValue(o));
    } else {
      this.selected = [];
    }
    this.onChange(this.selected);
  }

  getSelectedLabels(): string {
    if (!this.selected.length) return this.placeholder;

    return this.options
      .filter(o => this.selected.includes(this.getValue(o)))
      .map(o => this.getLabel(o))
      .join(', ');
  }

  // Close dropdown only if clicked outside
  @HostListener('document:click', ['$event.target'])
  clickOutside(targetElement: HTMLElement) {
    if (this.dropdownOpen && !this.elRef.nativeElement.contains(targetElement)) {
      this.dropdownOpen = false;
      this.onTouched();
    }
  }

  // ControlValueAccessor
  writeValue(obj: any): void { this.selected = obj || []; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}

