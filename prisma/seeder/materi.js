const { v4: uuidv4 } = require("uuid");

const materi = [
  {
    id: uuidv4(),
    name: "JavaScript pendahuluan",
    materi:
      "Saat ini, pasti Anda sering mendengar Javascript yang kedengarannya menarik tetapi Anda tidak mengetahui apa sih sebenarnya Javascript itu dan bagaimana cara kerjanya. Jika anda ingin menjadi seorang developer, maka tidak heran anda akan menggunakan javascript ini.\n\nBiasanya para developer menggunakan javascript untuk membantu memudahkan pekerjaan mereka, dan membuat pengotomatisan dalam beberapa jenis pemrograman. Kalian tidak perlu khawatir dam bingung karena pada artikel kali ini, Kami akan membahas tentang Javascript beserta cara kerjanya.",
    url: "https://www.youtube.com/embed/RUTV_5m4VeI",
  },
  {
    id: uuidv4(),
    name: "Pengenalan JavaScript",
    materi:
      "JavaScript adalah suatu bahasa pemrograman tingkat tinggi dan dinamis. JavaScript populer di internet dan dapat bekerja di sebagian besar penjelajah web populer seperti Google Chrome, Internet Explorer, Mozilla Firefox, Netscape dan Opera. Kode JavaScript dapat disisipkan dalam halaman web menggunakan tag script.",
    url: "https://www.youtube.com/embed/upDLs1sn7g4",
  },
  {
    id: uuidv4(),
    name: "Pengenalan PHP",
    materi: "PHP adalah bahasa php",
    url: "https://www.youtube.com/embed/upDLs1sn7g4",
  },
];

module.exports = materi;
