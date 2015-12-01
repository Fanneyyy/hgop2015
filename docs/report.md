HGOP 2015 Report
=========

### Dagur 1

#### Markmið
Klóna verkefnið af Github og setja upp þróunarvél.

#### Vandamál
Gekk illa að tengja möppurnar saman á milli local vélar og þróunarvélar vegna authentication vandamála.

#### Útkoma
Sótti verkefni og skoðaði uppsetningu á því, setti upp Webstorm og skoðaði grunt. Kynnti mér tæki og tól sem verða notuð í áfanganum og skrifaði stutta lýsingu á nokkrum þeirra.

#### Lærdómur
* Vagrant
  * Hugbúnaður til að setja upp heilsteypt þróunarumhverfi með áherslu á sjálfvirkt vinnuferli. Vagrant eykur skipulag, hjálpar við samþættingu og gerir alla vinnu við sýndarvélar mjög þægilega.
* VirtualBox
  * Hugbúnaður til að setja upp sýndarvélar. Þ.e. VirtualBox gerir þér kleift að setja upp mörg stýrikerfi á vélina þína.
* Grunt
  * Tól sem er ætlað fyrir JavaScript, til að hjálpa við sjálfvirkni endurtekina verkefna við kerfi, t.d. þýðingu, þjöppun, prófana og slíkt.
* npm
  * Sjálfkrafa pakkastýrir fyrir JavaScript keyrslu-umhverfið Node.js.
* nodejs
  * Keyrslu-umhverfi sem virkar þverkerfa til að þróa netþjóna fyrir vefkerfi.
* bower
  * Pakkasýrir fyrir JavaScript söfn sem leyfir notanda að skilgreina, útgáfustýra og sækja dependencies.
  
  
### Dagur 2

#### Markmið
Klára að setja upp þróunarvél. Koma upp docker account og push-a inn docker image fyrir verkefnið og fá docker image til að keyra á þróunarvélinni. 
Setja einnig upp nýja prófunarvél með Vagrant og búa til bash scriptu til að pusha inn á docker frá þróunarvélinni, sækja breytingarnar inná prófunarvélina.

#### Vandamál
Gekk illa að keyra upp docker image-ið frá prófunarvélinni því portin voru alltaf upptekin. Náði að finna leið til að slökkva almennilega á docker container
til að hægt væri að keyra þetta.

#### Útkoma
Náði að laga möppunarvandamálið og koma tengingu á milli vélanna þannig allir mínar local möppur eru nú aðgengilega í þróunarvélinni.
Bjó til docker account, buildaði image af verkefninu og pushaði inná docker hub. Setti upp prófunarvél og pullaði docker image-ið af docker hub.
Bjó til scriptu til að pusha inn á docker af þróunarvélinni og pulla inná prófunarvélina.

#### Lærdómur
Helstu málin í gangi tengjast uppsetningu á umhverfum. Hugsunin hjá mér er aðallega að sjá hvort það sé ekki alltaf örugglega hægt að setja upp þessi umhverfi
á annari vél án vandamála. Ég lét git ignora bæði þróunarvélina og prófunarvélina en setti inná config skrárnar (Vagrant-file-na) fyrir báðar vélarnar en
þar sem þróunarvélin var sótt sem virtualbox þá get ég ekki sett upp eins vél án þess að komast í hana. Hægt er að sækja hana [hér](https://dl.dropboxusercontent.com/u/7122561/package.box).
Planið hjá mér er að klára uppsetningu á verkefninu og reyna svo að setja upp getting started guide sem ætti að vera hægt að nota ef það á að setja upp eins umhverfi.
Vagrant er stór partur í uppsetningu á umhverfunum og það er greininlega einstaklega þægilegt að nota Vagrant í þessu samhengi.
Það þurfti aðeins örfáar skipanir til að setja upp heila nýja Virtualbox vél og Vagrant config skráin geymir allar mikilvægar upplýsingar fyrir prófunarvélina
sem er mjög þægilegt til að setja up umhverfið uppá nýtt ef þess þyrfti.
Erfitt væri að vinna við aðstæður þar sem erfitt væri að setja upp umhverfin og ekki væri hægt að ganga til baka og komast aftur á
fyrra version af verkefninu.
Í dag bættist við docker sem er mjög þægilegt tól til að hægt sé að sækja image af verkefninu og prófa á prófunarvélinni. 
Þetta er allt hægt að gera með því að keyra eina scriptu sem mun vera mjög nytsamlegt þegar heildar deployment þarf að fara alla leið frá þróunarvél í gegnum prófanir og svo gefið út.


### Dagur 3

#### Markmið
Að koma upp ferli þar sem hægt sé að uppfæra nýjasta version af verkefninu á allar vélar með einni skipun.
Einnig er planið að koma upp CI með því að nota Jenkins. Hann á að geta gefið feedback ef verkefni fellur á prófunum.

#### Vandamál
Komst að því að ég var að miskilja uppsettningu á deployment scriptunni þurfti að laga það. Tókst ekki að koma Jenkins alveg í gang, verða komnar betir upplýsingar á morgun.

#### Útkoma
Náði að búa til góða deployment scriptu sem notar remote execution til að eiga samskipti á milli þróunar- og prófunarvélar.
Þurfti að láta prófunarvélina nota Static Ip til að geta tengst vélinni úr þróunarvélinni.
Einnig setti ég upp Authentication með SSH-Kegen lykli þannig að hægt sé að keyra scriptu án þess að þurfa að setja inn lykilorð.
Bætti við error handling í scriptið sem buildar docker images. Sá til þess að scriptið skili error exit kóða ef til dæmis grunt klikkar.

#### Lærdómur
Lærði á mikilvægi þess að geta keyrt skipanir án þess að þurfa að setja inn lykilorð og slíkt á mörgum stöðum.
Skoðaði leiðir til að geyma lykilorð og passa að þau séu ekki tekin með inná version control kerfi.
Kynnti mér Jenkins og skoðaði dæmi um verkefni þar sem Jenkins og docker er notað saman.

### Dagur 4

#### Markmið
Klára að setja upp Jenkins og koma upp feedback kerfi fyrir Karma próf sem klikka. Byrja á uppsetningu Unit prófana.

#### Vandamál

#### Útkoma

#### Lærdómur