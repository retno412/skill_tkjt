/**
 * Core Application Handler - SKILL_TKJT Custom System
 * Sinkronisasi Alur identitas_siswa.html & admin_approval.html
 */

const AppCore = {
    // 1. Verifikasi Akses Guru via admin_approval.html
    verifyAdminToken: async (tokenInput) => {
        try {
            const { data, error } = await window.supabase
                .from('admin_tokens')
                .select('*')
                .eq('token_hash', tokenInput)
                .eq('is_active', true);

            if (error) throw error;

            if (data.length > 0) {
                // Simpan token di localStorage sebagai session bypass
                localStorage.setItem('guru_verified_token', tokenInput);
                return true;
            }
            return false;
        } catch (err) {
            console.error("Authorization Error:", err.message);
            return false;
        }
    },

    // 2. Proteksi Halaman Dashboard Guru
    checkAdminAccess: () => {
        const localToken = localStorage.getItem('guru_verified_token');
        if (!localToken) {
            // Jika tidak ada token valid, lempar balik ke admin_approval.html
            window.location.href = 'admin_approval.html';
        }
    },

    // 3. Registrasi Siswa dari identitas_siswa.html
    registerSiswaData: async (formData) => {
        try {
            const { data, error } = await window.supabase
                .from('siswa')
                .insert([
                    {
                        nama: formData.nama,
                        nis: formData.nis,
                        kelas: formData.kelas,
                        email: formData.email
                    }
                ])
                .select();

            if (error) throw error;
            
            // Simpan data siswa aktif ke session storage untuk durasi pengerjaan tes
            sessionStorage.setItem('active_siswa', JSON.stringify(data[0]));
            return data[0];
        } catch (err) {
            console.error("Gagal menyimpan identitas siswa:", err.message);
            return null;
        }
    }
};

window.AppCore = AppCore;