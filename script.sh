#!/bin/bash

# Check if the public directory exists first
if [ ! -d "public" ]; then
  echo "Error: 'public' directory not found."
  exit 1
fi
git 
# Create the necessary directories if they don't exist.
mkdir -p public/img/logos || echo "Error creating logos directory"
mkdir -p public/img/icons || echo "Error creating icons directory"


# Move files and folders, checking for existence.
if [ -d public/css/components ]; then mv public/css/components public/css/; fi
if [ -d public/js/components ]; then mv public/js/components public/js/; fi
if [ -f public/js/app.js ]; then mv public/js/app.js public/js/; fi

#Handle the img folder (only if it exists)
if [ -d public/img ]; then
    find public/img -mindepth 1 -print0 | xargs -0 mv -t public/img/
fi

if [ -d public/Dashboard_page ]; then mv public/Dashboard_page public/pages/; fi
if [ -d public/Landing_pages ]; then mv public/Landing_pages public/pages/; fi
if [ -d public/login_page ]; then mv public/login_page public/pages/; fi
if [ -f public/index.html ]; then mv public/index.html public/pages/; fi

# Move all .html files
find public -name "*.html" -mindepth 1 -print0 | xargs -0 -I {} sh -c 'if [ -f "{}" ]; then mv -v "{}" public/pages/; fi'

# Do similarly for .css and .js files
find public -name "*.css" -mindepth 1 -print0 | xargs -0 -I {} sh -c 'if [ -f "{}" ]; then mv -v "{}" public/css/; fi'
find public -name "*.js" -mindepth 1 -print0 | xargs -0 -I {} sh -c 'if [ -f "{}" ]; then mv -v "{}" public/js/; fi'

if [ -f public/config.json ]; then mv public/config.json public/; fi
if [ -f public/README ]; then mv public/README public/; fi