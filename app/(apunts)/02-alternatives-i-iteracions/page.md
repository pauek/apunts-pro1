
# Alternatives i Iteracions

Amb les assignacions i les expressions, podem fer programes que van aplicant fórmules per ordre

```c++
d = 10.2 * a + (5.0 + b) / (1.0 + c);
e = d * d + a * b;
f = -e / 100.0;
// ...
```

però en el següent codi

```c++
int a;
cin >> a;
string tipus; // "senar" o "parell"
              // segons ho sigui `a`
```

si el que volem és que `tipus` sigui `"parell"` o `"senar"` segons la variable `a`, només ho podríem resoldre fent una assignació `tipus = "parell"` en un cas i `tipus = "senar"` en un altre! Com fem això??


## Un `if` permet executar una instrucció només si es compleix una condició

La instrucció `if` té la següent forma

```c++
if (/* CONDICIÓ (= expr. booleana) */) {
    /*
       BLOC d'INSTRUCCIONS
       (només si la condició és certa)
    */
}
```

Els parèntesis són **obligatoris**. I entre les claus podem posar tantes instruccions com volguem. Típicament a una seqüència d'instruccions entre claus `{` i `}` se les anomena un **bloc** (de codi).

<note>
   A més, les instruccions de dins d'un bloc tenen **indentació**, és a dir, tenen uns quants espais al principi de la línia, típicament 2 o 4, perquè visualment es pugui entendre clarament que aquestes instruccions estan a dins de les claus.
</note>

L'`if` funciona de la següent manera:
1. S'avalua la condició, amb resultat `true` o `false`. (No tindria sentit posar una expressió que retorni un `char`, o un `float`!)
2. Si el resultat és `true`, llavors s'executa el bloc i es continua.
3. Si la condició és `false`, la instrucció **no s'executa** (se salta) i se segueix amb la instrucció després del bloc.

Per tant, per fer el nostre programa de parell/senar podem fer servir l'`if` així

```c++
int a;
cin >> a;
string tipus = "parell";
if (a % 2 == 1) {
    tipus = "senar";
}
cout << tipus << endl;
```

És a dir, suposarem que el nombre és parell (i per tant inicialitzem `tipus` amb `"parell"`), i si veiem que no és el cas, llavors canviem el seu valor (el sobreescrivim) a `"senar"`.

Mateixa idea però amb negatiu/positiu:

```c++
int a;
cin >> a;
string resultat = "positiu";
if (a < 0) {
    resultat = "negatiu";
}
cout << "El nombre " << a << " és "
     << resultat << endl;
```


### Exemple: valor absolut

El següent programa llegeix un nombre real i dóna com a resultat el seu valor absolut:

```c++
float x;
cin >> x;
if (x < 0) {
    x = -x;
}
cout << x << endl;
```


## Un `else` després d'un `if` permet indicar què fer si la condició no es compleix

Sovint en un `if` cal fer una cosa si la condició és certa, però cal fer-ne una altra si la condició és falsa. Per exemple, si el programa parell/senar fos així:

```c++
int a;
cin >> a;
if (a % 2 == 1) {
    cout << "senar" << endl;
}
// ???
```

Tal com està ara, el programa no fa el mateix que abans, només mostra un resultat si el nombre és senar, perquè quan és parell no fa res. Plantejat així, necessitem una alternativa, que podem afegir amb `else`:

```c++
int a;
cin >> a;
if (a % 2 == 1) {
    cout << "senar" << endl;
} else {
    cout << "parell" << endl;
}
// següent instrucció
```

<important>
Un `if-else` funciona així:
1. S'avalua la condició (`true` o `false`).
2. Si és `true`: s'executa el **primer** bloc, i després es continua a la "següent instrucció", passat l'`else`.
2. Si és `false`: s'executa el **segon** bloc (saltant el primer), i després es continua a la "següent instrucció".
</important>

Per tant, un `if-else` fa una cosa o una altra segons la condició. Sovint es diu que un `if-else` té dues "branques", perquè és com un camí que es bifurca segons una condició (tot i que després es torna a ajuntar).


