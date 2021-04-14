#!/usr/bin/env python3

import sys
import re
import random
import hashlib

lorem = {}

maxlen = 0
with open("lorem-words") as f:
    for line in f:
        word = line.strip()
        if len(word) not in lorem:
            lorem[len(word)] = []
        lorem[len(word)].append(word)
        if maxlen < len(word):
            maxlen = len(word)
print(str(lorem))

wordmatcher = re.compile(r'([^A-Za-z]*)([A-Za-z]*)')

with sys.stdin as f:
    for line in f:
        line = line.rstrip()
        #print(re.findall(wordmatcher, line))
        for (prefix, word) in re.findall(wordmatcher, line):
            thislen = len(word)
            if thislen > 0:
                if thislen > maxlen:
                    thislen = maxlen
                #newword = random.choice(lorem[len(word)])
                newword = lorem[thislen][int(hashlib.sha1(word.encode('utf-8')).hexdigest(), 16) % len(lorem[thislen])]
                caps = []
                for i in range(len(word)):
                    letter = word[i]
                    if letter >= 'A' and letter <= 'Z':
                        caps.append(i)
                word = newword
                for i in caps:
                    word = word[:i] + word[i].upper() + word[i+1:]
            print(prefix, word, sep='', end='')
        print()

