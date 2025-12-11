<template>
  <div class="min-h-screen bg-amber-50">
    <!-- Header dengan Motif Papua -->
    <div
      class="relative text-white py-20 overflow-hidden bg-cover bg-center bg-fixed"
      :style="{ backgroundImage: `url('/weddding1.jpeg')` }"
    >
      <div class="absolute inset-0 bg-black/60 z-0"></div>
      <div class="absolute inset-0 opacity-20 motif-papua z-0 mix-blend-overlay"></div>

      <div class="container mx-auto px-4 text-center relative z-10">
        <div class="mb-6">
          <svg
            class="w-12 h-12 mx-auto mb-4 float-animation"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
        <p class="text-xl mb-2 font-light tracking-widest font-serif">Of The Wedding</p>
        <h1 class="text-5xl md:text-7xl font-bold mb-4 font-serif drop-shadow-lg">
          {{ mempelaiPria }}<br />&<br />{{ mempelaiWanita }}
        </h1>
        <p class="text-2xl font-light">{{ tanggalPernikahan }}</p>
        <p class="text-lg font-light italic my-4 font-serif">Kepada Yth,</p>
        <button
          @click="scrollToMempelai"
          class="mt-8 animate-bounce bg-white text-orange-800 font-semibold px-3 py-2 rounded-full shadow-lg hover:bg-orange-100 transition-all duration-300"
        >
          <span class="inline-flex items-center gap-2">
            <svg
              class="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </div>

      <div
        class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-50 to-transparent"
      ></div>
    </div>

    <!-- Section Foto Mempelai dengan Animasi Papua -->
    <div id="section-mempelai" class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto relative">
        <!-- SVG Papua Ornaments - Vine Menjalar -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 1">
          <!-- Vine kiri atas -->
          <path
            class="vine-pattern"
            d="M 0,50 Q 100,30 150,80 T 250,100"
            fill="none"
            stroke="#92400e"
            stroke-width="3"
            opacity="0.3"
          />
          <circle class="leaf-float" cx="80" cy="45" r="8" fill="#f59e0b" opacity="0.6" style="animation-delay: 0s" />
          <circle class="leaf-float" cx="150" cy="75" r="6" fill="#dc2626" opacity="0.6" style="animation-delay: 0.5s" />
          
          <!-- Vine kanan atas -->
          <path
            class="vine-pattern vine-pattern-delayed"
            d="M 1024,50 Q 924,30 874,80 T 774,100"
            fill="none"
            stroke="#92400e"
            stroke-width="3"
            opacity="0.3"
          />
          <circle class="leaf-float" cx="944" cy="45" r="8" fill="#f59e0b" opacity="0.6" style="animation-delay: 0.3s" />
          <circle class="leaf-float" cx="874" cy="75" r="6" fill="#dc2626" opacity="0.6" style="animation-delay: 0.8s" />
          
          <!-- Vine kiri bawah -->
          <path
            class="vine-pattern"
            d="M 0,500 Q 80,480 120,520 T 200,550"
            fill="none"
            stroke="#92400e"
            stroke-width="3"
            opacity="0.3"
            style="animation-delay: 1s"
          />
          <circle class="leaf-float" cx="70" cy="495" r="7" fill="#f59e0b" opacity="0.6" style="animation-delay: 1.2s" />
          
          <!-- Vine kanan bawah -->
          <path
            class="vine-pattern vine-pattern-delayed"
            d="M 1024,500 Q 944,480 904,520 T 824,550"
            fill="none"
            stroke="#92400e"
            stroke-width="3"
            opacity="0.3"
            style="animation-delay: 1.2s"
          />
          <circle class="leaf-float" cx="954" cy="495" r="7" fill="#dc2626" opacity="0.6" style="animation-delay: 1.5s" />
        </svg>

        <div class="relative mb-8 image-animate">
          <div
            class="absolute -inset-6 bg-gradient-to-br from-orange-600 via-red-600 to-amber-700 rounded-3xl blur-2xl glow-animate"
          ></div>
          <div
            class="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl image-placeholder"
            style="z-index: 2"
          >
            <img
              v-if="fotoMempelai"
              :src="fotoMempelai"
              alt="Foto Mempelai"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="flex items-center justify-center h-full bg-gradient-to-br from-orange-200 via-red-200 to-amber-200"
            >
              <div class="text-center text-amber-900 p-8">
                <svg class="w-32 h-32 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
                <p class="text-2xl font-serif font-bold mb-2">Foto Kedua Mempelai</p>
                <p class="text-sm">Masukkan foto di sini</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Mempelai dengan Animasi -->
        <div class="grid md:grid-cols-2 gap-8 mt-12 relative" style="z-index: 2">
          <div class="text-center bg-white rounded-2xl shadow-lg p-8 card-animate card-hover relative overflow-hidden">
            <!-- Ornamen Papua di pojok card -->
            <div class="absolute top-0 right-0 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" class="text-orange-700">
                <path d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z" />
              </svg>
            </div>
            <div class="absolute bottom-0 left-0 w-20 h-20 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" class="text-orange-700">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="25" fill="white" />
                <circle cx="50" cy="50" r="15" />
              </svg>
            </div>
            
            <h2 class="text-3xl font-serif font-bold text-orange-900 mb-2 relative z-10">{{ mempelaiPria }}</h2>
            <p class="text-gray-600 mb-1 relative z-10">Putra dari</p>
            <p class="text-gray-800 font-medium relative z-10">{{ orangTuaPria }}</p>
          </div>
          
          <div class="text-center bg-white rounded-2xl shadow-lg p-8 card-animate card-hover relative overflow-hidden">
            <!-- Ornamen Papua di pojok card -->
            <div class="absolute top-0 left-0 w-24 h-24 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" class="text-red-700">
                <path d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z" />
              </svg>
            </div>
            <div class="absolute bottom-0 right-0 w-20 h-20 opacity-10">
              <svg viewBox="0 0 100 100" fill="currentColor" class="text-red-700">
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="25" fill="white" />
                <circle cx="50" cy="50" r="15" />
              </svg>
            </div>
            
            <h2 class="text-3xl font-serif font-bold text-red-900 mb-2 relative z-10">{{ mempelaiWanita }}</h2>
            <p class="text-gray-600 mb-1 relative z-10">Putri dari</p>
            <p class="text-gray-800 font-medium relative z-10">{{ orangTuaWanita }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ornamen Papua -->
    <div class="py-8">
      <div class="flex justify-center items-center gap-4">
        <div class="h-1 w-24 bg-gradient-to-r from-transparent via-orange-600 to-orange-600"></div>
        <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <div class="h-1 w-24 bg-gradient-to-l from-transparent via-orange-600 to-orange-600"></div>
      </div>
    </div>

    <!-- Hadits Section -->
    <div class="bg-gradient-to-br from-orange-50 to-red-50 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto">
          <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-t-4 border-orange-600">
            <div class="text-center mb-6">
              <svg
                class="w-16 h-16 mx-auto text-orange-600 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zm-9-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                />
              </svg>
            </div>

            <div class="space-y-6">
              <div class="text-center">
                <p class="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mb-4 italic">
                  "Barangsiapa yang menikah, maka ia telah menyempurnakan separuh dari agamanya.
                  Maka bertakwalah kepada Allah pada separuh yang lainnya."
                </p>
                <p class="text-sm text-gray-600 font-medium">(HR. Al-Baihaqi)</p>
              </div>

              <div class="border-t-2 border-orange-200 pt-6 mt-6">
                <p class="text-lg text-gray-700 leading-relaxed text-center">
                  Rasulullah ﷺ bersabda:
                </p>
                <p
                  class="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed mt-4 italic text-center"
                >
                  "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan
                  hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya,
                  dan dijadikan-Nya di antaramu rasa kasih dan sayang."
                </p>
                <p class="text-sm text-gray-600 font-medium text-center mt-4">(QS. Ar-Rum: 21)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Countdown Timer -->
    <div class="bg-gradient-to-r from-orange-100 to-red-100 py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-serif font-bold text-center text-orange-900 mb-8">
          Hitung Mundur Pernikahan
        </h2>
        <div class="flex justify-center gap-4 md:gap-8">
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-lg p-6 w-20 md:w-28">
              <div class="text-3xl md:text-4xl font-bold text-orange-900">{{ countdown.days }}</div>
              <div class="text-xs md:text-sm text-gray-600 mt-2">Hari</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-lg p-6 w-20 md:w-28">
              <div class="text-3xl md:text-4xl font-bold text-red-900">{{ countdown.hours }}</div>
              <div class="text-xs md:text-sm text-gray-600 mt-2">Jam</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-lg p-6 w-20 md:w-28">
              <div class="text-3xl md:text-4xl font-bold text-orange-900">
                {{ countdown.minutes }}
              </div>
              <div class="text-xs md:text-sm text-gray-600 mt-2">Menit</div>
            </div>
          </div>
          <div class="text-center">
            <div class="bg-white rounded-lg shadow-lg p-6 w-20 md:w-28">
              <div class="text-3xl md:text-4xl font-bold text-red-900">{{ countdown.seconds }}</div>
              <div class="text-xs md:text-sm text-gray-600 mt-2">Detik</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Acara -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif font-bold text-center text-orange-900 mb-12">
          Detail Acara
        </h2>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Akad Nikah -->
          <div class="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-orange-600">
            <div class="text-center mb-6">
              <div
                class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg
                  class="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 class="text-2xl font-serif font-bold text-orange-900">Akad dan Resepsi Nikah</h3>
            </div>
            <div class="space-y-4 text-gray-700">
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-orange-600 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z"
                  />
                </svg>
                <div>
                  <p class="font-semibold">SABTU, 13 DESEMBER 2025</p>
                  <p class="text-sm">10.00 WIT</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <svg
                  class="w-5 h-5 text-orange-600 mt-1 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  />
                </svg>
                <p>RUMAH BAPAK RAJAB MADOA, <br />KOMPLEKS KOKODA KM 8</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tombol Maps -->
        <div class="text-center mt-8">
          <a
            href="https://maps.app.goo.gl/axe4LCHq4c4GZYrU8"
            target="_blank"
            class="inline-block bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Buka Google Maps
          </a>
        </div>
      </div>
    </div>

    <!-- Konfirmasi Kehadiran -->
    <div class="bg-gradient-to-br from-orange-50 to-red-50 py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-4xl font-serif font-bold text-center text-orange-900 mb-4">
            Konfirmasi Kehadiran
          </h2>
          
          <div v-if="guestName" class="text-center mb-6">
            <p class="text-lg text-gray-700">Kepada Yth,</p>
            <p class="text-2xl font-serif font-bold text-orange-900">{{ guestName }}</p>
          </div>
          
          <div class="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-orange-600">
            <!-- Status Konfirmasi -->
            <div v-if="userRSVP" class="text-center mb-6">
              <div class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-lg font-semibold"
                :class="userRSVP.attendance === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                <svg v-if="userRSVP.attendance === 'hadir'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                </svg>
                <span>{{ userRSVP.attendance === 'hadir' ? 'Anda sudah konfirmasi HADIR' : 'Anda konfirmasi TIDAK HADIR' }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-3">Ingin mengubah konfirmasi?</p>
            </div>

            <!-- Tombol Konfirmasi -->
           <div class="flex justify-center mt-2">
  <button
    @click="confirmAttendance('hadir')"
    :disabled="submittingRSVP || !guestName || userRSVP?.attendance === 'hadir'"
    class="px-6 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed
      bg-gradient-to-r from-pink-500 to-rose-600 text-white border-none"
  >
    <span v-if="userRSVP?.attendance === 'hadir'">✅ Kehadiran Terkonfirmasi</span>
    <span v-else>💌 Saya Akan Hadir</span>
  </button>
</div>

            <!-- Summary Stats -->
            <div v-if="rsvpStats.total > 0" class="mt-8 pt-8 border-t-2 border-orange-200">
              <p class="text-center text-sm text-gray-600 mb-4 font-semibold">Total Konfirmasi</p>
              <div class="grid grid-cols-2 gap-4 text-center">
                <div class="bg-green-50 p-4 rounded-lg">
                  <p class="text-3xl font-bold text-green-700">{{ rsvpStats.hadir }}</p>
                  <p class="text-sm text-gray-600">Hadir</p>
                </div>
                <div class="bg-red-50 p-4 rounded-lg">
                  <p class="text-3xl font-bold text-red-700">{{ rsvpStats.tidakHadir }}</p>
                  <p class="text-sm text-gray-600">Tidak Hadir</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ucapan & Doa -->
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl font-serif font-bold text-center text-orange-900 mb-8">
          Ucapan & Doa
        </h2>
        
        <!-- Form Komentar -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 border-t-4 border-orange-600 mb-12">
          <form @submit.prevent="submitComment" class="space-y-4">
            
            
            <div>
              <label class="block text-gray-700 font-semibold mb-2">Ucapan & Doa</label>
              <textarea 
                v-model="commentForm.message"
                required
                rows="4"
                maxlength="500"
                class="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-600 focus:outline-none transition-colors resize-none"
                placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
              ></textarea>
              <p class="text-sm text-gray-500 mt-1">{{ commentForm.message.length }}/500 karakter</p>
            </div>
            
            <button 
              type="submit"
              :disabled="submittingComment"
              class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {{ submittingComment ? 'Mengirim...' : 'Kirim Ucapan' }}
            </button>
          </form>
        </div>

        <!-- Daftar Komentar -->
        <div class="space-y-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-serif font-bold text-orange-900">
              {{ comments.length }} Ucapan
            </h3>
            <button 
              v-if="comments.length > displayLimit"
              @click="showAllComments = !showAllComments"
              class="text-orange-600 hover:text-orange-700 font-semibold"
            >
              {{ showAllComments ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${comments.length})` }}
            </button>
          </div>

          <div v-if="loadingComments" class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-600 border-t-transparent"></div>
            <p class="text-gray-600 mt-2">Memuat ucapan...</p>
          </div>

          <div v-else-if="displayedComments.length === 0" class="text-center py-12 bg-orange-50 rounded-2xl">
            <svg class="w-16 h-16 mx-auto text-orange-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
            </svg>
            <p class="text-gray-600 text-lg">Belum ada ucapan. Jadilah yang pertama!</p>
          </div>

          <div v-else class="space-y-4">
            <div 
              v-for="(comment, index) in displayedComments" 
              :key="comment.id"
              class="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-600 transform transition-all duration-300 hover:shadow-xl comment-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {{ comment.name.charAt(0).toUpperCase() }}
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="font-bold text-gray-800">{{ comment.name }}</h4>
                    <span class="text-xs text-gray-500">{{ formatDate(comment.timestamp) }}</span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">{{ comment.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer dengan Ornamen Papua -->
    <div class="bg-gradient-to-b from-orange-900 to-red-900 text-white py-12">
      <div class="container mx-auto px-4 text-center">
        <p class="text-lg mb-2">Merupakan suatu kehormatan dan kebahagiaan bagi kami</p>
        <p class="text-lg mb-4">apabila Bapak/Ibu/Saudara/i berkenan hadir</p>
        <p class="text-lg mb-2">untuk memberikan do'a restu kepada kami.</p>

        <div class="mt-8 pt-8 border-t border-orange-700">
          <p class="text-sm opacity-80">Kami yang berbahagia,</p>
          <p class="text-xl font-serif font-bold mt-2">Keluarga Besar Kedua Mempelai</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PapuaWedding',
  data() {
    return {
      mempelaiPria: 'NUR HAMZAH BAHALE',
      mempelaiWanita: 'AFRILDA MADOA',
      tanggalPernikahan: 'SABTU, 13 DESEMBER 2025',
      orangTuaPria: 'ALM. BAPAK A. MUTOLIB BAHALE DAN IBU MEGAWATI',
      orangTuaWanita: 'BAPAK RAJAB MADOA DAN IBU MARYATI SINANU',
      fotoMempelai: '/weddding2.jpeg',
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      guestId: null,
      guestName: '',
      userRSVP: null,
      commentForm: {
        name: '',
        message: '',
      },
      comments: [],
      rsvpList: [],
      submittingRSVP: false,
      submittingComment: false,
      loadingComments: true,
      displayLimit: 10,
      showAllComments: false,
    }
  },
  computed: {
    displayedComments() {
      if (this.showAllComments) {
        return this.comments
      }
      return this.comments.slice(0, this.displayLimit)
    },
    rsvpStats() {
      const hadir = this.rsvpList.filter(r => r.attendance === 'hadir').length
      const tidakHadir = this.rsvpList.filter(r => r.attendance === 'tidak-hadir').length
      return {
        hadir,
        tidakHadir,
        total: hadir + tidakHadir,
      }
    },
  },
  mounted() {
    this.startCountdown()
    this.getGuestFromParams()
    this.loadComments()
    this.loadRSVP()
  },
  methods: {
    getGuestFromParams() {
      // Get guest ID from URL params
      const urlParams = new URLSearchParams(window.location.search)
      this.guestId = urlParams.get('id') || urlParams.get('guest')
      
      // You can also decode guest name from params if passed
      const nameParam = urlParams.get('name')
      if (nameParam) {
        this.guestName = decodeURIComponent(nameParam)
      }
      
      // Load user's RSVP if guest ID exists
      if (this.guestId) {
        this.loadUserRSVP()
      }
    },
    async loadUserRSVP() {
      if (!this.guestId) return
      
      try {
        const result = await window.storage.get(`rsvp:${this.guestId}`, true)
        if (result) {
          this.userRSVP = JSON.parse(result.value)
          if (this.userRSVP.name && !this.guestName) {
            this.guestName = this.userRSVP.name
          }
        }
      } catch (error) {
        console.log('No previous RSVP found')
      }
    },
    async confirmAttendance(attendance) {
      if (!this.guestName) {
        alert('Nama tamu tidak ditemukan. Pastikan Anda membuka link undangan yang benar.')
        return
      }

      this.submittingRSVP = true
      try {
        const rsvp = {
          id: this.guestId || Date.now(),
          name: this.guestName,
          attendance: attendance,
          timestamp: Date.now(),
        }

        await window.storage.set(`rsvp:${rsvp.id}`, JSON.stringify(rsvp), true)
        
        this.userRSVP = rsvp
        
        // Update local list
        const existingIndex = this.rsvpList.findIndex(r => r.id === rsvp.id)
        if (existingIndex >= 0) {
          this.rsvpList[existingIndex] = rsvp
        } else {
          this.rsvpList.push(rsvp)
        }
        
        const message = attendance === 'hadir' 
          ? 'Terima kasih atas konfirmasinya! Kami tunggu kehadiran Anda 🎉' 
          : 'Terima kasih atas konfirmasinya 🙏'
        
        alert(message)
      } catch (error) {
        alert('Gagal mengirim konfirmasi. Silakan coba lagi.')
        console.error(error)
      } finally {
        this.submittingRSVP = false
      }
    },
    startCountdown() {
      const weddingDate = new Date('2025-12-13T10:00:00').getTime()

      setInterval(() => {
        const now = new Date().getTime()
        const distance = weddingDate - now

        if (distance > 0) {
          this.countdown.days = Math.floor(distance / (1000 * 60 * 60 * 24))
          this.countdown.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          this.countdown.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          this.countdown.seconds = Math.floor((distance % (1000 * 60)) / 1000)
        }
      }, 1000)
    },
    scrollToMempelai() {
      const section = document.getElementById('section-mempelai')
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    },
    async loadComments() {
      try {
        this.loadingComments = true
        const result = await window.storage.list('comment:', true)
        if (result && result.keys) {
          const commentPromises = result.keys.map(async key => {
            const data = await window.storage.get(key, true)
            return data ? JSON.parse(data.value) : null
          })
          const allComments = await Promise.all(commentPromises)
          this.comments = allComments
            .filter(c => c !== null)
            .sort((a, b) => b.timestamp - a.timestamp)
        }
      } catch (error) {
        console.log('No comments yet')
        this.comments = []
      } finally {
        this.loadingComments = false
      }
    },
    async loadRSVP() {
      try {
        const result = await window.storage.list('rsvp:', true)
        if (result && result.keys) {
          const rsvpPromises = result.keys.map(async key => {
            const data = await window.storage.get(key, true)
            return data ? JSON.parse(data.value) : null
          })
          const allRSVP = await Promise.all(rsvpPromises)
          this.rsvpList = allRSVP.filter(r => r !== null)
        }
      } catch (error) {
        console.log('No RSVP yet')
        this.rsvpList = []
      }
    },
    async submitComment() {
      if (!this.commentForm.name.trim() || !this.commentForm.message.trim()) {
        alert('Mohon isi semua field')
        return
      }

      this.submittingComment = true
      try {
        const comment = {
          id: Date.now(),
          name: this.commentForm.name.trim(),
          message: this.commentForm.message.trim(),
          timestamp: Date.now(),
        }

        await window.storage.set(`comment:${comment.id}`, JSON.stringify(comment), true)
        
        this.comments.unshift(comment)
        this.commentForm.name = ''
        this.commentForm.message = ''
        
        alert('Terima kasih atas ucapan dan doanya! 🎉')
      } catch (error) {
        alert('Gagal mengirim ucapan. Silakan coba lagi.')
        console.error(error)
      } finally {
        this.submittingComment = false
      }
    },
    formatDate(timestamp) {
      const date = new Date(timestamp)
      const now = new Date()
      const diff = now - date
      
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (minutes < 1) return 'Baru saja'
      if (minutes < 60) return `${minutes} menit yang lalu`
      if (hours < 24) return `${hours} jam yang lalu`
      if (days < 7) return `${days} hari yang lalu`
      
      return date.toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      })
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

.font-serif {
  font-family: 'Playfair Display', serif;
}

.motif-papua {
  background-image:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.1) 20px,
      rgba(255, 255, 255, 0.1) 40px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 20px,
      rgba(255, 255, 255, 0.1) 20px,
      rgba(255, 255, 255, 0.1) 40px
    );
}

/* Animasi */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes drawVine {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes floatLeaf {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(5deg);
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.card-animate {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.card-animate:nth-child(1) {
  animation-delay: 0.2s;
}

.card-animate:nth-child(2) {
  animation-delay: 0.4s;
}

.image-animate {
  animation: scaleIn 1s ease-out forwards;
}

.vine-pattern {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawVine 3s ease-out forwards;
}

.vine-pattern-delayed {
  animation-delay: 0.5s;
}

.leaf-float {
  animation: floatLeaf 3s ease-in-out infinite;
}

.glow-animate {
  animation: glowPulse 3s ease-in-out infinite;
}

.card-hover {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(234, 88, 12, 0.2);
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

.image-placeholder {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border: 4px solid #92400e;
}

.comment-card {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}
</style>