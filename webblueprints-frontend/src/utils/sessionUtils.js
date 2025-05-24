const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export const sessionUtils = {
  startSession() {
    localStorage.setItem("sessionStart", Date.now().toString());
    this.checkSession();
  },

  checkSession() {
    const start = parseInt(localStorage.getItem("sessionStart"));
    if (Date.now() - start > SESSION_DURATION) {
      this.endSession();
    }
  },

  endSession() {
    localStorage.clear();
    window.location.href = "/login";
  },
};
