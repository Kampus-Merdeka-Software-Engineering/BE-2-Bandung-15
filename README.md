# Simple app for our 'Gallery Hotel' Capstone Project using Express.js and Prisma

# Langkah-langkah pengerjaan project ini

1. Inisiasi project npm dengan menggunakan command `npm init -y`.

2. Update `package.json` dengan menambahkan script seperti berikut:

```json
"script": {
    "start": "nodemon index.js",
},
```

3. Install package yang diperlukan.

```bash
npm install express dotenv cors mysql2
```

4. Install devDependencies karena menggunakan nodemon.

```bash
npm install --save-dev nodemon
```
atau
```bash
npm install -D nodemon
```

5. Lalu akan ada `node_modules` dan `package-lock.json` yang dibuat secara otomatis oleh `npm`, yang mana isinya tidak boleh diubah dan tidak boleh di-push ke `Github`!

6. Agar `node_modules` dan `.env` tidak ter-upload ke `Github`, kita akan membuat satu file bernama `.gitignore`.

7. Atau bisa melalui git bash atau terminal menggunakan command berikut ini.

```bash
echo node_modules >> .gitignore
```
dan
```bash
echo .env >> .gitignore
```

8. Inisiasi project dengan membuat satu file entrypoint, disini kita menggunakan `index.js`. Jika sudah membuat file tadi, bisa update `package.json` dimana script untuk memulai aplikasi backend harus ke entrypoint file yang telah ditentukan, seperti berikut ini.

```json
"script": {
    "start": "nodemon index.js"
},
```

9. Import express, dotenv, dan package lain yang sudah diinstall tadi. Buatlah satu route untuk mencoba apakah aplikasi dapat berjalan atau tidak.

Contohnya :
```js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	res.send("here is the response");
});

app.all("*", async (req, res) => {
	res.json({
		message: "Routes you're looking is not found",
	});
});

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Server is already running at ${PORT}`);
});
```

10. Selanjutnya, integrasi project ini dengan prisma agar bisa terhubung dengan database dan melakukan pengambilan atau memasukkan data ke database dengan prisma.

11. Inisiasi project npm yang ingin diintegrasikan dengan Prisma, kita harus meng-install [Prisma](https://prisma.io).

```bash
npm install -D prisma
```

12. Inisiasi Prisma.

```bash
prisma init
```

By default prisma akan menginisiasi project dengan database PostgreSQL, jika ingin memakai database mySQL maka bisa menggunakan command berikut.

```bash
npx prisma init --datasource-provider mysql
```

Notes: bacaan lanjutan bisa kalian baca [disini](https://www.prisma.io/docs/concepts/database-connectors/mysql).

13. Lalu akan ada kode tambahan pada file `.env` yaitu `DATABASE_URL` yang mana diisi sesuai dengan `DATABASE_URL` kita, bisa diisi menggunakan `DATABASE_URL` dari local, yaitu `"mysql://root:password@localhost:3306/express_mysql"`. Dan ada satu file khusus yang ter-generate dalam sebuah folder bernama `prisma` dengan nama file `schema.prisma`, dimana kita harus mendefinisikan model sesuai dengan yang sudah direncanakan.

14. Jika ingin file `schema.prisma` berwarna atau diberi highlight pada syntaxnya, kita bisa download extension [ini](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).

15. Kita bisa membuat schema database dari yang sudah direncanakan dalam file `schema.prisma` yang mana ada syntaxnya sendiri, bisa baca dokumentasinya di link [ini].

Berikut contoh model dari schema yang dibuat.

```text
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Int
  imageUrl  String? // arti ?, not required, kalau pengen dibikin gapapa deh kalau datanya kosong
  catalogId Int?
  createdAt DateTime @default(now())
  // untuk menambahkan relasi dari Product ke Catalog dimana Product boleh gapunya catalog
  Catalog   Catalog? @relation(fields: [catalogId], references: [id])
}

model Catalog {
  id       Int       @id @default(autoincrement())
  name     String
  // untuk nambahin relasi antara catalog dengan Product
  products Product[] // ini artinya Catalog punya banyak product
}

model Message {
  id        Int      @id @default(autoincrement())
  name      String
  email     String
  message   String   @db.Text // biar bisa nyimpen pesan dengan karakter yang panjang
  createdAt DateTime @default(now())
}
```

16. Setelah mendefinisikan model di `schema.prisma`, kita bisa melakukan synchronization database kita dengan schema yang sudah dibuat tadi menggunakan command berikut.

```bash
npx prisma migrate dev --name <nama_apa_yang_kita_lakukan>
```

<nama_apa_yang_kita_lakukan>bisa diganti dengan aktivitas apa yang baru saja dilakukan, contoh:

1. Inisialisasi
2. add_new_model_User
3. add_relation_to_catalog_and_product

`npx prisma migrate dev` wajib dilakukan setiap kali kita sudah selesai mengubah `schema.prisma` atau ada perubahan pada schema, agar database selalu tersinkronisasi.

Atau apabila kita ingin melakukan sinkronisasi dengan cara lain di prisma, bisa dengan cara berikut.

`npx prisma db push`

17. Merujuk pada dokumentasinya, untuk bisa menggunakan Prisma ORM, kita perlu menggunakan package `@prisma/client` untuk membuat koneksi dengan prisma dan melakukan CRUD operations. Perlu untuk membuat satu file configuration yang mana akan dibuat pada folder `config` dan kita beri nama `prisma.js` dengan isi sebagai berikut.

```bash
// prisma.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = { prisma };
```

18. Setelah dibuat menjadi suatu config, untuk bisa digunakan di file yang lain kita bisa langsung gunakan saja untuk mengambil data dari database atau hal yang lain seperti memasukkan data, update data, mengambil relasi, dan masih banyak lagi. Bisa langsung lihat cara penggunaannya pada setiap route yang telah dibuat.