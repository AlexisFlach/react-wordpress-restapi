### Setup

Det först vi måste göra är att ändra **permalinks** till att visa inläggsnamn.

Öppna därefter **Postman** 

```
GET http://localhost:8000/wp-json/wp/v2/pages/
```

Skapa ny sida och namnge den till "Hem" och sätt den som förstasida.

```
GET http://localhost:8000/wp-json/wp/v2/pages/
headers:
{
	'slug': 'hem'
}
```

Gå tillbaks tilll Wordpress Admin och installera följande **plugins**:

- Advanced Custom Fields
- ACF to REST API

I anpassade fält, välj "lägg till ny".

Ge namn på gruppen och skapa rubrik, beskrivning, bild och länk-fält.

Välj att visa fält om sida är lika med Hem. Tryck publicera.

Gå tillbaka till hem och fyll i informationen.

När vi nu köra samma request i postman ser vi att vi har ett nytt fält: afc.