---
title: Search
description: 
published: true
date: 2025-01-02T14:35:43.132Z
tags: 
editor: markdown
dateCreated: 2024-11-19T09:29:48.661Z
---

# Searching

Sorted array
- insert / delete: $O(n)$
- binary search: $O(log(n))$

unsorted list
- insert / delete: $O(n)$
- search $O(n)$

Linear sorted list
- insert / delete: $O(n)$
- search: $O(n)$

Sorted binary tree (balanced)
- insert / delete: $O(log(n))$
- search: $O(log(n))$
---
- Precondition: conditon is valid before program is executed
- Postcondition: condition is valid after program finishesd
- Invariante: condition that is valid during the whole execution of the program

## Binary Search
search a value in an array

Binary search compares the target value to the middle element of the array. 
If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half

![binary_search.png](/binary_search.png)

```java
static int binary(int[] a, int s) {
  int l = -1;
  int r = a.length;
  int m = (l + r) / 2;
  // Schleifeninvariante && l == -1 && r == a.length
  while (l + 1 < r && a[m] != s) {
    // Schleifeninvariante
    if (a[m] < s) l = m;
    else r = m;
    m = (l + r) / 2;
  }
  // Schleifeninvariante && (l + 1 < r || a[m] == s)
  return (a[m] == s)?m:-1;
}
```

Complexity: $O(log(n))$

## 2 unsorted Lists
searches first maching value of 2 unsorted lists

```java
static int indexOf(String[] a, String[] b) {
  for (int i = 0; i < a.length; i++) {
    for (int j = 0; j < b.length; j++) {
    	if(a[i].equals(b[j])) return i;
    }
  }
  return -1;
} 
```
Complexity: $O(m*n)$

## 2 sorted Lists

```java
static int indexOf(String[] a, String[] b) {
  int i = 0, j = 0;
  // Schleifennvariante && i == 0 && j == 0
  while (!a[i].equals(b[j]) && (i < a.length-1 || j < b.length-1)) {
    // Schleifennvariante
    int c = a[i].compareTo(b[j]);
    if (c < 0 || j == b.length-1 ) i++;
    else if (c > 0 || i == a.length-1) j++;
  }
  // Schleifennvariante && (i == a.length-1 && j == b.length-1) || (a[i] == b[j])
  if (a[i].equals(b[j])) return i; else return -1;
} 
```
Complexity: $O(n)$

# Search in texts

## Brute Force

Compare Pattern to substring, if it doesnt mach: move one character right

```java
static int indexOf(String str, String pattern) {
  for (int i = 0; i < str.len() - pattern.len() + 1; i++) {
    for (k = 0; k < pattern.len() && str.charAt(i + k) == pattern.charAt(k); k++) ;
    if (k == pattern.len()) return i;
  }
  return -1;
}

static int indexOf(String str, String pattern) {
  int k;
  for (int i = 0; i < str.len() - pattern.len() + 1; i++) {
    while (i < str.len() && str.charAt(i) != pattern.charAt(0)) i++;
      if (i + pattern.len() <= str.len()) {
      for (k = 0; k < pattern.len() && str.charAt(i+k) == pattern.charAt(k); k++) ;
      if (k == pattern.len()) return i;
    }
  }
  return -1;
}
```

Effort: $O(m*n)$
m = number of characters in pattern
n = number of characters in String 

## Knuth-Morris-Pratt Algorithm

1. the pattern is searched for repeating sub patterns
```
BARBARA

B 
BA
BAR
BARB
BARBA
BARBAR
```
2. Every subpattern is shifted from the far left to the right until all overlapping characters match or no overlap is found
3. Build a next table (how long is matching prefix / suffix)

![next_table.png](/next_table.png)

|j |1 |2 |3 |4 |5 | 6 |
|--- |--- |--- |--- |--- | --- |
|next[j] |0 |0 |0 |1 |2 |3 |

```java
public static int[] buildNextTab(String pattern) {
	int lenOfPattern = pattern.length();
	int lenOfSubpattern = 0;
	int posToCompare = 1;
	int[] next = new int[lenOfPattern - 1];
	while (posToCompare < lenOfPattern - 1) {
		if (pattern.charAt(posToCompare) == pattern.charAt(lenOfSubpattern)){
			next[posToCompare] = lenOfSubpattern + 1;
			lenOfSubpattern++;
			posToCompare++;
		}
		else {
			if (lenOfSubpattern != 0) {
				lenOfSubpattern = next[lenOfSubpattern - 1];
			}
			else {
				next[posToCompare] = 0;
				posToCompare++;
			}
		}
	}
	return next;
}
```

4. if the characters match, try to extend the pattern and text
5. if not, try the next sub-pattern

```java
public static void KMP(String textToSearch, String pattern){
	int lenOfText = textToSearch.length();
	int lenOfPattern = pattern.length();
	int[] next = buildNextTab(pattern);
	next = int posOfText = 0, posOfPattern = 0;
	while ((posOfText < lenOfText) && (posOfPattern < lenOfPattern)) {
		if (textToSearch.charAt(posOfText) == pattern.charAt(posOfPattern)) {
			posOfText++;
			posOfPattern++;
		}
		else {
			if (posOfPattern != 0) {
				posOfPattern = next[posOfPattern - 1];
			}
			else {
				posOfText++;
			}
		}
	}
	if (posOfPattern == lenOfPattern) {
		println("Position: " + Integer.toString(posOfText - lenOfPattern));
	}
}
```

