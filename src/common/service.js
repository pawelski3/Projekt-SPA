export const service = {

  getRooms(parametr) {
    // pobiera liste wszystkich pokoi
    //console.log("json rooms  " + parametr)
    return fetch(`http://localhost:3000/${parametr}`)
      .then(response => response.json());
  },

  setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },

  getDate(){
    let utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
    return utc
}


};
