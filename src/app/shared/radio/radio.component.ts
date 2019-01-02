import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radio-option.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>RadioComponent),
    multi: true
    }
  ]
})
export class RadioComponent implements OnInit {

  @Input() options: RadioOption[]

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value)
  }

  /**
   * Vai escrever um novo valor para o elemento e vai passar o valor para as diretivas.
   */
  writeValue(obj: any): void {
    this.value = obj
  }

  /**
   * Passam a função para a gente e tem que chamá-la sempre que o valor mudar.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  /**
   * Só se quiser registrar que o usuário entrou no seu componente
   */
  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