### Exemple: normal o sobrepès

Un exemple que calcula l'[Índex de Massa Corporal](https://ca.wikipedia.org/wiki/%C3%8Dndex_de_massa_corporal) i l'utilitza per determinar si l'usuari del programa té sobrepès:

```c++
double pes, alsada;
cout << "Escriu el teu pes en kg: ";
cin >> pes;
cout << "Escriu la teva alçada (p.e. 1.72): ";
cin >> alsada;

double IMC = pes / (alsada * alsada);
if (IMC >= 25.0) {
    cout << "sobrepès" << endl;
} else {
    cout << "normal" << endl;
}
```


## Una de les branques d'un `if-else` pot ser un altre `if-else`

En el programa de l'IMC, hem simplificat molt, perquè en realitat hi ha molts més casos, en funció del valor de la variable `IMC`. Per exemple, si l'`IMC` és menor que 18, es considera que la persona està (massa) prima. Podriem fer això:

```c++
if (IMC >= 25.0) {
    cout << "sobrepès" << endl;
} else {
    if (IMC < 18.0) {
        cout << "massa prim" << endl;
    } else {
        cout << "normal" << endl;
    }
}
```

És a dir, quan l'`IMC` és menor que 25, llavors tornem a bifurcar, segons si és menor que 18 o no. És interessant notar la quantitat de claus (`{` i `}`) que hi ha i que el codi està molt ordenat per evitar confusió (la indentació dels 4 espais, en particular).

Tanmateix, un bloc de codi amb una sola instrucció no necessita les claus, i el nostre `else` és així (només té un `if-else`), per tant podem posar

```c++
if (IMC >= 25.0) {
    cout << "sobrepès" << endl;
} else
    if (IMC < 18.0) {
        cout << "massa prim" << endl;
    } else {
        cout << "normal" << endl;
    }
```

i si refem la indentació una mica, queda

```c++
if (IMC >= 25.0) {       // <-- condició 1
    cout << "sobrepès" << endl;
} else if (IMC < 18.0) { // <-- condició 2
    cout << "massa prim" << endl;
} else {
    cout << "normal" << endl;
}
```

Aquest última forma és la més entenedora, malgrat segueix havent-hi dos `if-else`s, un a dins de l'altre. Però es llegeix millor perquè sembla que aquest `if-else-if` tingui 3 branques, o sigui 3 casos excloents entre sí.

<important>
Un `if-else-if` funciona de la següent manera:
1. S'avalua la condició 1.
2. Si és certa, s'entra en el primer bloc, i tot seguit se salta al final.
3. Si és falsa, s'avalua la condició 2.
4. Si la condició 2 és certa, s'entra en el segon bloc, i tot seguit se salta al final.
5. Si és falsa, s'entra en l'últim bloc, i se segueix perquè ja estem al final.
</important>

De fet, aprofitarem aquesta mateixa estructura per fer l'exemple complet, perquè l'IMC, realment, té 5 casos!

```c++
if (IMC < 18.0) {
    cout << "massa prim" << endl;
} else if (IMC < 25.0) {
    cout << "normal" << endl;
} else if (IMC < 30) {
    cout << "sobrepès" << endl;
} else if (IMC < 40) {
    cout << "obesitat" << endl;
} else {
    cout << "obesitat mòrbida" << endl;
}
```

Per arribar al primer bloc, cal que la primera condició sigui certa. Per arribar al segon, cal que la primera sigui falsa, i la segona certa. En general, per arribar a un bloc, _totes les condicions prèvies han de ser falses_ i la que just està abans d'aquell bloc ha de ser certa. I per arribar a l'últim `else` totes les condicions han hagut de ser falses.

En aquest exemple també es veu com hem aprofitat bé l'`else`, perquè un cop hem passat la primera condició, ja sabem que l'`IMC` és igual o major que 18, per tant no cal tornar-ho a comprovar. Les condicions queden més simples si podem recolzar-nos en això.


