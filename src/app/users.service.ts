import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

//var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
      return result
    }).catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage)
      return error
    });
  }
  register(email, password, name){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      let userEmail = email;
      let userName = name;
      let userID = data.user.uid;
      console.log(userID)
      firebase.database().ref().child("Admin/" + userID).update({
        email: userEmail,
        name: userName,
        hasProfilePic: false,
        role: 'Admin'
      })
      return data
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage, errorCode)
      return error
    })
  }
  passwordReset(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log("Email has been sent")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }
  signOut(){
    return new Promise((resolve, reject) =>{
      firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        resolve()
        this.checkingAuthState().then(data=>{
          console.log(data);
        });
      }).catch(error => {
        // An error happened.
      });
    })
  }
  checkingAuthState(){
    return new Promise((resolve, reject) =>{
      firebase.auth().onAuthStateChanged((user) =>{
        if(user){
          console.log(user);
          resolve (user)
        } else {
        }
      })
    })
  }
  retrievingUserInfo(uid){
    return new Promise((resolve, reject) => {
      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        let values = snap.val()
        console.log(values["name"]);
        console.log(values["email"]);
        let userProfile = {
          key: snap.key,
          displayName : values["name"],
          email : values["email"],
        }
        resolve (userProfile)
      })
    })
  }
}