Effort: $O(m + n)$
m = number of characters in pattern
n = number of characters in String

## Inverted Index

```
T[0] = "it is what it is"
T[1] = "what is it"
T[2] = "it is a banana"

a {(2, 2)}
banana {(2, 3)}
is {(0, 1), (0, 4), (1, 1), (2, 1)}
it {(0, 0), (0, 3), (1, 2), (2, 0)}
what {(0, 2), (1, 0)}
```

Usage:
- Search engines
- web crawlers

words unsorted O(n)
sort words and search binary O(log(n))
words in a balanced tree O(logn))
Hashing O(1)

## Levenshtein-Distance

minimum number of operations to turn the frist word into the second word

| permitted operations      | Description                                                                      |
|--------------|----------------------------------------------------------------------------------|
| **insert(c)**| Insert the letter `c` at a specific position in the first word.                 |
| **update(c, d)** | Replace the letter `c` at a specific position in the first word with the letter `d`. |
| **delete(c)**| Delete the letter `c` at a specific position in the first word.                 |

![levenstein.png](/levenstein.png)

```java
private static int minimum(int a, int b, int c) {
	return Math.min(Math.min(a, b), c);
}

public static int computeLevenshteinDistance(String str1,String str2) {
	int[][] distance = new int[str1.len() + 1][str2.len() + 1];
	for (int i = 0; i <= str1.len(); i++) distance[i][0] = i;
	for (int j = 1; j <= str2.len(); j++) distance[0][j] = j;
	for (int i = 1; i <= str1.len(); i++) {
		for (int j = 1; j <= str2.len(); j++) {
			int minEd = (str1.charAt(i - 1) == str2.charAt(j - 1)) ? 0 : 1;
			distance[i][j] = minimum(distance[i - 1][j] + 1,
			distance[i][j - 1] + 1, distance[i - 1][j - 1]+ minEd);
		}
	}
	return distance[str1.len()][str2.len()];
}
```

Effort: $O(n + m)$

## Trigramm Search

Fehlertolerante Suche (auch für Wortverdreher, z.B. Vor- und Nachname).
- Effizient für grosse Datenbestände.
- Index → Wort in 3er-Buchstaben-Gruppen unterteilt:
- Z.B. sind das bei «Peter», drei 3-er Gruppen «PET», «ETE», «TER».
- Diese 3-er Gruppen werden für vorkommende Worte gebildet und z.B. in der Hashtabelle gespeichert.
- Das zu suchende Wort wird ebenfalls in 3-er-Buchstaben-Gruppen zerlegt.
- Das gesuchte Wort mit am meisten Übereinstimmungen wird genommen

![trigrams.png](/trigrams.png)

```java
public static Map<String, List<Integer>> trigrams = new HashMap<>(); // List of all Trigrams
public static Map<Integer, Integer> counts = new HashMap<>(); // Key: index of

public static List<String> trigramForName(String name) {
	List<String> nameList = new ArrayList<>();
	for(int i = 0; i < name.length() - 2; i++) {
		nameList.add(name.substring(i, i+3));
	}
	return nameList;
}

public static void constructTrigramIndex(List<String> names) {
	for (int nameIdx = 0; nameIdx < names.size(); nameIdx++) {
		List<String> trigs = trigramForName(names.get(nameIdx));
		for (String trig : trigs) {
			incCount(nameIdx);
			trigrams.put(trig, Collections.singletonList(nameIdx));
		}
	}
}

private static void incCount(int cntIdx) {
	Integer c = counts.get(cntIdx);
	c = (c == null)?  1 : c + 1;
	counts.put(cntIdx, c);
}
	
public static int findIdx(String name) {
	counts.clear();
	int maxIndex = -1;
	int maxCount = 0;

	List<String> tr = trigramForName(name);
	for (String trigram : tr) {
		if (trigrams.containsKey(trigram)) {
			List<Integer> indices = trigrams.get(trigram);

			for (int index : indices) {
				incCount(index);
				if (counts.get(index) > maxCount) {
					maxCount = counts.get(index);
					maxIndex = index;
				}
			}
		}
	}
	return maxIndex;
}
```

## Phonetic algorithm

Soundex ist ein phonetischer Algorithmus zur Indizierung von Wörtern und Phrasen nach ihrem Klang
Ein Wort wird z.B. aus seinem ersten Buchstaben, gefolgt von drei Ziffern (z.B.
«K523», Soundex-Code) repräsentiert:
- Die Vokale A, E, I, O und U und die Konsonanten H, W und Y sind ausser beim ersten Zeichen zu ignorieren (in D auch ä, ö, ü).
- Kurze Worte: mit 0 auffüllen, 0-werden ignoriert
- Ziffern sind Konsonanten

|Word |without vocals |Code |
| --- | --- |--- |
| Britney | BRTN | B635 |
| Spears | SPRS | S162 |

## Regex

[regex](/Java/regex)