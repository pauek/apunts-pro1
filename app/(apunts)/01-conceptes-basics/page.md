# Conceptes Bàsics

<div id="program" />

## Un programa és un text que li diu a l'ordinador què ha de fer

Un programa és un text que representa les instruccions que li volem donar a un ordinador per realitzar un càlcul útil per a nosaltres.

Els programes els escriurem en un llenguatge de programació, C++, que és _d'alt nivell_. Diem que C++ és d'"alt nivell" perquè les instruccions que la CPU d'un ordinador executa realment estan en un llenguatge "de baix nivell", el llenguatge màquina, que és molt més difícil de llegir i escriure a mà.

Per tant, en realitat el que passa sempre quan fem un programa és el següent:

1. Escrivim en C++ el text d'un programa en un fitxer de text (p.e. `main.cc`).
2. Utilitzem un altre programa, anomenat **compilador**, que _tradueix automàticament_ C++ (d'alt nivell) al llenguatge màquina (de baix nivell). El procés de compilació donarà com a resultat un fitxer executable (p.e. `main.exe`).
3. Executem el programa invocant el fitxer executable directament.

Aquest cicle de treball en què: 1) editem un fitxer de text, 2) compilem, i 3) provem el programa, serà la base de la programació durant tot PRO1, PRO2 i gran part de la resta de la carrera!

<div id="hello-program" />

## El programa més senzill possible mostra una salutació a la consola

El programa més senzill, que no fa res molt més útil que dir "hola", és el següent:

```c++
#include <iostream>
using namespace std;

int main() {
    // Aquesta instrucció mostra el text per pantalla!
    cout << "Hola desde PRO1!" << endl;
}
```

Els detalls de què significa cada coseta en aquest text ja els anirem veient a poc a poc. Per ara és suficient amb saber que el programa mostrarà per pantalla "Hola desde PRO1!". El que sí direm és que la línia prefixada per `//` és un **comentari**, i permet posar anotacions allà on volguem, perquè el compilador les ignora. Això ho farem servir en els exemples força sovint.

<div id="compiler" />

## Per executar un programa primer l'hem de compilar

Si hem guardat el text del programa en un fitxer `hola.cc`, per compilar-lo caldria obrir un terminal (o "línia de comandes", o "indicador d'ordres") i escriure:

```bash
g++ -o hola hola.cc
```

La comanda `g++` invoca el **compilador** (que cal tenir instal·lat), al qual li indiquem com volem anomenar el fitxer resultant (`-o` de "output", i `hola` pel nom), i què volem compilar (`hola.cc`). El resultat, serà, doncs, un fitxer `hola`, executable.

Tot seguit podem executar-lo amb:

```bash
$ ./hola
Hola desde PRO1!
```

<div id="basic-types" />

## Els tipus bàsics son els enters, reals, booleans, caràcters i cadenes de caràcters

Un programa, realment, és un procés automàtic que transforma dades que li posem a l'entrada en uns resultats que produeix a la sortida.

