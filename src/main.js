const submitBtn = document.getElementById("subBtn");
const result = document.getElementById("resultText");
const nameInput = document.getElementById("nameInput");

submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();

  if (!name) {
    result.textContent = "Please enter a name!";
    return;
  }

  submitBtn.innerHTML =
    'Fetching data... <i class="fa-solid fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;
  result.textContent = "";

  try {
    const response = await fetch(`https://api.nationalize.io/?name=${name}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    if (data.country && data.country.length > 0) {
      const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });
      const topCountry = data.country[0];
      const countryName = getCountryNames.of(topCountry.country_id);
      const probability = (topCountry.probability * 100).toFixed(0);

      result.innerHTML = `<span> ${name} </span> is most likely from <span> ${countryName} </span> with <span> ${probability}% </span> probability`;
    } else {
      result.textContent = "No country prediction available for this name.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    result.textContent = "An error occurred while fetching data.";
  } finally {
    submitBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    submitBtn.disabled = false;
  }
});
