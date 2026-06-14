/**
 * Komponen Bersama: Modal Identitas Siswa
 * Menyimpan data ke Supabase & menginisiasi sesi ujian siswa
 */

// Fungsi untuk menutup modal secara global
window.closeStudentModal = function() {
    const modalContainer = document.getElementById('student-identity-modal');
    if (modalContainer) {
        modalContainer.remove();
    }
};

window.initStudentModal = function(testTypeLabel, onValidationSuccess) {
    let modalContainer = document.getElementById('student-identity-modal');
    
    if (!modalContainer) {
        modalContainer = document.createElement('div');
        modalContainer.id = 'student-identity-modal';
        // Menambahkan id "modal-overlay" untuk menangkap deteksi klik di luar pop-up
        modalContainer.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300';
        
        modalContainer.innerHTML = `
            <div id="modal-box" class="bg-white dark:bg-[#111827] border border-slate-200 dark:border-gray-700 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl transform scale-100 transition-all duration-300 relative">
                
                <button type="button" onclick="window.closeStudentModal()" class="absolute top-4 right-4 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-400 hover:text-slate-600 dark:hover:text-white flex items-center justify-center transition duration-200">
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>

                <div class="px-6 py-5 bg-slate-50 dark:bg-gray-800/50 border-b border-slate-200 dark:border-gray-800 flex items-center gap-3 pr-12">
                    <div class="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <i class="fa-solid fa-user-astronaut text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-base font-bold text-slate-900 dark:text-white">Konfirmasi Identitas</h3>
                        <p class="text-xs text-slate-400 font-mono tracking-wider uppercase">Modul Tes: <span id="modal-test-label" class="text-cyan-400 font-bold"></span></p>
                    </div>
                </div>

                <form id="form-identity-student" class="p-6 space-y-4">
                    <div id="modal-error-msg" class="hidden p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium flex items-center gap-2">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                        <span id="error-text">Mohon lengkapi semua field wajib!</span>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nama Lengkap <span class="text-rose-500">*</span></label>
                        <input type="text" id="stu_name" required placeholder="Contoh: Muhammad Rafli" 
                            class="w-full bg-slate-50 dark:bg-[#161e31] border border-slate-300 dark:border-gray-700 text-sm rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Nomor Induk Siswa (NIS) <span class="text-rose-500">*</span></label>
                        <input type="number" id="stu_nis" required placeholder="Masukkan NIS Anda" 
                            class="w-full bg-slate-50 dark:bg-[#161e31] border border-slate-300 dark:border-gray-700 text-sm rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition">
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Kelas / Gugus <span class="text-rose-500">*</span></label>
                        <select id="stu_class" required 
                            class="w-full bg-slate-50 dark:bg-[#161e31] border border-slate-300 dark:border-gray-700 text-sm rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition cursor-pointer">
                            <option value="" disabled selected>Pilih kelas saat ini...</option>
                            <option value="X TKJT 1">X TKJT 1</option>
                            <option value="X TKJT 2">X TKJT 2</option>
                            <option value="X TKJT 3">X TKJT 3</option>
                            <option value="XI TKJT 1">XI TKJT 1</option>
                            <option value="XI TKJT 2">XI TKJT 2</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Alamat Email Aktif <span class="text-rose-500">*</span></label>
                        <input type="email" id="stu_email" required placeholder="nama@gmail.com" 
                            class="w-full bg-slate-50 dark:bg-[#161e31] border border-slate-300 dark:border-gray-700 text-sm rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition">
                        <p class="text-[10px] text-slate-400 dark:text-gray-500 mt-1.5 italic">
                            * Hasil pengerjaan akan dikirimkan otomatis ke email ini melalui gateway <strong>realtkjt.ami@gmail.com</strong>.
                        </p>
                    </div>

                    <button type="submit" id="btn-start-test"
                        class="w-full mt-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition duration-300 flex items-center justify-center gap-2">
                        <span>Konfirmasi & Masuk Pengujian</span>
                        <i class="fa-solid fa-arrow-right-to-bracket text-xs"></i>
                    </button>
                </form>
            </div>
        `;
        document.body.appendChild(modalContainer);

        // LOGIKA CLOSE ON OVERLAY CLICK (Klik luar pop-up untuk menutup)
        modalContainer.addEventListener('click', function(event) {
            const modalBox = document.getElementById('modal-box');
            // Jika yang diklik adalah area overlay hitam blur, bkn kotak putih/gelap di dalam, maka close
            if (modalBox && !modalBox.contains(event.target)) {
                window.closeStudentModal();
            }
        });
    }

    // Set nama label tes saat ini pada modal
    document.getElementById('modal-test-label').innerText = testTypeLabel;

    // Handle trigger submit form
    const form = document.getElementById('form-identity-student');
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const errorDiv = document.getElementById('modal-error-msg');
        const errorText = document.getElementById('error-text');
        const btnStart = document.getElementById('btn-start-test');

        const fullName = document.getElementById('stu_name').value.trim();
        const nis = document.getElementById('stu_nis').value.trim();
        const studentClass = document.getElementById('stu_class').value;
        const email = document.getElementById('stu_email').value.trim();

        if (!fullName || !nis || !studentClass || !email) {
            errorText.innerText = "Nama, Kelas, NIS, dan Email tidak boleh kosong!";
            errorDiv.classList.remove('hidden');
            return;
        }

        try {
            btnStart.disabled = true;
            btnStart.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> mendaftarkan sesi...`;

            const supabaseClient = window.supabaseClient || window.supabase;

            const { data, error } = await supabaseClient
                .from('siswa')
                .insert([
                    { 
                        nama: fullName, 
                        nis: nis, 
                        kelas: studentClass, 
                        email: email,
                        target_tes: testTypeLabel,
                        created_at: new Date()
                    }
                ])
                .select();

            if (error) throw error;

            if (data && data.length > 0) {
                sessionStorage.setItem('siswa_id', data[0].id);
                sessionStorage.setItem('siswa_nama', data[0].nama);
                sessionStorage.setItem('siswa_email', data[0].email);
                sessionStorage.setItem('siswa_kelas', data[0].kelas);
                sessionStorage.setItem('smtp_sender', 'realtkjt.ami@gmail.com');

                if (typeof onValidationSuccess === 'function') {
                    onValidationSuccess(data[0].id);
                }
            }

        } catch (err) {
            console.error(err);
            errorText.innerText = "Gagal memproses ke database: " + err.message;
            errorDiv.classList.remove('hidden');
            btnStart.disabled = false;
            btnStart.innerHTML = `<span>Konfirmasi & Masuk Pengujian</span><i class="fa-solid fa-arrow-right-to-bracket text-xs"></i>`;
        }
    };
};