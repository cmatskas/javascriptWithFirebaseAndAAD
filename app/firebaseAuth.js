let firebaseConfig = {
    apiKey: "<apiKey>",
    authDomain: "blazordemo-000000.firebaseapp.com",
    databaseURL: "https://blazordemo-000000.firebaseio.com",
    projectId: "blazordemo-000000",
    storageBucket: "blazordemo-000000.appspot.com",
    messagingSenderId: "549000000710",
    appId: "1:549489084710:web:dasdfasfasdfasfasdfad0710219e7",
    measurementId: "G-CH2E007CMT"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

let provider = new firebase.auth.OAuthProvider('microsoft.com');
// set the persistence to session
let accessToken = '';

provider.setCustomParameters({
    tenant: 'b55f0c51-61a7-45c3-84df-33569b247796',
});
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// this is required for Graph
provider.addScope('mail.read');

function signIn(){
    firebase.auth().signInWithPopup(provider)
        .then(function(result){
            showWelcomeMessage(result.additionalUserInfo.profile.displayName);
            accessToken = result.credential.accessToken;
            console.log('Authentication successful');
        })
        .catch(function(error) {
            console.log(`Error during authentication: ${error}`);
        });
}

function signOut(){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        accessToken='';
        showSignOutMessage();
        console.log('user signed out');
      }).catch(function(error) {
        // An error happened.
        console.error('Sign out messed up somewhere...meh');
      });
}

function seeProfile(){
    callMSGraph(graphConfig.graphMeEndpoint, accessToken, updateUI);
    profileButton.classList.add('d-none');
    mailButton.classList.remove('d-none');
}

function readMail() {
    callMSGraph(graphConfig.graphMailEndpoint, accessToken, updateUI);
}