# nodejs-api-message

Install dependencies.

`npm install`

jalankan project

`npm start`

## test function

### Post
untuk mencoba api sending message bisa menggunkan **postman**

atau menggunakan syntax curl dibawah ini

```
curl --location --request POST 'http://localhost:8123/messages' \
--header 'Content-Type: text/plain' \
--data-raw **message**
```

syntax diatas untuk parameter body yang dikirimkan text atau string

jika ingin menggunakan parameter JSON

```
curl --location --request POST 'http://localhost:8123/messages' \
--header 'Content-Type: application/json' \
--data-raw '{
	"message": **message**	
}'
```

tinggal ganti **message** dengan pesan yang diinginkan 

### Get

untuk melihat semua pesan yang telah di kumpul kan tinggal panggil

`localhost:8123/messages`

ke browser atau menggunakan **postman** dengan menggunakan get request

jika ingin menggunakan curl

```
curl --location --request GET 'http://localhost:8123/messages' \
--header 'Content-Type: application/json'
```

### websocket

buka link di bawah ini di browser

`localhost:8123/`

browser nya akan secara otomatis keluar message yang masuk



# Semoga bermanfaat
