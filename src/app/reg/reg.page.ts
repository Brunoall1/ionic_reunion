import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {

  constructor(public fb: FormBuilder){
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'clave': new FormControl("",Validators.required),
      'confirmacionclave': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
  }

}
