// Fungsi untuk memuat data JSON dan menampilkan di HTML
async function loadCards() {
    try {
        const response = await fetch("data.json"); // Ambil file JSON
        const data = await response.json(); // Konversi ke JSON
        const cardContainer = document.getElementById("accountCards");
        cardContainer.innerHTML = ""; // Kosongkan kontainer sebelum render

        // Loop melalui setiap guru dan buat card
        data.forEach((guru, index) => {
            cardContainer.innerHTML += `
            <div class="bg-white shadow-md rounded-[10px] p-4 card flex flex-col items-center text-center">
              <img src="${guru.foto}" alt="Foto Guru" class="w-full h-40 object-cover rounded-t-[10px]" />
              <h2 class="text-lg font-semibold mb-4 mt-2">${guru.nama}</h2>
              <div class="flex items-center w-full mb-2">
                <span class="font-semibold mr-2">Username:</span>
                <p id="username${index}" class="text-gray-600 flex-grow">${guru.username}</p>
                <button class="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                  onclick="copyToClipboard('username${index}')">
                  Copy
                </button>
              </div>
              <div class="flex items-center w-full mt-2">
                <span class="font-semibold mr-2">Password:</span>
                <p id="password${index}" class="text-gray-600 flex-grow">${guru.password}</p>
                <button class="bg-green-500 text-white px-2 py-1 text-sm rounded hover:bg-green-600"
                  onclick="copyToClipboard('password${index}')">
                  Copy
                </button>
              </div>
            </div>`;
        });
    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

// Fungsi untuk menyalin teks ke clipboard
function copyToClipboard(id) {
    const textToCopy = document.getElementById(id).textContent;
    navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
            Swal.fire({
                icon: "success",
                title: "Copied!",
                text: `Copied to clipboard: ${textToCopy}`,
                timer: 1500,
                showConfirmButton: false,
            });
        })
        .catch((err) => {
            Swal.fire({
                icon: "error",
                title: "Failed!",
                text: "Failed to copy. Please try again.",
            });
        });
}

// Fungsi untuk filter pencarian
function filterCards() {
    const searchInput = document
        .getElementById("searchInput")
        .value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
        const namaGuru = card.querySelector("h2").textContent.toLowerCase();
        if (namaGuru.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Panggil fungsi loadCards saat halaman selesai dimuat
window.onload = loadCards;