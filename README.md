# New Order

Help you manage an ordered list of filenames, by splicing it.

`npm i new-order -g`

## Usage

In the directory where you need to work :

`new-order --move fileToMove --before otherFile`


`new-order --move fileToMove --after otherFile`

fileToMove and otherFile can be directories.

Currently no relative or absolute file paths supported, just plain filenames.

## Example

Let's say you want to write a book about rainbows to cheer you up during a sad Blue Monday.
Each chapter will be about a specific color and will have its own markdown file.

Here's the initial content of your book directory, files are for now sorted alphabetically :

```
.
..
blue.md
green.md
red.md
```

Your story is a journey along the light spectrum, from infrared to ultraviolet.
So you need to reorder your chapters. Doing it by hand (with the `mv` command for example), you'll get :

```
.
..
1 red.md
2 green.md
3 blue.md
```

Now you need to write the *orange* chapter. It should fit in 2nd position, between *red* and *green*.
But if you simply call it *2 orange.md* it won't work. You need to rename all the files coming after :

```
.
.
..
1 red.md
2 orange.md
3 green.md
4 blue.md
```

As you've guessed, this task can be very tedious and error-prone for large amounts of files.

Let's see how can `new-order` help you doing this chore. 'Time to write down *yellow.md*, your next episode following the newly created *orange*'s one.

```
.
..
1 red.md
2 orange.md
3 green.md
4 blue.md
yellow.md
```

You can handle this in several ways with the same result :

`new-order --move yellow.md --after 2\ orange.md`

or

`new-order --move yellow.md --before 3\ green.md`

```
.
..
1 red.md
2 orange.md
3 yellow.md
4 green.md
5 blue.md
```

What happens if you have more than 9 files?

```
.
..
1 red.md
2 orange.md
3 yellow.md
4 lime.md
5 green.md
6 cyan
7 blue.md
8 indigo.md
9 violet.md
jade.md
```

`new-order --move jade.md --after 5\ green.md`

```
.
..
01 red.md
02 orange.md
03 yellow.md
04 lime.md
05 green.md
06 jade.md
07 cyan
08 blue.md
09 indigo.md
10 violet.md
```

`new-order` will automatically adjust to a 2 digits naming scheme.

## License MIT
