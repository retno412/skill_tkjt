// Bank Data Skenario Uji Kecenderungan Adaptif (Analisis Sistematis)
// Berdasarkan Kurikulum Merdeka TJKT & PPLG Fase E/F

const jenis_tes = 'adaptif';

const bankSoalBagianA = [
    {
        id: 1,
        pertanyaan: "Sistem aplikasi web sekolah mendadak memunculkan pesan 'Error 500: Internal Server Error' dan tidak bisa diakses sama sekali oleh siswa. Tindakan investigasi pertama apa yang paling menarik bagi Anda?",
        opsi: [
            { teks: "Membuka baris kode program, meneliti berkas log error aplikasi, dan melacak letak kegagalan fungsi.", kategori: "SE" },
            { teks: "Memeriksa status komputer server, utilisasi CPU, kondisi kabel fisik, dan menguji konektivitas ping jaringan.", kategori: "NE" },
            { teks: "Mengecek struktur basis data, meneliti tabel query SQL yang macet, atau memeriksa relasi data yang rusak.", kategori: "SE" },
            { teks: "Memeriksa konfigurasi DNS records, masa berlaku domain, serta pemetaan port pada perangkat firewall.", kategori: "NE" }
        ]
    },
    {
        id: 2,
        pertanyaan: "Ketika Anda dihadapkan pada sebuah teknologi atau masalah baru yang belum pernah diajarkan di kelas, bagaimana cara Anda mulai memahaminya?",
        opsi: [
            { teks: "Memecah masalah tersebut menjadi sub-langkah logis yang kecil, lalu menyusun algoritma penyelesaiannya.", kategori: "SE" },
            { teks: "Menelusuri komponen sistem dari ujung ke ujung (end-to-end) untuk melihat bagaimana arus fisik data mengalir.", kategori: "NE" }
        ]
    },
    {
        id: 3,
        pertanyaan: "Aplikasi absensi digital sekolah mengalami error/crash tepat pada hari penting ujian nasional. Mentalitas utama Anda dalam merespons kondisi darurat ini adalah...",
        opsi: [
            { teks: "Mencari letak bug pada baris kode program, memperbaikinya (patching), lalu melakukan compile ulang aplikasi.", kategori: "SE" },
            { teks: "Memastikan stabilitas infrastruktur jaringan, sirkulasi bandwidth, dan ketersediaan resource server penampung data.", kategori: "NE" }
        ]
    },
    {
        id: 4,
        pertanyaan: "Sebuah platform layanan digital berjalan sangat lambat saat diakses oleh banyak pengguna secara bersamaan. Pendekatan mana yang akan Anda pilih untuk mempercepatnya?",
        opsi: [
            { teks: "Melakukan optimasi pada struktur algoritma kode, menyederhanakan looping, dan melakukan indexing query database.", kategori: "SE" },
            { teks: "Mengecek lebar bandwidth internet, menganalisis beban trafik pada jalur router, dan menambah kapasitas hardware.", kategori: "NE" }
        ]
    },
    {
        id: 5,
        pertanyaan: "Jika sekolah memberikan waktu luang untuk mempelajari teknologi baru demi persiapan masa depan, bidang mana yang paling membuat Anda penasaran?",
        opsi: [
            { teks: "Mempelajari bahasa pemrograman baru, framework arsitektur perangkat lunak modern, atau integrasi model AI.", kategori: "SE" },
            { teks: "Mengeksplorasi perangkat keras enterprise baru, protokol routing canggih, virtualisasi cloud, atau keamanan siber.", kategori: "NE" }
        ]
    },
    {
        id: 6,
        pertanyaan: "Dalam sebuah proyek kolaborasi kelompok pembuatan sistem teknologi di sekolah, peran mana yang secara alami paling ingin Anda ambil?",
        opsi: [
            { teks: "Merancang alur logika aplikasi, menyusun struktur database, dan menulis baris demi baris perintah pemrograman.", kategori: "SE" },
            { teks: "Menyiapkan infrastruktur server, mengonfigurasi interkoneksi jaringan antar komputer, dan mengamankan gerbang akses.", kategori: "NE" }
        ]
    },
    {
        id: 7,
        pertanyaan: "Terjadi insiden keamanan di mana data penting di dalam sistem berisiko bocor akibat celah keamanan digital. Langkah proteksi apa yang akan Anda prioritaskan?",
        opsi: [
            { teks: "Melakukan audit keamanan kode (secure coding), enkripsi variabel data, dan menutup celah otentikasi pada aplikasi.", kategori: "SE" },
            { teks: "Memperkuat konfigurasi dinding pertahanan (firewall rules), membatasi hak akses port server, dan memantau log aktivitas paket data.", kategori: "NE" }
        ]
    },
    {
        id: 8,
        pertanyaan: "Bagaimana cara Anda memastikan secara mutlak bahwa sistem atau pekerjaan IT yang Anda bangun sudah benar-benar berfungsi dengan sempurna?",
        opsi: [
            { teks: "Melakukan pengujian unit (unit testing) dan automation test berkali-kali menggunakan berbagai variasi input data.", kategori: "SE" },
            { teks: "Melakukan uji ketahanan stabilitas koneksi (ping/traceroute terus menerus) serta memantau kualitas redaman transmisi.", kategori: "NE" }
        ]
    },
    {
        id: 9,
        pertanyaan: "Jika Anda memiliki waktu luang 2 jam di laboratorium komputer sekolah, aktivitas mandiri mana yang paling menyenangkan untuk dikerjakan?",
        opsi: [
            { teks: "Membedah studi kasus pemrograman, menyelesaikan tantangan logika algoritma, atau membuat tampilan UI interaktif baru.", kategori: "SE" },
            { teks: "Membuat simulasi topologi jaringan kompleks, mengutak-atik sistem operasi server Linux CLI, atau menguji konfigurasi router.", kategori: "NE" }
        ]
    },
    {
        id: 10,
        pertanyaan: "Ketika diminta merapikan dokumentasi hasil kerja proyek teknologi agar mudah dipelajari oleh adik kelas, apa fokus utama dokumen Anda?",
        opsi: [
            { teks: "Menyusun penjelasan struktur kode, fungsi-fungsi variabel, dokumentasi API, serta alur logika diagram alir (flowchart).", kategori: "SE" },
            { teks: "Menggambar diagram topologi jaringan, tabel pemetaan IP Address, serta daftar perintah konfigurasi hardware server.", kategori: "NE" }
        ]
    },
    {
        id: 11,
        pertanyaan: "Sebuah sistem teknologi mengalami error yang terus berulang tanpa pola yang jelas. Strategi pelacakan (*troubleshooting*) mana yang Anda gunakan?",
        opsi: [
            { teks: "Melakukan proses debugging baris demi baris kode menggunakan terminal pembaca variabel untuk melihat penyimpangan nilai logika.", kategori: "SE" },
            { teks: "Menelusuri jalur fisik kabel, memeriksa kondisi konektor, lampu indikator hardware, atau menganalisis paket data yang lewat.", kategori: "NE" }
        ]
    },
    {
        id: 12,
        pertanyaan: "Apa indikator utama yang membuat Anda merasa sangat puas dan bangga setelah menyelesaikan sebuah proyek teknologi?",
        opsi: [
            { teks: "Ketika baris program yang saya tulis berhasil lolos semua skenario uji pengujian, berjalan efisien, dan fiturnya interaktif.", kategori: "SE" },
            { teks: "Ketika seluruh infrastruktur komputer saling terhubung dengan kecepatan tinggi, aman dari gangguan, dan sistemnya andal.", kategori: "NE" }
        ]
    }
];

