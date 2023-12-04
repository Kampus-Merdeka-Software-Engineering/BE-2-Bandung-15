# Simple app for our 'Galerry Hotel' Capstone Project using Express.js and Prisma

# Langkah-langkah pengerjaan project ini

1. Inisiasi project npm dengan menggunakan command `npm init -y`.

2. Update `package.json` dengan menambahkan script seperti berikut:

```json
"script": {
    "start": "node index.js",
    "start:dev": "nodemon index.js"
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
by 

13. 
14.
15.
16.
17.
18.
19. 