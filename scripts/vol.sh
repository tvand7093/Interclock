#!/bin/bash


MIX=amixer
declare -i LO=0     # Minimum volume; try 10 to avoid complete silence
declare -i HI=100   # Maximum volume; try 95 to avoid distortion
declare -i ADJ=3    # Volume adjustment step size

usage ()
{
    echo "Usage: `basename $0` [ - | + | N ]" >&2
    echo "  where N is a whole number between $LO and $HI, inclusive." >&2
    exit 1
}

# Zero or one argument
[ $# -le 1 ] || usage

REG1="?(-|+|+([0-9]))"

# Argument must be one of: empty, -, +, number
[[ $1 == $REG1 ]] || usage

ARG="$1"


# Number argument
REG2="+([0-9])"
REG3="0+([0-9])"

if [[ $ARG == $REG2 ]]; then
    # Strip leading zeros
    while [[ $ARG == $REG3 ]]; do
	ARG=${ARG#0}
    done
    # Must be between LO and HI
    (( ARG >= LO && ARG <= HI )) || usage
fi

EXE=$(which $MIX)
if [ -z "$EXE" ]; then
    echo "Error: $MIX not found. Try \"sudo apt-get install alsa-utils\" first." >&2
    exit 2
fi

GET=$($EXE cget numid=1)
declare -i MIN=$(echo $GET | /bin/grep -E -o -e ',min=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i MAX=$(echo $GET | /bin/grep -E -o -e ',max=[^,]+' | /bin/grep -E -o -e '[0-9-]+')
declare -i VAL=$(echo $GET | /bin/grep -E -o -e ': values=[0-9+-]+' | /bin/grep -E -o -e '[0-9-]+')

if (( MIN >= MAX || VAL < MIN || VAL > MAX )); then
    echo "Error: could not get the right values from $MIX output." >&2
    exit 3
fi

declare -i LEN=0
(( LEN = MAX - MIN ))

declare -i ABS=0
(( ABS = VAL - MIN ))

declare -i PCT=0
(( PCT = 100 * ABS / LEN ))

if [ ! -z "$ARG" ]; then

    declare -i OLD=$PCT

    if [[ "$ARG" == "+" ]]; then
	(( PCT += ADJ ))
    elif [[ "$ARG" == "-" ]]; then
	(( PCT -= ADJ ))
    else
	PCT=$ARG
    fi

    if [[ "$PCT" != "$OLD" ]]; then
	(( ABS = PCT * LEN / 100 ))
	(( VAL = MIN + ABS ))
	$EXE -q cset numid=1 -- $VAL
    fi
fi

echo $PCT
exit 0
