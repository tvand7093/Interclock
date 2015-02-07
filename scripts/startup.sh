#!/bin/bash

DIR="$HOME/Server/Interclock/"
`node "$DIR/app.js" > "$DIR/logs/server.log &"`
exit 0