### Exemple: classificació d'ous M/S/L/XL

```c++
double gr;
cout << "Entra el pes de l'ou en grams: ";
cin >> gr;
string categoria;
if (gr >= 73) {
    categoria = "XL";
} else if (gr >= 63) {
    categoria = "L";
} else if (gr >= 53) {
    categoria = "M";
} else {
    categoria = "S";
}
cout << "Un ou de " << gr << "gr. "
     << "té categoria " << categoria << endl;
```


## Les iteracions ens permeten repetir un bloc d'instruccions fins que es compleixi certa condició

Els programes que podem fer amb assignacions, entrada/sortida i `if`/`if-else`/`if-else-if` no fan massa feina, perquè executen un número d'instruccions molt limitat. Si volem que l'ordinador treballi, hem de fer-li fer coses repetidament.

Suposem que el primer dia de PRO1 ens castiguen i l@ professor@ ens diu que _hem d'escriure 100 vegades_ la frase "no tornaré a (jugar al Clash Royale/mirar Instagram/mirar TikTok) mai més (a classe)". Resulta que l@ professor@ no és massa rigoros@ i no ha especificat clarament com s'havia de portar a terme la tasca així que farem un programa, evidentment.

Però necessitem una manera de repetir mateixa instrucció una certa quantitat de vegades. Podem començar amb això

```c++
int vegades = 0;
if (vegades < 100) {
    cout << "no tornaré a ... mai més (a classe)" << endl;
    vegades = vegades + 1;
    // o bé `vegades += 1`
    // o inclús `vegades++`
}
```

