import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fr: FormBuilder, public alertController: AlertController){
    
    this.formularioRegistro = this.fr.group({
      'nombre': new FormControl("",Validators.required),
      'clave': new FormControl("",Validators.required),
      'confirmacionclave': new FormControl("",Validators.required)
    });
   }

  ngOnInit() {
  }
  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Quien te crees tu o.0',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;

    }

    var usuario ={
      nombre: f.nombre,
      clave: f.clave
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));

  }
}
