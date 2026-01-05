document.addEventListener("DOMContentLoaded", function () {
  const allBtn = document.querySelectorAll(".searchBtn");
  const SearchBar = document.querySelector(".searchBar");
  const SearchInput = document.getElementById("searchInput");
  const SearchClose = document.getElementById("searchClose");

  for (var i = 0; i < allBtn.length; i++) {
    allBtn[i].addEventListener("click", function () {
      SearchBar.style.visibility = "visible";
      SearchBar.classList.add("open");
      this.setAttribute("aria-expanded", "true");
      SearchInput.focus();
    });
  }
  SearchClose.addEventListener("click", function () {
    SearchBar.style.visibility = "hidden";
    SearchBar.classList.remove("open");
    this.setAttribute("aria-expanded", "false");
  });
});
