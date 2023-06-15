function setCopyrightYear() {
    let thisYear = new Date();
    $("#copyright-year").text(thisYear.getUTCFullYear());
}