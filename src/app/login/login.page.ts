import { Component, OnInit } from '@angular/core';
import{
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup

  constructor(public fb: FormBuilder, public alertController: AlertController, private http: HttpClient) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("",Validators.required),
      'clave': new FormControl("",Validators.required)

    })

  }
  fetchInvitados(usuario){
    const headers = { 'content-type': 'application/json'};
    this.http.post('http://localhost:10000/login',JSON.stringify(usuario),{'headers':headers}).subscribe(function(data) {
      console.log(data);
      if(data == 'true'){
        console.log('ingresado');

      }else{
        const alert = this.alertController.create({
          header: 'Quien te crees tu o.0',
          message: 'Estos Datos no son Correcto',
          buttons: ['Aceptar'],
        });
         alert.present();

      }
      // let invitados = JSON.parse(data);
      // if(usuario.nombre == y.nombre && usuario.clave == y.clave){
      //   console.log('ingresado');
      // }else{
      //   const alert = await this.alertController.create({
      //     header: 'Quien te crees tu o.0',
      //     message: 'Estos Datos no son Correcto',
      //     buttons: ['Aceptar'],
      //   });
      //   await alert.present();

      // }


      // console.log(data);
    });

  }

  ngOnInit() {
  }
 async ingresar(){
    var y = this.formularioLogin.value;
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    this.fetchInvitados(y);

  }

}