const bankSoalBagianB = [
    { id: 13, label: "Tuliskan 3 langkah analisis sistematis Anda ketika sebuah website sekolah mendadak sangat lambat saat diakses bersamaan oleh ribuan siswa!" },
    { id: 14, label: "Satu ruangan laboratorium komputer mendadak kehilangan koneksi internet, sementara ruangan lab lain aman. Tuliskan 3 langkah urutan pengecekannya!" },
    { id: 15, label: "Jika sebuah program aplikasi kalkulator buatan Anda tidak memunculkan error tetapi memberikan hasil perhitungan yang salah, bagaimana urutan langkah Anda melacaknya?" },
    { id: 16, label: "Jaringan Wi-Fi sekolah terputus hanya pada jam-jam tertentu (misal tiap jam 12 siang). Tuliskan dugaan logis Anda beserta cara pembuktiannya!" },
    { id: 17, label: "Ketika industri merilis alat kerja (*tools*), bahasa, atau perangkat keras jaringan baru, tuliskan strategi adaptasi cepat Anda agar bisa langsung menguasainya!" }
];

const bankSoalBagianC = [
    { id: 18, label: "Sebutkan satu masalah teknologi (baik software, komputer, maupun internet) yang pernah Anda hadapi dalam kehidupan sehari-hari, dan ceritakan bagaimana cara Anda menganalisis serta menyelesaikannya!" },
    { id: 19, label: "Jika Anda diberikan kebebasan penuh dan anggaran untuk membangun satu proyek IT di SMK AMI Deltamas, proyek apa yang ingin Anda buat? Tuliskan tahapan rencana pembuatannya!" },
    { id: 20, label: "Dunia teknologi berkembang sangat cepat setiap detiknya. Apa rencana konkret Anda setelah lulus nanti agar keahlian Anda tetap relevan dan dicari oleh industri modern?" }
];