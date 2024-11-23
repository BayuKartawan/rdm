// Fungsi untuk memuat data JSON dan menampilkan di HTML
let currentDataHash = null;

// Fungsi untuk mengambil file JSON dan mengembalikan hash
async function fetchData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/BayuKartawan/rdm/main/data.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const newDataHash = hashData(JSON.stringify(data));

        // Jika hash data berubah, tampilkan notifikasi SweetAlert2
        if (newDataHash !== currentDataHash) {
            currentDataHash = newDataHash;
            showNotification(); // Tampilkan SweetAlert jika data berubah
        }

        return data;

    } catch (error) {
        console.error("Gagal memuat data:", error);
    }
}

// Fungsi untuk menghitung hash data (untuk membandingkan data yang diperbarui)
function hashData(data) {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
        hash = (hash << 5) - hash + data.charCodeAt(i);
        hash = hash & hash; // Mengatasi overflow
    }
    return hash;
}

// Fungsi untuk menampilkan notifikasi menggunakan SweetAlert2
function showNotification() {
    Swal.fire({
        title: 'Data Telah Diperbarui!',
        text: 'Klik tombol untuk memuat ulang data.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Refresh Data',
        cancelButtonText: 'Tutup'
    }).then((result) => {
        if (result.isConfirmed) {
            refreshData(); // Refresh data jika tombol "Refresh Data" ditekan
        }
    });
}

// Fungsi untuk memuat ulang data
function refreshData() {
    loadCards(); // Memuat data terbaru
}

// Fungsi untuk memuat data dan menampilkan kartu
async function loadCards() {
    const data = await fetchData();
    const cardContainer = document.getElementById("accountCards");
    cardContainer.innerHTML = ""; // Kosongkan kontainer sebelum menambahkan kartu baru

    if (data) {
        data.forEach((guru, index) => {
            cardContainer.innerHTML += `
                <div class="card">
                    <h2>${guru.nama}</h2>
                    <p>Username: ${guru.username}</p>
                    <p>Password: ${guru.password}</p>
                    <img src="${guru.foto}" alt="Foto Guru" />
                </div>
            `;
        });
    }
}

// Memuat data saat halaman pertama kali dimuat
window.onload = loadCards;


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