import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import {serverURL, headersJSON} from '../global-variables';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
  formularioRegistro: FormGroup;

  constructor(public fr: FormBuilder, public alertController: AlertController,private http: HttpClient){

    this.formularioRegistro = this.fr.group({
      nombre: new FormControl('',Validators.required),
      usuario: new FormControl('',Validators.required),
      clave: new FormControl('',Validators.required),
      confirmacionclave: new FormControl('',Validators.required)
    });
   }

  ngOnInit() {
  }
  async guardar(){
    const f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Quien te crees tu o.0',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;

    }
    if(f.clave !== f.confirmacionclave){
      const alert = await this.alertController.create({
        header: 'Revisa de nuevo',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;

    }
    const hashedPassword: string = shajs('sha256').update(f.clave).digest('hex');
    const usuario ={
      nombre: f.nombre,
      user: f.usuario,
      password: hashedPassword,
    };

    this.registerUser(usuario);
    //localStorage.setItem('usuario', JSON.stringify(usuario));

  }
  registerUser(usuario){
    this.http.post(serverURL + '/register',JSON.stringify(usuario),{headers:headersJSON})
      .subscribe({ next: async (data) => {
        const alert = this.alertController.create({
          header: 'Respuesta del servidor',
          message: data.toString(),
          buttons: ['Aceptar'],
        });

        (await alert).present();

        },
        error:
          async (error) => {
            const alert = this.alertController.create({
              header: 'No se pudo conectar',
              message: error.toString(),
              buttons: ['Aceptar'],
            });
            (await alert).present();
          }
      });
  }
}