amb el següent plantejament: la variable `vegades` comptarà les vegades que hem escrit per pantalla la frase demanada, i cada cop que l'escrivim per la sortida, incrementem la variable `vegades` en una unitat. Però es clar, aquest programa només mostrarà la frase una vegada, perquè l'`if`, un cop executat el bloc, continua amb el programa (i en el nostre cas, s'acaba).

El que necessitem és una manera de **tornar enrere** i re-examinar la condició (`vegades < 100`). Si la variable `vegades` és 1 quan haguem mostrat la frase un cop, la condició seguirà sent certa, perquè `vegades < 100` es compleix. Es deixarà de complir quan haguem fet tota la feina! De fet, necessitem anar executant el bloc **mentre** la condició sigui certa.


## El `while` executa un bloc d'instruccions mentre es compleix una condició

El `while` ens permet fer exactament això, i en el programa anterior, només cal substituir `if` per `while`, ambdós tenen la mateixa sintaxi.

```c++
int vegades = 0;
while (vegades < 100) {
    cout << "no tornaré a ... mai més (a classe)" << endl;
    vegades++;
}
```

La instrucció `while` funciona així:
1. S'avalua la condició.
2. Si és certa, s'entra en el bloc i s'executa.
    2.1. Un cop al final del bloc, **es torna enrere fins la condició** i ens situem de nou al pas 1.
3. Si és falsa, se salta el bloc i es continua amb el que hi hagi després del `while`.

Les repeticions són molt potents perquè, de fet, només que canviem el `100` del programa per `1000000`, nosaltres haurem fet el mateix esforç i li hem passat la feinada a l'ordinador (que treballi ell! 😋). (L@ nostr@ professor@ fliparà amb els fulls sortint a tota pastilla de la impressora amb un milió de còpies de la maleïda frase.)


### Exemple: escriure 1, 2, 3, ..., n

El problema és: ens donen un enter `n`, i hem d'escriure els nombres de l'1 al `n`, un per línia. Vegem-ho

```c++
int n, i;
cin >> n;
i = 1;
while (i <= n) {
    cout << i << endl;
    i++;
}
```


### Exemple: Quantes vocals s'han llegit

El problema és: ens van donant caràcters, i hem de comptar quantes vocals han aparegut, i parar de llegir caràcters quan vegem un `'.'`.

```c++
int num_vocals = 0;
char c;
cin >> c;
while (c != '.') {
    if (c == 'a' || c == 'e' || c == 'i' ||
        c == 'o' || c == 'u') {
        num_vocals++;
    }
    cin >> c;
}
```


## Per treballar amb els dígits d'un nombre podem fer servir `/` i `%` amb les potències de 10

Quan de vegades llegeixes un codi d'un producte o una data de caducitat, sovint et trobes realment un número com `20250301`. La nostra ment de seguida veu que es tracta d'una data, separant mentalment les parts.

Aquesta mateixa separació la podem fer en un programa fent servir dos idees:

1. Al dividir un número entre 10, aquest "perd el dígit de menys pes": `1234 / 10` és `123`; `789 / 10` és `78`.

2. Al calcular el mòdul d'un número entre 10, obtenim precisament el número que es perd: `1234 % 10` és `4`; `789 % 10` és `9`.

És més, fent servir 10 tallem un dígit, però amb 100 tallen 2 dígits i amb 1000 en tallem 3!

Utilitzant això podem fer un programa que obté dia, mes i any de l'enter `data`:

```c++
int data = 20250301;

int dia = data % 100;        // 2 últims dígits
int mes = (data / 100) % 100; // 2 dígits del mig
int any = data / 10000;      // 4 primers dígits

cout << dia << '/' << mes << '/' << any << endl;
```


### Exemple: mostrar els dígits d'un número (al revés!)

<DownloadButton
    text="show-digits-reversed.cc"
    file="/files/exemples/show-digits-reversed.cc" />

```c++
#include <iostream>
using namespace std;

int main() {
    int n;

    cout << "Entra un natural: ";
    cin >> n;

    cout << "Els dígits de " << n
         << " al revés són:";
    if (n == 0) {
        cout << 0 << endl;
    } else {
        while (n > 0) {
            cout << ' ' << n % 10;
            n = n / 10;
        }
        cout << endl;
    }
}
```


## L'expressió `N % d == 0` és `true` quan `N` és divisible per `d`

Donat que el mòdul ens retorna la resta de la divisió entera, el fet que el mòdul de `N` dividit per `d` sigui 0 implica que `N` és divisible per `d`.

Vegem com fer un programa que mostra els divisors del nombre llegit de l'entrada:

```c++
#include <iostream>
using namespace std;

int main() {
    int N;

    cout << "Entra un natural: ";
    cin >> N;

    cout << "Els divisors de " << N
         << " són:";
    int d = 1;
    while (d <= N) {
        if (N % d == 0) {
            cout << ' ' << d;
        }
        d++;
    }
    cout << endl;
}
```


## Per determinar si un nombre és primer hem de buscar un divisor

Que un nombre sigui primer implica que no té cap divisor, excepte 1 i ell mateix. Això ens permet fer una iteració passant per tots els potencials divisors i recordant si n'hem trobat algun amb una variable Booleana:

```c++
bool primer = true; // Suposem que sí
int d = 2;
while (d < N) {
    if (N % d == 0) {
        primer = false;
    }
    d++;
}
if (primer) {
    cout << "És primer" << endl;
} else {
    cout << "No és primer" << endl;
}
```

Però aquí apareix un error que no és de compilació ni d'execució: el programa funciona correctament però triga molt més del necessari en fer el càlcul! Veus perquè?

Aquest és el primer programa a on apareix una cerca, que és una iteració que ens permet donar el resultat sense haver d'arribar fins al final. En el cas d'un nombre que no és primer, tant bon punt haguem vist un divisor ja _no cal que seguim mirant_, perquè ja sabem el resultat.

Per no seguir dins del bucle quan ja haguem vist un divisor, transformem el `for` en un `while` (perquè la condició és molt diferent, ara) com el següent:

```c++
bool primer = true;
int d = 2;
while (!primer && d < N) {
    if (N % d == 0) {
        primer = false;
    } else {
        d++;
    }
}
```

Una pregunta: se t'acut perquè hem posat el `d++` en el `else`? Ho veurem amb més detall al tema de seqüències i esquemes algorísmics.


## En una parella de divisors de $N$, el més petit no pot superar $\sqrt{N}$

I hi ha encara una altra forma de fer el programa molt més ràpid. I aquesta és una raó matemàtica. Donat $N$, quan tenim un divisor $d$, aquest té una "parella" $e$, que és el nombre pel qual $d \times e = N$. Per exemple, si diem que 4 és un divisor de 20, la parella del 4 és 5.

Però resulta que les parelles de divisors tenen un element de la parella que és més petit i un altre que és més gran. En el cas del 20: $2 \times 10$, $4 \times 5$. Excepte en un cas: que el divisor sigui l'arrel quadrada del nombre (p.e. si $N$ és 25, $5 \times 5$).

I no és difícil veure que, per produir $N$, si $d$ és més petit que $\sqrt{N}$, llavors $e$ ha de ser més gran que $\sqrt{N}$ per força. (Si $d$ és just $\sqrt{N}$, llavors $e$ també serà $\sqrt{N}$.) I per tant, quan busquem divisors no cal mirar fins a $N$, perquè si hi ha divisors, un d'ells ha de ser menor que $\sqrt{N}$ o bé ser exactament $\sqrt{N}$, ja que si hi és, la seva parella estaria per sobre de $\sqrt{N}$ o bé ser $\sqrt{N}$.

Així doncs, heus aquí la versió més ràpida d'aquest programa:

```c++
#include <iostream>
using namespace std;

int main() {
    int N;

    cout << "Entra un natural: ";
    cin >> N;

    // 0 i 1 no els considerem primers
    bool primer = N > 1;
    int d = 2;
    while (primer && d * d <= N) {
        if (N % d == 0) {
            primer = false;
        } else {
            d++;
        }
    }

    if (primer) {
        cout << "És primer" << endl;
    } else {
        cout << "No és primer" << endl;
    }
}
```

L'expressió `d * d <= N` ens permet expressar una condició equivalent a $d \leq \sqrt{N}$ però evitant calcular l'arrel quadrada, que té un cost força elevat (ja que, per al cas general, requereix la [llibreria matemàtica](https://en.cppreference.com/w/cpp/header/cmath.html) i [fa servir algoritmes més complexos](https://ca.wikipedia.org/wiki/Algoritmes_d%27arrel_quadrada)). En aquest cas concret és més simple i eficient calcular el quadrat de $d$ i comparar-lo amb $N$.

<DownloadButton text="is-prime.cc" file="/files/exemples/is-prime.cc" />



# Conceptes transversals


## Una funció és un subprograma, i també té entrades i sortides

Una funció és un petit "subprograma" al que posem un nom, per poder-lo utilitzar repetidament, com si ens inventéssim una instrucció nova. Les funcions tenen entrades i sortides, igual que els programes.

Per exemple, podem convertir el programa que suma tres enters:

```c++
#include <iostream>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << (a + b + c) << endl;
}
```

en la següent funció:

```c++
int suma3(int a, int b, int c) {
    return a + b + c;
}
```

L'entrada del programa són els 3 enters llegits amb `cin`, i en el cas de la funció són les 3 declaracions d'`a`, `b` i `c` entre parèntesis. La sortida del programa, escrita amb `cout`, en el cas de la funció es _retorna_ com a resultat amb la paraula `return`.

Però les dues versions, malgrat ser força diferents, representen la mateixa idea. Un "dispositiu" que rep 3 entrades i produeix una sortida.

![Diagrama suma3](suma3.opt.svg)

Les entrades, en el cas d'una funció, es diuen **paràmetres**. Per tant, la funció `suma3` té 3 paràmetres: `a`, `b` i `c`, tots de tipus `int`.


## Per cridar un subprograma posem el seu nom i omplim les entrades amb expressions del tipus corresponent

Donada la funció `suma3` del punt anterior, podem cridar-la tants cops com vulguem:

```c++
int a = 1, b = 7, c = 5, d, e;
d = suma3(a + 1, b, 1); // suma3(2, 7, 1) -> 10
b = suma3(b, b / 2, b); // suma3(7, 3, 7) -> 17
e = suma3(-5, 0, suma3(a, b, c));
 // suma3(-5, 0, suma3(1, 17, 5)) ->
 // suma3(-5, 0, 23) ->
 // 18
```

Cada crida fa servir el nom de la funció, seguit dels valors que volem donar als paràmetres (les entrades). Per altra banda, per entendre com funciona l'execució, podem pensar que cada crida a la funció s'acaba substituint pel valor resultant d'haver-la executat.



### Exemples

- Una funció que només retorna un valor i que no té paràmetres (és inútil!):

    ```c++
    int f() {
        return 42;
    }
    ```

- Una funció que passa una lletra de majúscules a minúscules (només si la lletra és majúscula):

    ```c++
    char a_minuscula(char c) {
        if (c >= 'A' && c <= 'Z') {
            return char(int(c) + 32);
        } else {
            return c;
        }
    }
    ```

- Una funció que determina si un caràcter és una vocal (majúscula o minúscula 😄):

    ```c++
    bool es_vocal(char c) {
        return a_minuscula(c) == 'a' || a_minuscula(c) == 'e'
            || a_minuscula(c) == 'i' || a_minuscula(c) == 'o'
            || a_minuscula(c) == 'u';
    }
    ```

- Una funció que calcula el màxim de 2 enters:

    ```c++
    int max2(int a, int b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }
    ```

  La mateixa però molt més curta (usant una [ternària](#loperador-ternari--permet-expressar-una-alternativa-de-forma-molt-breu-en-certes-condicions)):

  ```c++
  int max2(int a, int b) {
      return (a > b ? a : b);
  }
  ```

- Una funció que calcula el màxim de 3 enters (utilitzant `max2`!):

    ```c++
    int max3(int a, int b, int c) {
        return max2(max2(a, b), c);
    }
    ```

- I encara més difícil, una funció que calcula el màxim de 4 enters:

    ```c++
    int max4(int a, int b, int c, int d) {
        return max2(max2(a, b), max2(c, d));
    }
    ```


# Saber-ne més

## L'operador ternari `?:` permet expressar una alternativa de forma molt breu en certes condicions


A vegades tenim codi com el següent:

```c++
string a;
if (CONDICIO) {
    a = "si";
} else {
    a = "no";
}
```

que compleix una propietat interessant: les dues branques de l'`if` tenen una instrucció equivalent en la qual només canvia l'_expressió_ (en aquest cas `"si"` o `"no"`).

En cassos com aquest, podem utilitzar l'únic operador ternari de C++, de la següent manera:

```c++
string a = (CONDICIO ? "si" : "no");
```

L'operador `?:` (també anomenat "expressió ternària") té 3 operands, i la seva forma és:

```c++
(CONDICIO ? EXPR_TRUE : EXPR_FALSE)
```

El primer operador és la `CONDICIO`, que va, molt apropiadament, abans de l'interrogant. Els operands segon i tercer van separats pels `:`, i el segon és l'expressió resultant quan la condició és certa, i el tercer quan és falsa.

Més exemples:

```c++
bool plou = /* miro per la finestra -> cert / fals ;) */;
string transport = (plou ? "tren" : "a peu");

int a = 5, b = 3;
int c = (a > b ? a : b);
// c = màxim d'a i b (= 5)

cout << "'c' és "
     << (a % 2 == 0 ? "parell" : "senar") << endl;
// -> senar
```

<warning>
Es pot caure en el parany d'abusar de la ternària perquè sembla que "sempre" és millor que l'`if`, donant lloc a codi molt difícil de llegir com ara:

```c++
cout << (IMC < 18.0 ? "massa prim" : (IMC < 25.0 ? "normal" :
    (IMC < 30 ? "sobrepès" : (IMC < 40 ?  "obesitat" :
        "obesitat mòrbida")))) << endl;
```

Cal sempre estar alerta i no arribar a aquests extrems. Un `if-else-if` aquí s'entén molt més ràpidament perquè té una forma visual ben coneguda.
</warning>