![Diagrama d'un programa](entrada-sortida.opt.svg)

Els tipus de dades bàsics amb els que podem treballar a C++ són els següents:

| Tipus    | Valors                  | Literals d'exemple                                 |
| -------- | ----------------------- | -------------------------------------------------- |
| `int`    | enters                  | `1`, `2`, `3`, `-5`, `1000000`, ...                |
| `double` | reals                   | `0.5`, `0.001`, `3.141592`, `-5e100`, ...          |
| `bool`   | Booleans                | `true` i `false`                                   |
| `char`   | caràcters               | `'a'`, `'b'`, `'0'`, `';'`, `'$'`, ...             |
| `string` | seqüències de caràcters | `"hey"`, `"foo"`, `"bar"`, `":) :P :*"`, `""`, ... |

Els programes que farem reben dades d'aquests tipus i les transformen en altres dades (_operen_ amb elles). Aquestes últimes són els resultats que ens interessen. Les transformacions que es fan són sempre operacions matemàtiques, com ara sumes, multiplicacions, operacions lògiques, etc. En definitiva, un programa és com una recepta que executa una sèrie de passos que són cada una de les transformacions o operacions individuals.

<div id="var" />

## Una variable és una porció de memòria que conté un valor d'un tipus bàsic

Per emmagatzemar valors dels 5 tipus bàsics, necessitem **variables**. Una variable és una _porció de la memòria de l'ordinador_ que ens permet guardar un valor d'un dels tipus anteriors. Les variables tenen dos propietats importants:

- Un **nom únic**, per poder distingir unes variables de les altres en un programa. Els noms de variables s'han de posar seguint [unes normes que decideix el llenguatge C++](#els-noms-de-variable-en-c-han-de-complir-unes-regles-molt-concretes).

- Un **tipus**, que serà fix durant tota la vida de la variable. Per tant, les variables que guardin enters només poden guardar enters, i les que guarden Booleans només poden contenir Booleans, res més.

<div id="var-decl" />

## Declarar una variable és demanar un tros de memoria amb un nom per guardar-hi un valor

Vegem unes quantes declaracions de variables, amb els tipus que coneixem:

```c++
int a;
bool boo;
char caracter;
double ics;
string paraula;
```

Totes aquestes declaracions tenen un tipus a l'esquerra i un nom a la dreta. Cadascuna d'elles demana una variable d'aquell tipus amb aquell nom.

També es pot declarar més d'una variable a cada línia, si són del mateix tipus. A més, a cada variable en particular se li pot posar un valor inicial (amb `=` després del nom). I tots els valors concrets que incloem en el programa (com ara `true`, `'a'`, o `3.1415`), s'anomenen "literals", perquè són valors concrets escrits directament en el codi.

```c++
int enter_u, enter_dos;
bool P, Q = true;
char c1 = 'a', c2, c3 = '0';
double f1 = 0.0, f2 = 3.1415, f3 = 0.01;
string missatge = "quin mal de cap";
```

<warning>
Quan es declara una variable _sense_ un valor inicial, **no es pot saber quin valor tindrà** perquè li demanem a C++ que ens presti una petita porció de la memòria però no podem saber quins "bits" hi ha en aquella porció i per tant quin valor representen si els interpretem com a `bool`, `char`, `int`, o qualsevol altre tipus.
</warning>

<div id="assign" />

## L'assignació és una instrucció que canvia el valor d'una variable

Si volem _canviar_ el valor d'una variable hem de sobreescriure el valor que hi ha a la posició de la memòria que ocupa la variable per un valor nou. Li direm **assignació** a la instrucció que fa això.

És molt important entendre que l'assignació _no és cap equació matemàtica_, tot i que en C++ ho pugui semblar:

```c++
int a;
a = 3; // <--- assignació
```

L'assignació, realment té 2 passos:

1. Calcular el valor a la dreta del signe igual `=`.
2. _Sobreescriure_ el valor actual de la variable amb el valor calcular al pas 1.

<warning>
És molt important veure que quan assignem un valor a una variable, se sobreescriu el valor que tenia fins llavors, i per tant el valor anterior es perd, és **irrecuperable**.
</warning>

En la declaració `int a;`, la variable `a` conté un valor que no podem saber, i aquest valor desconegut es descarta quan li assignem el valor `3`.

<div id="expr" />

## Una expressió és una fórmula que opera amb certs valors i té un únic resultat

La part dreta d'una assignació és una _expressió_, que no és més que una fórmula matemàtica que calcula alguna cosa. El fet de guardar el càlcul en una variable vol dir que el necessitem més endavant. En aquest tipus d'instruccions és on el programa fa les seves transformacions (la seva "feina"). Per exemple:

```c++
int a = 2, b = 3, c, d;
c = a + b; // c -> 5
d = c * 2; // d -> 10
```

De nou, cal evitar caure en el parany de veure `c = a + b;` o `d = c * 2` com a equacions. Són dues instruccions que canvien el valor de `c` i `d` en seqüència i no tenen cap altre efecte. En particular:

```c++
c = c + 1;
```

és una instrucció perfectament vàlida que incrementa el valor de `c` en 1, però seria una equació impossible de satisfer.

<div id="oper" />

## Els operadors per als tipus bàsics inclouen operacions aritmètiques, lògiques i relacionals.

Els operadors disponibles per operar amb valors dels tipus bàsics són aquests:

|                  |                      |
| ---------------- | -------------------- |
| Unaris           | `-`, `not`, `!`      |
| Multiplicatius   | `*`, `/`, `%`        |
| Additius         | `+`, `-`             |
| Relacionals      | `<`, `>`, `<=`, `>=` |
| Relacionals (eq) | `==`, `!=`           |
| Conjunció        | `and`, `&&`          |
| Disjunció        | `or`, `\|\|` |

Els operadors aritmètics `+`, `-`, `*` i `/` son els coneguts.

Tanmateix, hi ha dos conceptes nous importants (i que solen ser font d'errors):

- La divisió `/`, en el cas dels enters, retorna un **enter**, que és el quocient.
- L'operador `%` és el **mòdul**, i retorna la resta de la divisió entera.

<div id="bool-expr" />

## Les expressions booleanes són expressions que tenen un resultat de tipus `bool`

La resta dels operadors són relacionals i permeten comparar valors de molts tipus però el resultat és un booleà (un valor de tipus `bool`). Vegem-ne exemples:

```c++
int a = 1, b = 2, c = 3;
bool p = true, q = false;
double x = 0.0, y = 0.5, z = 2.5;

c / 2      // -> 1
c % 3      // -> 0
p and q    // -> false
p || q     // -> true
a + 1 == c // -> false
b + 1 == c // -> true
b % 2 == 0 // -> true
y * 5 > z  // -> false
x + y <= z // -> true
```

Aquest tipus d'expressions se solen utilitzar en moments on volem triar què ha de fer el programa: si seguir un camí o un altre. Les expressions booleanes també s'anomenen sovint **condicions**.

<div id="instr-seq" />

## Un programa és una seqüència d'instruccions

Per escriure un programa, típicament haurem de posar, una darrere l'altra, instruccions que van fent càlculs intermitjos i guarden els resultats en variables. Per exemple:

```c++
double x = 1.0, y = 4.0, z, t;
z = x * y  // z = 1.0 * 4.0 = 4.0
t = x + y  // t = 1.0 + 4.0 = 5.0
z = z / t  // z = 4.0 / 5.0 = 0.8
```

Les instruccions s'executen una per una, i a cada pas es fa l'assignació indicada, acumulant els resultats. Les instruccions són com els passos d'una recepta, que cal fer en cert ordre.

Si canviéssim l'ordre:

```c++
double x = 1.0, y = 4.0, z, t;
t = x + y  // t = 1.0 + 4.0
z = z / t  // z = ?? / 5.0 = ??
z = x * y  // z = 1.0 * 5.0 = 5.0
```

el resultat és un altre. Això demostra de nou que les instruccions no són equacions. En cada moment cal entendre què està passant amb cada assignació.

<div id="input" />

## Un programa obté les dades de l'entrada

El programa anterior té dos problemes. Per una banda, la `x` i la `y` estan fixades a `1.0` i `4.0`, i després, un cop calculat el resultat, aquest no es comunica a l'usuari. Si executem el programa, hem de suposar que el càlcul està bé perquè no veurem res.

Per permetre a l'usuari interactuar amb el programa, primer _llegirem_ (des del punt de vista del programa) el que escriu l'usuari, que és l'**entrada del programa**.

```c++
double x, y, z, t;
cin >> x >> y; // llegim dos reals
// ...
```

En una lectura, el programa s'atura i ens deixa escriure, i un cop premem la tecla _Enter_ (amb la que estem "entrant"-li les dades al programa), el text introduit s'intenta interpretar amb el tipus de la variable que hem donat. La instrucció `cin >> x >> y` provarà de llegir dos reals, i si ho aconsegueix, els guarda a `x` i `y`.

<div id="output" />

## Un programa produeix els resultats a la sortida

Reescriguem el programa original:

```c++
double x, y, z, t;
cin >> x >> y;
z = x * y;
t = x + y;
z = z / t;
```

Ara només ens faltaria ensenyar el valor de `z`, que està clar que és el resultat del nostre càlcul. Per fer-ho farem servir una instrucció anàloga a la d'entrada:

```c++
cout << z << endl;
```

En aquest cas hem posat una suposada "variable" extra que es diu `endl` que representa un salt de línia, perquè així el programa produeix una línia sencera a la sortida i no pas mitja línia.

<div id="iostream" />

## Els programes que tenen entrada i sortida necessiten incloure la capçalera `iostream`

Per acabar el programa i poder-lo compilar, cal afegir una mica més de text, abans i després de les instruccions que tenim:

```c++
#include <iostream>
using namespace std;

int main() {
    double x, y, z, t;
    cin >> x >> y;
    z = x * y;
    t = x + y;
    z = z / t;
    cout << z << endl;
}
```

Ara sí té sentit explicar una mica més sobre el que hem afegit:

- `#include <iostream>`. Aquesta meta-instrucció (que comença amb `#`), li diu al compilador que volem utilitzar variables i valors que no hem declarat nosaltres. En particular: `cin`, `cout` i `endl`.

- Les instruccions del programa les hem posat a dins d'una funció de nom `main`. Això serà sempre així. Tots els programes tenen aquesta _funció principal_ que és el lloc a on comença el programa a executar-se. En el futur tindrem moltes més funcions, però `main` serà sempre la que s'executa primer.

<div id="transversals" />

# Conceptes Transversals

## Una tupla permet agrupar variables

🚧 Pendent... 🚧

<div id="appendix" />

# Saber-ne més

<div id="errors" />

## Distingim entre errors de compilació i errors d'execució

Els programes tenen:

- **Errors de compilació**: el text del programa és inconsistent o incorrecte i per tant el compilador ni tan sols pot generar l'executable.

- **Errors d'execució**: el programa es pot compilar, però a l'hora d'executar-lo o bé dóna un resultat inesperat i incorrecte o fins i tot s'interromp de cop a mitja execució (aborta).

<div id="var-names" />

## Els noms de variable en C++ han de complir unes regles molt concretes

El nom d'una variable ha de complir el següent:

1. El seu primer caràcter pot ser una "barra baixa" (`_`), una lletra minúscula (`a`-`z`) o una lletra majúscula (`A`-`Z`).

2. Els caràcters del segon en endavant només poden ser lletres minúscules, lletres majúscules, dígits o la barra baixa (`_`).

En particular, a C++ no es poden fer servir accents (com 'à' o 'ú') ni lletres com la 'ç' o la 'ñ'.

Exemples:

- Correctes: `abc`, `num1`, `Alt0`, `m_size`, `__read`, `M_PI`.
- Incorrectes: `+abc+`, `var 1`, `acció`, `$_xyz`, `2pac`, `v(1)`.

<div id="const" />

## Per tenir un valor de referència global declarem una variable amb `const`

Les constants es poden veure com variables que no es poden assignar, i es declaren amb el prefix `const`:

```c++
const int max_height = 750;
```

Donat que no podrem assignar-hi res després, una constant ha de tenir un valor inicial per força.

Quan s'intenta canviar el valor d'una constant, el compilador dóna un error de compilació:

```c++
const int max_height = 750;
max_height = 720; // <-- Error de compilació
```

Les constants van bé per referir-nos a valors de referència que representen quantitats que no canvien durant tota l'execució del programa.

<div id="const-decl" />

## Si no modifiquem en cap moment el valor d'una variable també posem `const`

Sovint quan calculem alguna cosa per passos, guardem els càlculs intermitjos en una variable que no pensem modificar, però va bé anomenarla per claredat i per evitar errors:

```c++
double x1 = 0.0, y1 = 5.0, x2 = 3.0, y2 = 5.0;
const double dx = x2 - x1;            // distancia en l'eix x
const double dy = y2 - y1;            // distància en l'eix y
double dist_quad = dx * dx + dy * dy; // distància al quadrat
```

En aquest cas, `dx` i `dy` són valors intermitjos que no necessitem canviar però està bé informar al compilador del fet que no canviaran.

<div id="multiline-comments" />

## Es poden escriure comentaris de vàries línies amb `/*` i `*/`

En un programa a on volguem fer una explicació més llarga sobre una part o adjuntar un text llarg, podem posar el text del comentari entre `/*` i `*/`, i el compilador ignorarà ambdós senyals i el text del mig:

```c++
#include <iostream>
using namespace std;

/*

Aquest programa s'atribueix a Brian Kernighan, el 1974, i es va
popularitzar com a primer programa d'introducció a un llenguatge
degut al llibre "The C Programming Language", de 1978.

https://es.wikipedia.org/wiki/Hola_mundo#

 */

int main() {
    cout << "Hello, world!" << endl;
}
```

<div id="exemples" />

# Exemples

<div id="fahrenheit" />

## Celsius a Fahrenheit

Un programa que demana una temperatura en graus Fahrenheit i la converteix a Celsius:

```c++
#include <iostream>
using namespace std;

int main() {
    double F, C;
    cout << "Entra la temperatura en graus Fahrenheit: ";
    cin >> F;
    C = (F - 32) * 5.0 / 9.0;
    cout << "La temperatura en grau Celsius és: " << C << endl;
}
```

> Exercici: fes el programa invers, que calcula graus Fahrenheit a partir de graus Celsius

<div id="sphere" />

## Volum d'una esfera

```c++
#include <iostream>
#include <cmath>
using namespace std;

int main() {
    double R, V;
    cout << "Entra el radi de l'esfera: ";
    cin >> R;

    // 1. Fem servir una constant M_PI definida a `<cmath>`
    // 2. No existeix un operador per la potència, així que
    //    multipliquem 3 cops
    V = 4.0 / 3.0 * M_PI * R * R * R;

    cout << "El volum de l'esfera és: " << V << endl;
}
```
