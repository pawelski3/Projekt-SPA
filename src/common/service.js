export const service = {

  getRooms(parametr) {
    // pobiera liste wszystkich pokoi
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
  },

  dateCompare (t, n) {
    let time = t.split("-")
    let next = n.split("-")
    if (next[0] < time[0]) { return false }
    if (next[0] > time[0]) { return true }
    if (next[0] == time[0]) {
      if (next[1] > time[1]) { return true }
      if (next[1] == time[1]) {
        if (next[2] > time[2]) { return true }
        else { return false }
      } else { return false }
    }
  }

};
