import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsernameGlobalProvider } from '../../providers/username-global/username-global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { Validator } from '../../validators/FormValidator';
import { ApiProvider } from '../../providers/api-provider/api-provider';
 
@IonicPage()
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})
export class CreateUserPage {
  username: string;
  isAdmin: boolean = false;
  CreateUserForm: FormGroup;
  submitAttempt: boolean = false;
  picture;
  role;
  roles:{roleId:number,category:number}[]=[];
  user = {email:'',userName:'',role:{}};
 
 
  roleName:string[]=[];
 
  flagCorrectUsername:boolean=false;
  flagCorrectEmail:boolean=false;
  flagIncorrectUsername:boolean = false;
  flagIncorrectEmail:boolean = false;
 
  constructor(private apiProvider: ApiProvider, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,public EventData: EventDataProvider, public UserGlobal: UsernameGlobalProvider, public formBuilder: FormBuilder, private menuCtrl: MenuController) {
    this.CreateUserForm = formBuilder.group({
      username: ['', Validators.compose([Validators.maxLength(15),Validators.pattern(/^[a-zA-Z][\w.-]*[a-zA-Z0-9]+$/),Validators.required])],
      email: ['',Validators.compose([Validators.required,Validators.pattern(/^\w+([\.-]?\ w+)*@\w+([\.-]?\w+)*\.[a-z]{2,3}/)])],
      isAdmin:[''],
  });
    this.username = navParams.get('param2');
    
  }
 
  addRole(role){
    this.role=role
  }
 
  addUser() {
      if(this.role == "superadmin"){
        this.user={email:this.user.email,userName:this.user.userName,role:this.roles[0]}
      }else if(this.role == "admin"){
        this.user={email:this.user.email,userName:this.user.userName,role:this.roles[1]}
      }else if(this.role == "user"){
        this.user={email:this.user.email,userName:this.user.userName,role:this.roles[2]}
      }
    this.apiProvider.addUser(this.user);
  }
 
  getRole(){
    this.apiProvider.getRole()

    .then(data1 => {
      this.roles = data1;
      for(var i=0; i<this.roles.length; i++){
        if(this.roles[i].category == 0){
          this.roleName[i] = "SUPERADMIN";
        }else if(this.roles[i].category==1){
          this.roleName[i] = "ADMIN";
        }else if(this.roles[i].category==2){
          this.roleName[i] = "USER";
        }
      }

    });
  }
  

  onBlurUsername(){
    if(!this.user.userName){
      this.flagCorrectUsername = false;
    }
    else{
    if(!this.CreateUserForm.valid){
    if(!this.CreateUserForm.controls.username.valid){
      this.flagIncorrectUsername = true;
      this.flagCorrectUsername=false;
    }
    else{
    this.flagIncorrectUsername = false;
      this.flagCorrectUsername=true;
    }
  }
}
  }
  onBlurEmail(){
    if(!this.user.email){
      this.flagIncorrectEmail = false;
    }
    else{
    if(!this.CreateUserForm.valid){
    if(!this.CreateUserForm.controls.email.valid){
      this.flagIncorrectEmail = true;
      this.flagCorrectEmail=false;
 
    }else{
      this.flagIncorrectEmail = false;
      this.flagCorrectEmail=true;
    }
  }
}
  }
 
 
  CreateNewUser(){
    if(this.CreateUserForm.valid){
      this.flagIncorrectUsername = false;
      this.flagIncorrectEmail = false;
     
      let alert = this.alertCtrl.create({
        cssClass: 'alert-style',
        title: '<p class="alert-title"><b>USER CREATED:</b><br /></p><hr />',

        subTitle: '<div class="alert-message"><b>USERNAME:</b> ' + this.user.userName + 
                  '<br><b>EMAIL:</b> ' + this.user.email 
                  + '</div>',   

       buttons:[
        {
          cssClass: 'alert-btn',
          text: 'CANCEL',
          role: 'cancel',
        },
        {
          cssClass: 'alert-btn',
          text: 'CONFIRM',
          role: 'confirm',
          handler: data => {
            this.addUser();
            this.submitAttempt = true;
            //this.picture = this.UserGlobal.getDefaultImage();
            this.UserGlobal.addNewUser(this.user);
            this.resetForm();
          }
        }
       ]
     });
     alert.present();
    }
  }
 
  resetForm(){
    this.CreateUserForm.reset();
  }
 
  ionViewDidEnter(){
    this.menuCtrl.enable(false, "userMenu");
    this.menuCtrl.enable(false, "adminMenu");
    this.getRole()
  }
}