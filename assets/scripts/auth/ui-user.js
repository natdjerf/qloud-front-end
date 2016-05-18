'use strict';

const app = require('../app-data');
const apiNodes = require('./api-nodes.js');
const display = require('../display');

const success = (data) => {
  console.log(data);
};

const failure = (error) => {
  console.error(error);
};

const signInSuccess = (data) => {
  app.currentUser.token = data.user.token;
  app.currentUser.id = data.user._id;
  $('#sign-in-modal').modal('hide');
  console.log("Sign in successful");
  $('.all-nodes').show();
  $('.breadcrumb').show();
  $('.page-content').removeClass('hidden');
  $('.landing-header').addClass('hidden');
  apiNodes.getDirectory(display.displayAllNodes, failure, app.currentDirectory);
};

const signInFailure = (error) => {
  console.error(error);
  $('#sign-in-modal').modal('hide');
  $('#sign-in-fail-modal').modal('show');

};

const signUpSuccess = (data) => {
  console.log("Sign up successful");
  $('#sign-up-modal').modal('hide');
  $('#sign-up').each(function(){
    this.reset();
  });
};

const signUpFailure = (error) => {
  console.error(error);
  $('#sign-up-modal').modal('hide');
  $('#sign-up-fail-modal').modal('show');


};


const signOutSuccess = () => {
  app.currentUser.token = null;
  app.currentUser.id = null;
  app.currentDirectory = "home";
  console.log(app);
  console.log("You signed out bro. Sweet!");
  $('#sign-out-modal').modal('hide');
  $('.all-nodes').empty();
  $('.breadcrumb').hide();
  $('.breadcrumb .child').remove();
  $('.breadcrumb .root').addClass('active');
  $('.root').replaceWith( `<li class="root active">Home</li>` );
  //clear contents
};


const changePwSuccess = (data) => {
  console.log("Password change successful!");
  $('#change-password-modal').modal('hide');
  $('#change-password').each(function(){
    this.reset();
  //THIS needs to change to hide in BS
});
};


module.exports = {
  failure,
  success,
  changePwSuccess,
  signUpSuccess,
  signUpFailure,
  signOutSuccess,
  signInSuccess,
  signInFailure
};
