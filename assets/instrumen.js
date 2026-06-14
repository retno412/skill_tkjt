/**
 * assets/instrumen.js
 * Logika Kontrol Evaluasi Minat & Bakat Level 1 (SE vs NE)
 * Terintegrasi Supabase dengan skema relasi tabel pengerjaan & jawaban
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil & Validasi Sesi Pengisian Identitas Siswa dari Level 0
    const activeSiswaRaw = sessionStorage.getItem('active_siswa');
    if (!activeSiswaRaw) {
        alert("Akses Ditolak! Anda wajib melengkapi Form Identitas Siswa terlebih dahulu.");
        window.location.href = 'identitas_siswa.html';
        return;
    }
    const activeSiswa = JSON.parse(activeSiswaRaw);

    // Update Tampilan Header Profil
    document.getElementById('navNama').innerText = activeSiswa.nama || "Siswa Tanpa Nama";
    document.getElementById('navKelas').innerText = `${activeSiswa.kelas || "-"} | NISN: ${activeSiswa.nisn || "-"}`;

    // 2. Data Master Pertanyaan Pilihan Ganda (Bagian A)
    const bankPG = [
        { id: 1, q: "Aktivitas utama di laboratorium komputer yang paling membuatmu tertarik adalah...", o: ["Membuat susunan program aplikasi baru", "Menghubungkan antar komputer dalam jaringan", "Mendesain interface halaman website", "Mengatur tata letak kabel data UTP"] },
        { id: 2, q: "Bagaimana cara berpikirmu ketika dihadapkan pada suatu tantangan sistem IT?", o: ["Menyusun langkah algoritma pemecahan masalah", "Menelusuri titik gangguan sinyal internet", "Merapikan baris kode yang berantakan", "Mengonfigurasi perangkat keras agar aktif"] },
        { id: 3, q: "Perangkat lunak (tools) mana yang paling memicu rasa penasaranmu untuk dipelajari?", o: ["Visual Studio Code (Editor Kode)", "Cisco Packet Tracer / Winbox MikroTik", "Android Studio / Flutter Framework", "Wireshark (Penganalisis Paket Data)"] },
        { id: 4, q: "Jika diberikan proyek tim akhir semester, kamu ingin membangun apa?", o: ["Aplikasi kasir otomatis atau toko online", "Infrastruktur jaringan Wi-Fi gedung sekolah", "Game edukasi interaktif berbasis mobile", "Server operating system berbasis Linux"] },
        { id: 5, q: "Mata pelajaran produktif TJKT mana yang paling kamu sukai?", o: ["Dasar Logika & Pemrograman Pemrograman", "Teknologi Routing & Switching", "Sistem Manajemen Basis Data (SQL)", "Administrasi Sistem Jaringan (Linux Server)"] },
        { id: 6, q: "Kendala mana yang menurutmu paling menantang dan sabar untuk diselesaikan?", o: ["Mencari kesalahan ketik (bug) pada script", "Mencari penyebab koneksi internet terputus", "Memperbaiki tata letak visual aplikasi", "Memperbaiki kesalahan konfigurasi router"] },
        { id: 7, q: "Konsep dasar komputer mana yang paling ingin atau telah kamu kuasai?", o: ["Struktur Data & Algoritma Pemrograman", "Perhitungan Subnetting & Alokasi IP Address", "Arsitektur API & Integrasi Layanan Cloud", "Keamanan Siber & Firewall Jaringan"] },
        { id: 8, q: "Bagaimana gaya belajar produktif yang paling efektif bagimu?", o: ["Mengetik baris kode lalu langsung melihat hasilnya", "Menyalakan perangkat fisik lalu menguji koneksi", "Mengikuti tutorial pembuatan modul aplikasi", "Membuat simulasi topologi jaringan komputer"] },
        { id: 9, q: "Apa target karier profesional masa depan yang paling kamu impikan?", o: ["Programmer / Web or Mobile Developer", "Network Engineer / Network Administrator", "Software Architect / Database Engineer", "System Administrator / Cyber Security Analyst"] },
        { id: 10, q: "Kapan kamu merasa paling bangga terhadap hasil kerjamu di bidang IT?", o: ["Saat aplikasi rancanganku berhasil digunakan orang", "Saat koneksi jaringan stabil cepat tak putus", "Saat berhasil memecahkan logika fitur rumit", "Saat berhasil mengamankan sistem dari peretas"] },
        { id: 11, q: "Lingkungan kerja produktif seperti apa yang paling kamu harapkan?", o: ["Duduk fokus menulis dan menguji fungsional kode", "Bergerak menata perangkat dan instalasi kabel", "Merancang alur logika arsitektur software", "Memantau lalu lintas data lewat layar monitor"] },
        { id: 12, q: "Jika ada waktu luang untuk belajar mandiri, materi apa yang kamu cari?", o: ["Mempelajari sintaks bahasa pemrograman baru", "Mengeksplorasi OS Server komersial terupdate", "Mencoba framework pengembangan web terbaru", "Mempelajari transmisi serat optik & nirkabel"] }
    ];

    // 3. Data Master Pertanyaan Uraian Esai (Bagian B)
    const bankEsai = [
        { id: 1, q: "Ceritakan masalah teknologi (software/hardware/jaringan) yang paling sering kamu temui di sekitarmu dan bagaimana cara kamu menyelesaikannya?" },
        { id: 2, q: "Menurut sudut pandangmu, apa yang membuat sebuah aplikasi dikatakan 'bagus' dibanding dengan jaringan komputer yang 'bagus'? Mana yang paling ingin kamu wujudkan?" },
        { id: 3, q: "Dalam sistem absensi digital sekolah, bagian mana yang lebih ingin kamu kerjakan? (Membuat program pengolah datanya ATAU memastikan perangkat mesin absensi terhubung lancar ke server? Jelaskan alasannya)." },
        { id: 4, q: "Tuliskan langkah-langkah logis yang akan kamu ambil ketika menyelidiki jaringan internet di area sekolah yang mendadak lambat." },
        { id: 5, q: "Jelaskan apa itu algoritma menggunakan bahasamu sendiri beserta satu contoh penerapannya dalam kehidupan sehari-hari!" },
        { id: 6, q: "Jelaskan apa yang dimaksud dengan jaringan komputer beserta contoh pemanfataannya yang paling penting menurutmu!" },
        { id: 7, q: "Teknologi atau keahlian spesifik apa yang paling ingin kamu dalami secara konsisten dalam 1 tahun ke depan? Berikan alasan kuatmu." },
        { id: 8, q: "Di antara dua pekerjaan ini: 'Menulis ulang logika sistem yang error' vs 'Menata ulang komponen fisik yang saling terhubung' — mana yang menurutmu lebih menarik? Berikan contohnya!" },
        { id: 9, q: "Siapa tokoh teknologi atau apa produk teknologi yang paling kamu kagumi saat ini? Berikan alasan mengapa hal tersebut menginspirasimu." },
        { id: 10, q: "Jika kamu tergabung dalam sebuah tim proyek IT besar, peran spesifik apa yang paling cocok dengan kepribadian dan keahlianmu? Mengapa?" }
    ];

    // 4. Render Komponen ke DOM HTML
    const containerPG = document.getElementById('containerPG');
    const containerEsai = document.getElementById('containerEsai');

    bankPG.forEach((item, index) => {
        const labels = ['A', 'B', 'C', 'D'];
        let optionsHTML = '';
        item.o.forEach((option, oIdx) => {
            optionsHTML += `
                <label class="flex items-start gap-3 p-3.5 bg-slate-950 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700 transition-all group text-sm">
                    <input type="radio" name="pg_${item.id}" value="${labels[oIdx]}" required class="mt-1 accent-blue-500 h-4 w-4">
                    <span class="text-slate-400 group-hover:text-slate-200 font-mono font-bold">${labels[oIdx]}.</span>
                    <span class="text-slate-300 group-hover:text-white">${option}</span>
                </label>
            `;
        });
        containerPG.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm card-soal" data-type="pg">
                <p class="text-slate-100 font-medium mb-4 text-sm leading-relaxed"><span class="text-blue-400 font-mono font-bold mr-2">${index + 1}.</span>${item.q}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">${optionsHTML}</div>
            </div>
        `;
    });

    bankEsai.forEach((item, index) => {
        containerEsai.innerHTML += `
            <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm card-soal" data-type="esai">
                <p class="text-slate-100 font-medium mb-3 text-sm leading-relaxed"><span class="text-purple-400 font-mono font-bold mr-2">${index + 1}.</span>${item.q}</p>
                <textarea name="esai_${item.id}" required rows="3" placeholder="Ketik jawaban analisis Anda di sini..." 
                    class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-purple-500 transition-colors text-sm font-sans leading-relaxed"></textarea>
            </div>
        `;
    });

    // 5. Efek Progress Bar Real-time Tracking
    const totalInputs = bankPG.length + bankEsai.length;
    document.addEventListener('input', () => {
        let filledCount = 0;
        bankPG.forEach(item => { if(document.querySelector(`input[name="pg_${item.id}"]:checked`)) filledCount++; });
        bankEsai.forEach(item => { if(document.querySelector(`textarea[name="esai_${item.id}"]`).value.trim() !== "") filledCount++; });
        
        const progressPercentage = Math.round((filledCount / totalInputs) * 100);
        document.getElementById('progressBar').style.width = `${progressPercentage}%`;
    });

    // 6. Alur submit form, perhitungan skor, & penyimpanan basis data Supabase
    document.getElementById('formUjian').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Kunci Tombol loading mencegah spam submit
        const btnSubmit = document.getElementById('btnSubmit');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> Menyimpan Hasil ke Cloud...`;

        let skorSE = 0;
        let skorNE = 0;

        // Hitung Otomatis Pola Bobot Bagian A
        bankPG.forEach(item => {
            const terpilih = document.querySelector(`input[name="pg_${item.id}"]:checked`);
            if (terpilih) {
                const val = terpilih.value;
                if (val === 'A' || val === 'C') skorSE++;
                if (val === 'B' || val === 'D') skorNE++;
            }
        });

        const totalSkor = skorSE + skorNE;
        const persenSE = totalSkor > 0 ? Math.round((skorSE / totalSkor) * 100) : 0;
        const persenNE = totalSkor > 0 ? Math.round((skorNE / totalSkor) * 100) : 0;
        const selisih = Math.abs(persenSE - persenNE);

        // Klasifikasi Kategori Penjurusan Sesuai Matriks
        let kategori = "Seimbang";
        if (selisih >= 30) {
            kategori = persenSE > persenNE ? "Sangat condong SE" : "Sangat condong JKT";
        } else if (selisih >= 10 && selisih <= 29) {
            kategori = persenSE > persenNE ? "Condong SE" : "Condong JKT";
        }

        const idPengerjaan = activeSiswa.id_pengerjaan || 'TEST-' + Date.now();

        // Object Data Payload untuk Tabel 'pengerjaan'
        const payloadPengerjaan = {
            id_pengerjaan: idPengerjaan,
            nisn: activeSiswa.nisn || "0000000000",
            nama: activeSiswa.nama || "Guest Student",
            kelas: activeSiswa.kelas || "X TJKT",
            jenis_test: "instrumen", // Sesuai instruksi master
            skor_se: skorSE,
            skor_ne: skorNE,
            persen_se: persenSE,
            persen_ne: persenNE,
            kesimpulan_kategori: kategori,
            nilai_level0_prasyarat: activeSiswa.skor_level0 || 0,
            created_at: new Date().toISOString()
        };

        // Array Objek Jawaban Esai untuk Tabel 'jawaban'
        const payloadJawabanEsai = [];
        bankEsai.forEach(item => {
            const textJawaban = document.querySelector(`textarea[name="esai_${item.id}"]`).value.trim();
            payloadJawabanEsai.push({
                id_pengerjaan: idPengerjaan,
                nomor_soal: item.id,
                pertanyaan_teks: item.q,
                jawaban_teks: textJawaban,
                indikator_penilaian: "Pending Guru", // Akan diperbarui di dasbor guru piket
                created_at: new Date().toISOString()
            });
        });

        // Eksekusi Simpan ke Supabase Server
        try {
            const supabase = window.supabaseClient || window.supabase;
            if (!supabase) throw new Error("SDK Supabase tidak termuat sempurna / konfigurasi salah.");

            // 1. Masukkan ke tabel pengerjaan
            const { error: errorPengerjaan } = await supabase
                .from('pengerjaan')
                .insert([payloadPengerjaan]);
            if (errorPengerjaan) throw errorPengerjaan;

            // 2. Masukkan array ke tabel jawaban esai
            const { error: errorJawaban } = await supabase
                .from('jawaban')
                .insert(payloadJawabanEsai);
            if (errorJawaban) throw errorJawaban;

            // Jika sukses, munculkan dasbor ringkasan hasil & render diagram batang
            bukaModalHasil(idPengerjaan, kategori, persenSE, persenNE);

        } catch (err) {
            console.error("Supabase Error Data Saving:", err.message);
            alert(`Gagal menyimpan data ke database cloud: ${err.message}\n\nSistem akan mencadangkan visualisasi lokal.`);
            // Pemulihan lokal (Fallback jika offline)
            bukaModalHasil(idPengerjaan, kategori, persenSE, persenNE);
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = `<i class="fa-solid fa-paper-plane"></i> Kirim Hasil Evaluasi & Simpan Passport`;
        }
    });

    // 7. Render Diagram Batang Menggunakan Chart.js inside Modal
    function bukaModalHasil(id, kat, pSE, pNE) {
        document.getElementById('resIDPengerjaan').innerText = `ID PENGERJAAN: ${id}`;
        document.getElementById('resKategori').innerText = kat.toUpperCase();
        document.getElementById('resPersenSE').innerText = `${pSE}%`;
        document.getElementById('resPersenNE').innerText = `${pNE}%`;

        // Ubah warna teks kategori berdasarkan kecondongan
        const elKat = document.getElementById('resKategori');
        if(kat.includes('SE')) { elKat.className = "text-xl font-extrabold text-blue-400 tracking-wide"; }
        else if(kat.includes('JKT')) { elKat.className = "text-xl font-extrabold text-cyan-400 tracking-wide"; }
        else { elKat.className = "text-xl font-extrabold text-amber-400 tracking-wide"; }

        document.getElementById('modalHasil').classList.remove('hidden');

        // Reset canvas chart prevent glitching duplicate render
        const ctx = document.getElementById('chartHasil').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Software Engineer (SE)', 'Network Engineer / JKT'],
                datasets: [{
                    label: 'Persentase Kecondongan (%)',
                    data: [pSE, pNE],
                    backgroundColor: ['rgba(59, 130, 246, 0.6)', 'rgba(34, 211, 238, 0.6)'],
                    borderColor: ['#3b82f6', '#22d3ee'],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                indexAxis: 'y', // Mengubah menjadi diagram batang horizontal
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
                    y: { grid: { display: false }, ticks: { color: '#ffffff', font: { weight: 'bold' } } }
                }
            }
        });
    }
});