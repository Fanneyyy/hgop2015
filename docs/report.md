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
Klára að setja upp Jenkins og koma upp feedback kerfi fyrir Karma próf sem klikka. Byrja að skoða Unit próf.

#### Vandamál
Kom upp vandamál með grunt í Jenkins, fann lausn en á eftir að skoða það betur. 
Svo voru scriptin mín ekki að skila Error kóða á réttum tíma þannig ég þurfti að breyta þeim en er ekki alveg ánægð með lausnina, þarf að skoða betur.

#### Útkoma
Náði að setja upp test fyrir commit stage og annað fyrir deployment stage í Jenkins. 
Þau skila FAILURE ef eitthvað er brotið og skila annars SUCCESS.
Náði ekki að byrja á Unit testunum.

#### Lærdómur
Búin að kynna mér vel Jenkins og skoða hvernig hægt er að nota það til að ná upp öruggri Continuous Integration. 

## Dagur 5

#### Markmið
Koma upp feedback kerfi fyrir Karma próf og tengja það við Jenkins. Byrja á uppsetningu Unit prófana.

#### Vandamál
Þar sem Jenkins prófanirnar frá mér eru alltaf að sækja verkefnið af Github þá þurfti ég alltaf að pusha inná Github til að Jenkins gæti keyrt prófin.
Þetta er frekar óhjálplegt þannig langar að breyta þessu, enda er líka frekar skrýtið að pusha inn breytingum til að athuga hvort þær virki rétt.

#### Útkoma
Setti upp report fyrir Commit stage í Jenkins sem virkar mjög flott fyrir Karma prófin.
Byrjaði að skoða Unit próf.

#### Lærdómur
Skoðaði prófanirnar sem eru í boði í kringum AngularJS og hvernig hægt sé að tengja feedback frá þeim inní CI eins og Jenkins.

## Dagur 6

#### Markmið
Fá Jenkins til að geta keyrt Commit Stage prófin á local git repo-inu ef ég vill.  
Setja upp Poll SCM í Jenkins þannig að Jenkins keyri reglulega ef kóðinn hefur breyst.  
Klára að gera lista yfir helstu Unit test.  
Byrja að forrita Unit test.

#### Vandamál
Þarf að kynna mér aðeins betur JavaScript en allt að koma.

#### Útkoma
Get núna sett up Jenkins verkefni sem keyrir á local repo.  
Jenkins próf keyra núna á mesta lagi 15 mínútna fresti ef breytingar hafa verið gerðar.
Kominn listi af dæmum fyrir Unit test. [The test examples using Given-When-Then model](./docs/testExamples.md).
Búin að gera nokkur Unit test sem ganga vel.

#### Lærdómur
Skoðaði og æfði mig að gera prófanadæmi með modelinu Given-When-Then.
Búin að kynna mér prófana möguleikana með grunt sem líta mjög vel út.


## Dagur 7

#### Markmið
Klára að setja upp Unit testin sem voru sett fram í [test examples](./docs/testExamples.md) 
fyrir TicTacToe Command Handlerinn. Kynna mér 'q' og byrja að tengja serverinn og command handlerinn.

#### Vandamál
Í byrjun þá fundu testin ekki jsmockito fyrir mock testin, en gleymdi bara að bæta því við í package.json.

#### Útkoma
Öll fyrrum skipulögð Unit test klár en þau munu að sjálfsögðu vera uppfærð ef það þarf
að gera einhverjar breytingar á kóðanum. Tenging kominn milli storage og server. Búinn að setja inn unit test
og logic fyrir event/memory storage og tengingu á milli.

#### Lærdómur
Tekur smá tíma að venjast því að nota TDD, sérstaklega í Javascript, en tók strax eftir hvað þetta er 
rosalega þægilegt til að ná upp trausti á því sem maður er að gera og einstaklega þægilegt 
að geta refactor-að kóðan og geta alltaf fylgst með testunum til að vita ef eitthvað klikkar.
Skoðaði 'q', [þessi grein var með gott yfirlit](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/).

## Dagur 8

#### Markmið
Koma upp acceptance testum, tengja við Jenkins og nota fluid test API approach.

#### Vandamál
Var ekki viss hvað ég ætti að gera við .and partinn í API-inu mínu fyrir acceptance testin
þannig ég geymdi það.

#### Útkoma
Kominn acceptance test fyrir Create Game. Bæði manual próf og svo með fluid API.
Búin að setja upp build pipeline í Jenkins sem virkar mjög vel og skemmtilega :)

#### Lærdómur
Kynnti mér acceptance testing fyrir node js.

## Dagur 9

#### Markmið
Breyta fluid acceptance testinu þannig að það sé á forminu  
given(user("YourUser").createsGame("TheFirstGame"))
.expect("GameCreated").withName("TheFirstGame").isOk(done);  
og gera fleiri fluid api test.

#### Vandamál
Tók mig frekar langan tíma því javascriptið var frekar flókið, en þetta hafðist.

#### Útkoma
Búin að setja upp fluid API test sem virkar á forminu  
given(user("YourUser").createsGame("TheFirstGame"))
.expect("GameCreated").withName("TheFirstGame").isOk(done);
Búin að gera test fyrir create game, join game, winning game and a draw.
Test api-ið er mjög þægilegt í notkun en kóðinn sjálfur er kannski svolítið flókinn.

#### Lærdómur
Lærði mjög mikið á javascript, sérstaklega chaining sem er rosalega powerful og
þægilegt í notkun þegar maður er aðeins farinn að skilja það.

## Dagur 10

#### Markmið
Setja upp load/capacity test.

#### Vandamál
Fékk alltaf villu ef ég lét capacity testið keyra fleiri en sirka 15 leiki.
Var vandamál að finna leið til að láta testin klára eitt command áður en það sendir inn annað.
Fékk hint og gerði recursive fall sem sá til þess að commands voru keyrð til enda.
Capacity testið er mjög slow og 1000 leikir taka mjög langan tíma.

#### Útkoma
Búin að setja upp kóðan fyrir capacity testin og bæta þeim inn í Jenkins pipeline-ið.

#### Lærdómur
Útkoma úr load/capacity testum:
| Fjöldi Leikja | Tími          |
| ------------- |:-------------:|
| 1000          | 117045ms      |
| 1000          | 49049ms       |
| 1000          | 45655ms       |
| 1000          | 37752ms       |
| 1000          | 47612ms       |

Does the load test run in serial or in parallel? TODO!
