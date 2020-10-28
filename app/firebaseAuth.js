let firebaseConfig = {
    apiKey: "AIzaSyAzVNCPJKi9G9GrUIuDlBitV-CRxbiUUas",
    authDomain: "blazordemo-286100.firebaseapp.com",
    databaseURL: "https://blazordemo-286100.firebaseio.com",
    projectId: "blazordemo-286100",
    storageBucket: "blazordemo-286100.appspot.com",
    messagingSenderId: "549489084710",
    appId: "1:549489084710:web:d047f4d2211ad0710219e7",
    measurementId: "G-CH2EG97CMT"
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
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

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